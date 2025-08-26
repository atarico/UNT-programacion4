import { useContadorStore } from "../store/useContadorStore";

export function Controles() {
    const { aumentar, disminuir, reiniciar } = useContadorStore();
    return (
        <div>
            <button onClick={aumentar}>+1</button>
            <button onClick={disminuir}>-1</button>
            <button onClick={reiniciar}>Reiniciar</button>
        </div>
    );
}