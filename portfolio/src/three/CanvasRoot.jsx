import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useViewportMode from "../hooks/useViewportMode";
import ClusterVisualizer from "./ClusterVisualizer";
import ParticleBackground from "./ParticleBackground";
import { TechStackVisualizer } from "./TechStackVisualizer";

const CameraRig = ({ reducedMotion }) => {
  const target = new THREE.Vector3();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const pointerStrength = reducedMotion ? 0.3 : 1.2;
    const floatStrength = reducedMotion ? 0.08 : 0.42;
    const targetX = state.pointer.x * pointerStrength + Math.sin(time * 0.24) * floatStrength;
    const targetY = state.pointer.y * pointerStrength + Math.cos(time * 0.18) * floatStrength;
    const targetZ = reducedMotion ? 14.5 : 13.8;

    state.camera.position.lerp(target.set(targetX, targetY, targetZ), reducedMotion ? 0.08 : 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

const CanvasRoot = ({ clusterProfile }) => {
  const { isMobile, isTablet, prefersReducedMotion } = useViewportMode();

  const particleCount = prefersReducedMotion ? 600 : isMobile ? 900 : isTablet ? 1500 : 2200;
  const nodeCount = prefersReducedMotion ? 18 : isMobile ? 22 : isTablet ? 28 : clusterProfile.totalNodes;
  const clusterOffset = isTablet ? [0, 0.6, 0] : [7.5, -0.5, -5];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-[#080e1a]">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 46 }}
        dpr={isMobile ? 1 : [1, 1.75]}
        gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#080e1a"]} />
        <ambientLight intensity={0.25} />
        <pointLight position={[8, 10, 8]} intensity={1.1} color="#ff8d86" />
        <pointLight position={[-8, -8, 6]} intensity={0.8} color="#9093ff" />

        <CameraRig reducedMotion={prefersReducedMotion} />

        <Suspense fallback={null}>
          <ParticleBackground count={particleCount} reducedMotion={prefersReducedMotion} />
          <group position={clusterOffset}>
            <ClusterVisualizer nodeCount={nodeCount} reducedMotion={prefersReducedMotion} />
          </group>
          {!prefersReducedMotion && <TechStackVisualizer />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasRoot;
