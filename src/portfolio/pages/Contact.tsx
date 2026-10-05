import { useMemo, useState, type ReactNode, type SubmitEvent } from "react";
import { BUDGETS, CONTACT_SERVICES, EMAIL, GITHUB, LINKEDIN, LINKEDIN_CERTS, URGENCIES, whatsAppHref } from "../content";
import { useI18n } from "../i18n";

/** Clé publique Web3Forms : elle n’ouvre pas le SMTP Proton, elle route le brief vers reinestudio@proton.me. */
const WEB3FORMS_KEY = "9d743891-02f9-4177-9a6e-575223de2ca4";

export function Contact() {
  const { t, lang } = useI18n();
  const [copyState, setCopyState] = useState<"idle" | "ok" | "fail">("idle");
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const ready = name.trim().length > 1 && message.trim().length > 7 && emailOk;

  const mailto = useMemo(() => {
    const subject = `Brief — ${name.trim() || "Studio"}`;
    const body = [
      `${t("contact.name")}: ${name.trim()}`,
      `${t("contact.emailOpt")}: ${email.trim()}`,
      services.length ? `${t("contact.service")}: ${services.join(", ")}` : "",
      budget ? `${t("contact.budget")}: ${budget}` : "",
      urgency !== null ? `${t("contact.urgency")}: ${URGENCIES[urgency]?.label[lang]} (${URGENCIES[urgency]?.sub[lang]})` : "",
      "",
      message.trim(),
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [budget, email, lang, message, name, services, t, urgency]);

  const copy = async () => {
    const mark = (next: "ok" | "fail") => {
      setCopyState(next);
      window.setTimeout(() => setCopyState("idle"), 2200);
    };
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
        mark("ok");
        return;
      }
    } catch {
      /* aperçu intégré : le navigateur refuse le presse-papiers */
    }
    const node = document.getElementById("studio-email");
    if (node) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    mark("fail");
  };

  const toggle = (value: string) => {
    setServices((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ready || status === "sending") return;
    setStatus("sending");
    const payload = {
      name: name.trim(),
      email: email.trim(),
      services,
      budget,
      urgency: urgency !== null ? `${URGENCIES[urgency]?.label[lang]} — ${URGENCIES[urgency]?.sub[lang]}` : "",
      message: message.trim(),
    };
    if (company.trim()) {
      setStatus("sent");
      return;
    }
    try {
      await deliverBrief(payload);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="page page-enter contact-page">
      <p className="kicker">— {t("contact.kicker")}</p>
      <h1 className="display" style={{ fontStyle: "italic" }}>{t("contact.title")}</h1>
      <p className="lede">{t("contact.sub")}</p>
      <div className="glass email-bar">
        <div className="email-copy">
          <div className="kicker">{t("contact.emailLabel")}</div>
          <a id="studio-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
        <button type="button" className="btn btn-ghost" onClick={() => void copy()} aria-live="polite">
          {copyState === "ok" ? t("contact.copied") : copyState === "fail" ? t("contact.copyFail") : t("contact.copy")}
        </button>
      </div>
      <a className="glass wa-bar" href={whatsAppHref(t("contact.waText"))} target="_blank" rel="noopener noreferrer" aria-label={`${t("contact.waCta")} (${t("a11y.external")})`}>
        <span className="wa-bar-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 3.15A8.72 8.72 0 0 0 4.7 16.1L3.4 20.7l4.72-1.24A8.72 8.72 0 1 0 12 3.15Zm4.86 12.3c-.2.58-1.18 1.1-1.64 1.14-.42.04-.96.06-1.55-.1-.36-.1-1.22-.45-2.1-1.1-1.85-1.36-3.05-3.6-3.14-3.77-.1-.16-.76-.99-.76-1.9 0-.9.48-1.35.66-1.53.16-.18.36-.22.48-.22h.34c.14 0 .32-.02.48.38.18.46.6 1.6.65 1.72.06.12.08.26.02.4-.08.16-.12.26-.22.4l-.2.24c-.08.1-.16.2-.06.38.1.18.42.72.9 1.16.62.58 1.14.76 1.32.84.16.08.28.06.38-.04.1-.12.46-.54.58-.72.12-.18.24-.14.4-.08.16.06 1.04.49 1.22.58.18.1.3.14.34.22.04.08.04.48-.16 1.06Z"
            />
          </svg>
        </span>
        <span className="wa-bar-copy">
          <span className="kicker">WhatsApp</span>
          <strong>{t("contact.waCta")}</strong>
        </span>
      </a>

      {status === "sent" ? (
        <div className="glass panel sent-panel" role="status">
          <h2 className="font-display">{t("contact.sentTitle")}</h2>
          <p className="lede">{t("contact.sentSub")}</p>
          <p className="kicker">{EMAIL}</p>
        </div>
      ) : (
        <form className="glass brief-form" onSubmit={(event) => void submit(event)} noValidate>
          <Field index="01" label={t("contact.service")}>
            <div className="pills">
              {CONTACT_SERVICES.map((item) => (
                <button key={item.fr} type="button" className="pill" aria-pressed={services.includes(item.fr)} onClick={() => toggle(item.fr)}>
                  {item[lang]}
                </button>
              ))}
            </div>
          </Field>
          <Field index="02" label={t("contact.budget")}>
            <div className="pills">
              {BUDGETS.map((item) => (
                <button key={item} type="button" className="pill" aria-pressed={budget === item} onClick={() => setBudget(budget === item ? null : item)}>
                  {item}
                </button>
              ))}
            </div>
          </Field>
          <Field index="03" label={t("contact.urgency")}>
            <div className="urgency">
              {URGENCIES.map((item, index) => (
                <button key={item.label.fr} type="button" aria-pressed={urgency === index} onClick={() => setUrgency(urgency === index ? null : index)}>
                  <strong>{item.label[lang]}</strong>
                  <span>{item.sub[lang]}</span>
                </button>
              ))}
            </div>
          </Field>
          <div className="identity">
            <div className="form-head id-name-label">
              <span className="idx">04</span>
              <label className="form-title" id="brief-label-04" htmlFor="brief-name">{t("contact.name")}</label>
            </div>
            <div className="form-head id-mail-label">
              <span className="idx">05</span>
              <label className="form-title" id="brief-label-05" htmlFor="brief-email">{t("contact.emailOpt")}</label>
            </div>
            <input id="brief-name" className="field id-name" name="name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder={t("contact.namePh")} />
            <input id="brief-email" className="field id-mail" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="vous@example.com" aria-describedby="brief-label-05-hint" aria-invalid={email.length > 0 && !emailOk} />
            <p className="form-hint id-hint" id="brief-label-05-hint">{t("contact.needEmail")}</p>
          </div>
          <Field index="06" label={t("contact.message")} htmlFor="brief-message">
            <textarea id="brief-message" className="field" name="message" required rows={5} value={message} onChange={(event) => setMessage(event.target.value)} placeholder={t("contact.msgPh")} />
          </Field>
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="company">Société</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(event) => setCompany(event.target.value)} />
          </div>
          {status === "error" && (
            <p className="form-error" role="alert">
              {t("contact.sendFail")}{" "}
              <a href={mailto}>{t("contact.openMail")} ↗</a>
            </p>
          )}
          <div className="form-foot">
            <p className="kicker">{t("contact.avail")}</p>
            <button type="submit" className="btn btn-solid" disabled={!ready || status === "sending"}>
              {status === "sending" ? t("contact.sending") : t("contact.send")}
            </button>
          </div>
        </form>
      )}

      <div className="contact-grid">
        <a className="contact-card" href={`mailto:${EMAIL}`}>
          <MailIcon />
          <span>{t("contact.direct")}</span>
        </a>
        <a className="contact-card" href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn (${t("a11y.external")})`}>
          <CaseIcon />
          <span>LinkedIn</span>
        </a>
        <a className="contact-card" href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label={`GitHub (${t("a11y.external")})`}>
          <GitIcon />
          <span>GitHub</span>
        </a>
        <a className="contact-card" href={LINKEDIN_CERTS} target="_blank" rel="noopener noreferrer" aria-label={`${t("about.certs")} (${t("a11y.external")})`}>
          <BadgeIcon />
          <span>{t("about.certs")}</span>
        </a>
      </div>
    </div>
  );
}

function Field({
  index,
  label,
  htmlFor,
  children,
}: {
  index: string;
  label: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  const labelId = `brief-label-${index}`;
  return (
    <div className="form-block">
      <div className="form-head">
        <span className="idx">{index}</span>
        {htmlFor ? (
          <label className="form-title" id={labelId} htmlFor={htmlFor}>{label}</label>
        ) : (
          <span className="form-title" id={labelId}>{label}</span>
        )}
      </div>
      {htmlFor ? children : <div role="group" aria-labelledby={labelId}>{children}</div>}
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <rect x="2.5" y="4.5" width="17" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3.5 6.2 11 12.2l7.5-6" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function CaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <rect x="2.5" y="7" width="17" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7V5.6A1.6 1.6 0 0 1 9.6 4h2.8A1.6 1.6 0 0 1 14 5.6V7" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function GitIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <path d="M8 17.5v-2.2c-2.3.3-2.8-1-2.8-1 .3-.8 1-1 1-1 .8-.5 1.1.2 1.1.2.5.9 1.3.7 1.6.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M11 17.5c.2-1.2.7-1.8 1.3-2.2-2.6-.3-5.3-1.3-5.3-5.7A3.2 3.2 0 0 1 8 7.2 3 3 0 0 1 8.1 5s1-.3 2.9 1.1a10 10 0 0 1 5.2 0C19 4.7 20 5 20 5a3 3 0 0 1 .1 2.2 3.2 3.2 0 0 1 1 2.4c0 4.4-2.7 5.4-5.3 5.7.6.4 1.1 1.2 1.1 2.2" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="9" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path d="M7.6 12.4 6.4 18l4.6-2.2L15.6 18l-1.2-5.6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

async function deliverBrief(payload: {
  name: string;
  email: string;
  services: string[];
  budget: string | null;
  urgency: string;
  message: string;
}) {
  const lines = [
    `Nom : ${payload.name}`,
    `E-mail : ${payload.email}`,
    payload.services.length ? `Services : ${payload.services.join(", ")}` : "",
    payload.budget ? `Budget : ${payload.budget}` : "",
    payload.urgency ? `Délai : ${payload.urgency}` : "",
    "",
    payload.message,
  ].filter((line) => line !== "");

  const formData = new FormData();
  formData.append("access_key", WEB3FORMS_KEY);
  formData.append("subject", `Brief — ${payload.name}`);
  formData.append("from_name", payload.name);
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("message", lines.join("\n"));

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(15000),
  });
  const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
  if (!response.ok || !data?.success) {
    throw new Error(data?.message || "Envoi impossible");
  }
}
