import Link from "next/link";
import Image from "next/image";
import logoPic from "@/public/logo.png";

export default function Logo() {
    return (
        <div className="logo mr-2.5 py-2">
            <Link href="/">
                <Image src={logoPic} alt="Site logo" className="w-48 md:w-52 lg:w-56" />
            </Link>
        </div>
    )
}