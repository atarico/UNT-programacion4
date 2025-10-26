# Introducción a ASP.NET Core

## ¿Qué es ASP.NET Core?

ASP.NET Core es un framework web moderno, multiplataforma y de alto rendimiento desarrollado por Microsoft para construir aplicaciones web, APIs y microservicios. Es la evolución de ASP.NET Framework tradicional, diseñado desde cero para ser más rápido, modular y compatible con diferentes sistemas operativos.

## Características Principales

### 🚀 **Alto Rendimiento**

- Una de las plataformas web más rápidas disponibles
- Optimizado para manejar miles de requests por segundo
- Menor uso de memoria comparado con otros frameworks

### 🌐 **Multiplataforma**

- Ejecuta en Windows, Linux y macOS
- Compatible con Docker y contenedores
- Soporte nativo para microservicios

### 🔧 **Modular y Flexible**

- Arquitectura basada en middleware
- Sistema de inyección de dependencias integrado
- Configuración flexible y extensible

### 🛡️ **Seguridad Integrada**

- Autenticación y autorización robustas
- Protección contra ataques comunes (CSRF, XSS, etc.)
- Soporte para JWT, Cookies, OAuth, y otros estándares de seguridad

## Arquitectura de ASP.NET Core

### 🏗️ **Estructura Típica de Proyecto**

```
MiProyecto/
├── Controllers/          # Controladores de la API
├── Models/              # Modelos de datos y DTOs
├── Services/            # Lógica de negocio
├── Repositories/        # Acceso a datos
├── Config/              # Configuración de base de datos
├── Utils/               # Utilidades y helpers
├── Migrations/          # Migraciones de Entity Framework
├── Program.cs           # Punto de entrada de la aplicación
└── appsettings.json     # Configuración de la aplicación
```

### 🎯 **Componentes Principales**

#### **Controllers**

- Manejo de requests HTTP y respuestas
- Validación de entrada
- Coordinación con servicios

#### **Services**

- Lógica de negocio
- Orquestación de operaciones
- Transformación de datos

#### **Repositories**

- Acceso a datos
- Abstracción de la base de datos
- Operaciones CRUD

#### **Models/Entities**

- Representación de datos
- Validaciones
- Relaciones entre entidades

## Tecnologías y Patrones Comunes

### **Tecnologías Backend**

- **ASP.NET Core 8.0** - Framework principal
- **Entity Framework Core** - ORM para base de datos
- **SQL Server/PostgreSQL/MySQL** - Bases de datos relacionales
- **JWT Bearer** - Autenticación basada en tokens
- **BCrypt** - Encriptación de contraseñas
- **AutoMapper** - Mapeo de objetos
- **Swagger/OpenAPI** - Documentación de API

### **Patrones de Diseño**

- **Repository Pattern** - Abstracción del acceso a datos
- **Dependency Injection** - Inversión de control
- **DTO Pattern** - Transferencia de datos
- **Service Layer** - Separación de lógica de negocio
- **Unit of Work** - Gestión de transacciones

## Configuración Básica

### **Configuración de Base de Datos**

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MiBaseDatos;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

### **Configuración de JWT**

```json
{
  "Secrets": {
    "JWT": "tu-clave-secreta-super-segura-de-al-menos-32-caracteres"
  }
}
```

## Flujo de Request en ASP.NET Core

### 📋 **Tipos de Endpoints Comunes**

- **CRUD Operations**: Create, Read, Update, Delete
- **Authentication**: Login, Register, Logout
- **Authorization**: Endpoints protegidos por roles
- **Health Checks**: Verificación de estado del sistema
- **File Upload/Download**: Manejo de archivos

### **Códigos de Estado HTTP**

- **200 OK** - Operación exitosa
- **201 Created** - Recurso creado exitosamente
- **400 Bad Request** - Datos inválidos
- **401 Unauthorized** - No autenticado
- **403 Forbidden** - Sin permisos
- **404 Not Found** - Recurso no encontrado
- **500 Internal Server Error** - Error del servidor

## Ventajas de ASP.NET Core

### ✅ **Beneficios**

1. **Alto Rendimiento**: Una de las plataformas más rápidas
2. **Multiplataforma**: Funciona en cualquier sistema operativo
3. **Modular**: Arquitectura basada en middleware
4. **Seguro**: Características de seguridad integradas
5. **Escalable**: Fácil de escalar horizontal y verticalmente
6. **Testeable**: Excelente soporte para testing
7. **Moderno**: Sintaxis moderna de C# y .NET

### 🎯 **Casos de Uso Ideales**

- APIs REST y GraphQL
- Aplicaciones web SPA
- Microservicios
- Aplicaciones empresariales
- Sistemas de autenticación
- APIs de integración

## Próximos Pasos

Esta documentación cubrirá en detalle los siguientes temas:

1. **Arquitectura** - Patrones y principios de diseño
2. **Modelos y DTOs** - Estructura de datos y transferencia
3. **Servicios e Inyección de Dependencias** - Lógica de negocio
4. **ORM y Entity Framework** - Acceso a datos
5. **Repository Pattern** - Abstracción de datos
6. **Filtros y Swagger** - Documentación y middleware
7. **Autenticación y Autorización** - Seguridad completa

Cada sección tendrá ejemplos de código, mejores prácticas y explicaciones detalladas de implementación.
