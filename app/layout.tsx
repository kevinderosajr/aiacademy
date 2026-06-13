import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Enablement Studio",
  description: "Internal AI learning, responsible adoption, and use-case discovery hub."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
