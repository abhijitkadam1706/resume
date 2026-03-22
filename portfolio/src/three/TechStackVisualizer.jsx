import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const tools = [
  // Group 1: Hero to About transition
  { name: "AWS", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", scale: 4, pos: [-4, 4, -4], floatIntensity: 2 },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg", scale: 2.5, pos: [5, 2, -5], floatIntensity: 1.5 },
  
  // Group 2: About to Experience transition
  { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", scale: 2.5, pos: [-6, -4, -6], floatIntensity: 3 },
  { name: "Terraform", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-plain.svg", scale: 2.5, pos: [4, -8, -7], floatIntensity: 2.5 },
  { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", scale: 2.5, pos: [-1, -12, -8], floatIntensity: 2 },

  // Group 3: Experience to Projects transition 
  { name: "Jenkins", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg", scale: 2.5, pos: [-7, -18, -5], floatIntensity: 1.8 },
  { name: "Ansible", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg", scale: 2.5, pos: [6, -22, -6], floatIntensity: 2.2 },
  
  // Group 4: Projects deeper stack
  { name: "Prometheus", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg", scale: 2.5, pos: [-4, -28, -7], floatIntensity: 2.8 },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", scale: 2.5, pos: [4, -32, -8], floatIntensity: 1.5 },
  { name: "Azure", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", scale: 2.5, pos: [0, -38, -9], floatIntensity: 2.5 },
];

const ToolLogo = ({ url, scale }) => {
  // Use native TextureLoader instead of SVGLoader to avoid gradient parse failures
  const texture = useLoader(THREE.TextureLoader, url);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  
  return (
    <mesh>
      <planeGeometry args={[scale, scale]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        opacity={0.15} // Dimmed for cinematic background effect without blocking text
        alphaTest={0.05}
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
};

export const TechStackVisualizer = () => {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Smoothly rotate and lift the entire tech stack group based on scroll depth
    const maxScroll = document.body.scrollHeight - window.innerHeight || 1;
    const scrollProgress = window.scrollY / maxScroll;
    
    // Lerp towards the target position
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -10 + scrollProgress * 50, // Massive scroll lift needed for deep Y stack
      delta * 2
    );
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollProgress * Math.PI,
      delta * 2
    );
  });

  return (
    <group ref={groupRef} position={[0, -10, 0]}>
      {tools.map((tool) => (
        <Float
          key={tool.name}
          speed={2} 
          rotationIntensity={1.5} 
          floatIntensity={tool.floatIntensity}
          position={tool.pos}
        >
          <ToolLogo url={tool.url} scale={tool.scale} />
        </Float>
      ))}
    </group>
  );
};
