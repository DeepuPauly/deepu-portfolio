"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Bloom lives in its own chunk so phones / low-power devices never download it.
// multisampling 4 (default is 8) keeps thin lines smooth at half the GPU cost.
export default function Glow({
  intensity,
  luminanceThreshold,
  luminanceSmoothing,
}: {
  intensity: number;
  luminanceThreshold: number;
  luminanceSmoothing: number;
}) {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={intensity}
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={luminanceSmoothing}
        mipmapBlur
      />
    </EffectComposer>
  );
}
