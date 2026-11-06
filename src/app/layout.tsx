import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Sea View Skydiving Portal | Greedy Adventures",
  description: "Experience the pinnacle of high-altitude ocean freefall over turquoise reef waters with Greedy Adventures.",
  icons: {
    icon: "/favicon.ico",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`h-full antialiased ${inter.variable} ${jetBrainsMono.variable} ${plusJakarta.variable}`}>
      <body className="min-h-full flex flex-col bg-surface text-on-surface scroll-smooth">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
