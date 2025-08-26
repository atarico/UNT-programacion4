import { useState } from "react";
import { ContextoContador } from "./contexto-contador";

export const ProveedorContador = ({ children }) => {
    const [count, setCount] = useState(0);

    return (
        <ContextoContador.Provider value={{ count, setCount }}>
            {children}
        </ContextoContador.Provider>
    );
};