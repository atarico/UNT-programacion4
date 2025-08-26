import { useContadorStore } from "../store/useContadorStore";

export function Contador() {
    const count = useContadorStore((state) => state.count);
    return <h2>El contador vale: {count}</h2>;
}