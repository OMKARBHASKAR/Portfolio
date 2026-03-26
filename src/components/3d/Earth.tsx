'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Stars, MeshDistortMaterial, GradientTexture, MeshTransmissionMaterial } from '@react-three/drei';

export default function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<THREE.Mesh>(null);

  // Procedurally generate a "Data Grid" texture for the Earth
  const gridTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    // Deep dark background
    ctx.fillStyle = '#05070A';
    ctx.fillRect(0, 0, 1024, 512);

    // Draw grid lines
    ctx.strokeStyle = '#1E90FF';
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 1;

    // Meridians
    for (let i = 0; i < 1024; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 512);
      ctx.stroke();
    }
    // Parallels
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1024, i);
      ctx.stroke();
    }

    // Draw "City Lights" dots (simulated points of data impact)
    ctx.fillStyle = '#00FFC6';
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 300; i++) {
       const x = Math.random() * 1024;
       const y = Math.random() * 512;
       // Clusters (pseudo-continents)
       if (Math.sin(x/50) * Math.cos(y/50) > -0.2) {
          ctx.beginPath();
          ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
          ctx.fill();
       }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.1;
    if (gridRef.current) gridRef.current.rotation.y += delta * 0.1;
    if (atmosphereRef.current) atmosphereRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group>
      {/* Deep Space Stars */}
      <Stars radius={300} depth={60} count={15000} factor={6} saturation={0} fade speed={1} />
      
      {/* Outer Atmosphere Glow */}
      <mesh ref={atmosphereRef} scale={[1.08, 1.08, 1.08]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          color="#1E90FF"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        {/* Core Sphere - Dark Blue Marble */}
        <mesh ref={earthRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#05070D"
            roughness={0.7}
            metalness={0.3}
            emissive="#1E90FF"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Data Grid Overlay (The "Techno-Earth" look) */}
        <mesh ref={gridRef} scale={[1.01, 1.01, 1.01]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            transparent
            map={gridTexture}
            alphaMap={gridTexture}
            emissive="#00FFC6"
            emissiveIntensity={2.5}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Subtle Inner Glow */}
        <mesh scale={[0.98, 0.98, 0.98]}>
           <sphereGeometry args={[1, 32, 32]} />
           <meshBasicMaterial color="#001133" transparent opacity={0.5} />
        </mesh>
      </Float>

      {/* Cinematic Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 5, 5]} intensity={2} color="#1E90FF" />
      <pointLight position={[-10, -5, -5]} intensity={1.5} color="#00FFC6" />
    </group>
  );
}
