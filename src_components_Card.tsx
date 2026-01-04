export default function Card({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <a
      href={href}
      style={{
        border: "1px solid #eee",
        borderRadius: 14,
        padding: 16,
        textDecoration: "none",
        color: "inherit",
        display: "block"
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, opacity: 0.85 }}>{text}</div>
    </a>
  );
}
