import Button from "./Button";

export default function Header() {
  const phone = process.env.NEXT_PUBLIC_SITE_PHONE ?? "(000) 000-0000";

  return (
    <header style={{ borderBottom: "1px solid #eee", padding: "12px 16px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
          <img
            src="/logo.png"
            alt="N-TECH & A7 Healthcare Group"
            style={{ height: 40, width: "auto", display: "block" }}
          />
          <span style={{ fontWeight: 800 }}>N-TECH & A7 Healthcare Group</span>
        </a>

        <nav style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
          <a href="/services">Services</a>
          <a href="/service-areas">Service Areas</a>
          <a href="/partners">Partners</a>
          <a href="/about">About</a>
          <a href="/faq">FAQs</a>
          <a href="/contact">Contact</a>
          <span style={{ fontSize: 13, opacity: 0.8 }}>{phone}</span>
          <Button href="/request-service" label="Request Service" />
        </nav>
      </div>
    </header>
  );
}
