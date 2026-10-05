import { useEffect, useState, type ReactNode } from "react";
import { LINKEDIN, whatsAppHref } from "./content";
import { CanvasBg } from "./CanvasBg";
import { Footer } from "./Footer";
import { useI18n } from "./i18n";
import { Nav } from "./Nav";
import { Preloader } from "./Preloader";
import { usePathname } from "./link";

/** Cadre commun : fond, navigation, preloader unique, puis la page. */
export function Shell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (ready) window.scrollTo(0, 0);
  }, [path, ready]);

  return (
    <>
      <CanvasBg />
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <div style={{ opacity: ready ? 1 : 0, transition: "opacity .45s ease", minHeight: "100vh" }}>
        <Nav />
        <main id="contenu" tabIndex={-1}>{children}</main>
        <Footer />
        {path !== "/contact" && <QuickDock />}
      </div>
    </>
  );
}

function QuickDock() {
  const { t } = useI18n();
  return (
    <div className="quick-dock">
      <a className="quick-btn quick-wa" href={whatsAppHref(t("contact.waText"))} target="_blank" rel="noopener noreferrer" aria-label={`${t("contact.waCta")} (${t("a11y.external")})`}>
        <WhatsIcon />
        <span>WhatsApp</span>
      </a>
      <a className="quick-btn quick-li" href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn (${t("a11y.external")})`}>
        <span className="li-mark" aria-hidden="true">in</span>
        <span>LinkedIn</span>
      </a>
    </div>
  );
}

function WhatsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.15A8.72 8.72 0 0 0 4.7 16.1L3.4 20.7l4.72-1.24A8.72 8.72 0 1 0 12 3.15Zm4.86 12.3c-.2.58-1.18 1.1-1.64 1.14-.42.04-.96.06-1.55-.1-.36-.1-1.22-.45-2.1-1.1-1.85-1.36-3.05-3.6-3.14-3.77-.1-.16-.76-.99-.76-1.9 0-.9.48-1.35.66-1.53.16-.18.36-.22.48-.22h.34c.14 0 .32-.02.48.38.18.46.6 1.6.65 1.72.06.12.08.26.02.4-.08.16-.12.26-.22.4l-.2.24c-.08.1-.16.2-.06.38.1.18.42.72.9 1.16.62.58 1.14.76 1.32.84.16.08.28.06.38-.04.1-.12.46-.54.58-.72.12-.18.24-.14.4-.08.16.06 1.04.49 1.22.58.18.1.3.14.34.22.04.08.04.48-.16 1.06Z"
      />
    </svg>
  );
}