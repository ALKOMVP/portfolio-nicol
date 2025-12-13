# 🚀 Instrucciones para Desplegar en GitHub y Cloudflare

## ✅ Lo que ya está hecho:

1. ✅ Repositorio Git inicializado localmente
2. ✅ Todos los archivos commiteados
3. ✅ Configuración de Cloudflare Pages lista
4. ✅ Workflow de GitHub Actions configurado

## 📋 Pasos para completar el despliegue:

### Paso 1: Crear repositorio en GitHub

1. Ve a: **https://github.com/new**
2. Configuración:
   - **Repository name**: `portfolio-nicol`
   - **Description**: `Portfolio de acrobacia y circo - Nicol Mena`
   - **Visibility**: Público o Privado (tu elección)
   - ⚠️ **NO marques** "Add a README file"
   - ⚠️ **NO marques** "Add .gitignore"
   - ⚠️ **NO marques** "Choose a license"
3. Click en **"Create repository"**

### Paso 2: Conectar repositorio local con GitHub

Ejecuta estos comandos en la terminal:

```bash
cd /Users/alko/projects/portfolio-nicol
git remote add origin https://github.com/ALKOMVP/portfolio-nicol.git
git branch -M main
git push -u origin main
```

**O ejecuta el script automático:**
```bash
./SETUP_GITHUB.sh
```

### Paso 3: Configurar Cloudflare Pages

#### Opción A: Desde la interfaz web (Recomendado)

1. Ve a: **https://dash.cloudflare.com/**
2. Inicia sesión con tu cuenta de Cloudflare
3. En el menú lateral, ve a **Pages** > **Create a project**
4. Si es la primera vez, conecta tu cuenta de GitHub:
   - Click en **"Connect to Git"**
   - Autoriza Cloudflare Pages
   - Selecciona tu cuenta/organización
5. Selecciona el repositorio: **`ALKOMVP/portfolio-nicol`**
6. Configuración del proyecto:
   - **Project name**: `portfolio-nicol`
   - **Production branch**: `main`
   - **Framework preset**: `Next.js`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: (dejar vacío)
   - **Node version**: `18` o superior
7. Click en **"Save and Deploy"**
8. Espera a que termine el build (2-5 minutos)

#### Opción B: Usando Wrangler CLI

```bash
# Instalar Wrangler
npm install -g wrangler

# Autenticarse
wrangler login

# Desplegar
npm run build
wrangler pages deploy .next --project-name=portfolio-nicol
```

### Paso 4: Configurar dominio personalizado (Opcional)

1. En Cloudflare Pages, ve a tu proyecto `portfolio-nicol`
2. Settings > Custom domains
3. Agrega tu dominio personalizado
4. Sigue las instrucciones para configurar DNS

## 🔧 Configuración adicional (si es necesario)

### Variables de entorno para el formulario de contacto

Si necesitas configurar el formulario de contacto:

1. En Cloudflare Pages > tu proyecto > Settings > Environment Variables
2. Agrega las variables necesarias (por ejemplo, para email)

### Actualizar el código

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

Cloudflare Pages reconstruirá automáticamente el sitio.

## 📝 Notas importantes

- El sitio estará disponible en: `https://portfolio-nicol.pages.dev` (o tu dominio personalizado)
- Los cambios se despliegan automáticamente al hacer push a `main`
- Los videos deben estar en `public/videos/` para que funcionen correctamente

## 🆘 Solución de problemas

### Error: "Build failed"
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Cloudflare Pages > Deployments

### Error: "Repository not found"
- Verifica que el repositorio existe en GitHub
- Verifica que tienes acceso al repositorio
- Verifica que el nombre del repositorio es correcto

### Los videos no se muestran
- Asegúrate de que los videos están en `public/videos/`
- Verifica que los nombres de archivo coinciden exactamente

## 📞 Soporte

Si tienes problemas, revisa:
- Logs de Cloudflare Pages
- Documentación de Cloudflare Pages: https://developers.cloudflare.com/pages/
- Documentación de Next.js: https://nextjs.org/docs

