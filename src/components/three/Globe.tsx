"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

const RADIUS = 2.2;

// Fibonacci sphere distribution — even, dotted "data globe" look without
// needing an external continent texture.
function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

// A handful of hub locations (approximate lat/lon over India + a few global
// anchors) converted to sphere coordinates, used for glowing pins and arcs.
const HUBS = [
  { lat: 23.6, lon: 88.0 }, // West Bengal
  { lat: 28.6, lon: 77.2 }, // Delhi
  { lat: 19.1, lon: 72.9 }, // Mumbai
  { lat: 13.1, lon: 80.3 }, // Chennai
  { lat: 12.9, lon: 77.6 }, // Bengaluru
];

function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function greatCircleArc(a: THREE.Vector3, b: THREE.Vector3, radius: number, segments = 48) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = new THREE.Vector3().lerpVectors(a, b, t);
    point.normalize().multiplyScalar(radius * (1 + Math.sin(Math.PI * t) * 0.18));
    points.push(point);
  }
  return points;
}

function DottedGlobe() {
  const points = useMemo(() => fibonacciSphere(1400, RADIUS), []);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <points geometry={geometry}>
      <pointsMaterial size={0.022} color="#FF4D5E" sizeAttenuation transparent opacity={0.55} />
    </points>
  );
}

function Routes() {
  const hubVectors = useMemo(() => HUBS.map((h) => latLonToVector3(h.lat, h.lon, RADIUS)), []);
  const arcs = useMemo(() => {
    const result: THREE.Vector3[][] = [];
    for (let i = 1; i < hubVectors.length; i++) {
      result.push(greatCircleArc(hubVectors[0], hubVectors[i], RADIUS));
    }
    return result;
  }, [hubVectors]);

  return (
    <group>
      {arcs.map((arc, i) => (
        <Line key={i} points={arc} color="#E30613" lineWidth={1.4} transparent opacity={0.55} />
      ))}
      {hubVectors.map((v, i) => (
        <mesh key={i} position={v}>
          <sphereGeometry args={[i === 0 ? 0.045 : 0.03, 12, 12]} />
          <meshBasicMaterial color={i === 0 ? "#111111" : "#E30613"} />
        </mesh>
      ))}
    </group>
  );
}

function OrbitingMarker() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.35;
    const radius = RADIUS + 0.55;
    if (ref.current) {
      ref.current.position.set(
        Math.cos(t) * radius,
        Math.sin(t * 0.6) * 0.6,
        Math.sin(t) * radius
      );
    }
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.09, 0.09, 0.16]} />
      <meshStandardMaterial color="#E30613" emissive="#E30613" emissiveIntensity={1.4} />
    </mesh>
  );
}

function GlobeGroup() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[RADIUS - 0.02, 48, 48]}>
        <meshBasicMaterial color="#FAFAFA" transparent opacity={0.75} />
      </Sphere>
      <DottedGlobe />
      <Routes />
      <OrbitingMarker />
    </group>
  );
}

export function Globe() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 4, 6]} intensity={1} color="#FF4D5E" />
      <pointLight position={[-6, -4, -4]} intensity={0.5} color="#ffffff" />
      <GlobeGroup />
    </>
  );
}
