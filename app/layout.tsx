import type { Metadata } from "next";
import "./globals.css";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { MobileBar } from "@/components/MobileBar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const SITE_URL = "https://fcardoso-automoveis.com";
const DEFAULT_DESCRIPTION =
  "Viaturas selecionadas, verificadas e prontas a conduzir. Compra, venda, retoma e financiamento com o acompanhamento de uma equipa dedicada.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "F. Cardoso Automóveis — Compra, venda e intermediação de automóveis",
    template: "%s · F. Cardoso Automóveis",
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "F. Cardoso Automóveis",
    title: "F. Cardoso Automóveis — Compra, venda e intermediação de automóveis",
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "F. Cardoso Automóveis" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "F. Cardoso Automóveis",
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT">
      <body className="pb-20 md:pb-0">
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFab />
        <MobileBar />
      </body>
    </html>
  );
}
