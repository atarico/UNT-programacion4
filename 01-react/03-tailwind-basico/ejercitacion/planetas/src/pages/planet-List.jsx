import { Link } from "wouter"
import planetas from "../data/planets-data"

export default function PlanetList() {
    return (
        <>
            <h1>PlanetList</h1>
            <p>Lista de planetas</p>
            <ul>
                {planetas.map((planeta) => (
                    <li key={planeta.id}>
                        <Link href={`/planeta/${planeta.id}`}>
                            {planeta.planeta}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

