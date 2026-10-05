import { useEffect, useId, useState } from "react";
import { SERVICES } from "../content";
import { useI18n } from "../i18n";
import { AppLink } from "../link";
import { computePrice, CURRENCIES, formatCurrency, type Currency } from "../pricing";

export function Services() {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<string | null>(null);
  const [screens, setScreens] = useState(8);
  const [langs, setLangs] = useState(1);
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [openCur, setOpenCur] = useState(false);
  const listId = useId();
  const service = SERVICES.find((item) => item.id === active) ?? null;
  const currencyInfo = CURRENCIES.find((item) => item.code === currency) ?? CURRENCIES[0];

  useEffect(() => {
    if (!service) return;
    if (window.matchMedia("(max-width: 960px)").matches) {
      document.getElementById("service-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [service]);

  return (
    <div className="page page-enter">
      <p className="kicker">— {t("services.kicker")}</p>
      <h1 className="display">{t("services.title")}</h1>
      <p className="lede">{t("services.sub")}</p>
      <p className="kicker" style={{ marginTop: "1rem" }}>{t("services.hint")}</p>

      <div style={{ position: "relative", margin: "1rem 0 1.5rem" }}>
        <button type="button" className="currency-btn" aria-haspopup="listbox" aria-expanded={openCur} aria-controls={listId} onClick={() => setOpenCur((v) => !v)}>
          <span>{t("services.currency")}</span>
          <span style={{ color: "var(--gold)" }}>{currencyInfo.label[lang]}</span>
        </button>
        {openCur && (
          <div id={listId} className="menu-pop" role="listbox" aria-label={t("services.currency")}>
            {CURRENCIES.map((item) => (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={item.code === currency}
                onClick={() => {
                  setCurrency(item.code);
                  setOpenCur(false);
                }}
              >
                {item.label[lang]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={`services-layout${service ? " open" : ""}`}>
        <div className="service-grid">
          {SERVICES.map((item) => {
            const price = computePrice(item.from, item.perScreen, item.perLang, screens, langs);
            const upcoming = item.open === "2028";
            return (
              <button
                key={item.id}
                type="button"
                className="service-btn"
                aria-pressed={active === item.id}
                disabled={upcoming}
                onClick={() => setActive(active === item.id ? null : item.id)}
              >
                <span className="tag" style={{ color: item.color }}>{item.tag}</span>
                <span className="kicker" style={{ float: "right" }}>{item.open}</span>
                <p className="font-display" style={{ fontWeight: 400, fontSize: "1.15rem", margin: "0.55rem 0" }}>{item.title[lang]}</p>
                <p className="clamp">{item.desc[lang]}</p>
                {price !== null ? (
                  <p className="price">
                    {formatCurrency(price, currency)} <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{t("services.from")}</span>
                  </p>
                ) : (
                  <p className="kicker">{t("services.from2028")}</p>
                )}
              </button>
            );
          })}
        </div>

        {service && (
          <aside id="service-detail" className="glass detail" aria-live="polite">
            <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
              <div>
                <span className="tag" style={{ color: service.color }}>{service.tag}</span>
                <h2 className="font-display" style={{ fontWeight: 400, color: service.color }}>{service.title[lang]}</h2>
              </div>
              <button type="button" className="icon-btn" onClick={() => setActive(null)} aria-label={t("services.close")}>×</button>
            </div>
            <p className="lede">{service.desc[lang]}</p>
            {service.steps.length > 0 && (
              <ol className="step-list">
                <li className="kicker">{t("services.how")}</li>
                {service.steps.map((step, index) => (
                  <li key={step.fr} className="step-row">
                    <span className="idx">{String(index + 1).padStart(2, "0")}</span>
                    <span>{step[lang]}</span>
                  </li>
                ))}
              </ol>
            )}
            {(service.perScreen > 0 || service.perLang > 0) && (
              <div className="glass panel" style={{ marginBottom: "1rem" }}>
                <p className="kicker">{t("services.estimate")}</p>
                {service.perScreen > 0 && (
                  <label>
                    {t("services.screens")} · {screens}
                    <input className="range" type="range" min={1} max={30} value={screens} onChange={(event) => setScreens(Number(event.target.value))} />
                  </label>
                )}
                {service.perLang > 0 && (
                  <label>
                    {t("services.langs")} · {langs}
                    <input className="range" type="range" min={1} max={5} value={langs} onChange={(event) => setLangs(Number(event.target.value))} />
                  </label>
                )}
              </div>
            )}
            {computePrice(service.from, service.perScreen, service.perLang, screens, langs) !== null && (
              <>
                <p className="price" style={{ fontSize: "2.2rem", margin: "0.2rem 0" }}>
                  {formatCurrency(computePrice(service.from, service.perScreen, service.perLang, screens, langs)!, currency)}
                </p>
                <p className="kicker">{t("services.note")}</p>
              </>
            )}
            <AppLink to="/contact" className="btn btn-solid" style={{ width: "100%", background: service.color, color: "#061018" }}>
              {t("services.brief")} →
            </AppLink>
          </aside>
        )}
      </div>

      <p className="footer-quote">{t("services.noteBottom")}</p>
    </div>
  );
}
