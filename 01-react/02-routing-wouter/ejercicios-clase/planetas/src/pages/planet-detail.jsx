import { Link, useParams } from "wouter";
import NotFound from "./not-found";

export default function PlanetDetail({ planetas }) {

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