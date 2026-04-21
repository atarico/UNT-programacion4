# 📌 Resumen de TailwindCSS

## 📖 ¿Qué es TailwindCSS?

TailwindCSS es un **framework de CSS utilitario** que permite aplicar estilos directamente en el HTML/JSX mediante clases predefinidas.  
En lugar de escribir CSS personalizado para cada elemento, usás clases que ya incluyen propiedades listas para usar.

Ejemplo rápido:

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">Botón</button>
```

Esto genera un botón azul, con texto blanco, padding y bordes redondeados, **sin escribir CSS externo**.

---

## 🤔 ¿Por qué usarlo?

- 🚀 **Rápido de usar**: Todo se hace en las clases, sin saltar a un archivo CSS.
- 🎯 **Consistencia**: Usa un sistema de diseño coherente.
- 🎨 **Altamente personalizable**: Configurable en `tailwind.config.js`.
- 📱 **Responsive fácil**: Clases como `sm:`, `md:`, `lg:` para breakpoints.
- ⚡ **Sin CSS muerto**: Purga automáticamente clases no usadas (build final más liviano).

---

## 🎨 Clases más comunes

### **1. Layout y espaciado**

| Propósito | Clases                                  |
| --------- | --------------------------------------- |
| Margin    | `m-4`, `mt-2`, `mx-auto`                |
| Padding   | `p-4`, `pt-2`, `px-6`                   |
| Display   | `flex`, `grid`, `block`, `inline-block` |
| Gap       | `gap-2`, `gap-4`                        |

---

### **2. Texto**

| Propósito  | Clases                                      |
| ---------- | ------------------------------------------- |
| Tamaño     | `text-sm`, `text-lg`, `text-2xl`            |
| Color      | `text-red-500`, `text-gray-700`             |
| Alineación | `text-left`, `text-center`, `text-right`    |
| Peso       | `font-light`, `font-bold`, `font-extrabold` |

---

### **3. Botones**

Ejemplo botón primario:

```jsx
<button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
  Botón
</button>
```

---

### **4. Cards**

```jsx
<div className="bg-white shadow-md rounded-lg p-4 max-w-sm">
  <img src="img.jpg" alt="Imagen" className="rounded-t-lg" />
  <h2 className="text-lg font-bold mt-2">Título</h2>
  <p className="text-gray-600">Descripción breve.</p>
</div>
```

---

### **5. Navbars**

```jsx
<nav className="bg-gray-800 text-white p-4 flex justify-between">
  <div className="font-bold">Logo</div>
  <ul className="flex gap-4">
    <li>
      <a href="#" className="hover:text-gray-300">
        Inicio
      </a>
    </li>
    <li>
      <a href="#" className="hover:text-gray-300">
        Servicios
      </a>
    </li>
    <li>
      <a href="#" className="hover:text-gray-300">
        Contacto
      </a>
    </li>
  </ul>
</nav>
```

---

## ✨ Animaciones y Transiciones

### **1. Transiciones simples**

```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700">
  Hover suave
</button>
```

- `transition`: habilita animaciones de cambio.
- `duration-300`: duración de 300ms.
- `hover:bg-blue-700`: cambio de color al pasar el mouse.

---

### **2. Transformaciones**

```jsx
<div className="transform hover:scale-105 transition duration-300">
  Escalar al pasar el mouse
</div>
```

---

### **3. Animaciones predefinidas**

Tailwind incluye algunas animaciones como `animate-bounce`, `animate-spin`, `animate-ping`.

Ejemplo:

```jsx
<div className="w-6 h-6 bg-red-500 rounded-full animate-bounce"></div>
```

---

## 📚 Recursos

- [Documentación oficial](https://tailwindcss.com/docs)
- [Cheatsheet de clases](https://nerdcave.com/tailwind-cheat-sheet)
