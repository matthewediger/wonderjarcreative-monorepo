import Link from "next/link";
import Logo from "@/public/logo.svg";

export default function LogoAndLink() {
    return (
        <Link href="/">
            <Logo aria-label="Logo" className="w-full" />
        </Link>
    )
}