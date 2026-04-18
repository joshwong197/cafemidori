import { NextResponse } from "next/server";

type TopicReq = { question: string; domain: string; participants: string[] };

export async function POST(req: Request) {
  const body = (await req.json()) as TopicReq;
  if (!body.question?.trim()) return NextResponse.json({ error: "empty question" }, { status: 400 });

  const bridgeUrl = process.env.CAFE_BRIDGE_URL ?? "http://localhost:3722/topic";
  try {
    const res = await fetch(bridgeUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) return NextResponse.json({ error: `bridge ${res.status}` }, { status: 502 });
    return NextResponse.json(await res.json());
  } catch (err) {
    return NextResponse.json({ error: String(err), note: "cafe channel skill not yet wired to NanoClaw" }, { status: 502 });
  }
}
