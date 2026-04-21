# 📚 Clase: Introducción a `useEffect` en React

## 🎯 Objetivo de la clase

Se puede aplicar en situaciones comunes como:

- Ejecutar código **al montar el componente**.
- Ejecutar código **cuando cambia una variable de estado o prop**.
- Ejecutar **limpieza** de recursos (como intervalos, listeners, etc.).
- Simular el ciclo de vida de un componente (**componentDidMount, componentDidUpdate, componentWillUnmount**).

**‼️Cuando se habla de "limpieza de recursos" en el contexto de useEffect, se refiere a la acción de limpiar o desmontar aquellos efectos secundarios que ya no son necesarios o que podrían seguir activos después de que el componente se haya desmontado o cuando el efecto se vuelva a ejecutar.**

**Esto es crucial porque en JavaScript, ciertos efectos (como intervalos, timers, event listeners, etc.) pueden continuar ejecutándose después de que el componente haya sido destruido o dejado de ser necesario. Esto puede generar fugas de memoria (memory leaks) o comportamientos inesperados.**

## 🧠 ¿Qué es `useEffect`?

`useEffect` es un hook que permite ejecutar **efectos secundarios** (side effects) en componentes funcionales de React.

### 🔧 ¿Qué es un efecto secundario?

Cualquier acción **fuera del renderizado puro** del componente, como:

- Fetch de datos a una API
- Suscripciones a eventos
- Timers (setInterval, setTimeout)
- Modificación directa del DOM
- Logs a consola o almacenamiento local

## 🧪 Sintaxis básica

```jsx
useEffect(() => {
  // Código a ejecutar después del render
}, [dependencias]);
```

El efecto se ejecuta luego de que el componente se renderiza.

El array de dependencias determina cuándo se vuelve a ejecutar.

## 🔍 Casos prácticos

1. Ejecutar solo al montar (como componentDidMount)

```jsx
useEffect(() => {
  console.log("Componente montado");
}, []);
```

Se ejecuta una vez, cuando el componente se monta. Ideal para inicializar datos.
**Array de dependencias vacío**

2. Ejecutar cada vez que cambia una dependencia

```jsx
useEffect(() => {
  console.log("Nombre actualizado:", nombre);
}, [nombre]);
```

Se ejecuta cuando cambia nombre. Útil para reaccionar a cambios de props o estado.

3. Efecto sin dependencias → se ejecuta después de cada render

```jsx
useEffect(() => {
  console.log("Render completo");
});
```

⚠️ No se recomienda usar sin dependencias salvo que sea intencional. Puede causar **bucles infinitos** si no se maneja correctamente.

4. Limpieza (como componentWillUnmount)

   ```jsx
   useEffect(() => {
     const intervalo = setInterval(() => {
       console.log("Tick");
     }, 1000);

     return () => {
       clearInterval(intervalo);
       console.log("Componente desmontado");
     };
   }, []);
   ```

Ideal para limpiar recursos cuando el componente se desmonta.

📦 Ejemplo completo: cronómetro

```jsx
import { useState, useEffect } from "react";

function Cronometro() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundos((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return <p>Tiempo transcurrido: {segundos}s</p>;
}
export default Cronometro;
```

## 🧠 Buenas prácticas

- Siempre declarar el array de dependencias. (se puede declarar vacío si no hay dependencias)

- Usar funciones puras dentro del useEffect.

- Evitar efectos que bloqueen el render.

- Usar la función de limpieza (return () => { ... }) cuando sea necesario.

## 📚 Recursos complementarios

- [Documentación oficial de React](https://es.react.dev/reference/react/useEffect)
- [MDN - setTimeout](https://developer.mozilla.org/es/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
- [MDN - setInterval](https://developer.mozilla.org/es/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)
