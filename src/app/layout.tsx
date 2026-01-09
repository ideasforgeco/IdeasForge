import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ideas Forge - Transform Your Vision into Reality",
    template: "%s | Ideas Forge",
  },
  description:
    "IdeasForge is a forward-thinking software agency that turns visionary ideas into scalable digital products. We blend design, strategy, and technology to help startups and enterprises grow faster.",
  keywords: [
    "software agency",
    "digital product development",
    "startup development",
    "enterprise software",
    "web development",
    "mobile app development",
    "UI/UX design",
    "software consulting",
  ],
  authors: [{ name: "Ideas Forge" }],
  creator: "Ideas Forge",
  publisher: "Ideas Forge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/icons/company_icon.svg",
    shortcut: "/images/icons/company_icon.svg",
    apple: "/images/icons/company_icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ideas Forge - Transform Your Vision into Reality",
    description:
      "IdeasForge is a forward-thinking software agency that turns visionary ideas into scalable digital products. We blend design, strategy, and technology to help startups and enterprises grow faster.",
    siteName: "Ideas Forge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideas Forge - Transform Your Vision into Reality",
    description:
      "IdeasForge is a forward-thinking software agency that turns visionary ideas into scalable digital products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}