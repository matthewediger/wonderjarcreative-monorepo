import { draftMode } from "next/headers";
import { Roboto, Caveat } from "next/font/google";

import "@/app/globals.css";

import SiteHeader from "@/components/Globals/SiteHeader/SiteHeader";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";

const roboto = Roboto({
  weight: ['400', '500', '900'],
  subsets: ['latin']
});
const caveat = Caveat({
  weight: ['400', '700'],
  subsets: ['latin']
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();

  return (
    <html
      lang="en"
      style={{
        '--roboto': roboto.style.fontFamily,
        '--caveat': caveat.style.fontFamily,
      } as React.CSSProperties}
    >
      <body>
        {isEnabled && <PreviewNotice />}
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
