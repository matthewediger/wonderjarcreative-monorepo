import Link from "next/link";
import Image from "next/image";
import logoPic from "@/public/logo.png";

export default function Logo() {
    return (
        <div className="">
            <Link href="/">
                <Image src={logoPic} alt="Site logo" />
            </Link>
        </div>
    )
}