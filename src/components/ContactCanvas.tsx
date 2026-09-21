"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ContactRings = dynamic(() => import("./ContactRings"), {
  ssr: false,
  loading: () => null,
});

// The rings sit at the very bottom of the page, so nothing 3D is created until the
// visitor scrolls near them, and rendering pauses again when they leave the screen.
export default function ContactCanvas() {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false); // has been close to the viewport
  const [visible, setVisible] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) {
          setLite(window.matchMedia("(max-width: 768px), (pointer: coarse)").matches);
          setNear(true);
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="contact-canvas" aria-hidden="true">
      {near && <ContactRings active={visible} lite={lite} />}
    </div>
  );
}
