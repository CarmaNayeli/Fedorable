import type { Metadata } from "next";
import "./globals.css";
import { ServiceWorkerProvider } from "./ServiceWorkerProvider";

export const metadata: Metadata = {
  title: "Rhia-minder - Chore Tracker",
  description: "Track your chores with gamification and smart notifications",
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
