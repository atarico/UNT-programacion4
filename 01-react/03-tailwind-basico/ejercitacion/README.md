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
