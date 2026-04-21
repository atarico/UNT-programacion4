import { Link } from "wouter"
export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-white p-4 gap-6">

            <h1 className="text-4xl font-bold">404 - Not Found</h1>
            <p className="text-gray-400">La página que estás buscando no existe.</p>
            <img src="https://imgs.search.brave.com/lfGkQk7lcIqojsgWzXUwEwa_qHeDFtCo8MY-rB5f3qk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9lcnJv/ci1jb24tbGEtbCVD/MyVBRG5lYS1kZWwt/YXN0cm9uYXV0YS1l/bi1mb25kby1kZS1n/YWxheGlhLTEyMjcw/ODY2MC5qcGc" />
            <Link href="/"
                className="border rounded-4xl px-4 py-2 w-fit bg-blue-500 hover:bg-blue-900 hover:border-blue-500 transition-colors">Volver al inicio</Link>

        </main>
    );
};