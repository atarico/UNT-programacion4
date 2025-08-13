# Ejercitación de routing paso a paso

## **Construir una app con 3 vistas**

- "/" -> Página principal
- "/listPlanetas" -> Listado de planetas
- "/planeta/:id" -> Detalle de un planeta

## Instalación

```bash
npm create vite@latest
cd mini-ejercicio-wouter
npm install
```

```bash
npm install wouter
```

## **Pasos para implementar el routing**

### Paso 1 - Crear los componentes

Crear los componentes para cada vista en la carpeta `src/pages`:

- `Home.jsx`
- `List.jsx`

#### **‼️IMPORTANTE**

Los componentes deben estar exportados por `default`, de lo contrario no funcionaran.
ej:
home.jsx

```jsx
const Home = () => {
  return (
    <div>
      <h1>Pagina de Inicio</h1>
      <p>Bienvenido a la pagina de inicio de ...</p>
    </div>
  );
};

export default Home;
```

Creamos el componente en donde tendremos alojados los enlaces de navegación.

```jsx
import { Link } from "wouter";

export const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/list">lista</Link>
    </nav>
  );
};
```

Ahora en vez de la etiqueta `<a>` estamos usando el componente `<Link>` de `wouter`, que nos permite navegar entre las diferentes rutas de nuestra aplicación sin recargar la página.
Esto quiere decir que cuando yo haga click en el enlace `lista` se debe ejecutar la ruta `/list`.
