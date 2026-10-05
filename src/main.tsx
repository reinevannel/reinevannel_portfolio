import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LangProvider } from "./portfolio/i18n";
import { usePathname } from "./portfolio/link";
import { About } from "./portfolio/pages/About";
import { Contact } from "./portfolio/pages/Contact";
import { Home } from "./portfolio/pages/Home";
import { Projects } from "./portfolio/pages/Projects";
import { Services } from "./portfolio/pages/Services";
import { Shell } from "./portfolio/Shell";
import { ThemeProvider } from "./portfolio/theme";
import "./styles.css";

function Page() {
  const path = usePathname();
  if (path === "/parcours" || path === "/pourquoi") return <About />;
  if (path === "/projets") return <Projects />;
  if (path === "/services") return <Services />;
  if (path === "/contact") return <Contact />;
  return <Home />;
}

function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Shell>
          <Page />
        </Shell>
      </LangProvider>
    </ThemeProvider>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("Élément #root introuvable");
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
