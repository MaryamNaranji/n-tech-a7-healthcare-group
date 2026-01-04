import { NextResponse } from "next/server";
import { IntakeSchema } from "@/lib/validators";
import { getAdminDb } from "@/lib/firebase.admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = IntakeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const db = getAdminDb();
    const now = new Date();

    const doc = {
      ...parsed.data,
      // DEFAULTS (NEW)
      status: "new",
      priority: "normal",
      assignedTo: "",

      // Metadata
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      statusHistory: [
        { status: "new", at: now.toISOString() }
      ]
    };

    const ref = await db.collection("intakeRequests").add(doc);
    return NextResponse.json({ ok: true, id: ref.id });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Server error." }, { status: 500 });
  }
}
