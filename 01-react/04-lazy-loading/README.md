# 📚 Lazy Loading

Se puede aplicar en situaciones comunes como:

- Cargar páginas/rutas **solo cuando el usuario navega hacia ellas**.
- Reducir el **tamaño del bundle inicial** de la aplicación.
- Mejorar el **tiempo de carga inicial** (First Contentful Paint).
- Mostrar **indicadores de carga** mientras se obtiene un componente.

## 🧠 ¿Qué es Lazy Loading?

Lazy loading (carga diferida) es una técnica de optimización que consiste en **retrasar la carga de un recurso hasta que realmente se necesite**. En React, esto significa que un componente no se descarga ni se ejecuta hasta que se va a renderizar por primera vez.

Sin lazy loading, **todos los componentes se incluyen en un único archivo JavaScript (bundle)**, incluso los que el usuario quizás nunca visite. Esto puede hacer que la carga inicial sea lenta.


Sin Lazy Loading:
- Bundle.js (todo junto)
- Home + About + Dashboard + ...
- ⚠️ Descarga TODO al inicio


Con Lazy Loading:
- Bundle.js (solo Home)
- About.js (después)
- Dashboard.js (después)
- ✅ Rápido

## 🧪 Sintaxis básica

### `React.lazy()`

Permite importar un componente de forma dinámica:

```jsx
import { lazy } from "react";

const MiComponente = lazy(() => import("./MiComponente"));
```

**‼️ Importante:** El componente importado con `lazy()` debe ser exportado como **export default** en su archivo.

En caso de no ser exportado como default, se debe hacer lo siguiente:

```jsx
const MiComponente = lazy(() => import("./MiComponente").then(module => ({ default: module.MiComponente })));
``` 


### `Suspense`

Envuelve los componentes lazy y muestra un **fallback** (contenido de carga) mientras se descarga el componente:

```jsx
import { Suspense } from "react";

<Suspense fallback={<p>Cargando...</p>}>
  <MiComponente />
</Suspense>
```

## 🔍 Casos prácticos

### 1. Lazy loading básico de un componente

```jsx
import { lazy, Suspense } from "react";

// En lugar de: import Dashboard from "./Dashboard";
const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<p>Cargando dashboard...</p>}>
      <Dashboard />
    </Suspense>
  );
}
```

### 2. Lazy loading con routing (Wouter)

Este es el caso de uso más común: cargar cada página solo cuando el usuario navega a esa ruta.

```jsx
import { lazy, Suspense } from "react";
import { Route, Switch, Link } from "wouter";

// Importaciones dinámicas
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/about">Acerca de</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Suspense fallback={<p>Cargando página...</p>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
```

**‼️ El `<Suspense>` debe envolver las rutas que contienen componentes lazy. Si se coloca fuera del `<Switch>`, aplica a todas las rutas.**

### 3. Componente de carga personalizado

En lugar de un simple texto, se puede crear un componente de loading más elaborado:

```jsx
function Loading() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}>
      <div>
        <div className="spinner"></div>
        <p>Cargando contenido...</p>
      </div>
    </div>
  );
}

// Uso
<Suspense fallback={<Loading />}>
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </Switch>
</Suspense>
```

### 4. Suspense anidado (granular)

Se puede usar `Suspense` de forma anidada para mostrar diferentes fallbacks según la sección:

```jsx
import { lazy, Suspense } from "react";
import { Route, Switch, Link } from "wouter";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Perfil = lazy(() => import("./pages/Perfil"));

function App() {
  return (
    <>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/perfil">Perfil</Link>
      </nav>

      <Switch>
        <Route path="/">
          <Suspense fallback={<p>Cargando inicio...</p>}>
            <Home />
          </Suspense>
        </Route>

        <Route path="/dashboard">
          <Suspense fallback={<p>Cargando dashboard...</p>}>
            <Dashboard />
          </Suspense>
        </Route>

        <Route path="/perfil">
          <Suspense fallback={<p>Cargando perfil...</p>}>
            <Perfil />
          </Suspense>
        </Route>
      </Switch>
    </>
  );
}
```

## 📦 Ejemplo completo: App con Lazy Loading y Wouter

```jsx
// pages/Home.jsx
function Home() {
  return <h1>🏠 Bienvenido a la página principal</h1>;
}
export default Home;
```

```jsx
// pages/About.jsx
function About() {
  return (
    <section>
      <h1>ℹ️ Acerca de nosotros</h1>
      <p>Esta es una aplicación de ejemplo con lazy loading.</p>
    </section>
  );
}
export default About;
```

```jsx
// pages/Contacto.jsx
function Contacto() {
  return (
    <section>
      <h1>📧 Contacto</h1>
      <p>Envianos un mensaje.</p>
    </section>
  );
}
export default Contacto;
```

```jsx
// App.jsx
import { lazy, Suspense } from "react";
import { Route, Switch, Link } from "wouter";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contacto = lazy(() => import("./pages/Contacto"));

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/about">Acerca de</Link> |{" "}
        <Link to="/contacto">Contacto</Link>
      </nav>

      <main>
        <Suspense fallback={<p>⏳ Cargando...</p>}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/contacto" component={Contacto} />
            <Route>
              <h1>404 - Página no encontrada</h1>
            </Route>
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
```

## ⚠️ Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `A component suspended while responding to synchronous input` | Falta `Suspense` envolviendo el componente lazy | Envolver con `<Suspense fallback={...}>` |
| El componente no carga | El componente no tiene `export default` | Agregar `export default` al componente |
| Pantalla en blanco sin fallback | `Suspense` no tiene prop `fallback` | Siempre pasar un `fallback` a `Suspense` |

## 🧠 Buenas prácticas

- Usar lazy loading **por ruta/página**, no por cada componente pequeño (el overhead no vale la pena para componentes simples).

- Siempre envolver componentes lazy con `<Suspense>` y proporcionar un `fallback` útil.

- Los componentes cargados con `lazy()` **deben usar export default**.

- Colocar el `<Suspense>` lo más cerca posible del componente lazy para tener un control granular del loading.

- Considerar usar un **componente de loading reutilizable** en lugar de texto plano.

- En producción, lazy loading genera **chunks separados** automáticamente (con Vite u otros bundlers).

## 📚 Recursos complementarios

- [Documentación oficial de React - lazy](https://es.react.dev/reference/react/lazy)
- [Documentación oficial de React - Suspense](https://es.react.dev/reference/react/Suspense)
- [React docs - Code Splitting](https://es.react.dev/learn)
- [Wouter - Documentación oficial](https://github.com/molefrog/wouter)
