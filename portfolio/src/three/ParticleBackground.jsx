import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const seededValue = (seed) => {
  const value = Math.sin(seed * 53.137 + 11.63) * 43758.5453;
  return value - Math.floor(value);
};

const ParticleBackground = ({ count, reducedMotion }) => {
  const pointsRef = useRef(null);
  const rayRef = useMemo(() => new THREE.Vector3(), []);
  const worldMouseRef = useMemo(() => new THREE.Vector3(), []);

  const { basePositions, positions } = useMemo(() => {
    const source = new Float32Array(count * 3);
    const active = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      const x = (seededValue(index + 1) - 0.5) * 48;
      const y = (seededValue(index + 2) - 0.5) * 38;
      const z = (seededValue(index + 3) - 0.5) * 28 - 10;

      source[offset] = x;
      source[offset + 1] = y;
      source[offset + 2] = z;

      active[offset] = x;
      active[offset + 1] = y;
      active[offset + 2] = z;
    }

    return {
      basePositions: source,
      positions: active,
    };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) {
      return;
    }

    const time = state.clock.elapsedTime;
    const positionArray = pointsRef.current.geometry.attributes.position.array;

    if (!reducedMotion) {
      rayRef.set(state.pointer.x, state.pointer.y, 0.4);
      rayRef.unproject(state.camera);
      rayRef.sub(state.camera.position).normalize();
      const distance = -state.camera.position.z / rayRef.z;
      worldMouseRef.copy(state.camera.position).add(rayRef.multiplyScalar(distance));
    }

    for (let index = 0; index < count; index += 1) {
      const offset = index * 3;
      const baseX = basePositions[offset];
      const baseY = basePositions[offset + 1];
      const baseZ = basePositions[offset + 2];
      const drift = reducedMotion ? 0 : Math.sin(time * 0.55 + index * 0.03) * 1.6;

      let targetX = baseX;
      let targetY = baseY;

      if (!reducedMotion) {
        const dx = baseX - worldMouseRef.x;
        const dy = baseY - worldMouseRef.y;
        const distanceSquared = dx * dx + dy * dy;
        const interactionRadius = 18;

        if (distanceSquared > 0.001 && distanceSquared < interactionRadius * interactionRadius) {
          const distance = Math.sqrt(distanceSquared);
          const force = (interactionRadius - distance) / interactionRadius;
          targetX += (dx / distance) * force * 2.1;
          targetY += (dy / distance) * force * 2.1;
        }
      }

      positionArray[offset] += (targetX - positionArray[offset]) * 0.045;
      positionArray[offset + 1] += (targetY - positionArray[offset + 1]) * 0.045;
      positionArray[offset + 2] += (baseZ + drift - positionArray[offset + 2]) * 0.035;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = reducedMotion ? 0.04 : time * 0.018;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={reducedMotion ? 0.08 : 0.11}
        color="#a7b1ca"
        transparent
        opacity={0.28}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleBackground;
