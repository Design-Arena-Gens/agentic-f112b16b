'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import MuteIcon from './MuteIcon'
import BrightnessSlider from './BrightnessSlider'

export default function ControlIcons() {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)

  useFrame((state, delta) => {
    timeRef.current += delta
    if (groupRef.current) {
      groupRef.current.position.y = 2 + Math.sin(timeRef.current * 0.8) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {/* Mute icon - positioned near index finger */}
      <MuteIcon position={[0.7, 2.5, 1.5]} />

      {/* Brightness slider - positioned centrally */}
      <BrightnessSlider position={[-0.5, 1.5, 0.5]} />
    </group>
  )
}
