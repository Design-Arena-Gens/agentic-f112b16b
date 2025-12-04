'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface BrightnessSliderProps {
  position: [number, number, number]
}

export default function BrightnessSlider({ position }: BrightnessSliderProps) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta

    if (glowRef.current) {
      // Bright glow for maximum brightness
      const pulse = Math.sin(timeRef.current * 2) * 0.1 + 0.9
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.5 + pulse * 0.3
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.4) * 0.03
    }
  })

  const sliderWidth = 2
  const brightnessLevel = 1.0 // Maximum brightness

  return (
    <group ref={groupRef} position={position}>
      {/* Background panel - glass effect */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[sliderWidth + 0.6, 0.8, 0.1]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.9}
          transmission={0.5}
          thickness={0.5}
        />
      </mesh>

      {/* Sun icon on the left */}
      <group position={[-sliderWidth / 2 - 0.3, 0, 0.06]}>
        {/* Sun center */}
        <mesh castShadow>
          <circleGeometry args={[0.12, 32]} />
          <meshStandardMaterial color="#FFC107" roughness={0.2} metalness={0.8} emissive="#FFA000" emissiveIntensity={0.4} />
        </mesh>

        {/* Sun rays */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2
          const x = Math.cos(angle) * 0.2
          const y = Math.sin(angle) * 0.2
          return (
            <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]} castShadow>
              <boxGeometry args={[0.08, 0.03, 0.02]} />
              <meshStandardMaterial color="#FFC107" roughness={0.2} metalness={0.8} emissive="#FFA000" emissiveIntensity={0.3} />
            </mesh>
          )
        })}
      </group>

      {/* Slider track background */}
      <mesh position={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[sliderWidth, 0.15, 0.04]} />
        <meshStandardMaterial color="#424242" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Slider filled portion (showing brightness level) */}
      <mesh position={[(-sliderWidth / 2) * (1 - brightnessLevel), 0, 0.07]} castShadow>
        <boxGeometry args={[sliderWidth * brightnessLevel, 0.14, 0.05]} />
        <meshStandardMaterial
          color="#FFC107"
          roughness={0.2}
          metalness={0.8}
          emissive="#FFA000"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Glow effect behind slider */}
      <mesh ref={glowRef} position={[0, 0, 0.04]}>
        <boxGeometry args={[sliderWidth * brightnessLevel + 0.2, 0.3, 0.01]} />
        <meshBasicMaterial color="#FFC107" transparent opacity={0.6} />
      </mesh>

      {/* Slider thumb/handle at maximum position */}
      <group position={[(sliderWidth / 2), 0, 0.1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.2}
            metalness={0.9}
            emissive="#FFC107"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Inner indicator dot */}
        <mesh position={[0, 0, 0.06]} castShadow>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial color="#FFC107" roughness={0.1} metalness={0.9} emissive="#FFA000" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Rim/border */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[sliderWidth + 0.65, 0.85, 0.01]} />
        <meshStandardMaterial
          color="#90CAF9"
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Light emanating from slider */}
      <pointLight position={[0, 0, 0.5]} intensity={1.5} color="#FFC107" distance={3} />
    </group>
  )
}
