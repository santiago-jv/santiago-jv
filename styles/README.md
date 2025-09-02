# Sistema CSS Optimizado - Santiago Olayo Portfolio

## 📋 Estructura del Sistema

### Archivos CSS
- `globals.css` - Variables globales, reset, estilos base y utilidades
- `animations.css` - Sistema de animaciones personalizado
- `header.module.css` - Estilos del componente Header
- `main-content.module.css` - Estilos del componente MainContent

## 🎨 Design System

### Variables de Color
```css
--color-primary: #FF566F          /* Color principal (rojo/rosa) */
--color-primary-light: rgba(255, 86, 111, 0.20)  /* Version transparente */
--color-background: #0A192F       /* Fondo oscuro */
--color-background-secondary: #112240  /* Fondo secundario */
--color-text-primary: #CCD6F6     /* Texto principal */
--color-text-secondary: #8892B0   /* Texto secundario */
--color-accent: #64FFDA           /* Color de acento (turquesa) */
```

### Tipografía
```css
--font-size-xs: 0.75rem    /* 12px */
--font-size-sm: 0.875rem   /* 14px */
--font-size-base: 1rem     /* 16px */
--font-size-lg: 1.125rem   /* 18px */
--font-size-xl: 1.25rem    /* 20px */
--font-size-2xl: 1.5rem    /* 24px */
--font-size-3xl: 1.875rem  /* 30px */
```

### Sistema de Espaciado
```css
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */
--spacing-3xl: 4rem     /* 64px */
```

### Transiciones
```css
--transition-fast: 0.15s ease
--transition-base: 0.3s ease
--transition-slow: 0.4s ease
```

### Z-Index Stack
```css
--z-dropdown: 1000
--z-sticky: 1020
--z-fixed: 1030
--z-modal-backdrop: 1040
--z-modal: 1050
--z-popover: 1060
--z-tooltip: 1070
```

## 🔧 Nomenclatura BEM

### Header Component
```css
.header                    /* Bloque principal */
.header__logo             /* Elemento: logo */
.header__menu-button      /* Elemento: botón de menú */
.header__navbar           /* Elemento: barra de navegación */
.header--hidden           /* Modificador: estado oculto */

.navbar__header           /* Sub-bloque */
.navbar__title            /* Elemento del sub-bloque */
.navbar__items            /* Lista de elementos */
.navbar__item             /* Item individual */
.navbar__link             /* Enlaces/botones */
```

### MainContent Component
```css
.main-content             /* Contenedor principal */
.hero-background          /* Imagen de fondo */
.hero-title              /* Título principal */
.hero-subtitle           /* Subtítulo */
.hero-content            /* Contenido del hero */
.hero-description        /* Descripción */
.cta-button              /* Call-to-action button */
.social-sidebar          /* Barra lateral de redes */
.social-link             /* Enlaces sociales */
```

## ✨ Clases de Utilidad

### Accesibilidad
```css
.sr-only                 /* Screen reader only */
.focus-trap              /* Trampa de foco */
```

### Animaciones
```css
.animate-performance     /* Optimización de rendimiento */
.animation-complete      /* Limpieza post-animación */
.animate-stagger-1       /* Delays escalonados */
.animate-stagger-2
.animate-stagger-3
.animate-stagger-4
.animate-stagger-5
```

## 📱 Responsive Design

### Breakpoints
- Mobile: `< 480px`
- Tablet: `480px - 900px`  
- Desktop: `900px - 1000px`
- Large Desktop: `> 1000px`

### Media Queries
```css
@media screen and (max-width: 480px) { /* Mobile */ }
@media screen and (max-width: 900px) { /* Tablet */ }
@media screen and (min-width: 1000px) { /* Desktop */ }
```

## 🚀 Optimizaciones de Performance

### will-change
- Usado en elementos que se animan frecuentemente
- Removido automáticamente después de la animación

### contain
- `contain: layout` en contenedores principales
- Mejora el rendimiento de layout

### Transiciones Optimizadas
- Uso de `transform` en lugar de propiedades que causan reflow
- `backdrop-filter` para efectos de desenfoque

## 🎯 Animaciones Personalizadas

### Keyframes Disponibles
```css
@keyframes slideInFromLeft    /* Deslizar desde la izquierda */
@keyframes slideInFromRight   /* Deslizar desde la derecha */
@keyframes fadeInScale        /* Aparecer con escala */
@keyframes headerSlide        /* Animación del header */
@keyframes buttonHover        /* Hover de botones */
@keyframes iconHover          /* Hover de iconos */
```

## ♿ Accesibilidad

### Soporte para Movimiento Reducido
```css
@media (prefers-reduced-motion: reduce) {
  /* Todas las animaciones se reducen a 0.01ms */
}
```

### Focus Management
- Outline personalizado con `--color-accent`
- Estados de focus visibles
- Navegación por teclado optimizada

## 🔄 Retrocompatibilidad

### Clases Legacy
Las siguientes clases mantienen compatibilidad hacia atrás:
- `.background` → `.hero-background`
- `.title` → `.hero-title`  
- `.subtitle` → `.hero-subtitle`
- `.red-text` → `.accent-text`
- `.button` → `.cta-button`
- `.social-networks` → `.social-sidebar`

## 💡 Mejores Prácticas

### Uso de Variables
```css
/* ✅ Correcto */
color: var(--color-primary);
margin: var(--spacing-md);

/* ❌ Incorrecto */
color: #FF566F;
margin: 16px;
```

### BEM Naming
```css
/* ✅ Correcto */
.component__element--modifier

/* ❌ Incorrecto */
.componentElementModifier
.component-element-modifier
```

### Performance
```css
/* ✅ Para animaciones */
transform: translateX(100px);
opacity: 0.5;

/* ❌ Evitar para animaciones */
left: 100px;
width: 50%;
```

## 🛠 Herramientas de Desarrollo

### CSS Modules
- Scoping automático de clases
- TypeScript IntelliSense
- Verificación en tiempo de compilación

### PostCSS (Future)
- Autoprefixer automático
- Optimización de CSS
- Purging de CSS no utilizado

---

*Sistema CSS diseñado para escalabilidad, performance y mantenibilidad.*
