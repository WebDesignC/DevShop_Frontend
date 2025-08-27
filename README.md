# 🌱 MercArt - E-commerce Platform

## 📋 Descripción del Proyecto

MercArt es una plataforma de e-commerce moderna desarrollada en React, especializada en productos tecnológicos, moda y artículos de estilo de vida. La aplicación ofrece una experiencia de usuario fluida con funcionalidades completas de autenticación, catálogo de productos y sistema de navegación intuitivo.

## 🛠️ Stack Tecnológico

### Core Framework
- **React 18**: Biblioteca principal para la construcción de interfaces de usuario
- **React Router DOM v6**: Manejo de rutas y navegación SPA (Single Page Application)

### Validación de Datos
- **Zod**: Librería de validación de esquemas TypeScript-first
  - Implementada para validación robusta de formularios
  - Proporciona mensajes de error específicos y personalizables
  - Garantiza la integridad de los datos en frontend

- **React Hook Form**: Manejo eficiente de formularios
  - Integrado con Zod para validación sincronizada
  - Minimiza re-renders y mejora el performance
  - Manejo optimizado de campos y errores

### UI & Iconos
- **Lucide React**: Conjunto de iconos elegantes y modernos
  - Utilizado en la barra de navegación para búsqueda, carrito y usuario
  - Iconos consistentes y escalables

- **React Icons**: Colección completa de iconos populares
  - Iconos de Font Awesome para elementos de interfaz
  - Iconos sociales para redes sociales en el footer

### Estilos
- **CSS3 puro**: Sin preprocesadores para mantener la simplicidad
  - Arquitectura modular por componentes
  - Variables CSS para consistencia de colores y espaciado
  - Enfoque mobile-first con media queries

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/                 # Componentes reutilizables
│   ├── Layout/                # Componente de layout principal
│   ├── Navbar/                # Barra de navegación con iconos Lucide
│   ├── Footer/                # Pie de página con React Icons
│   ├── Carrousel/             # Carrusel de productos
│   └── BarraOfertas/          # Barra promocional con animaciones
├── pages/                     # Páginas de la aplicación
│   ├── HomePage/              # Landing page con video hero
│   ├── LoginPage/             # Autenticación con Zod + React Hook Form
│   ├── AboutUsPage/           # Información corporativa
│   └── NotFoundPage/          # Página 404 personalizada
├── styles/                    # Estilos CSS modularizados
├── routes/                    # Configuración de enrutamiento
└── App.jsx                    # Componente principal con Router
```

## 🔐 Sistema de Autenticación

### Validaciones Implementadas con Zod
```javascript
const registerSchema = z.object({
  name: z.string().min(2, { message: "Nombre requerido" }),
  apellido: z.string().min(2, { message: "Apellidos requeridos" }),
  fechaNacimiento: z.string().min(1, { message: "Fecha de nacimiento requerida" })
    .refine((val) => {
      const birthDate = new Date(val);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18;
    }, { message: "Debes tener al menos 18 años" }),
  nacionalidad: z.string().min(3, { message: "Nacionalidad requerida" }),
  genero: z.string().min(1, { message: "Selecciona el Género" }),
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});
```

### Integración con React Hook Form
```javascript
const { register, handleSubmit, formState: { errors } } = useForm({ 
  resolver: zodResolver(isRegistering ? registerSchema : loginSchema) 
});
```

## 🎨 Componentes Principales

### Navbar Component
- Implementa `NavLink` de React Router para navegación activa
- Utiliza Lucide React para iconos de búsqueda, carrito y usuario
- Diseño responsive con CSS Grid

### Carrousel Component
- Carrusel responsivo con detección automática de viewport
- Lógica de paginación personalizada
- Soporte para 1-4 columnas según tamaño de pantalla

### BarraOfertas Component
- Sistema de rotación automática de mensajes promocionales
- Controles de navegación manual con Chevron icons
- Temporizador inteligente con pausa al hacer hover

## 📱 Responsive Design

### Breakpoints Estratégicos
```css
/* Mobile First Approach */
@media (max-width: 520px) {    /* Móviles: 1 columna */ }
@media (max-width: 768px) {    /* Tablets: 2 columnas */ }
@media (max-width: 1100px) {   /* Desktop pequeño: 3 columnas */ }
@media (min-width: 1101px) {   /* Desktop completo: 4 columnas */ }
```

### Técnicas Responsive
- CSS Grid y Flexbox para layouts adaptativos
- Unidades relativas (rem, em, %) para escalabilidad
- Imágenes responsivas con `max-width: 100%`
- Menú de navegación adaptable

## 🚀 Instalación y Desarrollo

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Comandos de Desarrollo
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

### Estructura de Dependencias
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "react-hook-form": "^7.43.5",
    "zod": "^3.20.2",
    "@hookform/resolvers": "^2.9.11",
    "lucide-react": "^0.263.1",
    "react-icons": "^4.8.0"
  }
}
```

## 🔧 Configuración de Rutas

```javascript
// routes.jsx - Configuración centralizada
const routes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <AboutUs /> },
  { path: '/login', element: <Login /> },
  { path: '*', element: <NotFoundPage/> }
];
```

## 🎯 Características Técnicas Destacadas

### Performance Optimizations
- Lazy loading de imágenes con `loading="lazy"`
- Componentes funcionales con hooks modernos
- Minimización de re-renders con React Hook Form


## 📊 Estructura de Datos

### Product Schema
```javascript
{
  id: string,
  title: string,
  image: string,
  price: number,
  oldPrice?: number,
  discountText?: string,
  subtitle?: string,
  badge?: string
}
```

## 🔮 Próximas Implementaciones

- [ ] Integración con API REST
- [ ] Estado global con Context API o Redux
- [ ] Persistencia de carrito de compras
- [ ] Sistema de pagos integrado
- [ ] PWA capabilities
- [ ] Testing con Jest y React Testing Library

## 📝 Scripts Disponibles

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

## 🤝 Contribución

1. Sigue las convenciones de código existentes
2. Mantén la coherencia en el uso de Zod para validaciones
3. Utiliza los iconos de Lucide/React Icons apropiadamente
4. Sigue el patrón mobile-first en estilos
5. Asegura la accesibilidad en nuevos componentes

## 📄 Licencia

MIT License - ver archivo LICENSE para detalles.

---

**Estado del Proyecto**: Desarrollo Activo  
**Última Actualización**: 26 Agosto 2025  
**Versión React**: 18.2.0  
**Node.js requerido**: 16+