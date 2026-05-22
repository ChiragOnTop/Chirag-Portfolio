import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { techStack } from '../../data/portfolio'

const ORBIT_RADIUS = [2.2, 3.2, 4.2, 5]
const ORBIT_SPEED = [0.35, -0.28, 0.22, -0.18]

function TechNode({ tech, index, hovered, setHovered }) {
  const ref = useRef()
  const orbit = tech.orbit % 4
  const radius = ORBIT_RADIUS[orbit]
  const speed = ORBIT_SPEED[orbit]
  const angleOffset = (index * 0.7) % (Math.PI * 2)
  const sizeMap = { sm: 0.12, md: 0.16, lg: 0.2, xl: 0.28 }
  const size = sizeMap[tech.size] || 0.16

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + angleOffset
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t * 2) * 0.15
    ref.current.rotation.y = t
  })

  const isActive = hovered === tech.name

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={() => setHovered(tech.name)}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={isActive ? '#00e5ff' : '#7c3aed'}
          emissive={isActive ? '#00e5ff' : '#1a1a2e'}
          emissiveIntensity={isActive ? 0.8 : 0.2}
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      {isActive && (
        <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="glass whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-[10px] tracking-widest uppercase">
            {tech.name}
          </div>
        </Html>
      )}
    </group>
  )
}

function OrbitRings() {
  return (
    <>
      {ORBIT_RADIUS.map((r, i) => (
        <mesh key={r} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[r - 0.02, r + 0.02, 64]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.08 + i * 0.02} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  )
}

function NeuralCore() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.2
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.45, 1]} />
      <meshStandardMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        emissiveIntensity={0.6}
        wireframe
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function Scene() {
  const [hovered, setHovered] = useState(null)

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#00e5ff" />
      <pointLight position={[-4, -2, 4]} intensity={0.6} color="#8b5cf6" />
      <OrbitRings />
      <NeuralCore />
      {techStack.map((tech, i) => (
        <TechNode
          key={tech.name}
          tech={tech}
          index={i}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </>
  )
}

export default function SkillOrbit() {
  return (
    <div className="relative mx-auto h-[min(520px,70vh)] w-full max-w-4xl">
      <Canvas camera={{ position: [0, 2.5, 9], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
        <Scene />
      </Canvas>
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="font-mono text-[10px] tracking-[0.3em] text-ink-muted uppercase">
          Hover nodes to scan capabilities
        </p>
      </div>
    </div>
  )
}
