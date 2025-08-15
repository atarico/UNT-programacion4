import { Link } from "wouter"

export default function PlanetList({ planetas }) {
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

