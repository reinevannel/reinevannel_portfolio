import { EMAIL, GITHUB, whatsAppHref } from "./content";
import { useI18n } from "./i18n";
import { Butterfly } from "./icons";
import { AppLink } from "./link";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="kicker">{t("footer.by")}</div>
          <div className="font-display" style={{ color: "var(--gold)", fontSize: "1.05rem" }}>
            Angélique M. R. Vannel
          </div>
          <div className="font-mono" style={{ fontSize: "0.62rem", color: "var(--muted-foreground)", marginTop: 4 }}>
            {t("footer.where")}
          </div>
          <a href={`mailto:${EMAIL}`} style={{ color: "var(--gold)", fontFamily: "var(--font-mono)", fontSize: "0.72rem" }}>
            {EMAIL}
          </a>
          <a className="footer-wa" href={whatsAppHref(t("contact.waText"))} target="_blank" rel="noopener noreferrer" aria-label={`${t("contact.waCta")} (${t("a11y.external")})`}>
            WhatsApp
          </a>
        </div>
        <AppLink to="/" end aria-label={t("footer.home")} style={{ textAlign: "center", textDecoration: "none" }}>
          <span className="float" style={{ display: "inline-block" }}>
            <Butterfly size={44} />
          </span>
          <span className="brand-sub">Studio</span>
        </AppLink>
        <div className="footer-side" style={{ textAlign: "right" }}>
          <div className="footer-links">
            <AppLink to="/projets">{t("nav.projects")}</AppLink>
            <AppLink to="/parcours">{t("nav.about")}</AppLink>
            <AppLink to="/services">{t("nav.services")}</AppLink>
            <AppLink to="/contact">{t("nav.contact")}</AppLink>
          </div>
          <div className="font-mono" style={{ fontSize: "0.62rem", color: "var(--muted-foreground)" }}>
            © 2026 Reine Vannel · {t("footer.rights")}
          </div>
        </div>
      </div>
      <p className="footer-quote">« {t("footer.quote")} »</p>
      <p className="footer-term">
        <span style={{ color: "var(--gold)" }}>{" > "}</span>
        React · TypeScript · Tailwind · <a href={GITHUB} style={{ color: "inherit" }}>Reine Vannel Studio</a>
        <span className="term-cursor"> ▌</span>
      </p>
    </footer>
  );
}
