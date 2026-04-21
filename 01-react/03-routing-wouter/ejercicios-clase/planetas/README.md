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

### Paso 4 - Crear el detalle del item y ruteo

Como pasamos la lista de items como props al componente `ItemDetail`, podemos usar el hook `useParams` de `wouter` para obtener el id del item que queremos mostrar.

`itemDetail.jsx`

```jsx
import { Link, useParams } from "wouter";

const ItemDetail = ({ items }) => {
  /* Hook de wouter */
  const { id } = useParams();

  const item = items.find((item) => item.id === Number(id));

  return (
    <div>
      <h1>Detalles del item</h1>
      <p>id: {item.id}</p>
      <p>nombre: {item.nombre}</p>

      <Link href="/list">Volver a la lista</Link>
    </div>
  );
};

export default ItemDetail;
```

`wouter` nos provee de un hook llamado `useParams` que nos permite acceder a los parámetros de la ruta actual.
En este caso, estamos accediendo al parámetro `id` que definimos en la ruta `/items/:id`.
Cuando accedemos a la ruta `/items/1`, el valor de `id` será `1`.

`App.jsx`

```jsx
import { Route, Switch } from "wouter";
import { Navbar } from "./components/navbar";
import Home from "./pages/Home";
import List from "./pages/List";
import ItemDetail from "./pages/itemDetail";

function App() {
  const items = [
    { id: 1, nombre: "item 1" },
    { id: 2, nombre: "item 2" },
    { id: 3, nombre: "item 3" },
  ];

  return (
    <Navbar>
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/list">
        <List items={items} />
      </Route>

      <Route path="/items/:id">
        <ItemDetail items={items} />
      </Route>
    </Switch>
  );
}

export default App;

```

### Paso 5 - Crear pag NotFound - 404

Como sabemos, es importante manejar los errores 404 en nuestra aplicación. Para ello, crearemos un nuevo componente llamado `NotFound.jsx` y lo utilizaremos en nuestra configuración de rutas.

`NotFound.jsx`

```jsx
import React from "react";

export default function NotFound() {
  return (
    <>
      <h1>404 - Not Found</h1>
      <p>La página que estás buscando no existe.</p>
    </>
  );
}
```

‼️Para manejar el error 404, lo que hacemos es en el componente `Route` es no definir niguna ruta. Como ya definimos las rutas `/` para el componente `Home`, `/list` para el componente `List` y `/items/:id` para el componente `ItemDetail`, cualquier otra ruta que no coincida con estas será manejada por el componente `NotFound`. Esto asegura que si un usuario intenta acceder a una ruta que no existe, verá la página 404 en lugar de un error en la consola o una pantalla en blanco.

```jsx
import { Route, Switch } from "wouter";
import { Navbar } from "./components/navbar";
import Home from "./pages/Home";
import List from "./pages/List";
import ItemDetail from "./pages/itemDetail";
import NotFound from "./pages/NotFound";

function App() {
  const items = [
    { nombre: "item 1" } /* le saco el id para forzar el error 404 */,
    { id: 2, nombre: "item 2" },
    { id: 3, nombre: "item 3" },
  ];

  return (
    <Navbar>
      <Switch>
        <Route path="/" component={Home} />

        <Route path="/list">
          <List items={items} />
        </Route>

        <Route path="/items/:id">
          <ItemDetail items={items} />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </Navbar>
  );
}

export default App;
```

Ahora también debemos asegurarnos de que el componente `ItemDetail` maneje correctamente el caso en el que no se encuentra el item. Para eso primero quitamos el `id` de un item de nuestra lista de datos y en el componente `item-detail` verificamos si el item existe, sino renderizamos el componente `NotFound`.

`item-detail.jsx`

```jsx
import { Link, useParams } from "wouter";

const ItemDetail = ({ items }) => {
  /* Hook de wouter */
  const { id } = useParams();
  const item = items.find((item) => item.id === Number(id));

  // Renderizamos el componente NotFound si no se encuentra el item
  if (!item) {
    return <NotFound />;
  }

  return (
    <div>
      <h1>Detalles del item</h1>
      <p>id: {item.id}</p>
      <p>nombre: {item.nombre}</p>

      <Link href="/list">Volver a la lista</Link>
    </div>
  );
};

export default ItemDetail;
```

### Paso 6 - Separar la lógica de datos de la lógica de vistas

Como último paso lo que hacemos es sacar del componente `App` la lista de planetas y moverla a un archivo de datos separado. Luego, importamos esta lista en los componentes que la necesiten.

1. Creamos un nuevo archivo llamado `planets-data.js` en la carpeta `src/data` y movemos la lista de planetas allí.

```jsx
// src/data/planets-data.js
const planetas = [
  { planeta: "Mercurio" },
  { id: 2, planeta: "Venus" },
  { id: 3, planeta: "Tierra" },
  { id: 4, planeta: "Marte" },
  { id: 5, planeta: "Jupiter" },
  { id: 6, planeta: "Saturno" },
  { id: 7, planeta: "Urano" },
  { id: 8, planeta: "Neptuno" },
];

export default planetas;
```

2. Luego, en el componente `App.jsx`, reescribimos las rutas

```jsx
// src/App.jsx
import { Route, Switch } from "wouter";
import { Navbar } from "./components/navbar";
import Home from "./pages/Home";
import List from "./pages/List";
import ItemDetail from "./pages/itemDetail";

function App() {
  return (
    <Navbar>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/planets" component={PlanetList} />
        <Route path="/planeta/:id" component={PlanetDetail} />
        <Route component={NotFound} />
      </Switch>
    </Navbar>
  );
}

export default App;
```

3. Finalmente, en los componentes `List` y `ItemDetail`, también importamos la lista de planetas desde el archivo de datos.

```jsx
// src/pages/List.jsx
import planetas from "../data/planets-data";

export default function List() {
  return (
    <div>
      <h1>Lista de Planetas</h1>
      <ul>
        {planetas.map((planeta) => (
          <li key={planeta.id}>{planeta.planeta}</li>
        ))}
      </ul>
    </div>
  );
}
```

```jsx
// src/pages/itemDetail.jsx
import { useParams } from "wouter";
import planetas from "../data/planets-data";

const ItemDetail = () => {
  const { id } = useParams();
  const planeta = planetas.find((p) => p.id === Number(id));

  if (!planeta) {
    return <NotFound />;
  }

  return (
    <div>
      <h1>Detalles del Planeta</h1>
      <p>ID: {planeta.id}</p>
      <p>Nombre: {planeta.planeta}</p>
    </div>
  );
};

export default ItemDetail;
```

**Con estos cambios, hemos separado la lógica de datos de la lógica de las vistas, lo que hace que nuestro código sea más limpio y fácil de mantener.**
