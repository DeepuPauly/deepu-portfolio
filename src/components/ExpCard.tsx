"use client";

import { useRef } from "react";
import type { Experience } from "@/data";

export default function ExpCard({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const c = ref.current!;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `perspective(1100px) rotateY(${x * 5}deg) rotateX(${-y * 3.5}deg) translateY(-4px)`;
    c.style.setProperty("--mx", `${e.clientX - r.left}px`);
    c.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  function onEnter() {
    ref.current!.style.transition = "border-color .4s";
  }

  function onLeave() {
    const c = ref.current!;
    c.style.transition = "transform .55s cubic-bezier(.2,.7,.2,1), border-color .4s";
    c.style.transform = "";
    setTimeout(() => { if (ref.current) ref.current.style.transition = ""; }, 560);
  }

  return (
    <div
      ref={ref}
      className="exp-card"
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {/* radial glow follows cursor */}
      <div className="exp-glow" />

      <div className="exp-num">0{index + 1}</div>

      <div className="exp-body">
        <div className="exp-top">
          <div>
            <div className="exp-role">{exp.role}</div>
            <div className="exp-meta">
              <span className="exp-company">{exp.company}</span>
              {exp.type     && <span className="exp-badge">{exp.type}</span>}
              {exp.location && <span className="exp-location">{exp.location}</span>}
            </div>
          </div>
          <div className="exp-period">{exp.period}</div>
        </div>

        <p className="exp-desc">{exp.description}</p>

        {exp.achievements && (
          <ul className="exp-achievements">
            {exp.achievements.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        )}

        {exp.stack && (
          <div className="exp-tags">
            {exp.stack.map((t) => <span key={t}>{t}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}
