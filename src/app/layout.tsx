import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";

import "@fontsource-variable/inter-tight";
import "./globals.css";
import "./home-enhancements.css";
import "./themes.css";

export const metadata: Metadata = { metadataBase: new URL(site.url) };

export const viewport: Viewport = { themeColor: "#0a1015" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head><script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
      {/* Browser extensions can add body attributes before React hydrates. */}
      <body id="top" suppressHydrationWarning>
        <svg className="brand-definitions" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter id="axonrift-wordmark-light" colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="0 0 -0.76470588 0 0.95686275  0 0 -0.12549020 0 0.96862745  0 0 0.02745098 0 0.97254902  0 0 0 1 0" />
            </filter>
          </defs>
        </svg>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
