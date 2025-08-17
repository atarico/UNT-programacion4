import { Link, useParams } from "wouter";
import NotFound from "./not-found";
import planetas from "../data/planets-data"

export default function PlanetDetail() {

    const { id } = useParams();
    const planeta = planetas.find(elPlaneta => elPlaneta.id === Number(id));

    if (!planeta) {
        return <NotFound />;
    }

    return (
        <main className="p-8 flex flex-col align-center justify-around gap-6">
            <h1 className="text-4xl font-bold mb-4">Planeta {planeta.planeta}</h1>
            <section>
                <div className="flex flex-col align-center justify-center gap-4 shadow-lg p-6 bg-gray-800 rounded-2xl">
                    <img src={planeta.img} alt={planeta.planeta} className="rounded-4xl mb-4 shadow-2xl" />
                    <div>
                        <p className="text-2xl font-medium mb-2">Es el {planeta.id}° planeta del sistema solar.</p>
                        <p className="text-gray-400">{planeta.description}</p>
                    </div>
                </div>
            </section>

            <Link href="/planets"
                className="  border rounded-4xl px-4 py-2 w-fit bg-blue-500 hover:bg-blue-900 hover:border-blue-500 transition-colors">Volver a lista de planetas</Link>
        </main>
    )
}