import AdminGuard from "@/components/AdminGuard";
import AdminTable from "@/components/AdminTable";

export default function AdminPage() {
  return (
    <AdminGuard>
      <section style={{ padding: "32px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Admin Dashboard</h1>
        <p style={{ marginTop: 0 }}>View and triage incoming requests.</p>
        <AdminTable />
      </section>
    </AdminGuard>
  );
}
