import Button from "@/components/Button";

export default function MedicalTransportationPage() {
  return (
    <section style={{ padding: "32px 16px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Medical Transportation</h1>
      <p style={{ marginTop: 0 }}>
        Non-emergency medical transportation (NEMT), discharge pickup, and optional escort support for check-in/out.
      </p>

      <h3>Common requests</h3>
      <ul>
        <li>Ambulatory rides to appointments</li>
        <li>Wheelchair transportation (where available)</li>
        <li>Discharge pickup + follow-up rides</li>
        <li>Wait-time coverage for longer visits</li>
      </ul>

      <div style={{ marginTop: 18 }}>
        <Button href="/request-service" label="Book a Ride" />
      </div>

      <p style={{ fontSize: 13, opacity: 0.8, marginTop: 18 }}>
        We keep online forms brief—don’t include sensitive medical details. Our dispatch team will confirm logistics by phone.
      </p>
    </section>
  );
}
