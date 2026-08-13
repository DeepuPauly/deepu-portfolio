"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Reveal({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrap.current!;

    const els = root.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));

    // 3D tilt-up transition as each major section scrolls into view
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".section-3d");
      if (reduceMotion) {
        gsap.set(sections, { autoAlpha: 1 });
        return;
      }
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            autoAlpha: 0,
            y: 90,
            rotateX: 14,
            transformPerspective: 1200,
            transformOrigin: "50% 100%",
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, root);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return <div ref={wrap}>{children}</div>;
}
