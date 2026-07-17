"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 2.2;

const INK = "#0E1730";      // navy sphere body
const RED = "#E53935";      // delivery routes
const BLUE = "#2563EB";     // hub nodes
const SKY = "#7DA6FF";      // surface dots / graticule

/** Evenly distributed points on a sphere — the "data globe" surface. */
function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push(
      new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius)
    );
  }
  return points;
}

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Lifted great-circle arc between two surface points. */
function arcBetween(a: THREE.Vector3, b: THREE.Vector3, radius: number, segments = 64) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().lerpVectors(a, b, t);
    p.normalize().multiplyScalar(radius * (1 + Math.sin(Math.PI * t) * 0.16));
    points.push(p);
  }
  return points;
}

// Origin is West Bengal; spokes reach the metros BM Xpress connects onward to.
const ORIGIN = { lat: 23.6, lon: 88.0 };
const SPOKES = [
  { lat: 28.6, lon: 77.2 },
  { lat: 19.1, lon: 72.9 },
  { lat: 13.1, lon: 80.3 },
  { lat: 12.9, lon: 77.6 },
  { lat: 26.1, lon: 91.7 },
];

/** Blue pinpricks across the navy surface. Back-face dots are hidden by the sphere. */
function SurfaceDots() {
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(fibonacciSphere(1600, RADIUS + 0.005)),
    []
  );
  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.021} color={SKY} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

/** Faint latitude/longitude wireframe — reads as a survey grid, not decoration. */
function Graticule() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS + 0.008, 24, 16]} />
      <meshBasicMaterial color={SKY} wireframe transparent opacity={0.07} />
    </mesh>
  );
}

/** Glowing red delivery corridors radiating from the West Bengal hub. */
function Routes() {
  const origin = useMemo(() => latLonToVector3(ORIGIN.lat, ORIGIN.lon, RADIUS), []);
  const spokes = useMemo(() => SPOKES.map((s) => latLonToVector3(s.lat, s.lon, RADIUS)), []);
  const arcs = useMemo(() => spokes.map((s) => arcBetween(origin, s, RADIUS)), [origin, spokes]);

  return (
    <group>
      {arcs.map((points, i) => (
        <Line key={i} points={points} color={RED} lineWidth={1.6} transparent opacity={0.85} />
      ))}

      {/* Destination hubs — blue */}
      {spokes.map((v, i) => (
        <mesh key={i} position={v}>
          <sphereGeometry args={[0.032, 12, 12]} />
          <meshBasicMaterial color={BLUE} />
        </mesh>
      ))}

      {/* Home hub — red core, pulsing white halo */}
      <mesh position={origin}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={RED} />
      </mesh>
      <PulseRing position={origin} />
    </group>
  );
}

function PulseRing({ position }: { position: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() % 2.4) / 2.4;
    const scale = 1 + t * 2.6;
    ref.current.scale.setScalar(scale);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.5 * (1 - t);
    ref.current.lookAt(0, 0, 0);
  });
  return (
    <mesh ref={ref} position={position}>
      <ringGeometry args={[0.05, 0.062, 32]} />
      <meshBasicMaterial color={RED} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

/** A parcel in motion, orbiting just above the surface. */
function OrbitingParcel() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.32;
    const r = RADIUS + 0.42;
    if (!ref.current) return;
    ref.current.position.set(Math.cos(t) * r, Math.sin(t * 0.7) * 0.75, Math.sin(t) * r);
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.014;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={0.8} roughness={0.4} />
    </mesh>
  );
}

/** Blue atmospheric halo, rendered on the inside faces so it rims the sphere. */
function Atmosphere() {
  return (
    <mesh>
      <sphereGeometry args={[RADIUS * 1.14, 48, 48]} />
      <meshBasicMaterial
        color={BLUE}
        transparent
        opacity={0.09}
        side={THREE.BackSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function GlobeGroup() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.07;
  });

  return (
    <group ref={group} rotation={[0.28, 0, 0.12]}>
      {/* Solid navy body — occludes the far side so the globe reads as a sphere */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshStandardMaterial color={INK} roughness={0.85} metalness={0.15} />
      </mesh>
      <Graticule />
      <SurfaceDots />
      <Routes />
      <OrbitingParcel />
    </group>
  );
}

export function Globe() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 3, 5]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-5, -2, -3]} intensity={0.8} color={BLUE} />
      <pointLight position={[4, -3, 2]} intensity={0.5} color={RED} />
      <Atmosphere />
      <GlobeGroup />
    </>
  );
}
