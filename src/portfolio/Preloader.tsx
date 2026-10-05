import { useEffect, useRef, useState } from "react";
import { useI18n } from "./i18n";
import { usePrefersReducedMotion } from "./motion";
import { morphKind, morphSpan, PRELOADER, stageIndex } from "./preloader-math";

/**
 * Message de bienvenue, puis métamorphose
 * œuf → chenille → cocon → papillon, avec le nom de chaque étape.
 * Échap ou le bouton entrent tout de suite.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const { t, lang } = useI18n();
  const reduce = usePrefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"welcome" | "morph">("welcome");
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    window.setTimeout(onDone, reduce ? 0 : 700);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // finish est stable via ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reduce) {
      const id = window.setTimeout(finish, 900);
      return () => window.clearTimeout(id);
    }
    const welcome = window.setTimeout(() => setPhase("morph"), PRELOADER.welcomeMs);
    const start = performance.now();
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      const raw = ((now - start - PRELOADER.welcomeMs) / PRELOADER.morphMs) * 100;
      const next = Math.max(0, Math.min(100, Math.floor(raw)));
      if (next !== last) {
        last = next;
        setProgress(next);
      }
      if (now - start < PRELOADER.welcomeMs + PRELOADER.morphMs) raf = requestAnimationFrame(tick);
      else window.setTimeout(finish, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      window.clearTimeout(welcome);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let alive = true;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const started = performance.now();

    const frame = (now: number) => {
      if (!alive) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const elapsed = now - started;
      const welcome = elapsed < PRELOADER.welcomeMs;
      const prog = welcome ? 0 : Math.max(0, Math.min(1, (elapsed - PRELOADER.welcomeMs) / PRELOADER.morphMs));
      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, h);
      bg.addColorStop(0, "#0b1628");
      bg.addColorStop(1, "#03060c");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);
      rain(ctx, w, h, now);
      ctx.save();
      ctx.translate(w / 2, welcome ? h * 0.72 : h * 0.44);
      ctx.scale(welcome ? 0.62 : 1, welcome ? 0.62 : 1);
      const kind = morphKind(prog);
      const local = morphSpan(kind, prog);
      if (kind === "egg") egg(ctx, local, now);
      else if (kind === "caterpillar") caterpillar(ctx, local, now);
      else if (kind === "cocoon") cocoon(ctx, local, now);
      else butterfly(ctx, local, now);
      ctx.restore();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  const stageKey = `stage.${["intention", "architecture", "metamorphose", "eclosion", "revelation"][stageIndex(progress)]}`;

  return (
    <div
      className="preloader"
      role="dialog"
      aria-modal="true"
      aria-label={t("pre.loading")}
      style={{ opacity: leaving ? 0 : 1, transition: "opacity .7s ease", pointerEvents: leaving ? "none" : "auto" }}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      {phase === "welcome" ? (
        <div className="pre-copy">
          <p className="pre-kicker">Reine Vannel Studio</p>
          <p className="pre-line">{t("pre.welcome1")}</p>
          <p className="pre-big">{t("pre.welcome2")}</p>
          <p className="pre-sub">{t("pre.sub")}</p>
        </div>
      ) : (
        <div className="pre-progress" aria-live="polite">
          <p className="pre-kicker">Reine Vannel</p>
          <p className="stage-name">{t(stageKey)}</p>
          <div
            className="pre-bar"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-valuetext={`${Math.round(progress)} %`}
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="pre-sub" style={{ marginTop: "0.6rem" }}>
            {Math.round(progress)} %
          </p>
        </div>
      )}
      <button type="button" className="pre-skip" onClick={finish}>
        {t("pre.skip")}
      </button>
      <span className="sr-only">{lang}</span>
    </div>
  );
}

function rain(ctx: CanvasRenderingContext2D, w: number, h: number, now: number) {
  const cols = Math.max(6, Math.floor(w / 36));
  ctx.font = "12px JetBrains Mono, monospace";
  const glyphs = "01";
  for (let i = 0; i < cols; i++) {
    const y = ((now * 0.012 + i * 54) % (h + 60)) - 24;
    ctx.fillStyle = i < cols / 2 ? "rgba(26,110,69,0.08)" : "rgba(28,58,110,0.09)";
    ctx.fillText(glyphs[i % glyphs.length] ?? "0", i * 36, y);
  }
}

function egg(ctx: CanvasRenderingContext2D, t: number, now: number) {
  const pulse = 1 + Math.sin(now * 0.003) * 0.04;
  ctx.scale(pulse, pulse);
  const g = ctx.createRadialGradient(0, 0, 4, 0, 0, 46);
  g.addColorStop(0, "rgba(212,175,55,0.85)");
  g.addColorStop(0.45, "rgba(10,22,40,0.95)");
  g.addColorStop(1, "rgba(15,92,58,0.15)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(0, 0, 28 + t * 8, 38 + t * 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(212,175,55,0.7)";
  ctx.lineWidth = 1.2;
  ctx.stroke();
}

function caterpillar(ctx: CanvasRenderingContext2D, t: number, now: number) {
  const n = 6;
  for (let i = 0; i < n; i++) {
    const wave = Math.sin(now * 0.004 + i) * 8 * t;
    const px = (i - 2.5) * 16;
    ctx.beginPath();
    ctx.ellipse(px, wave, 11, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = i % 2 ? "rgba(15,92,58,0.9)" : "rgba(212,175,55,0.85)";
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(46, Math.sin(now * 0.004 + 6) * 8 * t, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#D4AF37";
  ctx.fill();
}

function cocoon(ctx: CanvasRenderingContext2D, t: number, now: number) {
  ctx.beginPath();
  ctx.ellipse(0, 0, 26, 48, 0, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(10,22,40,0.92)";
  ctx.fill();
  ctx.strokeStyle = "rgba(212,175,55,0.75)";
  ctx.lineWidth = 1.1;
  for (let i = 0; i < 7; i++) {
    const yy = -40 + i * 13;
    ctx.beginPath();
    ctx.ellipse(0, yy * 0.15, 24 - i, 8, Math.sin(now * 0.001 + i) * 0.2, 0, Math.PI);
    ctx.stroke();
  }
  ctx.strokeStyle = `rgba(46,230,166,${0.25 + t * 0.5})`;
  ctx.beginPath();
  ctx.ellipse(0, 0, 34 + t * 10, 58, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function butterfly(ctx: CanvasRenderingContext2D, t: number, now: number) {
  const open = Math.min(1, t * 1.4);
  const flap = t > 0.45 ? Math.sin(now * 0.006) * 0.22 : 0;
  const wing = (side: number, colors: [string, string]) => {
    ctx.save();
    ctx.scale(side * (open + flap), 1);
    const g = ctx.createRadialGradient(40, -10, 4, 40, -8, 90);
    g.addColorStop(0, colors[0]);
    g.addColorStop(1, colors[1]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(18, -70, 100, -80, 96, -12);
    ctx.bezierCurveTo(94, 28, 36, 48, 0, 22);
    ctx.closePath();
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = "rgba(212,175,55,0.75)";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(62, -28);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.bezierCurveTo(16, 30, 58, 62, 40, 78);
    ctx.bezierCurveTo(24, 70, 8, 40, 0, 28);
    ctx.fillStyle = side < 0 ? "rgba(28,58,110,0.85)" : "rgba(15,92,58,0.8)";
    ctx.fill();
    ctx.restore();
  };
  wing(-1, ["rgba(10,22,40,0.95)", "rgba(212,175,55,0.25)"]);
  wing(1, ["rgba(15,92,58,0.92)", "rgba(212,175,55,0.22)"]);
  ctx.fillStyle = "#D4AF37";
  ctx.beginPath();
  ctx.ellipse(0, 8, 4.5, 28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, -18, 7, 0, Math.PI * 2);
  ctx.fill();
  if (t > 0.4) {
    const n = 16;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + now * 0.001;
      ctx.fillStyle = i % 2 ? "rgba(212,175,55,0.7)" : "rgba(46,230,166,0.65)";
      ctx.beginPath();
      ctx.arc(Math.cos(a) * 110, Math.sin(a) * 48, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
