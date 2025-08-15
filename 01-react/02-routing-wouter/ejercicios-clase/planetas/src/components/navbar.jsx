import { Link } from "wouter"

export const Navbar = () => {
    return (
        <nav>
            <Link href="/">Home </Link>
            <Link href="/planets">- Planets</Link>
        </nav>
    )
}