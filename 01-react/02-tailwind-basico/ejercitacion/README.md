# Ejercitación TailwindCSS

## 1. Creación de proyecto e instalación

1. Crear un nuevo proyecto de Vite

```bash
npm create vite@latest my-project
cd my-project
```

2. Instalar TailwindCSS y su plugin para Vite

```bash
npm install tailwindcss @tailwindcss/vite
```

3. Agrega el plugin de TailwindCSS a la configuración de Vite

`vite.config.js`

```js
import tailwindcss from "@tailwindcss/vite"; //importamos el plugin de TailwindCSS
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], //agregamos el plugin de TailwindCSS
});
```

4. Importar tailwind en el archivo `src/index.css`

```css
@import "tailwindcss";
```

### Por motivos prácticos, en este ejercicio utilizamos el proyecto de `planetas` que hicimos para ver **routing**

## 2. Estilización con TailwindCSS

Para estilizar nuestro proyecto con TailwindCSS, podemos utilizar las clases utilitarias que nos proporciona. A continuación, se muestran algunos ejemplos de cómo aplicar estilos a nuestros componentes.
Recuerden que los estilos agregados son solo demostraciones de algunas de las propiedades mas comunes que se pueden utilizar con TailwindCSS. No duden en experimentar con otras clases y combinaciones y mejorar todo lo que quieran.

### Ejemplos de estilos a los componentes

- **Los elementos del readme pueden variar ligeramente de los elementos del código.**
- **Luego de cada ejemplo, se incluirá una breve descripción de las clases utilizadas y qué hace cada una de ellas**

#### Navbar.jsx

```jsx
import { Link } from "wouter";

export const Navbar = () => {
  const logo = "https://logo.png"; //movemos la url de la imagen a una constante para que quede visualmente mas limpio el componente.

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
      <img src={logo} alt="Logo" className="w-20 rounded-full" />
      <div className="flex gap-4">
        <Link
          href="/"
          className="text-white text-lg hover:underline hover:text-gray-300"
        >
          Home
        </Link>
        <Link
          href="/planets"
          className="text-white text-lg hover:underline hover:text-gray-300"
        >
          Planets
        </Link>
      </div>
    </nav>
  );
};
```

#### 🎨 Guia de estilos agregados

`<nav>`:

- `bg-gray-800`: Establece un fondo gris oscuro para la barra de navegación.
- `p-4`: Aplica un padding de 1rem (16px) en todos los lados.
- `flex`: Da un display flex al contenedor.
- `justify-between`: Distribuye el espacio entre los elementos hijos, colocando el primer hijo al inicio y el segundo al final.
- `items-center`: Alinea verticalmente los elementos hijos en el centro.

`<img>`:

- `w-20`: Establece un ancho fijo de 5rem (80px) para el logo.
- `rounded-full`: Aplica bordes redondeados al logo, haciéndolo circular.

`<div>`:

- `flex`: Da un display flex al contenedor.
- `gap-4`: Establece un espacio de 1rem (16px) entre los enlaces de navegación.

`<Link>`:

- `text-white`: Establece el color del texto en blanco.
- `text-lg`: Aplica un tamaño de fuente grande a los enlaces.
- `hover:underline`: Agrega un subrayado a los enlaces al pasar el mouse sobre ellos.
- `hover:text-gray-300`: Cambia el color del texto a gris claro al pasar el mouse sobre los enlaces.

##### home.jsx

```jsx
export default function Home() {
  return (
    <main className="p-4 bg-blend-color min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">
        El Sistema Solar y los Planetas
      </h1>
      <p className="mb-4">
        El Sistema Solar es un conjunto fascinante que incluye el Sol, ...
      </p>
      <p>
        Los planetas del Sistema Solar varían enormemente en tamaño, composición
        ...
      </p>
    </main>
  );
}
```

#### 🎨 Guía de estilos aplicados

`<main>`

- `p-4`: Aplica un padding de 1rem (16px) en todos los lados.
- `bg-blend-color`: Establece un fondo con mezcla de colores.
- `min-h-screen`: Asegura que el contenedor tenga al menos la altura de la pantalla.

`<h1>`

- `text-4xl`: Establece un tamaño de fuente de 2.25rem (36px) para el título.
- `font-bold`: Aplica un grosor de fuente bold al título.
- `mb-8`: Agrega un margen inferior de 2rem (32px) al título.
- `text-center`: Centra el texto del título.

`<p>`

- `mb-4`: Agrega un margen inferior de 1rem (16px) al párrafo.

#### planet-list.jsx

```jsx
import { Link } from "wouter";
import planetas from "../data/planets-data";

export default function PlanetList() {
  return (
    <main className="p-4 bg-blend-color min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Lista de Planetas</h1>
      <p className="text-2xl mb-6">
        Los planetas se enumeran por su cercanía al Sol de la siguiente manera:
      </p>
      <ol className="list-decimal pl-6 py-2 border-l-4 border-blue-300 max-w-2xl ">
        {planetas.map((planeta) => (
          <li key={planeta.id}>
            <Link
              href={`/planeta/${planeta.id}`}
              className="flex items-center w-40 justify-between"
            >
              <em className="text-xl mr-4">{planeta.planeta}</em>{" "}
              <span className="text-gray-500"> → ver más</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
```

#### 🎨 Guía de estilos aplicados

`<main>`

- `p-4`: Aplica un padding de 1rem (16px) en todos los lados.
- `bg-blend-color`: Establece un fondo con mezcla de colores.
- `min-h-screen`: Asegura que el contenedor tenga al menos la altura de la pantalla.

`<h1>`

- `text-4xl`: Establece un tamaño de fuente de 2.25rem (36px) para el título.
- `font-bold`: Aplica un grosor de fuente bold al título.
- `mb-8`: Agrega un margen inferior de 2rem (32px) al título.
- `text-center`: Centra el texto del título.

`<p>`

- `text-2xl`: Establece un tamaño de fuente de 1.5rem (24px) para el párrafo.
- `mb-4`: Agrega un margen inferior de 1rem (16px) al párrafo.

`<ol>`

- `list-decimal`: Establece un estilo de lista numerada.
- `pl-6`: Aplica un padding-left de 1.5rem (24px) a la lista.
- `py-2`: Aplica un padding vertical de 0.5rem (8px) a la lista.
- `border-l-4`: Aplica un borde izquierdo de 4px a la lista.
- `border-blue-300`: Establece el color del borde izquierdo en azul claro.
- `max-w-2xl`: Establece un ancho máximo de 42rem (672px) para la lista.

`<Link>`

- `flex`: Da un display flex al enlace.
- `items-center`: Alinea verticalmente el contenido del enlace en el centro.
- `w-40`: Establece un ancho fijo de 10rem (160px) para el enlace.
- `justify-between`: Distribuye el espacio entre los elementos hijos del enlace, colocando el primer hijo al inicio y el segundo al final.

`<em>`

- `text-xl`: Establece un tamaño de fuente de 1.25rem (20px) para el texto enfatizado.
- `mr-4`: Agrega un margen derecho de 1rem (16px) al texto enfatizado.

`<span>`

- `text-gray-500`: Establece un color de texto gris claro para el texto dentro del span.

#### planet-detail.jsx

```jsx
import { Link, useParams } from "wouter";
import NotFound from "./not-found";
import planetas from "../data/planets-data";

export default function PlanetDetail() {
  const { id } = useParams();
  const planeta = planetas.find((elPlaneta) => elPlaneta.id === Number(id));

  if (!planeta) {
    return <NotFound />;
  }

  return (
    <main className="p-8 flex flex-col align-center justify-around gap-6">
      <h1 className="text-4xl font-bold mb-4">Planeta {planeta.planeta}</h1>
      <section>
        <div className="flex flex-col align-center justify-center gap-4 shadow-lg p-6 bg-gray-800 rounded-2xl">
          <img
            src={planeta.img}
            alt={planeta.planeta}
            className="rounded-4xl mb-4 shadow-2xl"
          />
          <div>
            <h4 className="text-2xl font-medium mb-2">
              Es el {planeta.id}° planeta del sistema solar.
            </h4>
            <p className="text-gray-400">{planeta.description}</p>
          </div>
        </div>
      </section>

      <Link
        href="/planets"
        className="  border rounded-4xl px-4 py-2 w-fit bg-blue-500 hover:bg-blue-900 hover:border-blue-500 transition-colors"
      >
        Volver a lista de planetas
      </Link>
    </main>
  );
}
```

#### 🎨 Guia de estilos aplicados

`<main>`

- `p-8`: Aplica un padding de 2rem (32px) en todos los lados.
- `flex`: Establece un contenedor flex.
- `flex-col`: Organiza los elementos hijos en una columna.
- `align-center`: Alinea los elementos hijos en el centro verticalmente.
- `justify-around`: Distribuye el espacio entre los elementos hijos, dejando espacio alrededor de ellos.
- `gap-6`: Establece un espacio de 1.5rem (24px) entre los elementos hijos.

`<section>`

- `flex`: Establece un contenedor flex.
- `flex-col`: Organiza los elementos hijos en una columna.
- `align-center`: Alinea los elementos hijos en el centro verticalmente.
- `justify-center`: Alinea los elementos hijos en el centro horizontalmente.
- `gap-4`: Establece un espacio de 1rem (16px) entre los elementos hijos.

`<div>`

- `flex`: Establece un contenedor flex.
- `flex-col`: Organiza los elementos hijos en una columna.
- `align-center`: Alinea los elementos hijos en el centro verticalmente.
- `justify-center`: Alinea los elementos hijos en el centro horizontalmente.
- `gap-4`: Establece un espacio de 1rem (16px) entre los elementos hijos.
- `shadow-lg`: Aplica una sombra grande al contenedor.
- `p-6`: Aplica un padding de 1.5rem (24px) en todos los lados.
- `bg-gray-800`: Establece un color de fondo gris oscuro.
- `rounded-2xl`: Aplica un borde redondeado de 1rem (16px) al contenedor.

`<img>`

- `rounded-4xl`: Aplica un borde redondeado de 2rem (32px) a la imagen.
- `mb-4`: Aplica un margen inferior de 1rem (16px) a la imagen.
- `shadow-2xl`: Aplica una sombra extra grande a la imagen.

`<h4>`

- `text-2xl`: Establece un tamaño de fuente de 1.5rem (24px) para el texto del párrafo.
- `font-medium`: Aplica un grosor de fuente medio al texto del párrafo.
- `mb-2`: Aplica un margen inferior de 0.5rem (8px) al párrafo.

`<p>`

- `text-gray-400`: Establece un color de texto gris claro para el texto dentro del párrafo.

`<Link>`

- `border`: Aplica un borde al enlace.
- `rounded-4xl`: Aplica un borde redondeado de 1rem (16px) al enlace.
- `px-4`: Aplica un padding horizontal de 1rem (16px) al enlace.
- `py-2`: Aplica un padding vertical de 0.5rem (8px) al enlace.
- `w-fit`: Establece el ancho del enlace al contenido.
- `bg-blue-500`: Establece un color de fondo azul.
- `hover:bg-blue-900`: Cambia el color de fondo a azul oscuro al pasar el ratón.
- `hover:border-blue-500`: Cambia el color del borde a azul al pasar el ratón.
- `transition-colors`: Aplica una transición suave a los cambios de color.

#### 404-not-found

```jsx
import { Link } from "wouter";
export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white p-4 gap-6">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="text-gray-400">La página que estás buscando no existe.</p>
      <img src="https://imgs..." />
      <Link
        href="/"
        className="border rounded-4xl px-4 py-2 w-fit bg-blue-500 hover:bg-blue-900 hover:border-blue-500 transition-colors"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
```

#### 🎨 Guía de estilos aplicados

`<main>`

- `flex`: Establece un contenedor flex.
- `flex-col`: Organiza los elementos hijos en una columna.
- `items-center`: Alinea los elementos hijos en el centro horizontalmente.
- `justify-center`: Alinea los elementos hijos en el centro verticalmente.
- `min-h-screen`: Establece una altura mínima del 100% de la pantalla.
- `text-white`: Establece el color del texto en blanco.
- `p-4`: Aplica un padding de 1rem (16px) en todos los lados.
- `gap-6`: Establece un espacio de 1.5rem (24px) entre los elementos hijos.

`<h1>`

- `text-4xl`: Establece un tamaño de fuente de 2.25rem (36px) para el título.
- `font-bold`: Aplica un grosor de fuente negrita al título.

`<p>`

- `text-gray-400`: Establece un color de texto gris claro para el texto dentro del párrafo.

`<img>`

- `rounded-4xl`: Aplica un borde redondeado de 2rem (32px) a la imagen.
- `mb-4`: Aplica un margen inferior de 1rem (16px) a la imagen.
- `shadow-2xl`: Aplica una sombra extra grande a la imagen.

`<Link>`

- `border`: Aplica un borde al enlace.
- `rounded-4xl`: Aplica un borde redondeado de 1rem (16px) al enlace.
- `px-4`: Aplica un padding horizontal de 1rem (16px) al enlace.
- `py-2`: Aplica un padding vertical de 0.5rem (8px) al enlace.
- `w-fit`: Establece el ancho del enlace al contenido.
- `bg-blue-500`: Establece un color de fondo azul.
- `hover:bg-blue-900`: Cambia el color de fondo a azul oscuro al pasar el ratón.
- `hover:border-blue-500`: Cambia el color del borde a azul al pasar el ratón.
- `transition-colors`: Aplica una transición suave a los cambios de color.
