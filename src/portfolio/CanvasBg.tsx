import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./motion";
import { useTheme } from "./theme";

/**
 * Fond fixe : nuit étoilée en sombre, feuilles et oiseaux en clair.
 * S'arrête si l'onglet est caché ou si les animations sont réduites.
 */
export function CanvasBg() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let staticLayer: HTMLCanvasElement | null = null;
    const stars = Array.from({ length: reduce ? 28 : 64 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.25,
      a: 0.25 + Math.random() * 0.55,
      p: Math.random() * Math.PI * 2,
    }));
    const leaves = Array.from({ length: reduce ? 0 : 16 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: 6 + Math.random() * 10,
      r: Math.random() * 6,
      v: 0.00035 + Math.random() * 0.00045,
      h: 90 + Math.random() * 50,
      a: 0.25 + Math.random() * 0.3,
    }));

    const paintStatic = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      staticLayer = document.createElement("canvas");
      staticLayer.width = w;
      staticLayer.height = h;
      const layer = staticLayer.getContext("2d");
      if (!layer) return;
      if (theme === "dark") {
        const g = layer.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, "#060b14");
        g.addColorStop(1, "#08111e");
        layer.fillStyle = g;
        layer.fillRect(0, 0, w, h);
        layer.strokeStyle = "rgba(212,175,55,0.045)";
        layer.beginPath();
        for (let x = 0; x <= w; x += 56) {
          layer.moveTo(x, 0);
          layer.lineTo(x, h);
        }
        for (let y = 0; y <= h; y += 56) {
          layer.moveTo(0, y);
          layer.lineTo(w, y);
        }
        layer.stroke();
      } else {
        const g = layer.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, "#f7f3ea");
        g.addColorStop(1, "#efe8da");
        layer.fillStyle = g;
        layer.fillRect(0, 0, w, h);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintStatic();
    };
    resize();
    window.addEventListener("resize", resize);

    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running && !reduce) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    let t = 0;
    let last = 0;
    const draw = (now = 0) => {
      if (!running) return;
      if (!reduce && now - last < 33) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      if (staticLayer) ctx.drawImage(staticLayer, 0, 0, w, h);
      if (theme === "dark") {
        for (const s of stars) {
          const blink = reduce ? s.a * 0.55 : s.a * (0.45 + 0.12 * Math.sin(t * 0.012 + s.p));
          ctx.fillStyle = `rgba(214,222,232,${blink})`;
          ctx.beginPath();
          ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        for (const leaf of leaves) {
          if (!reduce) {
            leaf.y += leaf.v * 0.45;
            leaf.r += 0.004;
            if (leaf.y > 1.08) leaf.y = -0.05;
          }
          ctx.save();
          ctx.translate(leaf.x * w, leaf.y * h);
          ctx.rotate(leaf.r);
          ctx.globalAlpha = leaf.a;
          ctx.fillStyle = `hsl(${leaf.h} 40% 36%)`;
          ctx.beginPath();
          ctx.ellipse(0, 0, leaf.s * 0.45, leaf.s, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      t += 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [theme, reduce]);

  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}
