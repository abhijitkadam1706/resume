import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const seededValue = (seed) => {
  const value = Math.sin(seed * 91.345 + 17.123) * 43758.5453;
  return value - Math.floor(value);
};

const buildClusterData = (nodeCount) => {
  const cpuColor = new THREE.Color("#66a6ff");
  const gpuColor = new THREE.Color("#9b7bff");
  const controlColor = new THREE.Color("#ff8d86");
  const colors = new Float32Array(nodeCount * 3);
  const nodes = [];

  for (let index = 0; index < nodeCount; index += 1) {
    const isController = index < 4;
    const type = isController ? "controller" : index % 5 === 0 ? "gpu" : "cpu";
    const localIndex = isController ? index : index - 4;
    const column = (localIndex % 8) - 3.5;
    const layer = isController ? 0 : Math.floor(localIndex / 8);
    const x = column * 0.95 + (seededValue(index + 1) - 0.5) * 0.25;
    const y =
      (type === "controller" ? 0 : type === "gpu" ? 1.95 : -1.55) +
      (seededValue(index + 2) - 0.5) * 0.18;
    const z = (layer - 1.2) * 1.45 + (seededValue(index + 3) - 0.5) * 0.28;

    nodes.push({
      type,
      position: [x, y, z],
      phase: seededValue(index + 4) * Math.PI * 2,
    });

    const color = type === "controller" ? controlColor : type === "gpu" ? gpuColor : cpuColor;
    color.toArray(colors, index * 3);
  }

  const lines = [];
  const workerNodes = nodes.slice(4);
  nodes.slice(0, 4).forEach((controller, controllerIndex) => {
    workerNodes
      .filter((_, workerIndex) => workerIndex % 4 === controllerIndex)
      .slice(0, 6)
      .forEach((worker) => {
        lines.push([controller.position, worker.position]);
      });
  });

  workerNodes.forEach((node, index) => {
    const nextNode = workerNodes[index + 1];
    if (nextNode && Math.abs(node.position[1] - nextNode.position[1]) < 0.4) {
      lines.push([node.position, nextNode.position]);
    }
  });

  const jobPaths = workerNodes.slice(0, 6).map((node, index) => ({
    start: new THREE.Vector3(...nodes[index % 4].position),
    end: new THREE.Vector3(...node.position),
    color: index % 2 === 0 ? "#ff8d86" : "#9093ff",
    offset: index * 0.16,
  }));

  return { colors, jobPaths, lines, nodes };
};

const NetworkLine = ({ points, color, opacity }) => {
  const positions = useMemo(
    () => new Float32Array(points.flatMap((point) => point)),
    [points],
  );

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  );
};

const ClusterVisualizer = ({ nodeCount, reducedMotion }) => {
  const meshRef = useRef(null);
  const groupRef = useRef(null);
  const tracerRefs = useRef([]);
  const dummy = useRef(new THREE.Object3D());
  const { colors, jobPaths, lines, nodes } = useMemo(
    () => buildClusterData(nodeCount),
    [nodeCount],
  );

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }

    const time = state.clock.elapsedTime;

    nodes.forEach((node, index) => {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(time * 2.2 + node.phase) * 0.12;
      const bob = reducedMotion ? 0 : Math.sin(time * 1.4 + node.phase) * 0.08;
      const baseScale = node.type === "controller" ? 1.3 : node.type === "gpu" ? 1.1 : 0.95;

      dummy.current.position.set(
        node.position[0],
        node.position[1] + bob,
        node.position[2],
      );
      dummy.current.scale.setScalar(baseScale * pulse);
      dummy.current.rotation.x = node.type === "controller" ? time * 0.25 : 0;
      dummy.current.rotation.y = time * 0.18 + node.phase;
      dummy.current.updateMatrix();
      meshRef.current.setMatrixAt(index, dummy.current.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = reducedMotion ? 0.1 : time * 0.08;
      groupRef.current.rotation.x = reducedMotion ? 0 : Math.sin(time * 0.22) * 0.04;
    }

    jobPaths.forEach((path, index) => {
      const tracer = tracerRefs.current[index];
      if (!tracer) {
        return;
      }

      const progress = (time * 0.24 + path.offset) % 1;
      tracer.position.lerpVectors(path.start, path.end, progress);
      tracer.scale.setScalar(reducedMotion ? 0.7 : 0.9 + Math.sin(time * 4 + index) * 0.08);
    });
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, nodeCount]}>
        {/* Blade server geometry format: wide, thin, deep */}
        <boxGeometry args={[0.85, 0.15, 0.65]}>
          <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
        </boxGeometry>
        <meshStandardMaterial
          vertexColors
          roughness={0.1}
          metalness={0.9}
          emissive="#ffffff"
          emissiveIntensity={0.4}
          transparent={true}
          opacity={0.12}
          depthWrite={false}
          toneMapped={false}
        />
      </instancedMesh>

      {lines.map((line, index) => (
        <NetworkLine
          key={`line-${index}`}
          points={line}
          color={index % 3 === 0 ? "#33415e" : "#283246"}
          opacity={0.42}
        />
      ))}

      {jobPaths.map((path, index) => (
        <mesh
          key={`trace-${path.offset}`}
          ref={(node) => {
            tracerRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.08, 10, 10]} />
          <meshBasicMaterial color={path.color} />
        </mesh>
      ))}
    </group>
  );
};

export default ClusterVisualizer;
