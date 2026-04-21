import { Link } from "wouter";
import technologies from "../data/technologies";

export default function About() {
    return (
        <div>
            <h2>Tecnologias del Front</h2>
            <ul>
                {technologies.map(tech => (
                    <li>
                        <Link href={`/technologies/${tech.id}`}>{tech.name}</Link>
                    </li>
                ))}
            </ul>
            <article>
                <p>Estas son algunas de las tecnologías más utilizadas en el desarrollo front-end.</p>
                <p>El desarrollo front-end se centra en la parte visual y la experiencia del usuario de una aplicación web.</p>
                <p>Estas tecnologías funcionan en el navegador y son esenciales para crear interfaces de usuario interactivas.</p>
            </article>
        </div>
    )
}