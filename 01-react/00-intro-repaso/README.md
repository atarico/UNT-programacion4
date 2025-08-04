# ⚛️ REPASO React: Componentes funcionales, JSX, Props, Eventos y Estado

## 🎯 Objetivo

Repasar las bases para comenzar a desarrollar aplicaciones con **React**, recordando sus conceptos fundamentales: **JSX**, **componentes funcionales**, **props**, **children**, **eventos** y **estado (`useState`)**.

## 🚀 ¿Qué es React?

React es una **biblioteca de JavaScript** desarrollada por Meta para construir **interfaces de usuario (UI)** de forma declarativa y basada en **componentes reutilizables**. Permite crear aplicaciones web reactivas, modulares y eficientes.

## 🧩 Componentes funcionales

Son funciones que devuelven JSX. Representan **piezas reutilizables de UI**.

📌 Siempre empiezan con **mayúscula** (`<Titulo />`).

📌 Siempre retornan 1 solo elemento jsx

```jsx
//titulo.jsx
function Titulo() {
  return <h1>Bienvenido</h1>;
}
```

```jsx
//app.jsx
import Titulo from "./Titulo";

function App() {
  return (
    <>
      <Titulo />
      <p>Esta es mi aplicación</p>
    </>
  );
}
```

#### ❌ Esto NO es válido, ya que retorna 2 elementos

```jsx
//app.jsx
import Titulo from "./Titulo";

function App() {
  return (
      <Titulo />
      <p>Esta es mi aplicación</p>
  );
}
```

‼️ Es recomendable usar **fragmentos** (`<> </>`) para envolver múltiples elementos. Sino cualquier etiqueta que sea contenedora, de ser posible que sea semántica, como `<header>`, `<main>`, `<footer>`, `<section>`, `<article>`, etc. De lo contrario, se puede usar un `<div>`.

```jsx
//app.jsx
import Titulo from "./Titulo";

function App() {
  return (
    <>
      <Titulo />
      <p>Esta es mi aplicación</p>
    </>
  );
}
```

## 🔤 JSX — JavaScript + HTML

JSX es una extensión de sintaxis que permite **escribir como si fuera HTML dentro de JavaScript**. Pero sigue siendo código de JavaScript. Que se transpila a `React.createElement`.

##### Escribimos esto

```jsx
const Saludo = () => {
  return <h1>Hola, mundo!</h1>;
};
```

##### Se por detrás REACT realiza esto

```js
const Saludo = () => {
  return React.createElement("h1", null, "Hola, mundo!");
};
```

📌 Importante:

- Se debe importar `React` si estás usando herramientas antiguas (no necesario con Vite).
- Las etiquetas deben **cerrarse correctamente**.
- Se puede usar **JavaScript dentro de llaves `{}`**.

## 📦 Props — Propiedades de entrada

Las props permiten **pasar datos al componente**.

```jsx
// Saludo.jsx
function Saludo({ nombre }) {
  return <p>Hola, {nombre}!</p>;
}
```

```jsx
// App.jsx
import Saludo from "./Saludo";
function App() {
  return <Saludo nombre="Agustín" />;
}
```

## 🔁 Children — Contenido anidado

`children` es una **prop especial** que representa el contenido que se incluye dentro del componente.

```jsx
function Caja({ children }) {
  return <div className="caja">{children}</div>;
}
```

```jsx
// App.jsx
import Caja from "./Caja";
function App() {
  return (
    <Caja>
      <h2>Hola, mundo!</h2>
      <p>Este es un contenido dentro de la caja.</p>
    </Caja>
  );
}
```

## 🎯 Eventos

React usa **camelCase** para los nombres de eventos y pasa funciones como handlers.

```jsx
function Boton() {
  const manejarClick = () => alert("¡Click!");

  return <button onClick={manejarClick}>Haz clic</button>;
}
```

## 🧠 useState — Manejo de estado

- `useState` permite que los componentes **recuerden valores a lo largo del tiempo**.
- Se importa desde React: `import { useState } from "react";`
- Es un **hook** que devuelve un array de 2 posiciones: estado actual y una función para actualizarlo.
- Se usa dentro de componentes funcionales.
- El estado se inicializa con un valor y se actualiza con la función proporcionada.
- Cada vez que se actualiza el estado, el componente se vuelve a renderizar con el nuevo valor.
- El estado es **local al componente** y no se comparte entre componentes a menos que se use elevanción del estado u otros hooks como Context o Redux.

```jsx
import { useState } from "react";

function Contador() {
  const [cuenta, setCuenta] = useState(0);

  return (
    <div>
      <p>Cuenta: {cuenta}</p>
      <button onClick={() => setCuenta(cuenta + 1)}>Sumar</button>
    </div>
  );
}
```

### ✍️ Input controlado

```jsx
function Formulario() {
  const [nombre, setNombre] = useState("");
  const manejarCambio = (e) => setNombre(e.target.value);
  return (
    <form>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={manejarCambio} />
      </label>
      <p>Hola, {nombre}!</p>
    </form>
  );
}
```

## ✅ Conclusiones clave

- React permite **crear UIs con componentes reutilizables**.
- JSX nos da una sintaxis familiar para crear elementos desde JSs.
- Los datos fluyen desde el padre al hijo usando **props**.
- Los eventos se manejan con funciones.
- El estado (`useState`) hace que los componentes sean **dinámicos e interactivos**.

## 📚 Recursos complementarios

- [Documentación oficial de React](https://es.react.dev/)
- [W3Schools - React JSX](https://www.w3schools.com/react/react_jsx.asp)
- [MDN - Eventos DOM](https://developer.mozilla.org/es/docs/Web/Events)
