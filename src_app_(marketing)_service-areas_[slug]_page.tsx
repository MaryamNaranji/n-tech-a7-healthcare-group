import Button from "@/components/Button";

const AREAS: Record<string, { title: string; intro: string }> = {
  "fairfax-county": {
    title: "Home Health Services in Fairfax County, VA",
    intro: "Fast, coordinated support for families, facilities, and providers across Fairfax County."
  },
  "loudoun-county": {
    title: "Home Health Services in Loudoun County, VA",
    intro: "Integrated home health solutions designed to reduce vendor fragmentation and speed response times."
  },
  "prince-william-county": {
    title: "Home Health Services in Prince William County, VA",
    intro: "Supplies, equipment support, transportation, and in-home assistance—coordinated through one intake."
  },
  "arlington-county": {
    title: "Home Health Services in Arlington County, VA",
    intro: "Reliable home health logistics with scheduling, reminders, and service desk coordination."
  },
  "alexandria-va": {
    title: "Home Health Services in Alexandria, VA",
    intro: "Support for discharge planners and families with rapid intake and dependable follow-through."
  }
};

export function generateStaticParams() {
  return Object.keys(AREAS).map((slug) => ({ slug }));
}

export default function AreaPage({ params }: { params: { slug: string } }) {
  const area = AREAS[params.slug];
  if (!area) return null;

  return (
    <section style={{ padding: "32px 16px", maxWidth: 950, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>{area.title}</h1>
      <p style={{ marginTop: 0 }}>{area.intro}</p>

      <h3>Services in this area</h3>
      <ul>
        <li>Medical supplies and subscription replenishment</li>
        <li>Equipment preventive maintenance, setup, and repair</li>
        <li>Non-emergency medical transportation (NEMT)</li>
        <li>In-home companion support (as permitted by local regulations)</li>
        <li>Patient assistance: scheduling, reminders, coordination</li>
      </ul>

      <div style={{ marginTop: 18 }}>
        <Button href="/request-service" label="Request Service" />
      </div>

      <p style={{ fontSize: 13, opacity: 0.8, marginTop: 18 }}>
        Please avoid sharing sensitive medical details online. We’ll confirm logistics by phone.
      </p>
    </section>
  );
}
