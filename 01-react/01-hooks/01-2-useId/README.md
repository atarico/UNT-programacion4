# 📚 `useId` en React

## 🎯 Objetivo

Comprender el hook `useId` de React para generar **identificadores únicos y estables** que se pueden utilizar en atributos de accesibilidad y asociación de elementos HTML, sin depender de contadores manuales ni valores aleatorios.

Se puede aplicar en situaciones comunes como:

- Asociar etiquetas `<label>` con inputs mediante `htmlFor` / `id`.
- Generar IDs únicos para atributos **ARIA** (`aria-describedby`, `aria-labelledby`).
- Evitar conflictos de IDs cuando un mismo componente se renderiza **múltiples veces**.
- Garantizar consistencia entre **servidor y cliente** en aplicaciones con SSR (Server Side Rendering).

## 🧠 ¿Qué es `useId`?

`useId` es un hook de React que genera un **string único** asociado a la instancia del componente donde se invoca. Este ID es estable entre renders y único dentro de todo el árbol de componentes.

```jsx
import { useId } from "react";
```

**‼️ Importante:** `useId` **no debe usarse para generar keys** en listas. Para eso se deben usar datos propios del elemento (como un `id` de base de datos).

## 🧪 Sintaxis básica

```jsx
const id = useId();
```

Retorna un string como `":r1:"`, `":r2:"`, etc. Este valor es único para cada instancia del componente.

## 🔍 Casos prácticos

### 1. Asociar un `<label>` con un `<input>`

Sin `useId`, si el componente se renderiza varias veces, los IDs se duplicarían:

```jsx
// ❌ Problema: ID duplicado si se renderiza más de una vez
function CampoNombre() {
  return (
    <>
      <label htmlFor="nombre">Nombre:</label>
      <input id="nombre" type="text" />
    </>
  );
}
```

Con `useId`, cada instancia genera un ID único:

```jsx
// ✅ Solución con useId
import { useId } from "react";

function CampoNombre() {
  const id = useId();

  return (
    <>
      <label htmlFor={id}>Nombre:</label>
      <input id={id} type="text" />
    </>
  );
}
```

### 2. Múltiples campos en un mismo componente

Se puede usar un mismo `useId` como **prefijo** para generar varios IDs relacionados:

```jsx
import { useId } from "react";

function FormularioRegistro() {
  const id = useId();

  return (
    <form>
      <label htmlFor={`${id}-nombre`}>Nombre:</label>
      <input id={`${id}-nombre`} type="text" />

      <label htmlFor={`${id}-email`}>Email:</label>
      <input id={`${id}-email`} type="email" />

      <label htmlFor={`${id}-password`}>Contraseña:</label>
      <input id={`${id}-password`} type="password" />
    </form>
  );
}
```

### 3. Atributos de accesibilidad (ARIA)

```jsx
import { useId } from "react";

function CampoConAyuda() {
  const id = useId();
  const ayudaId = `${id}-ayuda`;

  return (
    <>
      <label htmlFor={id}>Contraseña:</label>
      <input id={id} type="password" aria-describedby={ayudaId} />
      <p id={ayudaId}>Debe tener al menos 8 caracteres.</p>
    </>
  );
}
```

## 📦 Ejemplo completo: Formulario con campos reutilizables

```jsx
import { useId } from "react";

function CampoTexto({ label, tipo = "text" }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input id={id} type={tipo} />
    </div>
  );
}

function Formulario() {
  return (
    <form>
      <CampoTexto label="Nombre" />
      <CampoTexto label="Email" tipo="email" />
      <CampoTexto label="Teléfono" tipo="tel" />
    </form>
  );
}

export default Formulario;
```

Cada `<CampoTexto />` generará un ID único automáticamente, sin riesgo de colisiones.

## 🧠 Buenas prácticas

- Usar `useId` siempre que se necesite asociar `<label>` con `<input>` en componentes reutilizables.

- **No usar `useId` para generar keys** de listas (`key={useId()}` es incorrecto).

- Usar el ID como **prefijo** cuando un componente necesita múltiples IDs relacionados.

- Preferir `useId` sobre `Math.random()` o contadores manuales para garantizar estabilidad entre renders.

- Es especialmente útil en componentes que se renderizan **múltiples veces** en la misma página.

## 📚 Recursos complementarios

- [Documentación oficial de React - useId](https://es.react.dev/reference/react/useId)
- [MDN - Atributo id](https://developer.mozilla.org/es/docs/Web/HTML/Global_attributes/id)
- [MDN - ARIA](https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA)
