import type { Metadata } from "next";
import "src/presentation/styles/global.scss";

export const metadata: Metadata = {
  title: "HotCred – Soluções financeiras para o seu momento",
  description: "A HotCred é a empresa financeira que oferece soluções de crédito personalizadas para atender às necessidades de cada cliente. Empréstimos, antecipação de FGTS, crédito para CLT e muito mais."
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
