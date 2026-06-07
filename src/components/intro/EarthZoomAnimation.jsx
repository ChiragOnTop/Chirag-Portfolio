import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'

export default function EarthZoomAnimation({ onComplete }) {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera - start far from Earth
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.z = 200
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0.95)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create Earth sphere
    const geometry = new THREE.SphereGeometry(50, 64, 64)
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024

    const ctx = canvas.getContext('2d')
    // Create a simple Earth texture
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#1a4d7a')
    gradient.addColorStop(0.5, '#2980b9')
    gradient.addColorStop(1, '#1a4d7a')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add continents (simplified)
    ctx.fillStyle = '#2d5a2d'
    ctx.fillRect(400, 300, 300, 200)
    ctx.fillRect(800, 250, 250, 180)
    ctx.fillRect(1200, 200, 200, 150)

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.MeshPhongMaterial({ map: texture })
    const earth = new THREE.Mesh(geometry, material)
    earth.rotation.y = Math.PI * 0.3
    scene.add(earth)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(100, 50, 100)
    scene.add(directionalLight)

    // Add stars
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 })
    const starsVertices = []
    for (let i = 0; i < 1000; i++) {
      starsVertices.push((Math.random() - 0.5) * 2000)
      starsVertices.push((Math.random() - 0.5) * 2000)
      starsVertices.push((Math.random() - 0.5) * 2000)
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(starsVertices), 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Animation timeline
    let startTime = Date.now()
    const duration = 2000 // 2 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Zoom in towards India/Delhi area
      const startZ = 200
      const endZ = 5
      camera.position.z = startZ + (endZ - startZ) * progress

      // Rotate to face India
      earth.rotation.y = Math.PI * 0.3 + progress * 0.4

      // Slight tilt
      earth.rotation.x = progress * 0.2

      renderer.render(scene, camera)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setTimeout(onComplete, 300)
      }
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [onComplete])

  return <div ref={mountRef} className="fixed inset-0 w-full h-full" />
}
