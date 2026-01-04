import Card from "@/components/Card";

export default function ServicesPage() {
  return (
    <section style={{ padding: "32px 16px", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Services</h1>
      <p style={{ marginTop: 0 }}>
        One intake. One service desk. Coordinated delivery across supplies, staffing, transportation, and equipment support.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 16 }}>
        <Card title="Medical Supplies" text="Shop essentials and set up replenishment subscriptions." href="/services/medical-supplies" />
        <Card title="Equipment Maintenance & Repair" text="PM visits, calibration/safety checks, on-demand repair." href="/services/equipment-maintenance" />
        <Card title="In-Home Care" text="Companion services, ADL assistance, respite support." href="/services/in-home-care" />
        <Card title="Medical Transportation" text="Ambulatory/wheelchair rides, escort services, discharge pickup." href="/services/medical-transportation" />
        <Card title="Patient Assistance" text="Scheduling, reminders, follow-ups with authorization." href="/services/patient-assistance" />
      </div>
    </section>
  );
}
