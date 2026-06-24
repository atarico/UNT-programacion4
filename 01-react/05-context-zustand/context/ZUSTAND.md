# Clase: Zustand – Estado Global Simplificado con Menos Boilerplate

## 🗝️ Introducción: ¿Qué es un estado global?

Imagina tu aplicación React como una red de oficinas interconectadas (componentes). Para compartir información (estado compartido), puedes hacerlo de dos maneras:

- **Prop drilling**: Pasar datos manualmente entre oficinas cercanas, haciendo que cada una reenvíe la información, aunque sólo la última la use.
- **Estado global**: Tener archivadores digitales accesibles desde cualquier oficina, donde todos pueden leer y escribir información clave.

### Ejemplo Abstracto – Contador de notificaciones global

Supón que tienes varios componentes que muestran o actualizan el conteo de notificaciones. Sin un estado global, tendrías que pasar la cantidad entre todos los componentes padres e hijos, volviendo el código confuso y poco escalable.

**Ventajas del estado global**:

1. Elimina el prop drilling (menos código redundante)
2. Permite acceder/modificar el estado desde cualquier componente, sin importar su profundidad
3. Facilita el mantenimiento y la escalabilidad
4. Menos errores de sincronización de datos entre vistas
5. Código generalmente más legible, especialmente en aplicaciones crecientes

---

## 🐻 ¿Qué es Zustand?

**Zustand** es una librería de manejo de estado global para React, ligera y minimalista. A diferencia de Context API y Redux, reduce el boilerplate al mínimo, es fácil de aprender y muy eficiente.

### ¿Por qué usar Zustand y no Context?

- **Context** es ideal para compartir datos simples poco variables, pero puede resultar en múltiples renders y código verboso si el estado es complejo
- **Zustand** permite definir toda la lógica y el estado en un sólo archivo/hook y consumirlo en cualquier componente usando un hook, sin providers ni consumers ni prop drilling
- Su API es directa: defines "el almacén" y lo usas en cualquier componente

#### Ventajas de Zustand:

- Super simple de usar, menos sintaxis y archivos
- Performance optimizada, actualiza solo el componente que necesita el cambio
- Mantiene la escalabilidad de Redux, pero sin su curva de aprendizaje
- Añade middlewares como persistencia, logging o integración con devtools rápidamente

---

## 🚀 Mini proyecto 1: Contador global con Zustand y Vite

### 1. Creación del proyecto

```bash
pnpm create vite@latest contador-app
cd contador-app
pnpm install
pnpm add zustand
pnpm dev
```

### 2. Definir el store con Zustand

Crea el archivo `src/store/useContadorStore.js`:

```javascript
import { create } from "zustand";

export const useContadorStore = create((set) => ({
  count: 0,
  aumentar: () => set((state) => ({ count: state.count + 1 })),
  disminuir: () => set((state) => ({ count: state.count - 1 })),
  reiniciar: () => set({ count: 0 }),
}));
```

### 3. Consumir el store en varios componentes

Crea `src/components/Contador.jsx`:

```javascript
import { useContadorStore } from "../store/useContadorStore";

export function Contador() {
  const count = useContadorStore((state) => state.count);
  return <h2>Contador: {count}</h2>;
}
```

Crea `src/components/Controles.jsx`:

```javascript
import { useContadorStore } from "../store/useContadorStore";

export function Controles() {
  const { aumentar, disminuir, reiniciar } = useContadorStore();
  return (
    <div>
      <button onClick={aumentar}>+1</button>
      <button onClick={disminuir}>-1</button>
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
}
```

Modifica App.jsx:

```javascript
import { Contador } from "./components/Contador";
import { Controles } from "./components/Controles";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Zustand Counter</h1>
      <Contador />
      <Controles />
    </div>
  );
}
export default App;
```

¡Listo! Ahora cualquier componente puede leer/actualizar el contador global sin providers extra.

---

## 🏷️ Consigna: Mini Carrito de compras global

**Objetivo:** Implementa un store con Zustand que controle un carrito global en una app Vite+React.

### Requisitos:

1. Crea un store (ej. `useCartStore.js`) con:

   - `items`: array de productos ({ id, nombre, precio, cantidad })
   - `addToCart(producto)`: añade productos al carrito (suma cantidad si ya existe)
   - `removeFromCart(productoId)`: elimina producto
   - `clearCart()`: limpia todo
   - `total`: cantidad total de productos
   - `precioTotal`: suma de los precios

2. Usa al menos estos componentes:

   - `ProductList`: muestra productos disponibles con botón agregar
   - `Cart`: lista con los productos del carrito
   - `CartSummary`: precios y cantidades totales
   - `Header`: muestra badge con número de productos

3. Opcional: Implementa persistencia del carrito con el middleware `persist` de Zustand (revisa la doc oficial o ejemplos).

### Tips de desarrollo:

- El store se define sólo una vez y se puede usar en cualquier componente
- Para persistir el carrito:

```javascript
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      /* ... */
    }),
    { name: "cart-storage" }
  )
);
```

---

## 📚 Comparativo y mejores prácticas

|                  | Context API               | Zustand                           |
| ---------------- | ------------------------- | --------------------------------- |
| **Boilerplate**  | Medio/Alto                | Muy bajo                          |
| **Aprendizaje**  | Fácil                     | Muy fácil                         |
| **Performance**  | Ok                        | Excelente (menos rerenders)       |
| **DevTools**     | Sólo con soluciones extra | Nativo/logging opcional           |
| **Persistencia** | Implementación manual     | Middleware oficial sencillo       |
| **Complejidad**  | Escalable ≈ medio         | Escalable, pero prioriza simpleza |

**Mejores prácticas**:

- Agrupa funciones y datos relacionados en un solo "store" por dominio (slice pattern)
- Usa middlewares si necesitas ventajas extra (persist, devtools, immer...)
- Puedes consultar y modificar el estado fuera de componentes (ejemplo: tests, utilidades)
- Prefiere Zustand en apps pequeñas/medianas o cuando quieras código limpio y fácil de mantener

---

## 🎓 Conclusión

**Zustand** es una de las formas más rápidas, intuitivas y efectivas de manejar estado global en aplicaciones React modernas. Su sintaxis amigable y eficiencia lo convierten en una excelente alternativa para la gran mayoría de proyectos, reduciendo drásticamente el esfuerzo frente a Context o Redux.

---

### 📖 Próximos pasos sugeridos

- Implementar slices para dividir el store por lógica
- Añadir persistencia y/o devtools
- Explorar usos avanzados: async actions, acceso fuera de componentes
- Consultar la documentación oficial: https://zustand.docs.pmnd.rs/
