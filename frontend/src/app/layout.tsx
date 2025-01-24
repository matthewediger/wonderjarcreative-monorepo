import { draftMode } from "next/headers";
import { Inter } from "next/font/google";

import "@/app/globals.css";

import SiteHeader from "@/components/Globals/SiteHeader/SiteHeader";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en">
      <body className={inter.className}>
        {isEnabled && <PreviewNotice />}
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
