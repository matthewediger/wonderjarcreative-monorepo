import Link from "next/link";

export default function Logo() {
    return (
        <div className="logo">
            <Link href="/">
                <img src="/logo.png" alt="logo" />
            </Link>
        </div>
    )
}