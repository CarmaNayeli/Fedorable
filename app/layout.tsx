import type { Metadata } from "next";
import "./globals.css";
import { ServiceWorkerProvider } from "./ServiceWorkerProvider";

export const metadata: Metadata = {
  title: "Fedorable - Zoo Care Tracker",
  description: "Care for adorable zoo animals with gamification and smart notifications",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ServiceWorkerProvider />
        {children}
      </body>
    </html>
  );
}
