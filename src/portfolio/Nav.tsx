import { useEffect, useState } from "react";
import { useI18n } from "./i18n";
import { LANGS, type Lang } from "./i18n-data";
import { Butterfly, MoonIcon, SunIcon } from "./icons";
import { AppLink, usePathname } from "./link";
import { useTheme } from "./theme";

const LINKS = [
  { to: "/", code: "~/", key: "nav.home", end: true },
  { to: "/projets", code: "./work", key: "nav.projects", end: false },
  { to: "/parcours", code: "./me", key: "nav.about", end: false },
  { to: "/services", code: "./offer", key: "nav.services", end: false },
  { to: "/contact", code: "./write", key: "nav.contact", end: false },
] as const;

const LANG_NAME: Record<Lang, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  sk: "Slovenčina",
  cs: "Čeština",
};

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const { theme, toggle } = useTheme();
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-nav${scrolled || open ? " is-scrolled" : ""}`}>
      <a className="skip-link" href="#contenu">
        {t("nav.skip")}
      </a>
      <div className="nav-inner">
        <AppLink to="/" end className="brand" aria-label="Reine Vannel Studio">
          <Butterfly />
          <span>
            <span className="brand-name">Reine Vannel</span>
            <span className="brand-sub">Studio · UX/UI</span>
          </span>
        </AppLink>

        <nav className="nav-links" aria-label={t("nav.primary")}>
          {LINKS.map((link) => (
            <AppLink key={link.to} to={link.to} end={link.end} className="nav-item">
              <span className="nav-code">{link.code}</span>
              <span className="nav-label">{t(link.key)}</span>
            </AppLink>
          ))}
        </nav>

        <div className="nav-controls">
          <div className="lang-switch" role="group" aria-label={t("nav.lang")}>
            {LANGS.map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={lang === code}
                lang={code}
                onClick={() => setLang(code)}
              >
                <span aria-hidden="true">{code.toUpperCase()}</span>
                <span className="sr-only">{LANG_NAME[code]}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={toggle}
            aria-pressed={theme === "light"}
            aria-label={theme === "dark" ? t("nav.themeLight") : t("nav.themeDark")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="icon-btn mobile-toggle"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t("nav.menuClose") : t("nav.menu")}</span>
            <svg width="14" height="10" viewBox="0 0 14 10" aria-hidden="true">
              <path d="M0 1h14M0 5h14M0 9h14" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="menu-mobile" className="mobile-panel" aria-label={t("nav.primary")}>
          {LINKS.map((link, index) => (
            <AppLink key={link.to} to={link.to} end={link.end} onClick={() => setOpen(false)}>
              <span className="mobile-idx">{String(index + 1).padStart(2, "0")}</span>
              {t(link.key)}
            </AppLink>
          ))}
        </nav>
      )}
    </header>
  );
}
