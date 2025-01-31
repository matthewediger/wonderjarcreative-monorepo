import { draftMode } from "next/headers";
import { Roboto } from "next/font/google";

import "@/app/globals.css";

import SiteHeader from "@/components/Globals/SiteHeader/SiteHeader";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";

const roboto = Roboto({
  weight: ['400', '500', '900'],
  subsets: ['latin']
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode();
  const bodyClasses = ["bg-gray-200", "text-foreground", roboto.className];

  return (
    <html lang="en">
      <body className={bodyClasses.join(" ")}>
        {isEnabled && <PreviewNotice />}
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
