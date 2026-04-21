# 📚 Custom Hooks

## 🎯 ¿Por qué son útiles?

Los **custom hooks** permiten **extraer y reutilizar lógica con estado** entre múltiples componentes sin repetir código. Son funciones de JavaScript que usan hooks de React internamente y siguen la convención de empezar con `use`.

### Ventajas principales

- **Reutilización:** Escribir la lógica una vez y usarla en cualquier componente.
- **Separación de responsabilidades:** El componente se enfoca en la UI, el hook en la lógica.
- **Legibilidad:** Los componentes quedan más limpios y fáciles de entender.
- **Testabilidad:** Se puede testear la lógica del hook de forma aislada.
- **Composición:** Los custom hooks pueden usar otros hooks (nativos o custom).

### Sin custom hooks vs con custom hooks

```jsx
// ❌ Sin custom hook: lógica duplicada en cada componente
function ComponenteA() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/api/datos-a")
      .then((res) => res.json())
      .then((data) => { setDatos(data); setCargando(false); });
  }, []);

  // ... renderizado
}

function ComponenteB() {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/api/datos-b")
      .then((res) => res.json())
      .then((data) => { setDatos(data); setCargando(false); });
  }, []);

  // ... renderizado (misma lógica repetida!)
}
```

```jsx
// ✅ Con custom hook: la lógica se escribe una sola vez
function ComponenteA() {
  const { datos, cargando } = useFetch("/api/datos-a");
  // ... renderizado
}

function ComponenteB() {
  const { datos, cargando } = useFetch("/api/datos-b");
  // ... renderizado
}
```

## 📏 Reglas para crear custom hooks

1. El nombre **debe empezar con `use`** (ej: `useFetch`, `useForm`, `useLocalStorage`).
2. Pueden usar **cualquier hook de React** internamente (`useState`, `useEffect`, `useReducer`, etc.).
3. Pueden **recibir parámetros** y **retornar lo que sea necesario** (valores, funciones, objetos, arrays).
4. Siguen las **mismas reglas que los hooks normales**: solo se llaman en el nivel superior del componente, nunca dentro de condicionales o loops.

## 🔍 Ejemplos prácticos

---

### 1. `useFetch` — Obtener datos de una API

El hook más común. Encapsula la lógica de fetch con estados de carga y error:

```jsx
import { useState, useEffect } from "react";

function useFetch(url) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => setDatos(data))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [url]);

  return { datos, cargando, error };
}

export default useFetch;
```

**Uso:**

```jsx
import useFetch from "./hooks/useFetch";

function Usuarios() {
  const { datos, cargando, error } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {datos.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

### 2. `useLocalStorage` — Persistir estado en localStorage

Funciona como `useState` pero guarda y lee el valor de `localStorage`:

```jsx
import { useState, useEffect } from "react";

function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(clave);
    return guardado !== null ? JSON.parse(guardado) : valorInicial;
  });

  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor));
  }, [clave, valor]);

  return [valor, setValor];
}

export default useLocalStorage;
```

**Uso:**

```jsx
import useLocalStorage from "./hooks/useLocalStorage";

function Configuracion() {
  const [tema, setTema] = useLocalStorage("tema", "claro");

  return (
    <div>
      <p>Tema actual: {tema}</p>
      <button onClick={() => setTema(tema === "claro" ? "oscuro" : "claro")}>
        Cambiar tema
      </button>
    </div>
  );
}
```

El valor persiste incluso si el usuario cierra y vuelve a abrir la página.

---

### 3. `useToggle` — Alternar un valor booleano

Un hook simple pero muy útil para modales, menús, switches, etc:

```jsx
import { useState } from "react";

function useToggle(valorInicial = false) {
  const [valor, setValor] = useState(valorInicial);

  const toggle = () => setValor((prev) => !prev);
  const activar = () => setValor(true);
  const desactivar = () => setValor(false);

  return { valor, toggle, activar, desactivar };
}

export default useToggle;
```

**Uso:**

```jsx
import useToggle from "./hooks/useToggle";

function MenuLateral() {
  const { valor: abierto, toggle, desactivar } = useToggle(false);

  return (
    <>
      <button onClick={toggle}>☰ Menú</button>
      {abierto && (
        <nav>
          <ul>
            <li>Inicio</li>
            <li>Perfil</li>
            <li>Configuración</li>
          </ul>
          <button onClick={desactivar}>Cerrar</button>
        </nav>
      )}
    </>
  );
}
```

---

### 4. `useForm` — Manejar formularios

Centraliza la lógica de manejo de formularios con validación y reset:

```jsx
import { useState } from "react";

function useForm(valoresIniciales) {
  const [valores, setValores] = useState(valoresIniciales);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => setValores(valoresIniciales);

  return { valores, handleChange, reset };
}

export default useForm;
```

**Uso:**

```jsx
import useForm from "./hooks/useForm";

function Registro() {
  const { valores, handleChange, reset } = useForm({
    nombre: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", valores);
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={valores.nombre}
        onChange={handleChange}
        placeholder="Nombre"
      />
      <input
        name="email"
        value={valores.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
      />
      <input
        name="password"
        value={valores.password}
        onChange={handleChange}
        placeholder="Contraseña"
        type="password"
      />
      <button type="submit">Registrarse</button>
      <button type="button" onClick={reset}>Limpiar</button>
    </form>
  );
}
```

---

### 5. `useContador` — Contador reutilizable

Un ejemplo didáctico que combina `useReducer` con un custom hook:

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "incrementar":
      return { cuenta: state.cuenta + action.paso };
    case "decrementar":
      return { cuenta: state.cuenta - action.paso };
    case "reset":
      return { cuenta: 0 };
    default:
      return state;
  }
}

function useContador(inicial = 0, paso = 1) {
  const [state, dispatch] = useReducer(reducer, { cuenta: inicial });

  const incrementar = () => dispatch({ type: "incrementar", paso });
  const decrementar = () => dispatch({ type: "decrementar", paso });
  const reset = () => dispatch({ type: "reset" });

  return { cuenta: state.cuenta, incrementar, decrementar, reset };
}

export default useContador;
```

**Uso:**

```jsx
import useContador from "./hooks/useContador";

function MiContador() {
  const { cuenta, incrementar, decrementar, reset } = useContador(0, 5);

  return (
    <div>
      <p>Cuenta: {cuenta}</p>
      <button onClick={incrementar}>+5</button>
      <button onClick={decrementar}>-5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## 📁 Organización recomendada

```
src/
  hooks/
    useFetch.js
    useLocalStorage.js
    useToggle.js
    useForm.js
    useContador.js
  components/
    ...
  pages/
    ...
```

Se recomienda crear una carpeta `hooks/` dentro de `src/` para mantener todos los custom hooks organizados.

## 🧠 Buenas prácticas

- Siempre empezar el nombre con `use` para que React aplique las reglas de hooks.

- Mantener cada hook con una **única responsabilidad** (principio de responsabilidad única).

- Si un hook crece demasiado, considerar **dividirlo en hooks más pequeños**.

- Retornar **objetos** cuando se devuelven múltiples valores con nombre (para usar desestructuración con nombre), o **arrays** si se quiere permitir renombrar (como `useState`).

- Documentar qué parámetros recibe y qué retorna cada custom hook.

- Evitar crear custom hooks para lógica que **no involucra hooks de React** — para eso basta con funciones normales.

## 📚 Recursos complementarios

- [Documentación oficial de React - Custom Hooks](https://es.react.dev/learn/reusing-logic-with-custom-hooks)
- [React docs - Reglas de los hooks](https://es.react.dev/reference/rules/rules-of-hooks)
- [usehooks.com - Colección de hooks útiles](https://usehooks.com/)
