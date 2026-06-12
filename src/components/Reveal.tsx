"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = wrap.current!.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in");
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <div ref={wrap}>{children}</div>;
}
