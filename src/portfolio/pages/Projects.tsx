import { useMemo, useState } from "react";
import { GITHUB, PROJECTS } from "../content";
import { useI18n } from "../i18n";

type Filter = "all" | "ux" | "code";

export function Projects() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState<Filter>("all");
  const list = useMemo(
    () => PROJECTS.filter((project) => filter === "all" || project.category === filter),
    [filter],
  );

  return (
    <div className="page page-enter">
      <p className="kicker">— {t("projects.kicker")}</p>
      <h1 className="display">{t("projects.title")}</h1>
      <p className="lede">{t("projects.sub")}</p>
      <div className="filters" role="group" aria-label={t("projects.filter")}>
        {(["all", "ux", "code"] as const).map((key) => (
          <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {t(`projects.${key}`)}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p>{t("projects.empty")}</p>
      ) : (
        <div className="card-grid">
          {list.map((project) => (
            <article key={project.id} className="project-card">
              <div className="shot">
                <img src={`${import.meta.env.BASE_URL}${project.image.slice(1)}`} alt="" width={1400} height={788} loading="lazy" decoding="async" />
                <div className="shot-shade" />
                <div className="shot-tags">
                  {project.tags.slice(0, 3).map((tag) => <span key={tag} className="tag lang-tag">{tag}</span>)}
                </div>
                <span className="year-badge" style={{ top: "0.75rem", bottom: "auto", color: "var(--foreground)" }}>{project.year}</span>
              </div>
              <div className="card-body">
                <p className="kicker" style={{ margin: 0 }}>{project.sub[lang]}</p>
                <h3>{project.title}</h3>
                <p className="clamp">{project.desc[lang]}</p>
                <div className="cta-row" style={{ marginTop: "auto" }}>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ color: project.color }} aria-label={`${project.title} — ${t("projects.preview")} (${t("a11y.external")})`}>
                      {t("projects.preview")} ↗
                    </a>
                  ) : (
                    <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>{t("projects.wip")}</span>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--muted-foreground)" }} aria-label={`${project.title} — GitHub (${t("a11y.external")})`}>GitHub ↗</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
      <div style={{ textAlign: "center", padding: "3rem 0 1rem" }}>
        <p className="lede" style={{ margin: "0 auto 1rem" }}>{t("projects.repos")}</p>
        <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label={`github.com/reinevannel (${t("a11y.external")})`}>github.com/reinevannel ↗</a>
      </div>
    </div>
  );
}
