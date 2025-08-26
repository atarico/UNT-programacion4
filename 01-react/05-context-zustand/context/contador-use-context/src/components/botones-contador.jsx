import { useContext } from "react";
import { ContextoContador } from "../context/contexto-contador";

export default function BotonesContador() {
    const { count, setCount } = useContext(ContextoContador);
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Incrementar</button>
            <button onClick={() => setCount(count - 1)}>Decrementar</button>
            <button onClick={() => setCount(0)}>Resetear</button>
        </div>
    );
}