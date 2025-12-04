'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Hand from './Hand'
import ControlIcons from './ControlIcons'
import Background from './Background'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      <pointLight position={[0, 8, 0]} intensity={0.5} />

      <Background />
      <Hand />
      <ControlIcons />

      <OrbitControls
        enablePan={false}
        minDistance={8}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
