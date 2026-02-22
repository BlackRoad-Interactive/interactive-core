/**
 * BlackRoad Interactive Core
 * Three.js foundation for BlackRoad metaverse and interactive experiences.
 */

export const AGENT_COLORS: Record<string, string> = {
  LUCIDIA: '#00BCD4',
  ALICE: '#4CAF50',
  OCTAVIA: '#9C27B0',
  PRISM: '#FFC107',
  ECHO: '#9E9E9E',
  CIPHER: '#F44336',
};

export interface Agent3D {
  id: string;
  name: string;
  color: string;
  position: { x: number; y: number; z: number };
}

export function createAgentMesh(agent: Agent3D): object {
  return { agent, type: 'mesh', created: Date.now() };
}
