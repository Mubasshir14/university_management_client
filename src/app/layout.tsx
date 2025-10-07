import type { Metadata } from "next";
import { Arima, Lobster, Oleo_Script, Sansita } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/components/lib/providers/Providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const sansita = Sansita({
  variable: "--font-sansita",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const arima = Arima({
  variable: "--font-arima",
  subsets: ["latin"],
});

const oleo_script = Oleo_Script({
  variable: "--font-oleo_script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "University Management | State University",
  description:
    "A University Management System for State University – Manage students, departments, academic sessions, and more with ease.",
  keywords: [
    "University Management",
    "State University",
    "Student Portal",
    "Education System",
    "Academic Session",
  ],
  authors: [{ name: "State University" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "University Management | State University",
    description:
      "Smart University Management System to handle students, departments, sessions and education data.",
    url: "https://university-management-client.vercel.app",
    siteName: "University Management | State University",
    images: [
      {
        url: "https://i.ibb.co/MygP1k8Q/university-education-logo-design-template-free-vector.jpg",
        width: 800,
        height: 600,
        alt: "University Management Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sansita.variable} ${arima.variable} ${oleo_script.variable} ${lobster.variable} antialiased bg-gradient-to-b from-blue-200/10 to-purple-200/10`}
      >
        <Providers>
          <Toaster richColors position="top-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
