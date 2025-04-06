# Miyuki Jewelry - Tienda en Línea

Una aplicación de comercio electrónico para la tienda de joyería artesanal Miyuki.

## Descripción

Este proyecto es una tienda en línea completa para la marca de joyería Miyuki, con características como:

- Catálogo de productos por categorías
- Carrito de compras persistente
- Panel de administración para gestionar productos
- Testimonios de clientes
- Formulario de contacto
- Botones flotantes de redes sociales (Facebook, WhatsApp)
- Chat de consultas

## Tecnologías Utilizadas

- Frontend: React, TailwindCSS, Wouter, TanStack Query
- Backend: Express.js, Node.js
- Base de datos: PostgreSQL (en desarrollo), almacenamiento en memoria (en producción para GitHub Pages)
- Deploy: Preparado para Vercel y GitHub Pages

## Cómo desplegar en GitHub Pages

1. Crea un repositorio en GitHub
2. Sube este código fuente al repositorio
3. Habilita GitHub Pages en la configuración del repositorio
4. El archivo `.github/workflows/deploy.yml` se encargará de construir y desplegar automáticamente

## Cómo desplegar en Vercel

1. Conecta tu repositorio de GitHub con Vercel
2. Selecciona el repositorio y configura el despliegue
3. El archivo `vercel.json` ya contiene la configuración necesaria

## Estructura del Proyecto

- `client/`: Código del frontend React
- `server/`: API REST y lógica del backend
- `shared/`: Esquemas compartidos entre frontend y backend

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## Características para usuarios con discapacidad

El sitio incluye características de accesibilidad como navegación por voz y soporte para lectores de pantalla.

## Contacto

Para más información, contactar a:
- Email: mbecerra@hotmail.com
- Teléfono: +52 8184995581
- Dirección: Fuentes 211, Col. Villas de Anahuac, Sector Alpes 1, Escobedo NL, C.P. 66059