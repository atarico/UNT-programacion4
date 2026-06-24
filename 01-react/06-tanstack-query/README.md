# TanStack Query (React Query)

## 🎯 Introducción

**TanStack Query** (anteriormente React Query) es una biblioteca poderosa para manejar el estado del servidor en aplicaciones React. Simplifica la obtención, caché, sincronización y actualización de datos del servidor.

### ¿Por qué usar TanStack Query?

- **Caché automático**: Los datos se almacenan en caché automáticamente
- **Sincronización en segundo plano**: Actualiza los datos automáticamente
- **Estados de carga y error**: Maneja automáticamente los estados de carga y error
- **Menos código**: Reduce significativamente el código necesario para manejar datos del servidor

## 📦 Instalación

```bash
pnpm add @tanstack/react-query
```

## 🚀 Configuración inicial

Primero, necesitas envolver la aplicación con `QueryClientProvider`:

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Crear una instancia de QueryClient
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Aplicación aquí */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

## 🔍 Queries

Las **queries** se usan para **obtener datos** del servidor. TanStack Query maneja automáticamente el caché, la recarga y los estados de carga.

### Sintaxis básica

```jsx
import { useQuery } from "@tanstack/react-query";

function Usuarios() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const response = await fetch("/api/usuarios");
      return response.json();
    },
  });

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((usuario) => (
        <div key={usuario.id}>{usuario.nombre}</div>
      ))}
    </div>
  );
}
```

### Parámetros principales

- **`queryKey`**: Un array que identifica de forma única la query (ej: `['usuarios']`, `['usuario', id]`)
- **`queryFn`**: La función que realiza la petición al servidor (debe retornar una Promise)

### Estados disponibles

```jsx
const {
  data,           // Los datos obtenidos
  isLoading,      // true mientras se carga por primera vez
  isFetching,     // true mientras se está haciendo la petición
  error,          // Objeto de error si algo falla
  isError,        // true si hay un error
  refetch,        // Función para recargar manualmente
} = useQuery({ ... });
```

### Ejemplo con parámetros

```jsx
function UsuarioDetalle({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["usuario", id],
    queryFn: async () => {
      const response = await fetch(`/api/usuarios/${id}`);
      return response.json();
    },
  });

  if (isLoading) return <div>Cargando usuario...</div>;
  if (error) return <div>Error al cargar usuario</div>;

  return <div>{data.nombre}</div>;
}
```

## ✏️ Mutations

Las **mutations** se usan para **modificar datos** en el servidor (crear, actualizar, eliminar). A diferencia de las queries, las mutations no se ejecutan automáticamente.

### Sintaxis básica

```jsx
import { useMutation } from "@tanstack/react-query";

function CrearUsuario() {
  const mutation = useMutation({
    mutationFn: async (nuevoUsuario) => {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      return response.json();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      nombre: "Juan",
      email: "juan@example.com",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Creando..." : "Crear Usuario"}
      </button>
      {mutation.isError && <div>Error: {mutation.error.message}</div>}
      {mutation.isSuccess && <div>Usuario creado exitosamente!</div>}
    </form>
  );
}
```

### Estados disponibles

```jsx
const mutation = useMutation({ ... });

mutation.mutate(data);        // Ejecutar la mutación
mutation.isPending;            // true mientras se ejecuta
mutation.isError;              // true si hay error
mutation.isSuccess;            // true si fue exitosa
mutation.error;                // Objeto de error
mutation.data;                 // Datos retornados por la mutación
```

### Ejemplo: Actualizar usuario

```jsx
function ActualizarUsuario({ usuarioId }) {
  const mutation = useMutation({
    mutationFn: async (datosActualizados) => {
      const response = await fetch(`/api/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados),
      });
      return response.json();
    },
  });

  const handleUpdate = () => {
    mutation.mutate({ nombre: "Nuevo Nombre" });
  };

  return (
    <button onClick={handleUpdate} disabled={mutation.isPending}>
      Actualizar
    </button>
  );
}
```

## 🔄 Invalidar Queries

Cuando realizas una mutación (crear, actualizar, eliminar), es común que quieras **invalidar** las queries relacionadas para que se recarguen automáticamente con los datos actualizados.

### Uso básico

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CrearUsuario() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (nuevoUsuario) => {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidar la query de usuarios para que se recargue
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  // ... resto del código
}
```

### Invalidar múltiples queries

```jsx
// Invalidar todas las queries que empiezan con 'usuarios'
queryClient.invalidateQueries({ queryKey: ["usuarios"] });

// Invalidar una query específica
queryClient.invalidateQueries({ queryKey: ["usuario", id] });

// Invalidar todas las queries
queryClient.invalidateQueries();
```

### Ejemplo completo: Crear y actualizar con invalidación

```jsx
function GestionarUsuarios() {
  const queryClient = useQueryClient();

  // Query para obtener usuarios
  const { data: usuarios } = useQuery({
    queryKey: ["usuarios"],
    queryFn: async () => {
      const response = await fetch("/api/usuarios");
      return response.json();
    },
  });

  // Mutation para crear usuario
  const crearUsuario = useMutation({
    mutationFn: async (nuevoUsuario) => {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      return response.json();
    },
    onSuccess: () => {
      // Invalidar y recargar la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  // Mutation para eliminar usuario
  const eliminarUsuario = useMutation({
    mutationFn: async (id) => {
      await fetch(`/api/usuarios/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      // Invalidar la lista de usuarios
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });

  return (
    <div>
      <button onClick={() => crearUsuario.mutate({ nombre: "Nuevo" })}>
        Crear Usuario
      </button>
      {usuarios?.map((usuario) => (
        <div key={usuario.id}>
          {usuario.nombre}
          <button onClick={() => eliminarUsuario.mutate(usuario.id)}>
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 📚 Recursos complementarios

- [Documentación oficial de TanStack Query](https://tanstack.com/query/latest)
- [Guía de inicio rápido](https://tanstack.com/query/latest/docs/react/quick-start)
- [React Query Devtools](https://tanstack.com/query/latest/docs/react/devtools)
