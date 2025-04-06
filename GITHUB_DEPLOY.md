# Instrucciones para desplegar el sitio en GitHub/Vercel

## Preparación del repositorio en GitHub

1. Crea un nuevo repositorio en GitHub
2. Sube todo el código a ese repositorio usando los siguientes comandos:

```bash
git init
git add .
git commit -m "Versión inicial de Miyuki Jewelry"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

## Opción 1: Despliegue en GitHub Pages

Para desplegar en GitHub Pages (sitio estático):

1. Instala el paquete gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Agrega estos scripts a tu package.json:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d client/dist"
}
```

3. Actualiza la configuración de Vite para usar rutas relativas en client/vite.config.ts:

```typescript
export default defineConfig({
  base: './', // Cambiar esta línea
  // resto de la configuración...
});
```

4. Ejecuta el comando de despliegue:

```bash
npm run deploy
```

5. Configura GitHub Pages en la configuración del repositorio para usar la rama gh-pages

## Opción 2: Despliegue en Vercel (aplicación completa)

1. Crea una cuenta en [Vercel](https://vercel.com) si aún no la tienes
2. Conecta tu repositorio de GitHub con Vercel
3. Durante la configuración de importación en Vercel:
   - Framework Preset: Selecciona "Other"
   - Root Directory: ./
   - Build Command: npm run build:all
   - Output Directory: client/dist
   - Install Command: npm install

4. Agrega las siguientes variables de entorno en Vercel:
   - NODE_ENV: production

5. Haz clic en "Deploy" y espera a que el proceso termine

## Importante: Configuración de almacenamiento

Este proyecto está configurado para usar:
- Base de datos PostgreSQL en desarrollo
- Almacenamiento en memoria en producción (GitHub Pages/Vercel sin base de datos)

Si deseas habilitar la base de datos en Vercel:
1. Agrega un complemento de PostgreSQL en Vercel
2. Configura la variable de entorno DATABASE_URL con la URL de conexión
3. Modifica la variable "useInMemoryStorage" en shared/env.ts para que solo use memoria cuando no hay DATABASE_URL disponible

## Versión de node recomendada

Node.js 20.x o superior