import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import ParticleBackground from './ParticleBackground';
import ClusterVisualizer from './ClusterVisualizer';
import * as THREE from 'three';

// CameraRig provides smooth parallax and floating motion based on the pointer
const CameraRig = () => {
  const vec = new THREE.Vector3();
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Smooth camera floating motion
    const floatX = Math.sin(time * 0.3) * 0.5;
    const floatY = Math.sin(time * 0.4) * 0.5;
    
    // Parallax tracking using pointer (normalized -1 to 1)
    const targetX = state.pointer.x * 2 + floatX;
    const targetY = state.pointer.y * 2 + floatY;

    // Linearly interpolate current camera to target position for physics dampening
    state.camera.position.lerp(vec.set(targetX, targetY, 15), 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

const CanvasRoot = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#080e1a]">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]} // Optimize performance by clamping pixel ratio (max 2)
        gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={['#080e1a']} />
        
        {/* Cinematic lighting to match the Obsidian Forge theme */}
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff8d86" />
        <pointLight position={[-10, -20, -10]} intensity={1} color="#9093ff" />
        <directionalLight position={[0, -5, 10]} intensity={0.5} color="#424855" />

        <CameraRig />

        <Suspense fallback={null}>
          <ParticleBackground count={3000} />
          
          {/* Render large cluster on the right side of the screen like the original Hero node */}
          <group position={[5, 0, 0]}>
            <ClusterVisualizer nodeCount={40} />
          </group>
        </Suspense>

        {/* Preload ensures smooth loading compiled shaders */}
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CanvasRoot;
