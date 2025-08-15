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
        <>
            <h1>PlanetDetail</h1>
            <p>Detalles del planeta seleccionado</p>

            <ul>
                <li>ID: {planeta.id}</li>
                <li>Nombre: {planeta.planeta}</li>
            </ul>

            <Link href="/planets">Volver a lista de planetas</Link>
        </>
    )
}