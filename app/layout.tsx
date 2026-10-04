import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "After the Upgrade | Sustainable E-Waste Advocacy",
    template: "%s | After the Upgrade",
  },
  description:
    "An advocacy campaign promoting responsible electronic-waste management, device repair, reuse, donation, data protection, and sustainable technology consumption.",
  keywords: [
    "e-waste",
    "electronic waste",
    "right to repair",
    "device reuse",
    "electronics donation",
    "data safety",
    "sustainable tech",
    "After the Upgrade",
  ],
  authors: [{ name: "After the Upgrade Campaign" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
