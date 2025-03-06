import Logo from "@/components/Globals/Logo/Logo";
import Navigation from "@/components/Globals/Navigation/Navigation";

export default function SiteHeader() {
    return (
        <header className="py-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo mr-2.5 py-2">
                    <Logo />
                </div>
                <Navigation />
            </div>
        </header>
    )
}