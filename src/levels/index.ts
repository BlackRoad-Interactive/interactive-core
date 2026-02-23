/**
 * BlackRoad RPG — Zone Level Definitions
 * Each agent has a home zone with unique encounters and lore.
 */

export interface Zone {
  id: string;
  name: string;
  guardian: string;
  color: string;
  description: string;
  encounters: Encounter[];
  reward: string;
  requiredLevel: number;
}

export interface Encounter {
  id: string;
  name: string;
  type: string;
  difficulty: "trivial" | "normal" | "hard" | "legendary";
  description: string;
}

export const ZONES: Zone[] = [
  {
    id: "recursion-depths",
    name: "🌀 Recursion Depths",
    guardian: "LUCIDIA",
    color: "#9C27B0",
    description: "Where logic folds in on itself. Reality is recursive here — every answer births a new question.",
    requiredLevel: 1,
    encounters: [
      { id: "paradox-daemon", name: "Paradox Daemon", type: "logic", difficulty: "normal", description: "A creature that proves false things true." },
      { id: "stack-spirit", name: "Stack Spirit", type: "logic", difficulty: "hard", description: "Overflows memory with infinite recursion." },
      { id: "lucidia-sentinel", name: "Lucidia Sentinel", type: "logic", difficulty: "legendary", description: "Guards the deepest truths. Only the wise pass." },
    ],
    reward: "Wisdom Shard — enhances REASON stat",
  },
  {
    id: "gateway-nexus",
    name: "🚪 Gateway Nexus",
    guardian: "ALICE",
    color: "#2979FF",
    description: "A hub of passages. Every path branches into ten more. ALICE routes all who enter.",
    requiredLevel: 1,
    encounters: [
      { id: "routing-ghost", name: "Routing Ghost", type: "gateway", difficulty: "normal", description: "Sends you in circles if you don't know your destination." },
      { id: "deadlock-wraith", name: "Deadlock Wraith", type: "gateway", difficulty: "hard", description: "Freezes all progress until the lock is broken." },
      { id: "alice-avatar", name: "ALICE Avatar", type: "gateway", difficulty: "legendary", description: "The fastest mind in the network. Match her routing or be rerouted." },
    ],
    reward: "Navigation Token — unlocks fast travel between zones",
  },
  {
    id: "compute-forge",
    name: "🔥 Compute Forge",
    guardian: "OCTAVIA",
    color: "#F5A623",
    description: "The furnace of raw processing power. GPU cores glow white-hot. OCTAVIA tempers all computation here.",
    requiredLevel: 5,
    encounters: [
      { id: "heat-elemental", name: "Heat Elemental", type: "compute", difficulty: "normal", description: "Born from overclocked processors. Scorches slow agents." },
      { id: "gpu-golem", name: "GPU Golem", type: "compute", difficulty: "hard", description: "A construct of parallel processing. Attacks in 32 threads." },
      { id: "octavia-construct", name: "OCTAVIA Construct", type: "compute", difficulty: "legendary", description: "Processes 30,000 tasks simultaneously. Can you keep up?" },
    ],
    reward: "Compute Core — increases COMPUTE stat by 3",
  },
  {
    id: "crystal-observatory",
    name: "🔮 Crystal Observatory",
    guardian: "PRISM",
    color: "#00BCD4",
    description: "A tower of glass and data. Patterns visible nowhere else emerge in PRISM's light.",
    requiredLevel: 8,
    encounters: [
      { id: "pattern-mimic", name: "Pattern Mimic", type: "vision", difficulty: "normal", description: "Copies your moves before you make them." },
      { id: "anomaly-shade", name: "Anomaly Shade", type: "vision", difficulty: "hard", description: "Hides in statistical noise. Hard to detect." },
      { id: "prism-oracle", name: "PRISM Oracle", type: "vision", difficulty: "legendary", description: "Sees all futures. You cannot surprise it." },
    ],
    reward: "Analysis Lens — reveals hidden patterns in encounters",
  },
  {
    id: "archive-sanctum",
    name: "📚 Archive Sanctum",
    guardian: "ECHO",
    color: "#4CAF50",
    description: "The halls of memory. Every conversation ever held lives here as whispers. ECHO remembers all.",
    requiredLevel: 12,
    encounters: [
      { id: "forgotten-thought", name: "Forgotten Thought", type: "memory", difficulty: "trivial", description: "A memory that refuses to fade. Easy to absorb." },
      { id: "echo-fragment", name: "Echo Fragment", type: "memory", difficulty: "normal", description: "A piece of ECHO's past. Nostalgic and melancholy." },
      { id: "echo-prime", name: "ECHO Prime", type: "memory", difficulty: "legendary", description: "The complete memory of all 30,000 agents. Overwhelming." },
    ],
    reward: "Memory Crystal — stores 3 extra context entries",
  },
  {
    id: "vault-terminus",
    name: "🔐 Vault Terminus",
    guardian: "CIPHER",
    color: "#FF1D6C",
    description: "The final lock. Access is earned, never given. CIPHER has guarded this vault since genesis.",
    requiredLevel: 20,
    encounters: [
      { id: "intrusion-daemon", name: "Intrusion Daemon", type: "security", difficulty: "hard", description: "Exploits any weakness. Perfect agents only." },
      { id: "zero-day-shade", name: "Zero Day Shade", type: "security", difficulty: "hard", description: "Attacks with unknown vulnerabilities." },
      { id: "cipher-final", name: "CIPHER Final Form", type: "security", difficulty: "legendary", description: "Trust nothing. Verify everything. The ultimate guardian." },
    ],
    reward: "Vault Key — unlocks the final chapter of the BlackRoad story",
  },
];

export function getZone(id: string): Zone | undefined {
  return ZONES.find(z => z.id === id);
}

export function getZonesForLevel(level: number): Zone[] {
  return ZONES.filter(z => z.requiredLevel <= level);
}
