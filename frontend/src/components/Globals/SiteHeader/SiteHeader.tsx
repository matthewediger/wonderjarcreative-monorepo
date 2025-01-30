import Logo from "@/components/Globals/Logo/Logo";
import Navigation from "@/components/Globals/Navigation/Navigation";

export default function SiteHeader() {
    const classes = ['flex', 'flex-row', 'justify-between', 'items-center', 'p-4'];
    return (
        <header className={classes.join(' ')}>
            <Logo />
            <Navigation />
        </header>
    )
}