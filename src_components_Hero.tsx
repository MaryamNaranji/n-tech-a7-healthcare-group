import Button from "./Button";

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaHref
}: {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}) {
  return (
    <section style={{ padding: "40px 16px", background: "#fafafa", borderBottom: "1px solid #eee" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, margin: "0 0 10px 0" }}>{title}</h1>
        <p style={{ fontSize: 16, opacity: 0.85, margin: "0 0 18px 0" }}>{subtitle}</p>
        <Button href={ctaHref} label={ctaText} />
      </div>
    </section>
  );
}
