"use client";

import { useState } from "react";
import { PartnerReferralSchema, type PartnerReferralInput } from "@/lib/validators";

export default function PartnerReferralForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    const form = new FormData(e.currentTarget);
    const payload: PartnerReferralInput = {
      organization: String(form.get("organization") || ""),
      referrerName: String(form.get("referrerName") || ""),
      referrerPhone: String(form.get("referrerPhone") || ""),
      referrerEmail: String(form.get("referrerEmail") || ""),
      referralType: form.get("referralType") as any,
      notes: String(form.get("notes") || "")
    };

    const parsed = PartnerReferralSchema.safeParse(payload);
    if (!parsed.success) {
      setErr("Please check required fields and try again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/partner-referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit.");
      setOk("Referral sent. We’ll follow up shortly.");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (ex: any) {
      setErr(ex?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 12 }}>
      <input name="organization" placeholder="Organization *" required style={inputStyle} />
      <input name="referrerName" placeholder="Your name *" required style={inputStyle} />
      <input name="referrerPhone" placeholder="Phone *" required style={inputStyle} />
      <input name="referrerEmail" placeholder="Email *" type="email" required style={inputStyle} />

      <select name="referralType" required style={inputStyle}>
        <option value="discharge">Hospital discharge</option>
        <option value="clinic">Clinic / physician office</option>
        <option value="home_health_agency">Home health agency</option>
        <option value="assisted_living">Assisted living / group home</option>
        <option value="other">Other</option>
      </select>

      <textarea name="notes" placeholder="Notes (non-sensitive)..." rows={4} style={inputStyle} />

      <button disabled={loading} style={buttonStyle}>
        {loading ? "Sending..." : "Send Referral"}
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
