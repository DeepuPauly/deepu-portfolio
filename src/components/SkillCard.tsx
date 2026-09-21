"use client";

import { useRef } from "react";
import type { SkillGroup } from "@/data";

// One capability card. The glow follows the cursor (same effect as the experience cards).
export default function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const c = ref.current!;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - r.left}px`);
    c.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      className={`skill-card skill-card--s${group.span ?? 2}`}
      onPointerMove={onMove}
    >
      <div className="skill-glow" />
      <span className="skill-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>

      <h3 className="skill-title">{group.title}</h3>
      <span className="skill-count">{group.items.length} skills</span>

      <ul className="skill-list">
        {group.items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
