export type AgentKey =
  | "joker" | "futaba" | "haru" | "yusuke" | "kasumi"
  | "ryuji" | "morgana" | "anne" | "makoto" | "akechi";

export type AgentMeta = {
  key: AgentKey;
  display: string;
  codename: string;
  role: string;
  roomBlurb: string;
};

export const AGENTS: AgentMeta[] = [
  { key: "joker",   display: "Ren",     codename: "Joker",   role: "Chief Executive",      roomBlurb: "Café kitchen, coffee library, a single futon." },
  { key: "futaba",  display: "Futaba",  codename: "Oracle",  role: "Orchestrator",         roomBlurb: "Wall of screens, beanbag, fairy lights." },
  { key: "haru",    display: "Haru",    codename: "Noir",    role: "Receptionist",         roomBlurb: "Balcony planters, tea set, armchair." },
  { key: "yusuke",  display: "Yusuke",  codename: "Fox",     role: "Growth Lead",          roomBlurb: "Easel and canvases, jars of brushes." },
  { key: "kasumi",  display: "Kasumi",  codename: "Violet",  role: "Credit Analyst",       roomBlurb: "Low barre, colour-coded scorecards." },
  { key: "ryuji",   display: "Ryuji",   codename: "Skull",   role: "Account Manager",      roomBlurb: "Running shoes, weights, blunt call scripts." },
  { key: "morgana", display: "Morgana", codename: "Mona",    role: "Portfolio Monitor",    roomBlurb: "Cat. Windowsill. Wall map of Waikato." },
  { key: "anne",    display: "Anne",    codename: "Panther", role: "Recovery Specialist",  roomBlurb: "Wardrobe, vanity, two call outfits." },
  { key: "makoto",  display: "Makoto",  codename: "Queen",   role: "Compliance Officer",   roomBlurb: "Policy bookshelf, kettle, binder spines." },
  { key: "akechi",  display: "Akechi",  codename: "Crow",    role: "Legal Counsel (On Call)", roomBlurb: "Office + library, retainer clock." },
];

export const AGENT_BY_KEY: Record<AgentKey, AgentMeta> =
  Object.fromEntries(AGENTS.map(a => [a.key, a])) as Record<AgentKey, AgentMeta>;
