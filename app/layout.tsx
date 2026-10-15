import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/utils/utils.header";
import Footer from "@/components/utils/utils.footer";
import * as React from "react";
import { PageLoader } from "@/components/utils/utils.loader";
import Script from "next/script";

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
        <script
          id="aclib"
          type="text/javascript"
          src="//acscdn.com/script/aclib.js"
        />
        <script type="text/javascript">
          {`aclib.runAutoTag({
              zoneId: 'kkr9j8frni',
          })`}
        </script>
      </head>
      <body className="overflow-x-hidden">
        <Header />
        <React.Suspense fallback={<PageLoader splash />}>
          <main className="pt-16 md:pt-20">{children}</main>
        </React.Suspense>
        <Footer />
        <Script
          id="ad-script"
          src="https://bauval.org/14/88d1aa3cc7d837700d57dbd7a77ae258"
          data-cfasync="false"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
