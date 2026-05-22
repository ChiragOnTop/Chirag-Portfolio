import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function Sun() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2.2, 32, 32]} />
      <meshBasicMaterial color="#ffdd88" />
      <pointLight intensity={4} distance={80} color="#ffaa44" />
    </mesh>
  )
}

function Planet({ position, color, size, speed }) {
  const ref = useRef()
  const origin = useMemo(() => new THREE.Vector3(...position), [position])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.position.x = origin.x + Math.cos(t) * 0.4
    ref.current.position.z = origin.z + Math.sin(t) * 0.4
    ref.current.rotation.y = t
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
    </mesh>
  )
}

function Earth({ cameraRef }) {
  const earthRef = useRef()
  const atmosRef = useRef()

  useFrame((state) => {
    if (earthRef.current) earthRef.current.rotation.y = state.clock.elapsedTime * 0.08
    if (atmosRef.current) atmosRef.current.rotation.y = state.clock.elapsedTime * 0.06

    if (cameraRef?.current) {
      const cam = cameraRef.current
      cam.lookAt(12, 0, -28)
    }
  })

  return (
    <group position={[12, 0, -28]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.8, 48, 48]} />
        <meshStandardMaterial
          color="#1a5fb4"
          emissive="#0a2a5a"
          emissiveIntensity={0.15}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      <mesh ref={atmosRef} scale={1.08}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color="#6ec8ff"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh scale={1.15}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color="#a8e6ff"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

function SceneContent({ cameraRef, phase }) {
  const groupRef = useRef()

  useFrame((state) => {
    const cam = state.camera
    const t = state.clock.elapsedTime

    if (phase === 'space') {
      cam.position.z = THREE.MathUtils.lerp(cam.position.z, 22, 0.02)
      cam.position.y = THREE.MathUtils.lerp(cam.position.y, 2 + Math.sin(t * 0.2) * 0.5, 0.02)
    } else if (phase === 'zoom') {
      const progress = Math.min(1, (t - 2) * 0.35)
      cam.position.z = THREE.MathUtils.lerp(22, 6, progress)
      cam.position.x = THREE.MathUtils.lerp(0, 8, progress)
      cam.position.y = THREE.MathUtils.lerp(2, 0.5, progress)
    } else if (phase === 'earth') {
      cam.position.z = THREE.MathUtils.lerp(cam.position.z, 3.5, 0.04)
      cam.position.x = THREE.MathUtils.lerp(cam.position.x, 10, 0.04)
      cam.position.y = THREE.MathUtils.lerp(cam.position.y, 0.2, 0.04)
    }

    if (groupRef.current && phase === 'space') {
      groupRef.current.rotation.y = t * 0.02
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 5, 5]} intensity={0.6} color="#ffffff" />
      <Stars radius={120} depth={80} count={6000} factor={3} saturation={0} fade speed={0.5} />
      <group ref={groupRef}>
        <Sun />
        <Planet position={[-8, 0.5, -12]} color="#c4a484" size={0.5} speed={0.4} />
        <Planet position={[6, -0.3, -16]} color="#e8b86d" size={0.7} speed={0.25} />
        <Planet position={[-5, -1, -20]} color="#9bb0c4" size={0.6} speed={0.3} />
        <Planet position={[4, 1, -10]} color="#d4a574" size={0.35} speed={0.55} />
      </group>
      <Earth cameraRef={cameraRef} />
    </>
  )
}

export default function SpaceIntroScene({ phase = 'space' }) {
  const cameraRef = useRef()

  return (
    <Canvas
      camera={{ position: [0, 4, 35], fov: 55, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: '#020208' }}
      onCreated={({ camera }) => {
        cameraRef.current = camera
      }}
    >
      <fog attach="fog" args={['#020208', 15, 90]} />
      <SceneContent cameraRef={cameraRef} phase={phase} />
    </Canvas>
  )
}
