# 📚 Formularios con React Hook Form y Zod

## 🎯 Objetivo

Aprender a manejar formularios en React de manera eficiente y escalable utilizando **React Hook Form** para la gestión del estado y validación, junto con **Zod** para la definición de esquemas de validación fuertemente tipados.

Se puede aplicar en situaciones comunes como:

- Formularios de inicio de sesión y registro.
- Formularios con múltiples campos y validaciones complejas.
- Formularios que requieren un alto rendimiento (sin re-renders innecesarios).
- Creación de esquemas de validación reutilizables y tipados.

## 🧠 ¿Qué es React Hook Form?

[React Hook Form](https://react-hook-form.com/) es una librería para manejar formularios en React que se centra en el **rendimiento** y la **simplicidad**. A diferencia de otras librerías (como Formik), utiliza componentes **no controlados** por defecto (usando `ref`), lo que significa que el componente no se re-renderiza cada vez que el usuario escribe en un input.

### Ventajas:
- **Menos re-renders:** Mejor rendimiento en formularios grandes.
- **Sintaxis simple:** API basada en hooks (`useForm`).
- **Validación incorporada:** Soporta validaciones nativas de HTML y librerías externas.
- **Ligera:** Tamaño de bundle muy pequeño.

## 🧠 ¿Qué es Zod?

[Zod](https://zod.dev/) es una librería de validación y declaración de esquemas enfocada en TypeScript/JavaScript. Permite definir la estructura que deben tener tus datos y validarlos.

### Ventajas:
- **Esquemas encadenables:** Sintaxis clara e intuitiva.
- **Inferencia de tipos:** Si usas TypeScript, Zod genera automáticamente los tipos a partir del esquema.
- **Mensajes de error personalizados:** Control total sobre los errores que ve el usuario.

## 🧪 Instalación

Para usar ambas herramientas juntas, necesitamos instalar `react-hook-form`, `zod` y el **resolver** que permite conectarlos:

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

## 🔍 React Hook Form Básico (Sin Zod)

Para entender RHF, veamos un ejemplo básico usando validaciones nativas:

```jsx
import { useForm } from "react-hook-form";

function FormularioBasico() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos válidos:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre:</label>
        {/* register conecta el input con React Hook Form */}
        <input
          {...register("nombre", { required: "El nombre es obligatorio", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
        />
        {errors.nombre && <p style={{ color: "red" }}>{errors.nombre.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: "El email es obligatorio" })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormularioBasico;
```

## 📦 Integrando React Hook Form + Zod

Cuando las validaciones se vuelven complejas (ej. contraseñas que coincidan, formatos específicos, etc.), es mucho mejor usar un esquema de **Zod**.

### 1. Definir el esquema con Zod

```jsx
import { z } from "zod";

const esquemaRegistro = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Debe ser un email válido"),
  edad: z.coerce.number().min(18, "Debes ser mayor de 18 años"), // coerce transforma string a number
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmarPassword: z.string()
}).refine((data) => data.password === data.confirmarPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarPassword"], // Dónde mostrar el error
});
```

### 2. Conectar el esquema con React Hook Form

Utilizamos `zodResolver` de la librería `@hookform/resolvers/zod`:

```jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Definimos el esquema
const esquemaUsuario = z.object({
  username: z.string().min(4, "Mínimo 4 caracteres"),
  email: z.string().email("Correo inválido"),
});

function FormularioZod() {
  // 2. Configuramos useForm con el resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset // Para limpiar el formulario
  } = useForm({
    resolver: zodResolver(esquemaUsuario),
  });

  // 3. Función onSubmit
  const onSubmit = async (data) => {
    console.log("Enviando...", data);
    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset(); // Limpia el formulario tras enviar
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Usuario</label>
        <input {...register("username")} />
        {errors.username && <p className="error">{errors.username.message}</p>}
      </div>

      <div>
        <label>Correo</label>
        <input {...register("email")} />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Registrar"}
      </button>
    </form>
  );
}

export default FormularioZod;
```

## 🛠️ API de React Hook Form

Las propiedades más importantes devueltas por `useForm()`:

- **`register(name)`**: Registra el input para ser gestionado. Devuelve `{ onChange, onBlur, name, ref }`.
- **`handleSubmit(onSubmit)`**: Recibe tu función de envío y la ejecuta **solo si las validaciones pasan**.
- **`formState.errors`**: Objeto con los errores de cada campo.
- **`formState.isSubmitting`**: Booleano útil para deshabilitar el botón de envío mientras se procesa la solicitud.
- **`formState.isValid`**: Booleano que indica si todo el formulario es válido.
- **`reset()`**: Limpia todos los campos a su estado inicial.
- **`watch(name)`**: Observa y devuelve el valor actual de uno o más campos (provoca re-render, usar con precaución).
- **`setValue(name, value)`**: Actualiza el valor de un campo programáticamente.

## 🧠 Buenas prácticas

- **Separar los esquemas:** Define tus esquemas de Zod en archivos separados (ej. `schemas/authSchema.js`) para poder reutilizarlos (por ejemplo, compartirlos con el backend en un monorepo).
- **Usar `z.coerce`:** Los inputs HTML siempre devuelven `strings` (incluso si son `type="number"` o `type="date"`). Usa `z.coerce.number()` o `z.coerce.date()` en Zod para parsearlos automáticamente.
- **Componentes Controlados:** Si usas librerías de UI externas (MUI, Ant Design, Selects personalizados) que no exponen una `ref` nativa, debes usar el componente `<Controller />` de React Hook Form.
- **No abusar de `watch`:** Observar campos constantemente anula la ventaja de rendimiento de RHF. Si necesitas reaccionar al cambio de un campo sin re-renderizar todo, usa `useWatch`.

## 📚 Recursos complementarios

- [React Hook Form - Documentación oficial](https://react-hook-form.com/get-started)
- [React Hook Form - API Reference](https://react-hook-form.com/docs/useform)
- [Zod - Documentación oficial](https://zod.dev/)
- [Resolver Zod](https://github.com/react-hook-form/resolvers#zod)
