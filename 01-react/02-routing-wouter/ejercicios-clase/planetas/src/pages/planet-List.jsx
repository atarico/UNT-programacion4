export const PlanetList = ({ planetas }) => {
    return (
        <>
            <h1>PlanetList</h1>
            <p>Lista de planetas</p>
            <ul>
                {planetas.map((planeta) => (
                    <li key={planeta.id}>{planeta.planeta}</li>
                ))}
            </ul>
        </>
    )
}