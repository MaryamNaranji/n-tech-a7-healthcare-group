export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_SITE_PHONE ?? "(000) 000-0000";
  const email = process.env.NEXT_PUBLIC_SITE_EMAIL ?? "dispatch@example.com";
  const area = process.env.NEXT_PUBLIC_SERVICE_AREA ?? "Service Area";

  return (
    <section style={{ padding: "32px 16px", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Contact</h1>
      <p style={{ marginTop: 0 }}>Service area: {area}</p>
      <p><b>Phone:</b> {phone}</p>
      <p><b>Email:</b> {email}</p>
      <p style={{ fontSize: 13, opacity: 0.8 }}>
        For privacy, please do not email sensitive medical details. We’ll confirm logistics by phone.
      </p>
    </section>
  );
}
