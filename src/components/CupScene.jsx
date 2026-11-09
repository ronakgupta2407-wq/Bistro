import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'

function CoffeeCup() {
  const cup = useRef()
  const steam = useRef()

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime()
    if (cup.current) {
      cup.current.rotation.y = Math.sin(time * 0.24) * 0.18 + pointer.x * 0.18
      cup.current.rotation.x = pointer.y * 0.08
    }
    if (steam.current) steam.current.rotation.y = Math.sin(time * 0.35) * 0.08
  })

  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.24}>
        <group ref={cup} position={[0, -0.02, 0]}>
          <mesh castShadow position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.8, 0.62, 1.05, 48, 1, true]} />
            <meshStandardMaterial color="#f0e2cd" roughness={0.22} side={2} />
          </mesh>
          <mesh position={[0, -0.62, 0]} castShadow>
            <cylinderGeometry args={[0.62, 0.6, 0.1, 48]} />
            <meshStandardMaterial color="#d9c4a4" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.43, 0]}>
            <cylinderGeometry args={[0.79, 0.79, 0.035, 48]} />
            <meshStandardMaterial color="#fff4e1" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.68, 0.68, 0.018, 48]} />
            <meshStandardMaterial color="#53301c" roughness={0.2} />
          </mesh>
          <mesh position={[0.86, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.3, 0.065, 14, 40]} />
            <meshStandardMaterial color="#d9c4a4" roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.72, 0]} castShadow>
            <cylinderGeometry args={[0.93, 0.93, 0.12, 48]} />
            <meshStandardMaterial color="#8f5b38" roughness={0.35} />
          </mesh>
          <mesh position={[0, -0.81, 0]} castShadow>
            <cylinderGeometry args={[0.72, 0.72, 0.08, 48]} />
            <meshStandardMaterial color="#d9c4a4" roughness={0.3} />
          </mesh>
        </group>
        <group ref={steam} position={[0, 0.6, 0]}>
          {[0, 1, 2].map((index) => (
            <mesh key={index} position={[(index - 1) * 0.2, 0.38 + index * 0.1, 0]}>
              <torusGeometry args={[0.085, 0.012, 8, 20, Math.PI]} />
              <meshBasicMaterial color="#f1d7b1" transparent opacity={0.48 - index * 0.08} />
            </mesh>
          ))}
        </group>
      </Float>
      <Sparkles count={22} scale={3.5} size={1.7} speed={0.18} color="#d5aa70" opacity={0.34} />
    </group>
  )
}

function PlateDish({ accent = '#c9a56a' }) {
  const dish = useRef()
  useFrame(({ clock, pointer }) => {
    if (!dish.current) return
    dish.current.rotation.y = clock.getElapsedTime() * 0.18 + pointer.x * 0.3
    dish.current.rotation.x = pointer.y * 0.08
  })

  return (
    <Float speed={1} rotationIntensity={0.08} floatIntensity={0.16}>
      <group ref={dish}>
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <cylinderGeometry args={[1.05, 1.05, 0.12, 64]} />
          <meshStandardMaterial color="#f4ead9" roughness={0.22} />
        </mesh>
        <mesh position={[0, -0.025, 0]}>
          <torusGeometry args={[0.86, 0.018, 10, 64]} />
          <meshStandardMaterial color={accent} metalness={0.45} roughness={0.25} />
        </mesh>
        {Array.from({ length: 11 }, (_, index) => {
          const angle = (index / 11) * Math.PI * 2
          const radius = index % 2 ? 0.39 : 0.48
          return (
            <mesh key={index} position={[Math.cos(angle) * radius, 0.11, Math.sin(angle) * radius]} rotation={[0.2, angle, 0]}>
              <capsuleGeometry args={[0.065, 0.26 + (index % 3) * 0.07, 5, 10]} />
              <meshStandardMaterial color={index % 3 === 0 ? '#e5c27e' : index % 3 === 1 ? '#c87943' : '#82906a'} roughness={0.48} />
            </mesh>
          )
        })}
        <mesh position={[0.05, 0.17, 0.05]}>
          <sphereGeometry args={[0.16, 20, 20]} />
          <meshStandardMaterial color="#efe1bd" roughness={0.26} />
        </mesh>
      </group>
    </Float>
  )
}

function Scene({ kind }) {
  return (
    <>
      <ambientLight intensity={1.45} />
      <directionalLight position={[3, 5, 4]} intensity={3.2} color="#ffe6bf" />
      <pointLight position={[-3, 1, -2]} intensity={15} color="#c87943" />
      {kind === 'dish' ? <PlateDish /> : <CoffeeCup />}
    </>
  )
}

export function CoffeeCupCanvas({ className = '' }) {
  return (
    <Canvas className={className} dpr={[1, 1.5]} camera={{ position: [0, 0.5, 4.2], fov: 34 }} gl={{ antialias: false, alpha: true }} shadows={false}>
      <Scene kind="coffee" />
    </Canvas>
  )
}

export function DishCanvas({ className = '' }) {
  return (
    <Canvas className={className} dpr={[1, 1.5]} camera={{ position: [0, 1.6, 4.8], fov: 36 }} gl={{ antialias: false, alpha: true }} shadows={false}>
      <Scene kind="dish" />
    </Canvas>
  )
}
