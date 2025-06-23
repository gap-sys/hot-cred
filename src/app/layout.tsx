import type { Metadata } from "next";
import "src/presentation/styles/global.scss";

export const metadata: Metadata = {
  title: "HotInvest - Nenhuma taxa, todos os motivos pra escolher",
  description: "A HotInvest é a conta digital feita para você ter mais controle, rendimento superior à poupança e zero tarifas escondidas. Abra a sua e simplifique sua vida financeira."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
