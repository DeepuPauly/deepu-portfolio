"use client";

import { useRef } from "react";
import type { Project } from "@/data";

export default function ProjectCard({ project: p, index: i }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function onMove(e: React.PointerEvent) {
    const c = cardRef.current!;
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `translateY(-10px) perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    c.style.setProperty("--mx", `${e.clientX - r.left}px`);
    c.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  function onLeave() {
    const c = cardRef.current!;
    c.style.transition = "transform .5s cubic-bezier(.2,.7,.2,1), border-color .4s";
    c.style.transform = "";
    setTimeout(() => { if (cardRef.current) cardRef.current.style.transition = ""; }, 500);

    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }

  function onEnter() {
    cardRef.current!.style.transition = "border-color .4s";
    videoRef.current?.play().catch(() => {});
  }

  return (
    <a
      ref={cardRef}
      className="card"
      href={p.link ?? "#"}
      target={p.link ? "_blank" : undefined}
      rel="noreferrer"
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      {p.video ? (
        <div className="card-video-wrap">
          <video
            ref={videoRef}
            src={p.video}
            muted
            loop
            playsInline
            preload="none"
            className="card-video"
          />
          <div className="card-video-overlay" />
        </div>
      ) : (
        <div className="card-placeholder" />
      )}

      <div className="card-body">
        <div className="card-top">
          <div className="num">{String(i + 1).padStart(2, "0")}</div>
          <div className="arrow">↗</div>
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        {p.stack.filter(Boolean).length > 0 && (
          <div className="stack">
            {p.stack.filter(Boolean).map((t) => <span key={t}>{t}</span>)}
          </div>
        )}
      </div>
    </a>
  );
}
