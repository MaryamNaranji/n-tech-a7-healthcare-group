"use client";

import { useEffect, useState } from "react";
import { firebaseAuth } from "@/lib/firebase.client";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, (u) => setUser(u));
  }, []);

  async function login() {
    setErr(null);
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, pass);
    } catch (e: any) {
      setErr(e?.message ?? "Login failed.");
    }
  }

  async function logout() {
    await signOut(firebaseAuth);
  }

  if (!user) {
    return (
      <section style={{ padding: "32px 16px", maxWidth: 500, margin: "0 auto" }}>
        <h2>Admin Login</h2>
        <p style={{ opacity: 0.85 }}>Use your admin credentials.</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
        <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" type="password" style={inputStyle} />
        <button onClick={login} style={buttonStyle}>Sign in</button>
        {err && <div style={{ marginTop: 12, border: "1px solid #ffd6d6", padding: 10, borderRadius: 10 }}>{err}</div>}
      </section>
    );
  }

  return (
    <div>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "12px 16px" }}>
        <button onClick={logout} style={buttonSecondary}>Sign out</button>
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #ddd", marginBottom: 10 };
const buttonStyle: React.CSSProperties = { padding: "10px 12px", borderRadius: 10, border: "1px solid #000", background: "#000", color: "#fff", cursor: "pointer" };
const buttonSecondary: React.CSSProperties = { padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", background: "#fff", cursor: "pointer" };
