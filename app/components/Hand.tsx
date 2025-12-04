'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Hand() {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.1
      groupRef.current.rotation.z = Math.sin(timeRef.current * 0.3) * 0.02
    }
  })

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      {/* Palm */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2, 0.5, 3]} />
        <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Thumb */}
      <group position={[-1.2, -0.1, 0.5]} rotation={[0, 0, -0.5]}>
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.25, 0.8, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[-0.3, -0.5, 0]} rotation={[0, 0, -0.3]} castShadow>
          <capsuleGeometry args={[0.22, 0.6, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
      </group>

      {/* Index finger - pointing/touching */}
      <group position={[0.7, 0.2, 1.5]} rotation={[-0.3, 0, 0]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <capsuleGeometry args={[0.22, 1, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.3, 0.1]} rotation={[-0.2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.2, 0.7, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.9, 0.15]} rotation={[-0.1, 0, 0]} castShadow>
          <capsuleGeometry args={[0.18, 0.5, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
      </group>

      {/* Middle finger */}
      <group position={[0, 0.2, 1.6]} rotation={[-0.2, 0, 0]}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <capsuleGeometry args={[0.22, 1.2, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.5, 0.1]} rotation={[-0.15, 0, 0]} castShadow>
          <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
      </group>

      {/* Ring finger */}
      <group position={[-0.7, 0.15, 1.5]} rotation={[-0.25, 0, 0.05]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <capsuleGeometry args={[0.21, 1.1, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.35, 0.1]} rotation={[-0.15, 0, 0]} castShadow>
          <capsuleGeometry args={[0.19, 0.7, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
      </group>

      {/* Pinky finger */}
      <group position={[-1.3, 0.1, 1.2]} rotation={[-0.3, 0, 0.1]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <capsuleGeometry args={[0.18, 0.8, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1, 0.05]} rotation={[-0.2, 0, 0]} castShadow>
          <capsuleGeometry args={[0.17, 0.5, 8, 16]} />
          <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
        </mesh>
      </group>

      {/* Wrist */}
      <mesh position={[0, -0.3, -1.2]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.9, 1, 16]} />
        <meshStandardMaterial color="#ffd4b5" roughness={0.7} metalness={0.2} />
      </mesh>
    </group>
  )
}
