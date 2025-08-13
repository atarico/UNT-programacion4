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

### Paso 2 - Configurar las rutas

Configurar las rutas en `src/App.jsx` utilizando `wouter`:

- Importar los componentes necesarios
- Definir las rutas utilizando el componente `Route` que viene desde `wouter` modificando el atributo o propiedad `path` con la ruta que nosotros querramos que se ejecute, además debemos decirle qué componente queremos que se renderice cuando se acceda a esa ruta modificando la propiedad `component`.

- Como tenemos varias rutas, usaremos el componente `Switch`, ponemos todos los componentes `Route` dentro de él, lo que nos permite renderizar una sola ruta a la vez. De lo contrario, se renderizarían todas las rutas que coincidan con la URL actual.

```jsx
import { Route, Switch } from "wouter";
import { Navbar } from "./components/navbar";
import Home from "./pages/Home";
import List from "./pages/List";

function App() {
  const items = [
    { id: 1, nombre: "item 1" },
    { id: 2, nombre: "item 2" },
    { id: 3, nombre: "item 3" },
  ];

  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/list">
        <List items={items} />
      </Route>
    </Switch>
  );
}

export default App;
```

**Si vamos a renderizar un componente directamente podemos usar la propiedad `component` y pasarle el componente como valor.**
**Si el componente que queremos renderizar necesita recibir props, podemos usar la propiedad `children` y pasarle el componente como un elemento hijo.**

##### Una vez realizado todo el routeo verificar si los componentes se renderizan correctamente.

### Paso 3 - Crear el listado de items

Al componente de List.jsx le pasamos la lista de items como props y renderizamos un listado de enlaces.
Dentro de cada componente `Link` le pasamos la ruta `/items/${item.id}` para que al hacer click en el enlace nos lleve a la vista del detalle del item correspondiente y renderizamos el nombre de cada item como `children`.

```jsx
import { Link } from "wouter";

const List = ({ items }) => {
  return (
    <div>
      <h1>Listado de Items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/items/${item.id}`}>{item.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
```
