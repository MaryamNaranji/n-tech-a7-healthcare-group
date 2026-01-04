import IntakeForm from "@/components/IntakeForm";

export default function RequestServicePage() {
  return (
    <section style={{ padding: "32px 16px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Request Service</h1>
      <p style={{ marginTop: 0 }}>
        Tell us what you need. We’ll confirm details and schedule next steps.
        <br />
        <b>Please avoid sharing sensitive medical details online.</b>
      </p>
      <IntakeForm />
    </section>
  );
}
