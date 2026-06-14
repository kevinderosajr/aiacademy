import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Enablement Studio",
  description: "Internal AI learning, responsible adoption, and use-case discovery hub.",
  icons: {
    icon: "/axon-tab-icon.png",
    shortcut: "/axon-tab-icon.png",
    apple: "/apple-touch-icon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
