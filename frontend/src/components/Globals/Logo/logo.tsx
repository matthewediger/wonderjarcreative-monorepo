import Link from "next/link";
import Logo from "@/public/logo.svg";

export default function LogoAndLink() {
  return (
    <div className="mr-2.5 py-2">
      <Link href="/">
        <Logo aria-label="Logo" className="w-40 md:w-44" />
      </Link>
    </div>
  )
}