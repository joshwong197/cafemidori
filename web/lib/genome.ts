import fs from "node:fs/promises";
import path from "node:path";
import type { AgentKey } from "./agents";

export type Genome = {
  agent: string;
  codename: string;
  given_name: string;
  arcana: string;
  role: string;
  version: string;
  locked_at: string;
  traits: Record<string, number>;
  council_weights: Record<string, number>;
  directors: {
    primary: string[];
    default: string;
    rules: Record<string, string>;
  };
  emotional_baseline: {
    valence: number;
    arousal: number;
    focus: number;
    decay_seconds: number;
  };
  emotional_triggers?: Array<Record<string, unknown>>;
  mode_blend?: Record<string, unknown>;
  relationships?: Record<string, unknown>;
  customer_engagement?: Record<string, unknown>;
  mask?: string | Record<string, unknown>;
  shadow?: string | Record<string, unknown>;
  red_lines_inherited?: unknown;
  notes_for_self?: unknown;
};

const PRIVATE_KEYS = new Set(["private_shadow", "_private_shadow", "private", "shadow_private"]);

export async function loadGenome(agent: AgentKey): Promise<Genome | null> {
  const file = path.join(process.cwd(), "data", "genomes", `${agent}.json`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    for (const k of PRIVATE_KEYS) delete parsed[k];
    return parsed as unknown as Genome;
  } catch {
    return null;
  }
}
