import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Google Nexus Orchestrator | RJ Business Solutions",
  description: "AGI-level orchestration system for the entire Google Ecosystem. Powered by Gemini + Vertex AI + NeuronEdge Labs™.",
  keywords: ["AI orchestrator", "Google Cloud", "Vertex AI", "Gemini", "NeuronEdge Labs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Poppins:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Neural background */}
        <div className="neural-bg" />

        {/* Floating orbs */}
        <div className="orb" style={{
          width: '500px', height: '500px', top: '10%', left: '5%',
          background: 'rgba(79, 142, 247, 0.07)', animationDuration: '12s'
        }} />
        <div className="orb" style={{
          width: '400px', height: '400px', top: '55%', right: '5%',
          background: 'rgba(139, 92, 246, 0.06)', animationDuration: '15s', animationDelay: '-5s'
        }} />
        <div className="orb" style={{
          width: '300px', height: '300px', bottom: '10%', left: '30%',
          background: 'rgba(6, 214, 224, 0.05)', animationDuration: '10s', animationDelay: '-3s'
        }} />

        {/* App layout */}
        <Sidebar />
        <main className="main-content" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
