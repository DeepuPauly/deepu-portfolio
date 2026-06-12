import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// ---- SEO lives here ----
export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: `Portfolio of ${SITE.name}, a ${SITE.role.toLowerCase()}. Selected work, skills, and contact.`,
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: `Portfolio of ${SITE.name}.`,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
