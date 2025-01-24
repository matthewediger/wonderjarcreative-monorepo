import Logo from "@/components/Globals/Logo/Logo";
import Navigation from "@/components/Globals/Navigation/Navigation";

export default function SiteHeader() {
    const classes = ['site-header', 'bg-white', 'shadow-md', 'fixed', 'top-0', 'left-0', 'w-full', 'z-50'];
    return (
        <header className={classes.join(' ')}>
            <Logo />
            <Navigation />
        </header>
    )
}