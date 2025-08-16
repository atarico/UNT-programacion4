import { useParams } from "wouter";


export default function Details() {
    const { name, description } = useParams();


    if (!name) {
        return <p>Tecnología no encontrada</p>;
    }

    return (
        <section>
            <h1>Mas sobre <em>{name}</em></h1>
            <p>{description}</p>
        </section>
    )
}