<!-- ## Librerías Implementadas

Este proyecto utiliza las siguientes librerías para mejorar la validación, navegación y visualización de íconos:

### Zod  
Librería para validación de esquemas. Útil para formularios y estructuras de datos tipadas.

### React Router DOM  
Manejo de rutas dinámicas en aplicaciones React. Permite navegación sin recargar la página.

### React Icons  
Colección de íconos populares como Font Awesome, Material Icons, entre otros, en forma de componentes React.

- Documentación oficial: [React Icons - Font Awesome](https://react-icons.github.io/react-icons/icons/fa6/)
- Ejemplo de importación:

```jsx
import { IconName } from "react-icons/fa";
 -->

# 🌱 MercArt - E-commerce Platform

MercArt es una plataforma de e-commerce moderna especializada en productos tecnológicos, moda y artículos de estilo de vida, con un enfoque en sostenibilidad y experiencia de usuario.

## 🚀 Características

- **Diseño Responsivo**: Compatible con dispositivos móviles, tablets y desktop
- **Autenticación de Usuarios**: Sistema de registro y login con validaciones
- **Catálogo de Productos**: Organizado por categorías con productos destacados
- **Carrito de Compras**: Funcionalidad para agregar y gestionar productos
- **Navegación Intuitiva**: Menú categorizado y búsqueda de productos
- **Ofertas Promocionales**: Barra de promociones con rotación automática
- **Páginas Informativas**: About Us, políticas, centro de ayuda

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, React Router DOM
- **Validación**: Zod + React Hook Form
- **Estilos**: CSS3 con diseño modular
- **Iconos**: Lucide React, React Icons
- **Build Tool**: Vite

## 📦 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout/         # Layout principal
│   ├── Navbar/         # Barra de navegación
│   ├── Footer/         # Pie de página
│   ├── Carrousel/      # Carrusel de productos
│   └── BarraOfertas/   # Barra promocional
├── pages/              # Páginas de la aplicación
│   ├── HomePage/       # Página principal
│   ├── LoginPage/      # Autenticación
│   ├── AboutUsPage/    # Información corporativa
│   └── NotFoundPage/   # Página 404
├── styles/             # Archivos CSS modularizados
├── routes/             # Configuración de rutas
└── App.jsx             # Componente principal
```

## 🎨 Diseño y UX

- **Paleta de Colores**: Azul oscuro (#03143B) con acentos verdes
- **Tipografía**: Roboto para mejor legibilidad
- **Experiencia Mobile-First**: Diseño responsive priorizando móviles
- **Interacciones**: Hover effects y transiciones suaves
- **Accesibilidad**: Navegación por teclado y ARIA labels

## 🔄 Funcionalidades Principales

### Autenticación
- Formularios de login y registro con validación completa
- Campos: nombre, apellido, email, contraseña, fecha nacimiento, nacionalidad, género
- Visualización toggle de contraseña
- Validación de edad (mayor de 18 años)

### Catálogo
- Categorías principales: Ropa, Tecnología, Decoración y Hogar, Deportes
- Productos destacados con precios y opciones de compra
- Carrusel de productos inspirados en búsquedas recientes

### Navegación
- Barra superior con categorías y búsqueda
- Footer con enlaces importantes y redes sociales
- Breadcrumbs y navegación contextual

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd mercart
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Compilar para producción**
   ```bash
   npm run build
   ```

## 📱 Responsive Design

El proyecto sigue un enfoque mobile-first con breakpoints:
- **Mobile**: < 520px (1 columna)
- **Tablet**: 520px - 768px (2 columnas)
- **Desktop pequeño**: 768px - 1100px (3 columnas)
- **Desktop completo**: > 1100px (4 columnas)

## 🎯 Próximas Funcionalidades

- [ ] Sistema de carrito de compras persistente
- [ ] Integración con pasarela de pagos
- [ ] Sistema de reviews y calificaciones
- [ ] Wishlist/favoritos
- [ ] Búsqueda avanzada y filtros
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

MercArt - Desarrollado con ❤️ para el curso de React

## 📞 Soporte

Para soporte técnico, contactar a:
- Email: soporte@mercart.com
- Centro de ayuda: [Ayuda MercArt](/help-center)
- Chatbot disponible 24/7

---

**Nota**: Este es un proyecto en desarrollo con fines educativos. Algunas funcionalidades pueden estar en proceso de implementación.