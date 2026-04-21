# 📚 `useReducer` en React

## 🎯 Objetivo

Comprender el hook `useReducer` de React como una alternativa a `useState` para manejar **estados complejos** o con **múltiples transiciones**. Se basa en el patrón **reducer**, popularizado por Redux, y permite centralizar la lógica de actualización del estado en una función pura.

Se puede aplicar en situaciones comunes como:

- Manejar estados con **múltiples sub-valores** (objetos complejos).
- Centralizar la lógica de actualización cuando hay **varias acciones posibles**.
- Hacer que las **transiciones de estado sean predecibles** y fáciles de testear.
- Reemplazar múltiples `useState` cuando el estado está relacionado entre sí.

## 🧠 ¿Qué es `useReducer`?

`useReducer` es un hook que recibe una **función reducer** y un **estado inicial**, y devuelve el **estado actual** junto con una función `dispatch` para enviar acciones.

```jsx
import { useReducer } from "react";
```

**‼️ La función reducer debe ser una función pura: dado el mismo estado y la misma acción, siempre produce el mismo resultado. No debe modificar el estado directamente, sino devolver un nuevo objeto.**

## 🧪 Sintaxis básica

```jsx
const [state, dispatch] = useReducer(reducer, estadoInicial);
```

- **`reducer`**: función `(estado, accion) => nuevoEstado`.
- **`estadoInicial`**: valor inicial del estado.
- **`state`**: el estado actual.
- **`dispatch`**: función para enviar acciones al reducer.

## 🔄 ¿Cómo funciona el flujo?

1. El componente llama a `dispatch({ type: "ACCION" })`.
2. React ejecuta la función `reducer(estadoActual, accion)`.
3. El reducer retorna un **nuevo estado**.
4. React re-renderiza el componente con el estado actualizado.

```
dispatch(acción) → reducer(estado, acción) → nuevo estado → re-render
```

## 🔍 Casos prácticos

### 1. Contador simple

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "incrementar":
      return { cuenta: state.cuenta + 1 };
    case "decrementar":
      return { cuenta: state.cuenta - 1 };
    case "reset":
      return { cuenta: 0 };
    default:
      throw new Error(`Acción no reconocida: ${action.type}`);
  }
}

function Contador() {
  const [state, dispatch] = useReducer(reducer, { cuenta: 0 });

  return (
    <div>
      <p>Cuenta: {state.cuenta}</p>
      <button onClick={() => dispatch({ type: "incrementar" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrementar" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
export default Contador;
```

### 2. Acciones con datos (payload)

Las acciones pueden incluir un **payload** con información adicional:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "cambiar_nombre":
      return { ...state, nombre: action.payload };
    case "cambiar_edad":
      return { ...state, edad: action.payload };
    default:
      return state;
  }
}

function Formulario() {
  const [state, dispatch] = useReducer(reducer, { nombre: "", edad: "" });

  return (
    <form>
      <input
        value={state.nombre}
        onChange={(e) =>
          dispatch({ type: "cambiar_nombre", payload: e.target.value })
        }
        placeholder="Nombre"
      />
      <input
        value={state.edad}
        onChange={(e) =>
          dispatch({ type: "cambiar_edad", payload: e.target.value })
        }
        placeholder="Edad"
        type="number"
      />
      <p>
        {state.nombre} tiene {state.edad} años.
      </p>
    </form>
  );
}
```

### 3. Lista de tareas (To-Do)

```jsx
import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "agregar":
      return [...state, { id: Date.now(), texto: action.payload, completada: false }];
    case "toggle":
      return state.map((tarea) =>
        tarea.id === action.payload
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      );
    case "eliminar":
      return state.filter((tarea) => tarea.id !== action.payload);
    default:
      return state;
  }
}

function ListaTareas() {
  const [tareas, dispatch] = useReducer(reducer, []);
  const [texto, setTexto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (texto.trim()) {
      dispatch({ type: "agregar", payload: texto });
      setTexto("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <span
              style={{
                textDecoration: tarea.completada ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => dispatch({ type: "toggle", payload: tarea.id })}
            >
              {tarea.texto}
            </span>
            <button onClick={() => dispatch({ type: "eliminar", payload: tarea.id })}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTareas;
```

## ⚖️ `useState` vs `useReducer`

| Característica        | `useState`                             | `useReducer`                               |
| --------------------- | -------------------------------------- | ------------------------------------------ |
| Complejidad del estado | Simple (valores primitivos)           | Complejo (objetos, múltiples sub-valores)  |
| Lógica de actualización| Inline (en el componente)             | Centralizada (en la función reducer)       |
| Número de acciones    | Pocas transiciones                     | Múltiples transiciones posibles            |
| Testabilidad          | Más difícil de testear aisladamente   | Fácil: el reducer es una función pura      |
| Similitud con Redux   | No                                     | Sí, mismo patrón                           |

**Regla general:** Si tu estado tiene más de 2-3 `useState` relacionados entre sí, probablemente es mejor usar `useReducer`.

## 🧠 Buenas prácticas

- Definir la función `reducer` **fuera del componente** para evitar recrearla en cada render.

- Usar constantes para los tipos de acción para evitar errores tipográficos.

```jsx
const ACCIONES = {
  INCREMENTAR: "incrementar",
  DECREMENTAR: "decrementar",
  RESET: "reset",
};
```

- El reducer debe ser una **función pura**: sin efectos secundarios, sin llamadas a APIs, sin mutaciones del estado.

- Siempre incluir un caso `default` en el `switch` del reducer.

- Usar el operador spread (`...state`) para no perder propiedades del estado al actualizarlo.

## 📚 Recursos complementarios

- [Documentación oficial de React - useReducer](https://es.react.dev/reference/react/useReducer)
- [React docs - Extraer lógica de estado en un reducer](https://es.react.dev/learn/extracting-state-logic-into-a-reducer)
- [MDN - Array.prototype.reduce](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
