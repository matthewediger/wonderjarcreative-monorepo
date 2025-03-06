import Logo from "@/components/Globals/Logo/Logo";
import Navigation from "@/components/Globals/Navigation/Navigation";

export default function SiteHeader() {
    return (
        <header className="py-2">
            <div className="px-4 container mx-auto flex justify-between items-center">
                <Logo />
                <Navigation />
            </div>
        </header>
    )
}