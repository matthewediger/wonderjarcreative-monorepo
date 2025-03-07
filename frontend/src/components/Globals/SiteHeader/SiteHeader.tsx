import Logo from "@/components/Globals/Logo/Logo";
import Navigation from "@/components/Globals/Navigation/Navigation";

export default function SiteHeader() {
  return (
    <header className="py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        <Navigation />
      </div>
    </header>
  )
}