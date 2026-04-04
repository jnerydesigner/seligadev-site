import type { Metadata } from "next";
import { Bangers } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import PageContainer from "@/components/page-container";
import Footer from "@/components/footer";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://seligadev.com"),
  title: {
    default: "Se Liga Dev - Blog de Tecnologia e Desenvolvimento",
    template: "%s | Se Liga Dev",
  },
  description:
    "Blog sobre desenvolvimento web, programação, carreira tech e tutoriais. Aprenda JavaScript, React, Node.js e mais com artigos práticos.",
  keywords: [
    "desenvolvimento web",
    "programação",
    "blog tech",
    "tutoriais programação",
    "carreira developer",
    "javascript",
    "react",
    "next.js",
    "node.js",
  ],
  authors: [{ name: "Jander Nery", url: "https://seligadev.com" }],
  creator: "Jander Nery",
  publisher: "Se Liga Dev",
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
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || "https://seligadev.com",
    languages: {
      "pt-BR": "https://seligadev.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seligadev.com",
    siteName: "Se Liga Dev",
    title: "Se Liga Dev - Blog de Tecnologia e Desenvolvimento",
    description: "Blog sobre desenvolvimento web, programação, carreira tech e tutoriais.",
    images: [
      {
        url: "https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png",
        width: 1200,
        height: 630,
        alt: "Se Liga Dev - Blog de Tecnologia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Se Liga Dev - Blog de Tecnologia e Desenvolvimento",
    description: "Blog sobre desenvolvimento web, programação, carreira tech e tutoriais.",
    creator: "@jandernerydev",
    images: ["https://seliga-dev.s3.us-east-1.amazonaws.com/logo-new.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1600331961556195"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${bangers.variable} halftone-bg flex min-h-screen flex-col`}>
        <div className="font-bangers flex min-h-screen flex-col">
          <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-2 py-2 sm:px-3 md:px-4">
            <Header />

            <PageContainer className="flex-1">{children}</PageContainer>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
