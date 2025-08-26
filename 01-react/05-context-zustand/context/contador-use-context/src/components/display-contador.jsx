import { useContext } from "react";
import { ContextoContador } from "../context/contexto-contador";

export default function DisplayContador() {
    const { count } = useContext(ContextoContador);
    return <h2>El contador vale: {count}</h2>;
}