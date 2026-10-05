import { useState, type CSSProperties, type ReactNode } from "react";
import { CERTIFS_CODE, CERTIFS_UX, EDUCATION, LINKEDIN, LINKEDIN_CERTS, TOOLS, WHY, type CertItem } from "../content";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n-data";

const MARKS: Record<Lang, string[]> = {
  fr: ["syndrome d'Asperger", "haut potentiel", "interfaces prévisibles, contrastées, sans bruit", "clarté", "la logique", "la cohérence"],
  en: ["Asperger syndrome", "high intellectual potential", "predictable, high-contrast, quiet interfaces", "clarity", "logic", "coherence"],
  de: ["Asperger-Syndrom", "Hochbegabung", "vorhersehbare, kontrastreiche, ruhige Interfaces", "Klarheit", "Logik", "Kohärenz"],
  sk: ["Aspergerov syndróm", "vysoký potenciál", "predvídateľných, kontrastných a tichých rozhraní", "jasnosť", "logiku", "súdržnosť"],
  cs: ["Aspergerův syndrom", "vysoký potenciál", "předvídatelných, kontrastních a tichých rozhraní", "jasnost", "logiku", "soudržnost"],
};

export function About() {
  const { t, lang } = useI18n();
  return (
    <div className="page page-enter">
      <header className="portrait-wrap">
        <div>
          <div className="portrait">
            <img src={`${import.meta.env.BASE_URL}avatar.jpg`} alt={t("about.portrait")} width={640} height={640} decoding="async" />
          </div>
          <p className="font-display" style={{ color: "var(--gold)", margin: "0.8rem 0 0" }}>Reine Vannel</p>
          <p className="script-note" style={{ marginTop: "0.15rem" }}>{t("about.note1")}</p>
          <p className="kicker">{t("about.place")}</p>
        </div>
        <div>
          <p className="kicker">— {t("about.kicker")}</p>
          <h1 className="display">{t("about.title")}</h1>
          <p className="lede about-intro">{highlight(t("about.intro"), MARKS[lang])}</p>
          <div className="cta-row" style={{ marginTop: "1.4rem" }}>
            <a className="text-link" href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn (${t("a11y.external")})`}>LinkedIn ↗</a>
            <a className="text-link" href={LINKEDIN_CERTS} target="_blank" rel="noopener noreferrer" aria-label={`${t("about.certs")} (${t("a11y.external")})`}>{t("about.certs")} ↗</a>
          </div>
        </div>
      </header>

      <section className="block dual-grid">
        <Duality
          word="Droit"
          accent="#D4AF37"
          attrs={{ fr: "Rigueur · Précision\nLogique · Structure", en: "Rigour · Precision\nLogic · Structure", de: "Strenge · Präzision\nLogik · Struktur", sk: "Prísnosť · Presnosť\nLogika · Štruktúra", cs: "Přísnost · Přesnost\nLogika · Struktura" }}
          sub={{
            fr: "Formation juridique, méthode analytique, aucune ambiguïté laissée sans nom.",
            en: "Legal training, an analytical method, no unnamed ambiguity.",
            de: "Juristische Ausbildung, analytische Methode, keine unbenannte Mehrdeutigkeit.", sk: "Právne vzdelanie, analytická metóda, žiadna nejasnosť bez mena.", cs: "Právní vzdělání, analytická metoda, žádná nejasnost beze jména.",
          }}
          lang={lang}
        />
        <Duality
          word="Design"
          accent="#2EE6A6"
          attrs={{ fr: "Sensibilité · Créativité\nEmpathie · Clarté", en: "Sensitivity · Creativity\nEmpathy · Clarity", de: "Sensibilität · Kreativität\nEmpathie · Klarheit", sk: "Citlivosť · Tvorivosť\nEmpatia · Jasnosť", cs: "Citlivost · Tvořivost\nEmpatie · Jasnost" }}
          sub={{
            fr: "Lecture de l'espace, narration visuelle, interfaces qui respirent.",
            en: "Reading space, visual narrative, interfaces that breathe.",
            de: "Raum lesen, visuelle Erzählung, Interfaces die atmen.", sk: "Čítanie priestoru, vizuálne rozprávanie, rozhrania, ktoré dýchajú.", cs: "Čtení prostoru, vizuální vyprávění, rozhraní, která dýchají.",
          }}
          lang={lang}
        />
      </section>

      <section className="block">
        <Title>{t("about.education")}</Title>
        <p className="script-note script-aside">{t("about.note2")}</p>
        <div className="edu-grid">
          {EDUCATION.map((item) => (
            <article key={item.num} className="edu-card" style={{ "--glow": item.color } as CSSProperties}>
              <span className="edu-num" aria-hidden="true">{item.num}</span>
              <div className="edu-top">
                <span className="kicker">{item.period[lang]}</span>
                <span className="edu-status">{item.status[lang]}</span>
              </div>
              <h3>{item.degree[lang]}</h3>
              <p className="edu-place">{item.place}</p>
              <p className="edu-detail">{item.detail[lang]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="block">
        <Title>{t("about.certifs")}</Title>
        <div className="cert-grid">
          <CertColumn kicker="UX · UI · Design" items={CERTIFS_UX} lang={lang} />
          <CertColumn kicker="Front-end · HTML · CSS · JS" items={CERTIFS_CODE} lang={lang} />
        </div>
        <div className="cta-row" style={{ marginTop: "1.1rem" }}>
          <a className="btn btn-ghost" href="https://www.codecademy.com/profiles/reine.vannel" target="_blank" rel="noopener noreferrer" aria-label={`Codecademy (${t("a11y.external")})`}>Codecademy ↗</a>
          <a className="btn btn-ghost" href={LINKEDIN_CERTS} target="_blank" rel="noopener noreferrer" aria-label={`${t("about.linkedinCerts")} (${t("a11y.external")})`}>{t("about.linkedinCerts")} ↗</a>
        </div>
      </section>

      <section className="block">
        <Title>{t("about.why")}</Title>
        <p className="script-note script-aside">{t("about.note3")}</p>
        <div className="why-grid">
          {WHY.map((item) => <WhyCard key={item.num} item={item} lang={lang} />)}
        </div>
      </section>

      <section className="block">
        <Title>{t("about.tools")}</Title>
        <div className="tool-grid">
          {TOOLS.map((tool) => (
            <div key={tool.name} className={`tool-cell tone-${tool.cat.toLowerCase()}`}>
              <p className="kicker" style={{ marginBottom: "0.45rem" }}>{tool.cat}</p>
              <h3 className="font-display">{tool.name}</h3>
              <p>{tool.desc[lang]}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function highlight(text: string, marks: string[]) {
  const sorted = [...marks].filter(Boolean).sort((a, b) => b.length - a.length);
  if (!sorted.length) return text;
  const re = new RegExp(`(${sorted.map(escapeRegExp).join("|")})`, "gi");
  return text.split(re).map((part, index) => {
    const hit = sorted.some((mark) => mark.toLowerCase() === part.toLowerCase());
    return hit ? <mark key={index} className="gold-key">{part}</mark> : <span key={index}>{part}</span>;
  });
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const CERT_KIND: Record<CertItem["kind"], Record<Lang, string>> = {
  course: { fr: "Cours", en: "Course", de: "Kurs", sk: "Kurz", cs: "Kurz" },
  path: { fr: "Parcours", en: "Career path", de: "Karrierepfad", sk: "Kariérna cesta", cs: "Kariérní cesta" },
  skill: { fr: "Skill path", en: "Skill path", de: "Skill-Path", sk: "Skill path", cs: "Skill path" },
};

function CertColumn({ items, kicker, lang }: { items: CertItem[]; kicker: string; lang: Lang }) {
  return (
    <div className="glass panel">
      <p className="font-display" style={{ marginTop: 0 }}>Codecademy</p>
      <p className="kicker">{kicker}</p>
      <ul className="cert-list">
        {items.map((item, index) => (
          <li key={item.title}>
            <a className="cert-row" href={item.certificate} target="_blank" rel="noopener noreferrer">
              <span className="idx">{String(index + 1).padStart(2, "0")}</span>
              <span className="cert-copy">
                <span className="cert-title">{item.title}</span>
                <span className="cert-kind">{CERT_KIND[item.kind][lang]}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Title({ children }: { children: string }) {
  return (
    <div className="rule-title">
      <h2>{children}</h2>
      <span />
    </div>
  );
}

function Duality({
  word,
  accent,
  attrs,
  sub,
  lang,
}: {
  word: string;
  accent: string;
  attrs: Record<Lang, string>;
  sub: Record<Lang, string>;
  lang: Lang;
}) {
  const [lit, setLit] = useState(false);
  return (
    <button
      type="button"
      className={`glass panel dual-card${lit ? " is-lit" : ""}`}
      aria-pressed={lit}
      onClick={() => setLit((value) => !value)}
      style={{ "--glow": accent } as CSSProperties}
    >
      <span className="dual-glow" aria-hidden="true" />
      <p className="ghost-num" style={{ fontSize: "4rem", margin: 0 }}>{word.slice(0, 1)}</p>
      <h2 className="font-display">{word}</h2>
      <p className="dual-attrs">{attrs[lang]}</p>
      <p className="lede dual-sub">{sub[lang]}</p>
    </button>
  );
}

function WhyCard({ item, lang }: { item: (typeof WHY)[number]; lang: Lang }) {
  return (
    <article className="why-card" style={{ "--glow": item.accent } as CSSProperties}>
      <span className="why-glow" aria-hidden="true" />
      <p className="ghost-num">{item.num}</p>
      <span className="why-icon" aria-hidden="true">{WHY_ICON[item.num]}</span>
      <h3>{item.title[lang]}</h3>
      <p>{item.desc[lang]}</p>
    </article>
  );
}

const WHY_ICON: Record<string, ReactNode> = {
  "01": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.2 9.4 6.2 14.4 8 9.4 9.8 8 14.8 6.6 9.8 1.6 8 6.6 6.2 8 1.2Z" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  "02": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 11.8 10.8 3.5l1.7 1.7-8.3 8.3H2.5v-1.7Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M9.6 4.7 11.3 6.4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  "03": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8.2 6.4 11.5 13 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "04": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2.2v11.2M3.2 5.2h9.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M3.2 5.2 1.6 9.4h3.2L3.2 5.2ZM12.8 5.2 11.2 9.4h3.2L12.8 5.2Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  ),
  "05": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2.1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.6 8s2.4-4 6.4-4 6.4 4 6.4 4-2.4 4-6.4 4-6.4-4-6.4-4Z" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  ),
  "06": (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.2 8h11.2M10.2 4.8 13.4 8l-3.2 3.2M5.8 4.8 2.6 8l3.2 3.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};
