import type { Metadata } from "next";
import "./globals.css";
import { SiteWrapper } from "@/components/SiteWrapper";

export const metadata: Metadata = {
  title: "Lucas Ribeiro — Portfólio, Blog & Estante",
  description: "Portfólio técnico de Frontend, linha do tempo de carreira, caderno de artigos e estante cultural de Lucas Ribeiro.",
  keywords: ["Frontend Engineer", "Lucas Ribeiro", "React", "Next.js", "Design Systems", "Web Performance", "Blog"],
  authors: [{ name: "Lucas Ribeiro" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans antialiased">
        <SiteWrapper>{children}</SiteWrapper>
      </body>
    </html>
  );
}
