import PartnerReferralForm from "@/components/PartnerReferralForm";

export default function PartnersPage() {
  return (
    <section style={{ padding: "32px 16px", maxWidth: 950, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>For Providers & Partners</h1>
      <p style={{ marginTop: 0 }}>
        Referral support for discharge planners, clinics, home health agencies, and assisted living.
      </p>

      <h3>Partner capabilities</h3>
      <ul>
        <li>Discharge bundles (supplies + transport + companion hours)</li>
        <li>Supply contracts + replenishment</li>
        <li>Equipment maintenance SLAs</li>
        <li>Staffing coverage: caregivers, drivers, coordinators</li>
      </ul>

      <h2 style={{ marginTop: 24 }}>Send a referral</h2>
      <PartnerReferralForm />
    </section>
  );
}
