"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// The hero is a tall, pinned section (see --hero-scroll in globals.css = 290vh of scrolling).
// The first VIDEO_SHARE of that distance scrubs the film frame by frame; a little scroll after
// the last frame (REVEAL_AT) reveals the headline + paragraph, which then hold on screen
// for the remaining distance before the page carries on to About.
const VIDEO_SHARE = 0.76;
const REVEAL_AT = VIDEO_SHARE + 0.04;

// Desktop scrubs the <video> directly. Phones (iOS Safari especially) refuse to load or seek a
// video that hasn't been tapped to play, so on small screens the same film is drawn from
// pre-extracted frames onto a canvas instead. Frames: /public/frames/f001.webp … f243.webp
// (portrait 540x960, from the same source video), so FRAME_COUNT / DURATION must match them.
const FRAME_COUNT = 243;
const DURATION = 10.125;
const FRAME_CACHE = 28; // decoded frames kept in memory at once
const frameUrl = (i: number) => `/frames/f${String(i + 1).padStart(3, "0")}.webp`;

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// Load order: every 8th frame first, then fill in — so any scroll position has a nearby frame
// to show while the rest is still downloading.
function loadOrder(n: number) {
  const seen = new Set<number>();
  const order: number[] = [];
  for (const stride of [8, 4, 2, 1]) {
    for (let i = 0; i < n; i += stride) {
      if (!seen.has(i)) { seen.add(i); order.push(i); }
    }
  }
  return order;
}

export default function HeroVideo() {
  const wrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    const hero = wrap.current!.closest<HTMLElement>(".hero")!;
    const stage = hero.querySelector<HTMLElement>(".hero-stage")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const framesMode = window.matchMedia("(max-width: 768px)").matches;

    let progressTime = 0; // where the scroll wants the playhead (seconds)
    let cur = 0; // eased playhead (seconds)
    let raf = 0;
    let cleanup = () => {};

    const duration = () => (framesMode ? DURATION : video.duration || 0);

    const measure = () => {
      const total = hero.offsetHeight - stage.offsetHeight;
      const p = total > 0 ? clamp(-hero.getBoundingClientRect().top / total, 0, 1) : 0;
      progressTime = clamp(p / VIDEO_SHARE, 0, 1) * duration();
      hero.classList.toggle("is-revealed", p >= REVEAL_AT);
      // the "Scroll to explore" hint stays up through roughly the first two screens of
      // scrolling, but never past the point where the video is mostly through
      const hintFadeAt = total > 0 ? Math.min((2 * window.innerHeight) / total, 0.65) : 0.65;
      hero.classList.toggle("is-deep-scrolled", p >= hintFadeAt);
    };

    /* ───────────── phones: canvas + frame sequence ───────────── */
    if (framesMode) {
      video.style.display = "none";
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const blobs: (Blob | undefined)[] = new Array(FRAME_COUNT);
      const cache = new Map<number, ImageBitmap>(); // insertion order = oldest first
      const decoding = new Set<number>();
      let drawnIndex = -1;
      let lastBitmap: ImageBitmap | null = null;
      let dir = 1;
      let dead = false;

      const nearest = (want: number) => {
        for (let d = 0; d < FRAME_COUNT; d++) {
          if (blobs[want - d]) return want - d;
          if (blobs[want + d]) return want + d;
        }
        return -1;
      };

      const draw = (bm: ImageBitmap, index: number) => {
        const cw = canvas.width;
        const ch = canvas.height;
        const s = Math.max(cw / bm.width, ch / bm.height); // "cover"
        const w = bm.width * s;
        const h = bm.height * s;
        ctx.drawImage(bm, (cw - w) / 2, (ch - h) * 0.3, w, h);
        drawnIndex = index;
        lastBitmap = bm;
      };

      const trim = () => {
        while (cache.size > FRAME_CACHE) {
          const oldest = cache.keys().next().value as number;
          if (oldest === drawnIndex) { const b = cache.get(oldest)!; cache.delete(oldest); cache.set(oldest, b); continue; }
          cache.get(oldest)?.close();
          cache.delete(oldest);
        }
      };

      // make sure frame i is decoded (async); optionally draw it when ready
      const ensure = (i: number, drawWhenReady: boolean) => {
        if (i < 0 || i >= FRAME_COUNT || !blobs[i]) return;
        const hit = cache.get(i);
        if (hit) { if (drawWhenReady) draw(hit, i); return; }
        if (decoding.has(i)) return;
        decoding.add(i);
        createImageBitmap(blobs[i]!).then((bm) => {
          decoding.delete(i);
          if (dead) { bm.close(); return; }
          cache.set(i, bm);
          trim();
          if (drawWhenReady && nearest(Math.round((cur / DURATION) * (FRAME_COUNT - 1))) === i) draw(bm, i);
        }).catch(() => decoding.delete(i));
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
        canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
        if (lastBitmap) draw(lastBitmap, drawnIndex);
      };

      const show = () => {
        const want = clamp(Math.round((cur / DURATION) * (FRAME_COUNT - 1)), 0, FRAME_COUNT - 1);
        const i = nearest(want);
        if (i < 0) return;
        if (i !== drawnIndex) ensure(i, true);
        for (let k = 1; k <= 4; k++) ensure(i + dir * k, false); // decode a few ahead
      };

      const tick = () => {
        raf = 0;
        const d = progressTime - cur;
        if (d !== 0) dir = d > 0 ? 1 : -1;
        cur = Math.abs(d) < 0.004 ? progressTime : cur + d * 0.3;
        show();
        if (cur !== progressTime) raf = requestAnimationFrame(tick);
      };

      const update = () => {
        measure();
        if (!raf) raf = requestAnimationFrame(tick);
      };

      // download the frames a few at a time, coarse-to-fine
      const order = loadOrder(FRAME_COUNT);
      let next = 0;
      let active = 0;
      const pump = () => {
        while (!dead && active < 6 && next < order.length) {
          const i = order[next++];
          active++;
          fetch(frameUrl(i))
            .then((r) => r.blob())
            .then((b) => { blobs[i] = b; })
            .catch(() => {})
            .finally(() => { active--; pump(); if (!raf) raf = requestAnimationFrame(tick); });
        }
      };

      const onResize = () => { resize(); update(); };
      resize();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", onResize);
      pump();
      update();

      if (reduceMotion) hero.classList.add("is-revealed");

      cleanup = () => {
        dead = true;
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", onResize);
        cache.forEach((b) => b.close());
        cache.clear();
      };
      return cleanup;
    }

    /* ───────────── desktop: scrub the <video> ───────────── */
    canvas.style.display = "none";
    video.src = "/videos/hero-1600.mp4";

    const tick = () => {
      raf = 0;
      const d = progressTime - cur;
      cur = Math.abs(d) < 0.004 ? progressTime : cur + d * 0.22; // ease so it feels smooth, not steppy
      // one seek at a time: piling seeks up is what makes scrubbed video stutter
      if (!video.seeking && Math.abs(video.currentTime - cur) > 1 / 60) video.currentTime = cur;
      if (cur !== progressTime) raf = requestAnimationFrame(tick);
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

    const kick = () => { video.play().then(() => video.pause()).catch(() => {}); };
    video.addEventListener("loadeddata", kick, { once: true });
    video.addEventListener("loadedmetadata", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    cleanup = () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadeddata", kick);
      video.removeEventListener("loadedmetadata", update);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    return cleanup;
  }, []);

  return (
    <div ref={wrap} className="hero-media" aria-hidden="true">
      {/* first frame, shown instantly (and is the page's LCP) until the film takes over */}
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
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-shade" />
    </div>
  );
}
