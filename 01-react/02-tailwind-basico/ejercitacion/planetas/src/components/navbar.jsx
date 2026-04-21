import { Link } from "wouter";

export const Navbar = () => {

    const logo = "https://imgs.search.brave.com/YNKVtbl__csDMxHrRqryVrN0PXRS7je9f6KgH6GybzQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI3/MTExNTI5MC9lcy92/ZWN0b3Ivc2lzdGVt/YS1zb2xhci1jb24t/cGxhbmV0YXMtZGVn/cmFkYWRvcy1pbHVz/dHJhY2klQzMlQjNu/LXZlY3RvcmlhbC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/RzNtLTBINHV6U2Qx/RlVLQzdFQzJuZ3Bj/V0lVZW1WOVQtZkV2/NDVCajR4OD0";

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
            <img src={logo} alt="Logo" className="w-20 rounded-full" />
            <div className="flex gap-4">
                <Link href="/" className="text-white text-lg hover:underline hover:text-gray-300">
                    Home
                </Link>
                <Link href="/planets" className="text-white text-lg hover:underline hover:text-gray-300">
                    Planets
                </Link>
            </div>
        </nav>
    );
};
