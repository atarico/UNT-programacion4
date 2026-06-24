# 📡 Consumo de APIs con Axios (Básico)

## 🎯 Objetivo de la clase

Aprender a realizar peticiones HTTP a servidores externos utilizando **Axios** dentro de una aplicación de React. Comprenderemos la diferencia entre Fetch y Axios, el manejo de errores, la creación de instancias personalizadas y cómo estructurar estas llamadas de manera limpia dentro de componentes de React.

Se puede aplicar en situaciones comunes como:
- Obtener listas de datos (productos, usuarios, etc.) desde una API REST.
- Enviar datos a un servidor (formularios de registro, creación de recursos).
- Actualizar o eliminar recursos existentes en una base de datos.
- Centralizar la configuración de la conexión con una API.

---

## 🧠 ¿Qué es Axios?

[Axios](https://axios-http.com/) es una biblioteca cliente HTTP basada en promesas para el navegador y `node.js`. Permite realizar solicitudes de red de forma sencilla, limpia y con características integradas muy útiles para el desarrollo web moderno.

### 🆚 Diferencias clave: Axios vs. Fetch API

| Característica | Fetch API (Nativo) | Axios |
| :--- | :--- | :--- |
| **Instalación** | No requiere (nativo del navegador) | Requiere `pnpm add axios` |
| **Manejo de errores** | No rechaza la promesa en errores HTTP (ej: 404, 500) | Rechaza automáticamente la promesa en códigos de error (4xx, 5xx) |
| **Conversión a JSON** | Requiere dos pasos (`res.json()`) | Automático (los datos están en `response.data`) |
| **Interceptores** | No soportados nativamente | Permite interceptar peticiones y respuestas (muy útil para tokens) |
| **Configuración base** | Hay que pasar headers en cada petición | Permite configurar una instancia base (`axios.create`) |
| **Soporte de cancelación** | Complejo (usa `AbortController`) | Soporte nativo más sencillo |

---

## 📦 Instalación

Para instalar Axios en un proyecto de React, ejecuta el siguiente comando:

```bash
pnpm add axios
```

---

## ⚡ Métodos de Petición Básicos

Axios ofrece métodos abreviados para los verbos HTTP más comunes:

### 1. Petición GET (Obtener Datos)
```javascript
import axios from 'axios';

axios.get('https://api.ejemplo.com/usuarios')
  .then(response => {
    // Los datos devueltos por el servidor están en response.data
    console.log(response.data);
    console.log(response.status); // 200
  })
  .catch(error => {
    console.error("Error al obtener datos:", error);
  });
```

### 2. Petición POST (Crear Datos)
```javascript
const nuevoUsuario = {
  nombre: "Carlos Gómez",
  email: "carlos@ejemplo.com"
};

axios.post('https://api.ejemplo.com/usuarios', nuevoUsuario)
  .then(response => {
    console.log("Usuario creado:", response.data);
    console.log(response.status); // 201
  })
  .catch(error => {
    console.error("Error al crear usuario:", error);
  });
```

### 3. Petición PUT / PATCH (Actualizar Datos)
```javascript
const datosActualizados = {
  email: "carlos.nuevo@ejemplo.com"
};

// PUT actualiza todo el recurso; PATCH actualiza parcialmente
axios.patch('https://api.ejemplo.com/usuarios/1', datosActualizados)
  .then(response => {
    console.log("Usuario actualizado:", response.data);
  });
```

### 4. Petición DELETE (Eliminar Datos)
```javascript
axios.delete('https://api.ejemplo.com/usuarios/1')
  .then(response => {
    console.log("Usuario eliminado con éxito");
  });
```

---

## ⚙️ Creación de una Instancia (axios.create)

Una excelente práctica es crear una **instancia personalizada** de Axios. Esto evita repetir la URL base o los encabezados comunes (como tokens de autenticación) en cada archivo.

```javascript
// src/api/clienteAxios.js
import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'https://api.ejemplo.com/api', // URL base para todas las peticiones
  timeout: 5000,                          // Tiempo de espera máximo (5 segundos)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default clienteAxios;
```

**Uso de la instancia en tus componentes:**
```javascript
import clienteAxios from './api/clienteAxios';

// La petición real se hará a: https://api.ejemplo.com/api/usuarios
clienteAxios.get('/usuarios')
  .then(response => console.log(response.data));
```

---

## 🛑 Manejo de Errores

A diferencia de `fetch`, Axios capturará en el bloque `.catch` o `try/catch` cualquier respuesta del servidor con un código de estado fuera del rango `2xx` (como 400, 401, 403, 404, 500).

### Ejemplo detallado usando Async/Await:

```javascript
async function obtenerUsuarios() {
  try {
    const respuesta = await axios.get('https://api.ejemplo.com/usuarios');
    console.log("Datos:", respuesta.data);
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error("Código de error HTTP:", error.response.status);
      console.error("Detalle del error del servidor:", error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta (ej. sin conexión)
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      // Algo ocurrió al configurar la petición que provocó el error
      console.error("Error al configurar la petición:", error.message);
    }
  }
}
```

---

## 🔄 Integración con React (`useEffect` + `useState`)

Para renderizar los datos obtenidos en la interfaz de React, combinamos Axios con los hooks `useState` y `useEffect`.

```jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function ListaDeUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsuarios(respuesta.data); // Guardamos los datos en el estado
        setError(null);
      } catch (err) {
        setError("No se pudieron cargar los usuarios. Inténtalo de nuevo más tarde.");
      } finally {
        setCargando(false); // Apagamos el estado de carga
      }
    };

    cargarDatos();
  }, []); // Array vacío para que se ejecute solo al montar el componente

  if (cargando) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>👥 Lista de Usuarios</h2>
      <ul>
        {usuarios.map(usuario => (
          <li key={usuario.id}>
            <strong>{usuario.name}</strong> - {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeUsuarios;
```

---

## 📚 Recursos complementarios

- [Documentación oficial de Axios](https://axios-http.com/docs/intro)
- [MDN - Protocolo HTTP](https://developer.mozilla.org/es/docs/Web/HTTP)
- [JSONPlaceholder - API falsa gratuita para pruebas](https://jsonplaceholder.typicode.com/)
- [Axios vs Fetch - Comparación detallada](https://www.freecodecamp.org/espanol/news/axios-vs-fetch-para-hacer-llamadas-de-api/)
