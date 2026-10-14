import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/utils/utils.header";
import Footer from "@/components/utils/utils.footer";
import * as React from "react";
import { PageLoader } from "@/components/utils/utils.loader";

export const metadata: Metadata = {
  title: "Venchy Muse — Find Your Style. Follow Your Muse.",
  description:
    "An independent digital fashion magazine: outfit inspiration, style guides and timeless trends.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className=""
    >
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=DM+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden">
        <Header />
        <React.Suspense fallback={<PageLoader splash />}>
          <main className="pt-16 md:pt-20">{children}</main>
        </React.Suspense>
        <Footer />
      </body>
    </html>
  );
}
