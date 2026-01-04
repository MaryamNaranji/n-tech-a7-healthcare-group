"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getFirestore, onSnapshot, orderBy, query, limit, updateDoc, doc as docRef } from "firebase/firestore";
import { firebaseApp } from "@/lib/firebase.client";

type IntakeDoc = {
  id: string;
  contactName: string;
  phone: string;
  email?: string;
  serviceAddress: string;
  serviceType: string;
  urgency: string;
  notes?: string;

  status: "new" | "contacted" | "scheduled" | "completed";
  priority: "low" | "normal" | "high" | "urgent";
  assignedTo: string;

  createdAt: string;
  updatedAt?: string;
};

const STATUS: IntakeDoc["status"][] = ["new", "contacted", "scheduled", "completed"];
const PRIORITY: IntakeDoc["priority"][] = ["low", "normal", "high", "urgent"];

export default function AdminTable() {
  const [items, setItems] = useState<IntakeDoc[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const db = useMemo(() => getFirestore(firebaseApp), []);

  useEffect(() => {
    const q = query(collection(db, "intakeRequests"), orderBy("createdAt", "desc"), limit(200));
    const unsub = onSnapshot(
      q,
      (snap) => setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }))),
      (e) => setErr(e.message)
    );
    return () => unsub();
  }, [db]);

  async function patch(id: string, partial: Partial<IntakeDoc>) {
    setSavingId(id);
    try {
      const r = docRef(db, "intakeRequests", id);
      const now = new Date().toISOString();

      // If status changes, append to statusHistory
      const changingStatus = typeof partial.status !== "undefined";
      const updatePayload: any = { ...partial, updatedAt: now };

      if (changingStatus) {
        updatePayload.statusHistory = (items.find(x => x.id === id) as any)?.statusHistory
          ? [...(items.find(x => x.id === id) as any).statusHistory, { status: partial.status, at: now }]
          : [{ status: partial.status, at: now }];
      }

      await updateDoc(r, updatePayload);
    } finally {
      setSavingId(null);
    }
  }

  if (err) return <div style={{ border: "1px solid #ffd6d6", padding: 12, borderRadius: 10 }}>{err}</div>;

  return (
    <div style={{ overflowX: "auto", border: "1px solid #eee", borderRadius: 14 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", background: "#fafafa" }}>
            <th style={th}>Created</th>
            <th style={th}>Name</th>
            <th style={th}>Phone</th>
            <th style={th}>Service</th>
            <th style={th}>Urgency</th>
            <th style={th}>Address</th>

            <th style={th}>Status</th>
            <th style={th}>Priority</th>
            <th style={th}>Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {items.map((x) => {
            const disabled = savingId === x.id;
            return (
              <tr key={x.id}>
                <td style={td}>{new Date(x.createdAt).toLocaleString()}</td>
                <td style={td}>{x.contactName}</td>
                <td style={td}>{x.phone}</td>
                <td style={td}>{x.serviceType}</td>
                <td style={td}>{x.urgency}</td>
                <td style={td}>{x.serviceAddress}</td>

                <td style={td}>
                  <select
                    value={x.status}
                    disabled={disabled}
                    onChange={(e) => patch(x.id, { status: e.target.value as any })}
                    style={selectStyle}
                  >
                    {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>

                <td style={td}>
                  <select
                    value={x.priority}
                    disabled={disabled}
                    onChange={(e) => patch(x.id, { priority: e.target.value as any })}
                    style={selectStyle}
                  >
                    {PRIORITY.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </td>

                <td style={td}>
                  <input
                    value={x.assignedTo ?? ""}
                    disabled={disabled}
                    onChange={(e) => patch(x.id, { assignedTo: e.target.value })}
                    placeholder="Name / role"
                    style={inputStyle}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = { padding: 10, fontSize: 13, borderBottom: "1px solid #eee", whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: 10, fontSize: 13, borderBottom: "1px solid #f1f1f1", verticalAlign: "top" };
const selectStyle: React.CSSProperties = { padding: "6px 8px", borderRadius: 10, border: "1px solid #ddd", fontSize: 13 };
const inputStyle: React.CSSProperties = { padding: "6px 8px", borderRadius: 10, border: "1px solid #ddd", fontSize: 13, width: 160 };
