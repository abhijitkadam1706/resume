import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleBackground = ({ count = 3000 }) => {
  const meshRef = useRef();
  
  // Pre-calculate positions and attributes for performance
  const [basePositions, scales] = useMemo(() => {
    const basePositions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Widespread 3D cloud
      basePositions[i * 3] = (Math.random() - 0.5) * 50; 
      basePositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      basePositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;
      scales[i] = Math.random();
    }
    return [basePositions, scales];
  }, [count]);

  const vec = new THREE.Vector3();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    // Project mouse to a 3D coordinate roughly on the particle plane
    vec.set(state.pointer.x, state.pointer.y, 0.5);
    vec.unproject(state.camera);
    vec.sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / vec.z;
    const mousePos = new THREE.Vector3().copy(state.camera.position).add(vec.multiplyScalar(distance));

    const positions = meshRef.current.geometry.attributes.position.array;
    
    // Efficiently update 3000 particles in pure JS
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const bx = basePositions[idx];
      const by = basePositions[idx + 1];
      const bz = basePositions[idx + 2];
      
      // Depth movement (Z-axis breathing)
      const targetZ = bz + Math.sin(time * 0.5 + i) * 2;
      
      // Mouse repulsion
      const dx = bx - mousePos.x;
      const dy = by - mousePos.y;
      const distSq = dx * dx + dy * dy;
      
      const interactionDist = 5.0;
      let targetX = bx;
      let targetY = by;
      
      // Check if mouse is near
      if (distSq < interactionDist * interactionDist) {
        const dist = Math.sqrt(distSq);
        const force = (interactionDist - dist) / interactionDist;
        // Push particle away from mouse
        targetX += (dx / dist) * force * 3;
        targetY += (dy / dist) * force * 3;
      }
      
      // Smooth linear interpolation for physics bounce/return
      positions[idx] += (targetX - positions[idx]) * 0.05;
      positions[idx + 1] += (targetY - positions[idx + 1]) * 0.05;
      positions[idx + 2] += (targetZ - positions[idx + 2]) * 0.05;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slow aggregate drift
    meshRef.current.rotation.y = time * 0.02;
    meshRef.current.rotation.x = time * 0.01;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        {/* Clone base array so it doesn't statically overwrite the original memo */}
        <bufferAttribute attach="attributes-position" count={count} array={new Float32Array(basePositions)} itemSize={3} />
        <bufferAttribute attach="attributes-scale" count={count} array={scales} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.12} 
        color="#a6abbb" 
        sizeAttenuation={true} 
        transparent 
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleBackground;
