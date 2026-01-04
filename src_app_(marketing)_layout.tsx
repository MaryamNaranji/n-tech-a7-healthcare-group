import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "N-TECH & A7 Healthcare Group",
  description: "One partner for home health: supplies, equipment support, transportation, in-home assistance, and coordination."
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
        <Header />
        <main style={{ minHeight: "70vh" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
