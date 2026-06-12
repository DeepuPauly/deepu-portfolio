import type { CSSProperties } from "react";
import HeroCanvas from "@/components/HeroCanvas";
import ContactCanvas from "@/components/ContactCanvas";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import ExpCard from "@/components/ExpCard";
import {
  SITE, HERO, ABOUT,
  SKILLS,
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

const ROW1 = [...SKILLS, ...SKILLS];
const ROW2 = [...SKILLS.slice().reverse(), ...SKILLS.slice().reverse()];
const ROW3 = [...SKILLS, ...SKILLS];

export default function Home() {
  return (
    <Reveal>

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
      <header className="hero">
        <HeroCanvas />
        <div className="hero-content">
          <div className="kicker">{HERO.kicker}</div>
          <h1>
            <span className="line"><b>{emphasize(HERO.titleLine1)}</b></span>
            <span className="line"><b>{emphasize(HERO.titleLine2)}</b></span>
          </h1>
          <p className="sub">{HERO.subtitle}</p>
        </div>
        <div className="scroll-hint">
          <span className="dot" />
          Scroll
        </div>
      </header>

      {/* ── 01 ABOUT ── */}
      <div className="stripe">
        <section className="block reveal" id="about">
          <div className="sec-label">01 — About</div>
          <div className="about-grid">
            <div className="about-text">
              <h2>{emphasize(ABOUT.heading)}</h2>
              <p className="lead">{ABOUT.body}</p>
              <div className="about-stats">
                {ABOUT.stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <div className="stat-value">{s.value}</div>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-image-wrap">
              <div className="about-img-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ABOUT.image}
                  alt={`${SITE.name} profile photo`}
                  className="about-profile-img"
                />
                <div className="about-img-fade" />
              </div>
              <div className="about-orb" />
            </div>
          </div>
        </section>
      </div>

      {/* ── 02 CAPABILITIES ── */}
      <section className="block" id="skills">
        <div className="sec-label reveal">02 — Capabilities</div>
        <h2 className="reveal">The stack I <span className="em">build with</span>.</h2>
        <div className="marquee-scene reveal">
          <div className="marquee-track">
            <div className="marquee-inner">
              {ROW1.map((s, i) => (
                <span className="m-pill" key={i}>
                  {s}<span className="m-dot">·</span>
                </span>
              ))}
            </div>
          </div>
          <div className="marquee-track marquee-track--rtl marquee-track--lg">
            <div className="marquee-inner marquee-inner--rtl">
              {ROW2.map((s, i) => (
                <span className="m-pill m-pill--lg" key={i}>
                  <span className="m-dot m-dot--accent">✦</span>{s}
                </span>
              ))}
            </div>
          </div>
          <div className="marquee-track">
            <div className="marquee-inner marquee-inner--slow">
              {ROW3.map((s, i) => (
                <span className="m-pill" key={i}>
                  {s}<span className="m-dot">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 EXPERIENCE ── */}
      <div className="stripe">
        <section className="block" id="experience">
          <div className="sec-label reveal">03 — Experience</div>
          <h2 className="reveal">Where I&apos;ve <span className="em">worked</span>.</h2>
          <div className="exp-list">
            {EXPERIENCE.map((exp, i) => (
              <div
                className="reveal"
                key={i}
                style={{ transitionDelay: `${i * 0.1}s` } as CSSProperties}
              >
                <ExpCard exp={exp} index={i} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 04 EDUCATION ── */}
      <section className="block" id="education">
        <div className="sec-label reveal">04 — Education</div>
        <h2 className="reveal">Where I <span className="em">learned</span>.</h2>
        <div className="edu-grid">
          {EDUCATION.map((edu, i) => (
            <div
              className="edu-card reveal"
              key={i}
              data-year={edu.period.slice(0, 4)}
              style={{ transitionDelay: `${i * 0.15}s` } as CSSProperties}
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
        <section className="block reveal" id="work">
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
        <div className="sec-label reveal">06 — Awards</div>
        <h2 className="reveal">{emphasize(AWARDS.heading)}</h2>
        <p className="lead reveal">{AWARDS.description}</p>
        <div className="awards-grid">
          {AWARDS.items.map((award, i) => (
            <div
              className="award-card reveal"
              key={i}
              style={{ transitionDelay: `${i * 0.15}s` } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={award.image}
                alt={award.alt}
                className="award-img"
              />
              {award.caption && (
                <div className="award-caption">{award.caption}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 07 CONTACT ── */}
      <div className="contact-wrap reveal" id="contact">
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

    </Reveal>
  );
}
