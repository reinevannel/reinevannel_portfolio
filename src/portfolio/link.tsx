import { useEffect, useState, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { getActiveLang, syncLangInUrl, useI18n } from "./i18n";
import type { Lang } from "./i18n-data";

/** Navigation interne, sans routeur externe. La langue choisie reste dans l'adresse. */
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

export function navigate(href: string) {
  const url = new URL(href, window.location.origin);
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next === current) return;
  window.history.pushState({}, "", next);
  notify();
}

export function AppLink({
  to,
  end,
  className,
  style,
  children,
  onClick,
  ...rest
}: {
  to: string;
  end?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "style" | "className" | "children" | "onClick">) {
  const { lang } = useI18n();
  const path = usePathname();
  const active = end ? path === to : path === to || path.startsWith(`${to}/`);
  const href = withLang(to, lang);

  return (
    <a
      href={href}
      className={className}
      style={style}
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : undefined}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(withLang(to, getActiveLang()));
        syncLangInUrl(getActiveLang());
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function usePathname() {
  const [path, setPath] = useState(() => (typeof window === "undefined" ? "/" : window.location.pathname));

  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    listeners.add(sync);
    window.addEventListener("popstate", sync);
    return () => {
      listeners.delete(sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  return path;
}

function siteRoot() {
  const value = import.meta.env.BASE_URL || "/";
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function appPath(pathname: string) {
  const base = siteRoot();
  if (!base) return pathname || "/";
  if (pathname === base || pathname === `${base}/`) return "/";
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || "/";
  return pathname || "/";
}

function withLang(to: string, lang: Lang) {
  return lang === "fr" ? to : `${to}?lang=${lang}`;
}
