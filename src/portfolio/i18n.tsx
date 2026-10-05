import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LANGS, translations, type Lang } from "./i18n-data";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string };

const LangCtx = createContext<Ctx>({
  lang: "fr",
  setLang: () => {},
  t: (k) => translations[k]?.fr ?? k,
});

let activeLang: Lang = "fr";
let urlTimer = 0;

export function getActiveLang(): Lang {
  return activeLang;
}

function isLang(value: string | null | undefined): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value);
}

function commitLang(next: Lang) {
  activeLang = next;
  if (typeof document === "undefined") return;
  document.documentElement.lang = next;
  document.documentElement.dataset.lang = next;
}

export function syncLangInUrl(next: Lang = activeLang) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  if (next === "fr") url.searchParams.delete("lang");
  else url.searchParams.set("lang", next);
  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextUrl !== current) window.history.replaceState(window.history.state, "", nextUrl);
}

function readLang(): Lang {
  if (typeof document === "undefined") return "fr";
  try {
    const query = new URLSearchParams(window.location.search).get("lang");
    if (isLang(query)) return query;
  } catch {
    /* URL illisible */
  }
  const stored = document.documentElement.dataset.lang || window.localStorage.getItem("rv-lang");
  return isLang(stored) ? stored : "fr";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const next = readLang();
    commitLang(next);
    setLangState(next);
  }, []);

  useEffect(() => {
    commitLang(lang);
    const title = translations["seo.title"]?.[lang];
    if (title) document.title = title;
    const description = translations["seo.description"]?.[lang];
    document.querySelector('meta[name="description"]')?.setAttribute("content", description ?? "");
    try {
      window.localStorage.setItem("rv-lang", lang);
    } catch {
      /* stockage privé : la langue reste en mémoire */
    }
  }, [lang]);

  const value = useMemo<Ctx>(() => {
    const setLang = (next: Lang) => {
      if (next === activeLang) return;
      commitLang(next);
      setLangState(next);
      window.clearTimeout(urlTimer);
      urlTimer = window.setTimeout(() => syncLangInUrl(activeLang), 48);
    };
    return {
      lang,
      setLang,
      t: (key: string) => translations[key]?.[lang] ?? translations[key]?.fr ?? key,
    };
  }, [lang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useI18n() {
  return useContext(LangCtx);
}

export { LANGS };