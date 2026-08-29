import type { Metadata } from "next";
import "./globals.css";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { MobileBar } from "@/components/MobileBar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: {
    default: "F. Cardoso Automóveis — Compra, venda e intermediação de automóveis",
    template: "%s · F. Cardoso Automóveis",
  },
  description:
    "Viaturas selecionadas, verificadas e prontas a conduzir. Compra, venda, retoma e financiamento com o acompanhamento de uma equipa dedicada.",
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
