# Trabajo Práctico: Aplicación de Gestión de Socios

## 📋 Descripción del Proyecto

Desarrollar una aplicación web que muestre información de socios obtenida del archivo `socios.json` (que van a encontrar acá), aplicando conceptos de routing, estilizado condicional y cálculos básicos.
Dentro de la carpeta `socios` vana tener una muestra de la ejercitación resuelta en clase. Tranten de mejorarla!!!

## 🎯 Objetivos de Aprendizaje

- Configurar un proyecto React con Vite
- Implementar routing con Wouter
- Aplicar estilos con Tailwind CSS
- Utiliza componentes de flowbite (si así lo deseas, no es obligatorio)
- Manipular y mostrar datos desde un archivo JSON
- Implementar lógica condicional para estilizado
- Realizar cálculos simples (IMC)

## 🛠️ Tecnologías Utilizadas

- React + Vite
- Wouter (routing)
- Tailwind CSS (estilos)
- Flowbite (componentes) opcional - **NO OBLIGATORIO**

## 📁 Estructura del Proyecto

```
src/
  components/
    Navbar.jsx
  pages/
    Home.jsx
    Socios.jsx
  data/
    socios.json
  App.jsx
  main.jsx
```

## 📝 Requisitos Funcionales

### 1. Página Principal (/)

- Mostrar mensaje de bienvenida
- Implementar navbar con enlaces a:
  - Página de inicio
  - Página de socios

### 2. Página de Socios (/socios)

- Mostrar lista de socios en formato de tarjetas (cards)
- Datos a mostrar en cada tarjeta:
  - Nombre y apellido
  - Foto (si está disponible)
  - Edad o categoría
  - Estado (activo/baja)

### 3. Estilizado Condicional

- Si el socio tiene estado **"BAJ"**, la tarjeta debe tener un color de fondo diferente
- Los socios activos deben tener otro estilo visual distintivo

### 4. Detalle de Socio

- Al hacer clic en un socio, mostrar toda su información
- Calcular y mostrar el **IMC (Índice de Masa Corporal)** usando la fórmula:

```
IMC = peso / (altura * altura)
```

- Mostrar categorización del IMC:
  - Bajo peso: < 18.5
  - Normal: 18.5 - 24.9
  - Sobrepeso: 25 - 29.9
  - Obesidad: ≥ 30

## 🔧 Configuración Inicial

### 1. Crear proyecto con Vite

### 2. Instalar Tailwind CSS

### 3. Configurar `tailwind.config.js`

### 4. Importar Tailwind en CSS

En `./src/index.css`:

### 5. Instalar Wouter

### 6. Instalar Flowbite (si así lo deseas)

## 📊 Estructura de Datos (`socios.json`)

## ✅ Criterios de Evaluación

- Funcionalidad completa de navegación
- Correcta visualización de datos
- Implementación adecuada del estilizado condicional
- Cálculo correcto del IMC
- Diseño responsive y atractivo
- Código bien estructurado y comentado

## 🚀 Ejecución del Proyecto

```bash
pnpm dev
```

## 📚 Recursos Adicionales

- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Wouter](https://github.com/molefrog/wouter)
- [Fórmula IMC](https://es.wikipedia.org/wiki/%C3%8Dndice_de_masa_corporal)
- [Documentación de Flowbite](https://flowbite.com/docs/getting-started/)

---

¡Buena suerte con el proyecto! 🍀
