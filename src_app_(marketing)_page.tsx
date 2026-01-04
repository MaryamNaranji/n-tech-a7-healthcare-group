import Hero from "@/components/Hero";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function HomePage() {
  return (
    <div>
      <Hero
        title="Integrated Home Health Solutions"
        subtitle="Supplies • Equipment Maintenance • In-Home Support • Medical Transportation • Care Coordination"
        ctaText="Request Service"
        ctaHref="/request-service"
      />

      <section style={{ padding: "32px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>What we do</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          <Card title="Medical Supplies" text="Consumables, daily living aids, subscription replenishment." href="/services/medical-supplies" />
          <Card title="Equipment Maintenance & Repair" text="Preventive maintenance, setup, troubleshooting, service contracts." href="/services/equipment-maintenance" />
          <Card title="In-Home Care & Companion Services" text="ADL support, companionship, respite, post-discharge support." href="/services/in-home-care" />
          <Card title="Medical Transportation" text="Non-emergency rides, discharge pickup, escort options." href="/services/medical-transportation" />
          <Card title="Patient Assistance" text="Scheduling, reminders, follow-up coordination." href="/services/patient-assistance" />
        </div>

        <div style={{ marginTop: 24 }}>
          <Button href="/services" label="Explore Services" />
          <span style={{ marginLeft: 12 }} />
          <Button href="/partners" label="For Providers & Partners" variant="secondary" />
        </div>
      </section>
    </div>
  );
}
