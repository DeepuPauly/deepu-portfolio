"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT   = 30;
const CONNECT_DIST = 1.28;
const RADIUS       = 1.5;
const PACKET_COUNT = 12;

// Fibonacci sphere — nodes evenly distributed over a sphere surface
function fibSphere(n: number, r: number): THREE.Vector3[] {
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  return Array.from({ length: n }, (_, i) => {
    const y     = 1 - (i / (n - 1)) * 2;
    const rad   = Math.sqrt(1 - y * y);
    const theta = phi * i;
    return new THREE.Vector3(Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r);
  });
}

export default function AbstractShape({
  pointerRef,
}: {
  pointerRef: React.MutableRefObject<number>;
}) {
  const group = useRef<THREE.Group>(null!);

  /* ── stable geometry data ── */
  const nodes = useMemo(() => fibSphere(NODE_COUNT, RADIUS), []);

  const connections = useMemo(() => {
    const out: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++)
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST)
          out.push([nodes[i], nodes[j]]);
    return out;
  }, [nodes]);

  /* ── Three.js objects (built once) ── */
  const lineMesh = useMemo(() => {
    const pos: number[] = [];
    connections.forEach(([a, b]) => pos.push(a.x, a.y, a.z, b.x, b.y, b.z));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return new THREE.LineSegments(
      geo,
      new THREE.LineBasicMaterial({ color: "#ff6b35", transparent: true, opacity: 0.2 })
    );
  }, [connections]);

  const nodeMesh = useMemo(() => {
    const pos = new Float32Array(nodes.flatMap(n => [n.x, n.y, n.z]));
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: "#ff8c55", size: 0.085, sizeAttenuation: true })
    );
  }, [nodes]);

  // mutable packet data — animated dots on connections
  const [packets] = useState(() =>
    Array.from({ length: PACKET_COUNT }, () => ({
      t:     Math.random(),
      speed: 0.22 + Math.random() * 0.42,
      conn:  connections.length > 0 ? Math.floor(Math.random() * connections.length) : 0,
    }))
  );

  // packet geometry lives on packetMesh.geometry — its position buffer is
  // mutated imperatively inside useFrame every frame for performance
  const packetMesh = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(PACKET_COUNT * 3, 3));
    return new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: "#ffd4aa", size: 0.14, sizeAttenuation: true })
    );
  }, []);

  // faint outer wireframe sphere — shows the "boundary"
  const outerSphere = useMemo(() =>
    new THREE.Mesh(
      new THREE.SphereGeometry(1.72, 14, 10),
      new THREE.MeshBasicMaterial({ color: "#ff6b35", wireframe: true, transparent: true, opacity: 0.055 })
    ),
    []
  );

  /* ── animation ── */
  // useFrame runs outside React's render phase (in r3f's own render loop), so
  // mutating refs and three.js objects here is the correct, idiomatic pattern.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((_, delta) => {
    // rotate whole network; speed up on pointer activity
    group.current.rotation.y += delta * (0.09 + pointerRef.current * 0.07);
    group.current.rotation.x += delta * 0.03;
    pointerRef.current *= 0.96;

    if (connections.length === 0) return;

    // advance data packets along connections
    const attr = packetMesh.geometry.attributes.position as THREE.BufferAttribute;
    packets.forEach((pkt, i) => {
      pkt.t += delta * pkt.speed;
      if (pkt.t > 1) {
        pkt.t    = 0;
        pkt.conn = Math.floor(Math.random() * connections.length);
      }
      const [a, b] = connections[pkt.conn];
      attr.setXYZ(i,
        THREE.MathUtils.lerp(a.x, b.x, pkt.t),
        THREE.MathUtils.lerp(a.y, b.y, pkt.t),
        THREE.MathUtils.lerp(a.z, b.z, pkt.t)
      );
    });
    // eslint-disable-next-line react-hooks/immutability -- imperative three.js buffer update, see note above
    attr.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <primitive object={lineMesh}    />
      <primitive object={nodeMesh}    />
      <primitive object={packetMesh}  />
      <primitive object={outerSphere} />
    </group>
  );
}
