# Routing con Wouter

**📁 ejercicios-clase -> ejemplos de cómo usar el paquete `wouter`**

**📁 practica -> ejercitación para resolver**

## Intro

Wouter es una biblioteca de enrutamiento para aplicaciones React que permite una navegación sencilla y declarativa. A continuación, se presentan los conceptos básicos para comenzar a utilizar Wouter en tu proyecto.

## Instalación

Para instalar Wouter, puedes usar npm, yarn o pnpm:

```bash
npm install wouter
```

o

```bash
yarn add wouter
```

o

```bash
pnpm add wouter
```

## Uso básico

Para utilizar Wouter, primero debes importar los componentes necesarios en tu archivo:

```jsx
import { Route, Link, Switch } from "wouter";
```

Luego, puedes definir tus rutas utilizando el componente `Route`:

```jsx
function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  );
}
```

Para navegar entre rutas, utiliza el componente `Link`:

```jsx
<Link to="/">Home</Link>
<Link to="/about">About</Link>
```

## Parámetros de ruta

Wouter también permite definir parámetros en las rutas. Por ejemplo:

```jsx
<Route path="/user/:id" component={User} />
```

En el componente `User`, puedes acceder al parámetro `id` a través de los props o con el hook `useParams`:

```jsx
function User({ params }) {
  return <div>User ID: {params.id}</div>;
}
```

```jsx
import { useParams } from "wouter";

function User() {
  const { id } = useParams();
  return <div>User ID: {id}</div>;
}
```

## Hooks útiles

Wouter proporciona algunos hooks útiles para trabajar con el enrutamiento:

```jsx
import { useRoute, useParams, useLocation } from "wouter";
- `useRoute`: Devuelve información sobre la ruta actual.
- `useParams`: Devuelve los parámetros de la ruta actual.
- `useLocation`: Devuelve la ubicación actual.
```

## Conclusión

Wouter es una excelente opción para manejar el enrutamiento en aplicaciones React de manera simple y efectiva. Para más información, consulta la [documentación oficial](https://wouter.sh).
