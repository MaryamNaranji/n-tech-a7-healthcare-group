const AREAS = [
  { slug: "fairfax-county", name: "Fairfax County, VA" },
  { slug: "loudoun-county", name: "Loudoun County, VA" },
  { slug: "prince-william-county", name: "Prince William County, VA" },
  { slug: "arlington-county", name: "Arlington County, VA" },
  { slug: "alexandria-va", name: "Alexandria, VA" }
];

export default function ServiceAreasPage() {
  return (
    <section style={{ padding: "32px 16px", maxWidth: 950, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Service Areas</h1>
      <p style={{ marginTop: 0 }}>
        Local home health support with one intake process across supplies, equipment service, transportation, in-home support, and coordination.
      </p>

      <ul style={{ lineHeight: 1.9 }}>
        {AREAS.map(a => (
          <li key={a.slug}>
            <a href={`/service-areas/${a.slug}`}>{a.name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
