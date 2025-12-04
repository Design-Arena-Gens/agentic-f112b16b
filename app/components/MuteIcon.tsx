'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MuteIconProps {
  position: [number, number, number]
}

export default function MuteIcon({ position }: MuteIconProps) {
  const groupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta

    if (glowRef.current) {
      // Pulsing glow effect for active state
      const pulse = Math.sin(timeRef.current * 3) * 0.2 + 0.8
      glowRef.current.scale.setScalar(1 + pulse * 0.1)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.3 + pulse * 0.2
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.5) * 0.05
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Background panel - glass effect */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 1.2, 0.1]} />
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

      {/* Glow effect for active state */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#4CAF50" transparent opacity={0.4} />
      </mesh>

      {/* Speaker icon - left part */}
      <mesh position={[-0.25, 0, 0.06]} castShadow>
        <boxGeometry args={[0.15, 0.35, 0.05]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Speaker cone */}
      <mesh position={[-0.1, 0, 0.06]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.25, 0.3, 4]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* X mark indicating muted state - line 1 */}
      <mesh position={[0.2, 0, 0.08]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.5, 0.08, 0.04]} />
        <meshStandardMaterial color="#ff4444" roughness={0.2} metalness={0.8} emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>

      {/* X mark indicating muted state - line 2 */}
      <mesh position={[0.2, 0, 0.08]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.5, 0.08, 0.04]} />
        <meshStandardMaterial color="#ff4444" roughness={0.2} metalness={0.8} emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>

      {/* Rim/border */}
      <mesh position={[0, 0, 0.05]}>
        <ringGeometry args={[0.55, 0.58, 32]} />
        <meshStandardMaterial color="#90CAF9" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Activation indicator light */}
      <pointLight position={[0, 0, 0.3]} intensity={0.8} color="#4CAF50" distance={2} />
    </group>
  )
}
