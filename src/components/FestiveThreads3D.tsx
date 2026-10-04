import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

const threadColors = ["#e82778", "#f48b22", "#f5d547", "#3da54a", "#1aa6a6"] as const;

function Threads() {
  const group = useRef<Group>(null);
  useFrame(({ pointer }, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += (pointer.y * 0.12 - group.current.rotation.x) * (1 - Math.exp(-3 * delta));
    group.current.rotation.z += (pointer.x * 0.1 - group.current.rotation.z) * (1 - Math.exp(-3 * delta));
  });
  return (
    <group ref={group} rotation={[0.2, 0, -0.15]}>
      {[-2, -1, 0, 1, 2].map((x, index) => (
        <group key={x} position={[x * 0.72, Math.sin(index) * 0.35, 0]} rotation-z={index * 0.24}>
          <mesh castShadow>
            <torusGeometry args={[0.56, 0.11, 16, 64]} />
            <meshStandardMaterial color={threadColors[index] ?? threadColors[0]} roughness={0.5} metalness={0.1} />
          </mesh>
          <mesh position={[0.56, 0, 0]} castShadow>
            <sphereGeometry args={[0.16, 18, 18]} />
            <meshStandardMaterial color="#fff0c9" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function FestiveThreads3D() {
  return (
    <div className="threads-canvas" aria-hidden="true">
      <Canvas dpr={1} camera={{ position: [0, 0, 6.7], fov: 48 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={2.4} color="#fff0c9" />
        <pointLight position={[-4, -1, 3]} intensity={2} color="#e82778" />
        <Threads />
      </Canvas>
    </div>
  );
}
