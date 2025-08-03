# 🌐 Modelo Cliente-Servidor y Protocolo HTTP

## 📌 Objetivo de esta unidad

Comprender el modelo de arquitectura **cliente-servidor**, su aplicación en el desarrollo web moderno, y el funcionamiento del protocolo **HTTP/HTTPS** como medio de comunicación entre ambas partes.

## 🧱 ¿Qué es el modelo Cliente-Servidor?

Es una **arquitectura de software** donde las responsabilidades están separadas en dos roles:

- **Cliente**: solicita información o servicios (por ejemplo, un navegador o una app web hecha en React).
- **Servidor**: procesa esas solicitudes y responde con los datos o resultados requeridos (por ejemplo, una API en ASP.NET Core).

### 🧩 Componentes de la arquitectura

| Capa                  | Rol                            | Ejemplo                      |
| --------------------- | ------------------------------ | ---------------------------- |
| **Presentación**      | Interfaz de usuario            | React, HTML, CSS             |
| **Lógica de negocio** | Procesamiento de datos, reglas | Controladores en ASP.NET     |
| **Acceso a datos**    | Persistencia en base de datos  | Entity Framework, SQL Server |

> Este esquema se conoce como arquitectura **en n capas** y facilita la **escalabilidad, mantenimiento y reutilización** del código.

## 🌐 ¿Qué es HTTP?

**HTTP (Hypertext Transfer Protocol)** es el protocolo base para la comunicación en la web. Permite que los clientes y servidores intercambien datos mediante **solicitudes (requests)** y **respuestas (responses)**.

### 🔒 HTTPS agrega una capa de seguridad cifrando los datos con SSL/TLS.

### 📤 Métodos HTTP comunes

| Método   | Uso típico                                    |
| -------- | --------------------------------------------- |
| `GET`    | Obtener un recurso                            |
| `POST`   | Enviar datos (crear un recurso)               |
| `PUT`    | Actualizar completamente un recurso existente |
| `PATCH`  | Actualizar parcialmente un recurso existente  |
| `DELETE` | Eliminar un recurso                           |

## 📥 Estructura de una petición HTTP

```http
GET /api/usuarios //Ruta del recurso solicitado
Host: mipaginaweb.com //Dominio del servidor
Accept: application/json //Tipo de contenido esperado
Authorization: Bearer eyJhbGciOiJIUzI1Ni... //Token de autenticación
```

## 📤 Estructura de una respuesta HTTP

```http
HTTP/ 200 OK //Código de estado
Content-Type: application/json //Tipo de contenido devuelto
{
  "id": 1,
  "nombre": "Juan Pérez",
  "rol": "admin",
  "email": "juanperez@mipaginaweb.com"
}
```

## 📊 Códigos de estado HTTP

(algunos ejemplos)

| Código | Descripción                                  |
| ------ | -------------------------------------------- |
| 200    | OK - La solicitud fue exitosa                |
| 201    | Created - Recurso creado                     |
| 204    | No Content - Sin contenido                   |
| 400    | Bad Request - Solicitud inválida             |
| 401    | Unauthorized - No autorizado                 |
| 404    | Not Found - No encontrado                    |
| 500    | Internal Server Error - Error en el servidor |

## ✅ Conclusiones clave

- El modelo cliente-servidor separa responsabilidades y permite escalabilidad.
- HTTP es el idioma de la web: todas las comunicaciones web lo usan.
- Entender los métodos, headers y respuestas HTTP es clave para integrar frontend y backend correctamente.
- HTTPS es obligatorio en producción para proteger datos sensibles.

## 📚 Recursos complementarios

- [MDN - Guía HTTP](https://developer.mozilla.org/es/docs/Web/HTTP)
- [Postman - Aprende HTTP visualmente](https://learning.postman.com/)
- [RESTful API Tutorial](https://restfulapi.net/)
- [ASP.NET Core HTTP Pipeline](https://learn.microsoft.com/es-es/aspnet/core/fundamentals/middleware/)
