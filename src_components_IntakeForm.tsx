"use client";

import { useState } from "react";
import { IntakeSchema, type IntakeInput } from "@/lib/validators";

export default function IntakeForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    const form = new FormData(e.currentTarget);
    const payload: IntakeInput = {
      contactName: String(form.get("contactName") || ""),
      phone: String(form.get("phone") || ""),
      email: String(form.get("email") || ""),
      serviceAddress: String(form.get("serviceAddress") || ""),
      serviceType: form.get("serviceType") as any,
      urgency: form.get("urgency") as any,
      notes: String(form.get("notes") || ""),
      preferredContact: form.get("preferredContact") as any,
      consent: form.get("consent") === "on"
    };

    const parsed = IntakeSchema.safeParse(payload);
    if (!parsed.success) {
      setErr("Please check required fields and try again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit.");
      setOk("Submitted. Our team will contact you shortly to confirm details.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (ex: any) {
      setErr(ex?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
      <div style={{ display: "grid", gap: 6 }}>
        <label>Contact name *</label>
        <input name="contactName" required style={inputStyle} />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Phone *</label>
        <input name="phone" required style={inputStyle} />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Email (optional)</label>
        <input name="email" type="email" style={inputStyle} />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Service address / area *</label>
        <input name="serviceAddress" required style={inputStyle} />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Service requested *</label>
        <select name="serviceType" required style={inputStyle}>
          <option value="supplies">Supplies</option>
          <option value="maintenance">Equipment maintenance/repair</option>
          <option value="care">In-home care/companion</option>
          <option value="transportation">Transportation</option>
          <option value="scheduling">Scheduling/coordination</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Urgency *</label>
        <select name="urgency" required style={inputStyle}>
          <option value="same_day">Same day</option>
          <option value="24_48">24–48 hours</option>
          <option value="scheduled">Scheduled</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Notes (keep it non-sensitive)</label>
        <textarea name="notes" rows={4} style={inputStyle} />
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label>Preferred contact *</label>
        <select name="preferredContact" required style={inputStyle}>
          <option value="phone">Phone</option>
          <option value="text">Text</option>
          <option value="email">Email</option>
        </select>
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input name="consent" type="checkbox" required />
        I consent to be contacted for scheduling and coordination.
      </label>

      <button disabled={loading} style={buttonStyle}>
        {loading ? "Submitting..." : "Submit Request"}
      </button>

      {ok && <div style={{ padding: 12, border: "1px solid #d6ffd6", borderRadius: 10 }}>{ok}</div>}
      {err && <div style={{ padding: 12, border: "1px solid #ffd6d6", borderRadius: 10 }}>{err}</div>}
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 14
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #000",
  background: "#000",
  color: "#fff",
  fontSize: 14,
  cursor: "pointer"
};
