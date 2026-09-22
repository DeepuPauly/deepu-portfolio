import Image from "next/image";
import HeroVideo from "@/components/HeroVideo";
import CountUp from "@/components/CountUp";
import ContactCanvas from "@/components/ContactCanvas";
import ProjectCard from "@/components/ProjectCard";
import ExpCard from "@/components/ExpCard";
import SkillCard from "@/components/SkillCard";
import {
  SITE, HERO, ABOUT,
  SKILL_GROUPS,
  EXPERIENCE, EDUCATION, PROJECTS, AWARDS,
} from "@/data";

function emphasize(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <span className="em" key={i}>{part.slice(1, -1)}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// renders one value of the About "code card" with syntax colouring
function CodeValue({ value }: { value: string | string[] | boolean }) {
  if (typeof value === "boolean") return <span className="tk-bool">{String(value)}</span>;
  if (Array.isArray(value)) {
    return (
      <>
        <span className="tk-p">[</span>
        {value.map((v, i) => (
          <span key={v}>
            <span className="tk-str">&quot;{v}&quot;</span>
            {i < value.length - 1 && <span className="tk-p">, </span>}
          </span>
        ))}
        <span className="tk-p">]</span>
      </>
    );
  }
  return <span className="tk-str">&quot;{value}&quot;</span>;
}

const SKILL_TOTAL = SKILL_GROUPS.reduce((n, g) => n + g.items.length, 0);

export default function Home() {
  return (
    <>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="logo">{SITE.name}</div>
        <div className="links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#work">Work</a>
          <a href="#awards">Awards</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      {/* pinned + scroll-scrubbed video; the texts after the last frame (HeroVideo.tsx) */}
      <header className="hero">
        <noscript>
          <style>{".hero{height:100vh}.hero-content *{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <div className="hero-stage">
          <HeroVideo />
          <div className="hero-content">
            <div className="kicker">{HERO.kicker}</div>
            <h1>
              <span className="line"><b>{emphasize(HERO.titleLine1)}</b></span>
              <span className="line"><b>{emphasize(HERO.titleLine2)}</b></span>
            </h1>
            <p className="sub">{HERO.subtitle}</p>
          </div>
          <div className="scroll-hint">
            <span className="scroll-arrow" aria-hidden="true">&darr;</span>
            Scroll to explore
          </div>
        </div>
      </header>

      {/* ── 01 ABOUT ── */}
      <div className="stripe about-stripe">
        <div className="about-glow" aria-hidden="true" />
        <section className="block about" id="about">
          <div className="sec-label">01 — About</div>
          <h2 className="about-title">{emphasize(ABOUT.heading)}</h2>

          <div className="about-cols">
            <p className="about-body">{emphasize(ABOUT.body)}</p>

            {/* developer-style profile card, driven by ABOUT.card in data.ts */}
            <div className="code-card" aria-label="Profile summary">
              <div className="code-bar">
                <span className="code-dot code-dot--r" />
                <span className="code-dot code-dot--y" />
                <span className="code-dot code-dot--g" />
                <span className="code-file">{ABOUT.card.file}</span>
              </div>
              <div className="code-body">
                <div className="code-line">
                  <span className="tk-kw">const</span> <span className="tk-var">{ABOUT.card.variable}</span>{" "}
                  <span className="tk-p">= {"{"}</span>
                </div>
                {ABOUT.card.entries.map((e) => (
                  <div className="code-line code-indent" key={e.key}>
                    <span className="tk-key">{e.key}</span>
                    <span className="tk-p">: </span>
                    <CodeValue value={e.value} />
                    <span className="tk-p">,</span>
                  </div>
                ))}
                <div className="code-line">
                  <span className="tk-p">{"};"}</span>
                  <span className="code-cursor" />
                </div>
              </div>
            </div>
          </div>

          <div className="about-stats">
            {ABOUT.stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-value"><CountUp value={s.value} /></div>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 02 CAPABILITIES ── */}
      <section className="block" id="skills">
        <div className="sec-label">02 — Capabilities</div>
        <h2>The stack I <span className="em">build with</span>.</h2>
        <p className="skills-caption">
          {SKILL_TOTAL} skills across {SKILL_GROUPS.length} areas — the ones I reach for on real projects.
        </p>
        <div className="skills-grid">
          {SKILL_GROUPS.map((g, i) => (
            <SkillCard key={g.title} group={g} index={i} />
          ))}
        </div>
      </section>

      {/* ── 03 EXPERIENCE ── */}
      <div className="stripe">
        <section className="block" id="experience">
          <div className="sec-label">03 — Experience</div>
          <h2>Where I&apos;ve <span className="em">worked</span>.</h2>
          {/* alternating timeline: card on one side, date on the other, node on the centre line */}
          <div className="exp-timeline">
            {EXPERIENCE.map((exp, i) => (
              <div
                className={`tl-row ${i % 2 === 0 ? "tl-row--left" : "tl-row--right"}${/present/i.test(exp.period) ? " tl-row--current" : ""}`}
                key={i}
              >
                <div className="tl-date"><span>{exp.period}</span></div>
                <div className="tl-node" aria-hidden="true" />
                <div className="tl-card"><ExpCard exp={exp} /></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 04 EDUCATION ── */}
      <section className="block" id="education">
        <div className="sec-label">04 — Education</div>
        <h2>Where I <span className="em">learned</span>.</h2>
        <div className="edu-grid">
          {EDUCATION.map((edu, i) => (
            <div
              className="edu-card"
              key={i}
              data-year={edu.period.slice(0, 4)}
            >
              <div className="edu-period">{edu.period}</div>
              <div className="edu-school">{edu.school}</div>
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-field">{edu.field}</div>
              {edu.note && <div className="edu-note">{edu.note}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 PROJECTS ── */}
      <div className="stripe">
        <section className="block" id="work">
          <div className="sec-label">05 — Selected Work</div>
          <h2>Things I&apos;ve <span className="em">shipped</span>.</h2>
          <div className="projects">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </section>
      </div>

      {/* ── 06 AWARDS ── */}
      <section className="block" id="awards">
        <div className="sec-label">06 — Awards</div>
        <h2>{emphasize(AWARDS.heading)}</h2>
        <p className="lead">{AWARDS.description}</p>
        <div className="awards-grid">
          {AWARDS.items.map((award, i) => (
            <div
              className="award-card"
              key={i}
            >
              <div className="award-media">
                <Image
                  src={award.image}
                  alt={award.alt}
                  className="award-img"
                  fill
                  sizes="(max-width: 700px) 100vw, 560px"
                />
              </div>
              {award.caption && (
                <div className="award-caption">{award.caption}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 07 CONTACT ── */}
      <div className="contact-wrap" id="contact">
        <ContactCanvas />
        <section className="contact-section">
          <div className="sec-label">07 — Contact</div>
          <h2>
            Let&apos;s build something <span className="em">together</span>.
          </h2>
          <p className="contact-sub">
            Open to full-time roles, freelance projects, and collaborations.
          </p>
          <a className="cta" href={`mailto:${SITE.email}`}>
            <span>{SITE.email}</span>
            <span className="cta-arrow">→</span>
          </a>
          <div className="social-cards">
            <a className="social-card" href={SITE.github} target="_blank" rel="noreferrer">
              <span className="social-card-name">GitHub</span>
              <span className="social-card-arrow">↗</span>
            </a>
            <a className="social-card" href={SITE.linkedin} target="_blank" rel="noreferrer">
              <span className="social-card-name">LinkedIn</span>
              <span className="social-card-arrow">↗</span>
            </a>
          </div>
        </section>

        <div className="footer">
          <span>© 2026 {SITE.name}</span>
          <span>
            <a href={SITE.github} target="_blank" rel="noreferrer">GitHub</a> ·{" "}
            <a href={SITE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </span>
        </div>
      </div>

    </>
  );
}
