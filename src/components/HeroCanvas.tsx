"use client";

import dynamic from "next/dynamic";

// Load the 3D scene ONLY in the browser, and only after the page renders.
// This is the key to SEO + mobile speed: Google gets fast HTML first,
// the heavy 3D mounts afterwards.
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Scene />
    </div>
  );
}
