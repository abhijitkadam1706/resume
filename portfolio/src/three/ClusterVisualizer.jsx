import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const ClusterVisualizer = ({ nodeCount = 40 }) => {
  const meshRef = useRef();
  const linesGroupRef = useRef();
  const materialRef = useRef();
  
  // Custom colors for CPU vs GPU nodes
  const COLOR_CPU = '#3b82f6'; // Blue
  const COLOR_GPU = '#a855f7'; // Purple

  const { positions, Object3D_dummy, colors, linePoints } = useMemo(() => {
    const positions = [];
    const colors = new Float32Array(nodeCount * 3);
    const color = new THREE.Color();
    const Object3D_dummy = new THREE.Object3D();
    
    // Generate cluster nodes
    for (let i = 0; i < nodeCount; i++) {
      const p = [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      ];
      positions.push(p);
      
      // 70% CPU (Blue), 30% GPU (Purple)
      const isGPU = Math.random() > 0.7;
      color.set(isGPU ? COLOR_GPU : COLOR_CPU);
      color.toArray(colors, i * 3);
    }

    // Connect nearby nodes to form physical network graph topology
    const linePoints = [];
    for (let i = 0; i < nodeCount; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[i][0] - positions[j][0];
        const dy = positions[i][1] - positions[j][1];
        const dz = positions[i][2] - positions[j][2];
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
        // Distance threshold for connections
        if (dist < 4.5 && connections < 3) {
          linePoints.push(positions[i], positions[j]);
          connections++;
        }
      }
    }

    return { positions, Object3D_dummy, colors, linePoints };
  }, [nodeCount]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Update instances: Pulsing animation and bobbing
    for (let i = 0; i < nodeCount; i++) {
      const [x, y, z] = positions[i];
      // Pulse size based on sin waves avoiding constant re-instantiation
      const pulse = 1 + Math.sin(time * 3 + i) * 0.2;
      
      Object3D_dummy.position.set(x, y + Math.sin(time + i) * 0.4, z);
      Object3D_dummy.scale.set(pulse, pulse, pulse);
      Object3D_dummy.rotation.x = time * 0.2;
      Object3D_dummy.rotation.y = time * 0.2;
      Object3D_dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, Object3D_dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    
    // Rotate the cluster slowly
    meshRef.current.rotation.y = time * 0.05;
    if (linesGroupRef.current) {
      linesGroupRef.current.rotation.y = time * 0.05;
    }

    // Animate the dashed lines to simulate data transfer
    if (linesGroupRef.current && linesGroupRef.current.material) {
      linesGroupRef.current.material.dashOffset -= delta * 2;
    }
  });

  return (
    <group>
      {/* High-perf rendering of clustered boxes with high emissive glow */}
      <instancedMesh ref={meshRef} args={[null, null, nodeCount]}>
        <boxGeometry args={[0.3, 0.3, 0.3]}>
          <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
        </boxGeometry>
        {/* Extreme glow using high emissive intensity */}
        <meshStandardMaterial 
          vertexColors 
          toneMapped={false} 
          roughness={0.1} 
          metalness={0.9} 
          emissiveIntensity={3.0} 
          emissive="#ffffff"
        />
      </instancedMesh>
      
      {/* Render complex animated lines */}
      {linePoints.length > 0 && (
        <group>
          <Line
            ref={linesGroupRef}
            points={linePoints}
            color="#4f4f66"
            lineWidth={1}
            transparent
            opacity={0.4}
            segments
            dashed={true}
            dashScale={10}
            dashSize={2}
            dashRatio={0.5}
          />
        </group>
      )}
    </group>
  );
};

export default ClusterVisualizer;
