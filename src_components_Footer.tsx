export default function Footer() {
  const email = process.env.NEXT_PUBLIC_SITE_EMAIL ?? "dispatch@example.com";
  const area = process.env.NEXT_PUBLIC_SERVICE_AREA ?? "Service Area";

  return (
    <footer style={{ borderTop: "1px solid #eee", padding: "18px 16px", marginTop: 36 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", fontSize: 13, opacity: 0.85 }}>
        <div><b>N-TECH & A7 Healthcare Group</b></div>
        <div>{area}</div>
        <div>Contact: {email}</div>
        <div style={{ marginTop: 10, opacity: 0.7 }}>
          Online forms are for scheduling and logistics only—please do not submit sensitive medical details.
        </div>
      </div>
    </footer>
  );
}
