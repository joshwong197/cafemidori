export type WriteClassifierVerdict = "operational" | "casual";

export function classifyDrawer(content: string): WriteClassifierVerdict {
  const operationalSignals = [
    /\bpolicy\b/i, /\bscorecard\b/i, /\btier\b/i, /\blimit\b/i, /\bcredit\s+limit\b/i,
    /\bstop[- ]credit\b/i, /\bs289\b/i, /\bstatutory\s+demand\b/i, /\brecovery\b/i,
    /\bdeed\b/i, /\bguarantor\b/i, /\bgsa\b/i, /\bfair\s+trading\b/i,
    /\baccount\s+manager\b/i, /\bday\s?21\b/i, /\bhandoff\b/i,
    /\btier\s+reassessment\b/i, /\bportfolio\s+decision\b/i,
  ];
  return operationalSignals.some((r) => r.test(content)) ? "operational" : "casual";
}

export type WriteTarget = { wing: "cafe" | "operational"; origin?: string };

export function routeWrite(content: string, sessionId: string): WriteTarget[] {
  const verdict = classifyDrawer(content);
  if (verdict === "casual") return [{ wing: "cafe" }];
  return [
    { wing: "cafe" },
    { wing: "operational", origin: `cafe-session-${sessionId}` },
  ];
}
