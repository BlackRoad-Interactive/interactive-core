/**
 * BlackRoad Agent Scene — 3D visualization of the agent mesh.
 * Uses Three.js to render agents as glowing spheres in a dark void.
 */

import * as THREE from 'three';
import { AGENT_COLORS, Agent3D } from './index';

export interface SceneConfig {
  container: HTMLElement;
  agentCount?: number;
  rotationSpeed?: number;
}

export class AgentScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private agents: Map<string, THREE.Mesh> = new Map();
  private animationId: number | null = null;
  private config: Required<SceneConfig>;

  constructor(config: SceneConfig) {
    this.config = {
      agentCount: 6,
      rotationSpeed: 0.001,
      ...config,
    };

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    const { width, height } = config.container.getBoundingClientRect();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    this.camera.position.z = 20;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    config.container.appendChild(this.renderer.domElement);

    this.addLights();
    this.addStarfield();
  }

  private addLights(): void {
    const ambient = new THREE.AmbientLight(0x111111);
    this.scene.add(ambient);
    
    const point = new THREE.PointLight(0xffffff, 1, 100);
    point.position.set(0, 0, 10);
    this.scene.add(point);
  }

  private addStarfield(count = 2000): void {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    this.scene.add(new THREE.Points(geo, mat));
  }

  addAgent(agent: Agent3D): void {
    const color = AGENT_COLORS[agent.name] ?? '#ffffff';
    const geo = new THREE.SphereGeometry(agent.size ?? 1, 32, 32);
    const mat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color),
      emissiveIntensity: 0.3,
      shininess: 80,
    });
    
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...agent.position);
    mesh.userData = { agent };
    
    this.scene.add(mesh);
    this.agents.set(agent.name, mesh);
  }

  addConnectionLine(from: string, to: string, opacity = 0.3): void {
    const a = this.agents.get(from);
    const b = this.agents.get(to);
    if (!a || !b) return;

    const points = [a.position.clone(), b.position.clone()];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity,
    });
    
    this.scene.add(new THREE.Line(geo, mat));
  }

  start(): void {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      
      // Rotate all agents around Y axis
      this.agents.forEach(mesh => {
        mesh.rotation.y += this.config.rotationSpeed;
        // Gentle float
        mesh.position.y += Math.sin(Date.now() * 0.001 + mesh.userData.agent.name.charCodeAt(0)) * 0.002;
      });
      
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resize(): void {
    const { width, height } = this.config.container.getBoundingClientRect();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

/** Spawn the default 6-agent constellation */
export function createDefaultScene(container: HTMLElement): AgentScene {
  const scene = new AgentScene({ container });

  const agents: Agent3D[] = [
    { name: 'LUCIDIA', type: 'reasoning', position: [0, 0, 0], size: 1.5 },
    { name: 'ALICE', type: 'worker', position: [8, 0, 0], size: 1.0 },
    { name: 'OCTAVIA', type: 'devops', position: [-8, 0, 0], size: 1.0 },
    { name: 'PRISM', type: 'analytics', position: [0, 8, 0], size: 1.0 },
    { name: 'ECHO', type: 'memory', position: [0, -8, 0], size: 1.0 },
    { name: 'CIPHER', type: 'security', position: [0, 0, 8], size: 1.0 },
  ];

  agents.forEach(a => scene.addAgent(a));
  
  // Add connection lines
  ['ALICE', 'OCTAVIA', 'PRISM', 'ECHO', 'CIPHER'].forEach(name => {
    scene.addConnectionLine('LUCIDIA', name, 0.2);
  });

  scene.start();
  return scene;
}
