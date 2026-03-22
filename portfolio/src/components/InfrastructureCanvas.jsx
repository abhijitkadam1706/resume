import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Torus, Line } from '@react-three/drei';

// A dynamic central node representing the main orchestrator (e.g. EKS control plane or SLURM head node)
const CoreNode = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#080e1a" emissive="#ff8d86" emissiveIntensity={0.8} wireframe />
      </mesh>
      {/* Outer rings simulating data paths */}
      <Torus args={[2.5, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#424855" />
      </Torus>
      <Torus args={[3.2, 0.02, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <meshBasicMaterial color="#424855" />
      </Torus>
    </Float>
  );
};

// Edge nodes representing compute instances/containers
const EdgeNodes = () => {
  const groupRef = useRef();
  
  const nodes = React.useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 3.5 + Math.random();
      return {
        position: [Math.cos(angle) * radius, (Math.random() - 0.5) * 2, Math.sin(angle) * radius],
        type: i % 2 === 0 ? 'compute' : 'storage'
      };
    });
  }, []);

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * -0.1;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <group key={i} position={node.position}>
          <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <mesh>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial 
                color="#080e1a" 
                emissive={node.type === 'compute' ? "#ff8d86" : "#9093ff"} 
                emissiveIntensity={1.5} 
              />
            </mesh>
          </Float>
        </group>
      ))}
      
      {/* Connections between nodes to show a cluster network */}
      {nodes.map((node, i) => {
        const nextNode = nodes[(i + 1) % nodes.length];
        return (
          <Line
            key={`line-${i}`}
            points={[node.position, nextNode.position]}
            color="#424855"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        );
      })}
      {nodes.map((node, i) => (
        <Line
          key={`core-line-${i}`}
          points={[[0, 0, 0], node.position]}
          color="#ff8d86"
          lineWidth={1}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
};

const InfrastructureCanvas = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none hidden lg:block left-1/4">
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff8d86" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#9093ff" />
        
        <CoreNode />
        <EdgeNodes />
      </Canvas>
    </div>
  );
};

export default InfrastructureCanvas;
