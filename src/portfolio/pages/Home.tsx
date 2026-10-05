import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CODE_WORDS, DESIGN_WORDS, FEATURED, type Project } from "../content";
import { useI18n } from "../i18n";
import type { Lang } from "../i18n-data";
import { AppLink } from "../link";
import { usePrefersReducedMotion } from "../motion";
import { useTheme } from "../theme";

/** Accueil coupé en deux : atelier design à gauche, terminal à droite. */
export function Home() {
  const { t, lang } = useI18n();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setShown(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="page-enter">
      <section className="hero-split" aria-label="Reine Vannel">
        <SplitCanvas />
        <div className="split-line" aria-hidden="true" />
        <p className="thread-label">{t("home.thread")}</p>

        <div className="hero-pane" style={pane(shown, "left")}>
          <span className="tag gold">Design</span>
          <h1 className="hero-title">{t("home.design.h1")}</h1>
          <p className="hero-sub">{t("home.design.sub")}</p>
          <p className="type-line">
            <Typewriter key={lang} texts={DESIGN_WORDS[lang]} />
          </p>
          <div className="tool-row">
            {["Figma", "Sketch", "Blender", "Adobe XD"].map((tool) => (
              <span key={tool} className="tag">{tool}</span>
            ))}
          </div>
        </div>

        <div className="hero-pane right" style={pane(shown, "right")}>
          <span className="tag emerald">Code</span>
          <h2 className="hero-title">{t("home.code.h1")}</h2>
          <p className="hero-sub">{t("home.code.sub")}</p>
          <p className="type-line code">
            <Typewriter key={`${lang}-code`} texts={CODE_WORDS[lang]} speed={48} />
          </p>
          <div className="tool-row">
            {["VS Code", "Git & GitHub", "HTML · CSS · JS", "React"].map((tool) => (
              <span key={tool} className="tag">{tool}</span>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="scroll-hint"
          aria-label={t("home.scroll")}
          onClick={() => document.getElementById("selection")?.scrollIntoView({ behavior: "smooth" })}
        >
          ↓
        </button>
      </section>

      <section className="section" id="selection">
        <div className="section-head">
          <div>
            <p className="kicker">— {t("home.selection")}</p>
            <h2 className="display">{t("home.featured")}</h2>
          </div>
          <AppLink to="/projets" className="text-link">{t("home.all")} →</AppLink>
        </div>
        {FEATURED.map((project, index) => (
          <ProjectRow key={project.id} project={project} lang={lang} reverse={index % 2 === 1} preview={t("home.preview")} pending={t("home.progress")} external={t("a11y.external")} />
        ))}
      </section>

      <section className="statement">
        <p className="kicker">Reine Vannel Studio · 2026</p>
        <p>
          {t("home.statement")}
          <br />
          <em>{t("home.statementEm")}</em>
          <br />
          {t("home.statementEnd")}
        </p>
        <div className="cta-row" style={{ justifyContent: "center" }}>
          <AppLink to="/services" className="btn btn-solid">{t("home.servicesCta")}</AppLink>
          <AppLink to="/contact" className="btn btn-ghost">{t("home.writeCta")} →</AppLink>
        </div>
      </section>
    </div>
  );
}

function pane(shown: boolean, side: "left" | "right"): CSSProperties {
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : `translateX(${side === "left" ? -18 : 18}px)`,
    transition: `opacity .8s ease ${side === "left" ? ".12s" : ".28s"}, transform .8s ease ${side === "left" ? ".12s" : ".28s"}`,
  };
}

function Typewriter({ texts, speed = 62 }: { texts: string[]; speed?: number }) {
  const reduce = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const text = texts[index] ?? "";

  useEffect(() => {
    if (reduce) return;
    if (!deleting && count < text.length) {
      const id = window.setTimeout(() => setCount((n) => n + 1), speed);
      return () => window.clearTimeout(id);
    }
    if (!deleting && count === text.length) {
      const id = window.setTimeout(() => setDeleting(true), 1800);
      return () => window.clearTimeout(id);
    }
    if (deleting && count > 0) {
      const id = window.setTimeout(() => setCount((n) => n - 1), speed / 2);
      return () => window.clearTimeout(id);
    }
    setDeleting(false);
    setIndex((i) => (i + 1) % texts.length);
  }, [count, deleting, reduce, speed, text.length, texts.length]);

  if (reduce) return <span>{texts[0]}</span>;
  return (
    <span>
      {text.slice(0, count)}
      <span className="cursor-blink" aria-hidden="true">|</span>
    </span>
  );
}

function ProjectRow({
  project,
  lang,
  reverse,
  preview,
  pending,
  external,
}: {
  project: Project;
  lang: Lang;
  reverse: boolean;
  preview: string;
  pending: string;
  external: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  const [hot, setHot] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) setOn(true);
    }, { threshold: 0.18 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`project-row reveal${on ? " on" : ""}${reverse ? " rev" : ""}`}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
    >
      <div className="copy">
        <div className="ghost-num" style={{ WebkitTextStrokeColor: hot ? project.color : undefined }}>{project.num}</div>
        <p className="kicker" style={{ marginBottom: 0 }}>{project.year} · {project.sub[lang]}</p>
        <h3 className="project-title" style={{ color: hot ? project.color : undefined }}>{project.title}</h3>
        <p className="lede">{project.desc[lang]}</p>
        <div className="tool-row" style={{ marginTop: "1rem" }}>
          {project.tags.map((tag) => <span key={tag} className="tag lang-tag">{tag}</span>)}
        </div>
        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          {project.live ? (
            <a className="btn btn-solid" style={{ background: project.color, color: "#061018" }} href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — ${preview} (${external})`}>
              {preview} ↗
            </a>
          ) : (
            <span className="btn btn-muted">{pending}</span>
          )}
          {project.github && (
            <a className="btn btn-ghost" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} — GitHub (${external})`}>GitHub ↗</a>
          )}
        </div>
      </div>
      <div className="media" style={{ boxShadow: hot ? `0 22px 60px ${project.color}33` : undefined }}>
        <img src={`${import.meta.env.BASE_URL}${project.image.slice(1)}`} alt="" width={960} height={600} loading="lazy" decoding="async" style={{ filter: hot ? "saturate(1.05)" : "saturate(0.92) brightness(0.92)" }} />
        <span className="year-badge" style={{ color: project.color }}>{project.year}</span>
      </div>
    </article>
  );
}

function SplitCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const particles = Array.from({ length: reduce ? 8 : 22 }, () => ({
      x: Math.random() * 0.46,
      y: Math.random(),
      r: 0.8 + Math.random() * 1.4,
      h: 120 + Math.random() * 40,
    }));
    let raf = 0;
    let alive = true;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const obs = new ResizeObserver(resize);
    obs.observe(canvas);
    const glyphs = "01";
    let last = performance.now();
    let drift = 0;
    const draw = (now = performance.now()) => {
      if (!alive) return;
      const dt = Math.min(40, now - last);
      last = now;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (!reduce) p.y -= 0.000012 * dt;
        if (p.y < 0) p.y = 1;
        ctx.fillStyle = theme === "dark" ? `hsla(${p.h} 45% 62% / .22)` : `hsla(${p.h} 28% 32% / .18)`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduce) {
        drift += dt * 0.012;
        ctx.font = "11px JetBrains Mono, monospace";
        const cols = Math.max(1, Math.floor(w / 2 / 32));
        for (let i = 0; i < cols; i++) {
          const y = ((drift + i * 64) % (h + 48)) - 16;
          ctx.fillStyle = theme === "dark" ? "rgba(62,230,176,0.07)" : "rgba(20,107,66,0.08)";
          ctx.fillText(glyphs[i % glyphs.length] ?? "0", w * 0.54 + i * 32, y);
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [reduce, theme]);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}
