'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Background() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <>
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#ffc4c4"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Fabric texture simulation with subtle bumps */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.99, 0]}
      >
        <planeGeometry args={[50, 50, 100, 100]} />
        <meshStandardMaterial
          color="#ffdbdb"
          roughness={0.95}
          metalness={0.05}
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  )
}
