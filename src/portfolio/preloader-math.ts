/** D'abord le message, ensuite seulement la métamorphose et ses étapes. */

export const PRELOADER = {
  /** Texte de bienvenue, sans métamorphose (ms). */
  welcomeMs: 1800,
  /** Œuf → chenille → cocon → papillon, avec les noms d'étapes (ms). */
  morphMs: 5400,
} as const;

export const PRELOADER_TOTAL_MS = PRELOADER.welcomeMs + PRELOADER.morphMs;

/** Seuils de la métamorphose (progression 0–1). */
export const MORPH_AT = {
  caterpillar: 0.16,
  cocoon: 0.36,
  butterfly: 0.55,
} as const;

export const STAGES = [
  { id: "intention", at: 0 },
  { id: "architecture", at: 20 },
  { id: "metamorphose", at: 46 },
  { id: "eclosion", at: 72 },
  { id: "revelation", at: 92 },
] as const;

export type StageId = (typeof STAGES)[number]["id"];

/** Index d'étape à partir d'un pourcentage de métamorphose (0–100). */
export function stageIndex(percent: number): number {
  const p = Math.max(0, Math.min(100, percent));
  let idx = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (p >= STAGES[i].at) idx = i;
  }
  return idx;
}

export type MorphKind = "egg" | "caterpillar" | "cocoon" | "butterfly";

/** Forme dessinée selon la progression 0–1 de la métamorphose. */
export function morphKind(progress: number): MorphKind {
  const p = Math.max(0, Math.min(1, progress));
  if (p < MORPH_AT.caterpillar) return "egg";
  if (p < MORPH_AT.cocoon) return "caterpillar";
  if (p < MORPH_AT.butterfly) return "cocoon";
  return "butterfly";
}

/** Progression locale 0–1 à l'intérieur de l'étape en cours. */
export function morphSpan(kind: MorphKind, progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  if (kind === "egg") return p / MORPH_AT.caterpillar;
  if (kind === "caterpillar") return (p - MORPH_AT.caterpillar) / (MORPH_AT.cocoon - MORPH_AT.caterpillar);
  if (kind === "cocoon") return (p - MORPH_AT.cocoon) / (MORPH_AT.butterfly - MORPH_AT.cocoon);
  return (p - MORPH_AT.butterfly) / (1 - MORPH_AT.butterfly);
}
