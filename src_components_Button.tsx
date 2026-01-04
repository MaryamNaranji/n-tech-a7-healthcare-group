export default function Button({
  href,
  label,
  variant = "primary"
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}) {
  const style =
    variant === "primary"
      ? { background: "black", color: "white" }
      : { background: "white", color: "black", border: "1px solid #ddd" };

  return (
    <a
      href={href}
      style={{
        ...style,
        padding: "10px 12px",
        borderRadius: 10,
        textDecoration: "none",
        display: "inline-block",
        fontSize: 14
      }}
    >
      {label}
    </a>
  );
}
