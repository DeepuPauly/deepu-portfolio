"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// The hero is a tall, pinned section (see --hero-scroll in globals.css = 290vh of scrolling).
// The first VIDEO_SHARE of that distance scrubs the video frame by frame; a little scroll after
// the last frame (REVEAL_AT) reveals the headline + paragraph, which then hold on screen
// for the remaining distance before the page carries on to About.
const VIDEO_SHARE = 0.76;
const REVEAL_AT = VIDEO_SHARE + 0.04;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export default function HeroVideo() {
  const wrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current!;
    const hero = wrap.current!.closest<HTMLElement>(".hero")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;

    // lighter file on phones; chosen here so the wrong one is never downloaded
    video.src = small ? "/videos/hero-960.mp4" : "/videos/hero-1600.mp4";

    let target = 0; // where the scroll wants the playhead (seconds)
    let cur = 0; // eased playhead we actually seek to
    let raf = 0;

    const measure = () => {
      const total = hero.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp(-hero.getBoundingClientRect().top / total, 0, 1) : 0;
      target = clamp(p / VIDEO_SHARE, 0, 1) * (video.duration || 0);
      hero.classList.toggle("is-revealed", p >= REVEAL_AT);
      hero.classList.toggle("is-scrolled", p > 0.005);
    };

    const tick = () => {
      raf = 0;
      const d = target - cur;
      cur = Math.abs(d) < 0.004 ? target : cur + d * 0.22; // ease so it feels smooth, not steppy
      // one seek at a time: piling seeks up is what makes scrubbed video stutter
      if (!video.seeking && Math.abs(video.currentTime - cur) > 1 / 60) video.currentTime = cur;
      if (cur !== target) raf = requestAnimationFrame(tick);
    };

    const update = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    if (reduceMotion) {
      // no scrubbing: show the final frame with the text already in
      hero.classList.add("is-revealed");
      const toEnd = () => { video.currentTime = video.duration; };
      video.addEventListener("loadedmetadata", toEnd, { once: true });
      return () => video.removeEventListener("loadedmetadata", toEnd);
    }

    // Safari/iOS only decode frames for a video that has "played" once
    const kick = () => { video.play().then(() => video.pause()).catch(() => {}); };
    video.addEventListener("loadeddata", kick, { once: true });
    video.addEventListener("loadedmetadata", update);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadeddata", kick);
      video.removeEventListener("loadedmetadata", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={wrap} className="hero-media" aria-hidden="true">
      {/* first frame, shown instantly (and is the page's LCP) until the video takes over */}
      <Image
        className="hero-poster"
        src="/posters/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        quality={70}
      />
      <video
        ref={videoRef}
        className="hero-video"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <div className="hero-shade" />
    </div>
  );
}
