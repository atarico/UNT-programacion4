import { Link } from "wouter"
import planetas from "../data/planets-data"

export default function PlanetList() {
    return (
        <main className="p-4 bg-blend-color min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-center">Lista de Planetas</h1>
            <p className="text-2xl mb-6">Los planetas se enumeran por su cercanía al Sol de la siguiente manera:</p>
            <ol className="list-decimal pl-6 py-2 border-l-4 border-blue-300 max-w-2xl ">
                {planetas.map((planeta) => (
                    <li key={planeta.id}>
                        <Link href={`/planeta/${planeta.id}`} className="flex items-center w-44 justify-between">
                            <em className="text-xl mr-4">{planeta.planeta}</em> <span className="text-gray-500">  → ver más</span>
                        </Link>
                    </li>
                ))}
            </ol>
        </main>
    )
}

