# Clase: React useContext - Estado Global Simplificado

## 📋 Introducción: ¿Qué es el Estado Global?

Imagina una aplicación React como una gran empresa con múltiples departamentos (componentes). Sin un estado global, cada vez que un departamento necesita información de otro, debe pasar mensajes a través de todos los niveles jerárquicos intermedios. Esto se conoce como **"prop drilling"**.

### Ejemplo Abstracto: Sistema de Autenticación

```javascript
// ❌ Prop Drilling - Problemático
function App() {
  const [usuario, setUsuario] = useState(null);
  return <NavBar usuario={usuario} />;
}

function NavBar({ usuario }) {
  return <MenuUsuario usuario={usuario} />;
}

function MenuUsuario({ usuario }) {
  return <PerfilUsuario usuario={usuario} />;
}

function PerfilUsuario({ usuario }) {
  return <div>{usuario?.nombre}</div>;
}
```

Con **estado global**, es como tener un sistema de comunicación centralizado donde cualquier departamento puede acceder directamente a la información que necesita.

### 🎯 Ventajas del Estado Global:

1. **Eliminación del Prop Drilling**: No necesitas pasar props por múltiples niveles
2. **Código más limpio**: Menos parámetros en componentes intermedios
3. **Mantenimiento simplificado**: Cambios centralizados en un solo lugar
4. **Mejor performance**: Evitas re-renderizados innecesarios en componentes intermedios
5. **Escalabilidad**: Ideal para aplicaciones que crecen en complejidad

---

## 🧭 ¿Qué es Context en React?

**React Context** es el mecanismo nativo de React para compartir datos a través del árbol de componentes sin prop drilling. Es como crear un "canal de comunicación global" al que cualquier componente puede suscribirse.

### ¿Para qué se usa Context?

- **Temas de aplicación** (dark/light mode)
- **Autenticación de usuarios**
- **Configuración global**
- **Carrito de compras**
- **Idioma/localización**
- **Estado de loading global**

### ¿Cómo funciona Context?

Context utiliza el patrón **Provider-Consumer**:

1. **Provider**: Componente que "provee" o suministra datos
2. **Consumer**: Componentes que "consumen" o usan esos datos
3. **useContext**: Hook que simplifica el consumo de datos

---

## 💡 useContext Hook

`useContext` es un Hook que te permite leer y suscribirte a un contexto desde tu componente de manera directa y sencilla.

### Sintaxis básica:

```javascript
const value = useContext(MiContexto);
```

---

## 🚀 Mini Proyecto 1: Mini Proyecto 1: Contador Global

### 🚀 Setup

```bash
pnpm create vite@latest
cd contador-global
pnpm install
pnpm dev
```

---

Entra a `src/` y crea las siguientes carpetas:

`context/` → aquí va nuestro contexto

`components/` → componentes

### 1. Crear el Contexto

`📂 src/context/CounterContext.jsx`

```jsx
import { createContext, useState } from "react";

export const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};
```

### 2. Envolver la App con el Provider

`📂 src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CounterProvider } from "./context/CounterContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CounterProvider>
      <App />
    </CounterProvider>
  </React.StrictMode>
);
```

### 3. Consumir el Contexto

`📂 src/components/CounterDisplay.jsx`

```jsx
import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

export default function CounterDisplay() {
  const { count } = useContext(CounterContext);
  return <h1>El contador vale: {count}</h1>;
}
```

`📂 src/components/CounterButtons.jsx`

```jsx
import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

export default function CounterButtons() {
  const { count, setCount } = useContext(CounterContext);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
    </div>
  );
}
```

`📂 src/App.jsx`

```jsx
import CounterDisplay from "./components/CounterDisplay";
import CounterButtons from "./components/CounterButtons";

function App() {
  return (
    <div>
      <h2>Ejemplo de Contexto</h2>
      <CounterDisplay />
      <CounterButtons />
    </div>
  );
}

export default App;
```

✅ Ahora el contador se comparte entre todos los componentes, sin necesidad de pasar props.

---

## 📝 Mini Proyecto 2: Sistema de Tema (Dark/Light Mode)

### Paso 1: Crear el proyecto con Vite

```bash
pnpm create vite@latest
cd tema-app
pnpm install
pnpm dev
```

### Paso 2: Crear el Context de Tema

Crea el archivo `src/contexts/ThemeContext.jsx`:

```javascript
import { createContext, useContext, useState } from "react";

// 1. Crear el contexto
const ThemeContext = createContext();

// 2. Crear el Provider
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// 3. Hook personalizado para usar el contexto
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser usado dentro de ThemeProvider");
  }
  return context;
}
```

### Paso 3: Componente Header

Crea `src/components/Header.jsx`:

```javascript
import { useTheme } from "../contexts/ThemeContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header ${theme}`}>
      <h1>Mi Aplicación</h1>
      <button onClick={toggleTheme} className={`btn ${theme}`}>
        Cambiar a {theme === "light" ? "Dark" : "Light"}
      </button>
    </header>
  );
}
```

### Paso 4: Componente Main

Crea `src/components/Main.jsx`:

```javascript
import { useTheme } from "../contexts/ThemeContext";

export function Main() {
  const { theme } = useTheme();

  return (
    <main className={`main ${theme}`}>
      <h2>Contenido Principal</h2>
      <p>Este contenido cambia de tema dinámicamente</p>
      <div className={`card ${theme}`}>
        <h3>Tarjeta de ejemplo</h3>
        <p>
          El tema actual es: <strong>{theme}</strong>
        </p>
      </div>
    </main>
  );
}
```

### Paso 5: Estilos CSS

Actualiza `src/index.css`:

```css
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", sans-serif;
  transition: all 0.3s ease;
}

/* Estilos para tema claro */
.header.light,
.main.light {
  background-color: #ffffff;
  color: #333333;
}

.card.light {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
}

.btn.light {
  background-color: #007bff;
  color: white;
}

/* Estilos para tema oscuro */
.header.dark,
.main.dark {
  background-color: #1a1a1a;
  color: #ffffff;
}

.card.dark {
  background-color: #2d2d2d;
  border: 1px solid #444444;
}

.btn.dark {
  background-color: #ffc107;
  color: #1a1a1a;
}

/* Estilos de componentes */
.header {
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.main {
  padding: 2rem;
  min-height: 90vh;
  transition: all 0.3s ease;
}

.card {
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1rem 0;
  transition: all 0.3s ease;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover {
  opacity: 0.8;
  transform: translateY(-2px);
}
```

### Paso 6: App Principal

Actualiza `src/App.jsx`:

```javascript
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

### Paso 7: Limpiar archivos innecesarios

Elimina o limpia `src/App.css` si no lo necesitas.

---

## 🎯 ¿Qué aprendimos en este proyecto?

1. **Creación de Context**: `createContext()`
2. **Provider Pattern**: Envolver componentes con el Provider
3. **Hook personalizado**: Para encapsular la lógica del contexto
4. **useContext**: Para consumir el contexto en componentes
5. **Estado compartido**: Un estado accesible desde cualquier componente

---

## 📚 Recursos Adicionales

### Cuándo usar Context vs otras alternativas:

**✅ Usa Context cuando**:

- Necesitas compartir datos simples entre muchos componentes
- La aplicación es pequeña a mediana
- Los datos no cambian muy frecuentemente
- Quieres evitar prop drilling

**❌ No uses Context cuando**:

- Los datos cambian constantemente (puede causar renders innecesarios)
- Necesitas lógica compleja de estado (considera Redux o Zustand)
- Solo unos pocos componentes necesitan los datos

### Buenas prácticas:

1. **Crea múltiples contextos** para diferentes preocupaciones
2. **Usa custom hooks** para encapsular la lógica del contexto
3. **Coloca Providers lo más cerca posible** de donde se necesitan
4. **Maneja errores** cuando el contexto no está disponible

---

## 🎓 Conclusión

React Context con useContext es una herramienta poderosa para manejar estado global de manera sencilla. Te permite crear aplicaciones más escalables y mantenibles sin la complejidad de librerías externas como Redux.

**Recuerda**: Context es perfecto para aplicaciones pequeñas a medianas. Para aplicaciones grandes y complejas, considera usar Redux, Zustand o MobX.

---
