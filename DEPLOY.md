# Guía de Despliegue en Cloudflare Pages

## Paso 1: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `portfolio-nicol`
3. Descripción: "Portfolio de acrobacia y circo - Nicol Mena"
4. Visibilidad: Público o Privado (según prefieras)
5. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
6. Click en "Create repository"

## Paso 2: Conectar el repositorio local con GitHub

Ejecuta estos comandos (reemplaza `ALKOMVP` con tu usuario si es diferente):

```bash
cd /Users/alko/projects/portfolio-nicol
git remote add origin https://github.com/ALKOMVP/portfolio-nicol.git
git branch -M main
git push -u origin main
```

## Paso 3: Configurar Cloudflare Pages

### Opción A: Desde la interfaz web de Cloudflare

1. Ve a https://dash.cloudflare.com/
2. Selecciona tu cuenta
3. En el menú lateral, ve a **Pages** > **Create a project**
4. Conecta tu cuenta de GitHub si aún no lo has hecho
5. Selecciona el repositorio `ALKOMVP/portfolio-nicol`
6. Configuración del proyecto:
   - **Project name**: `portfolio-nicol`
   - **Production branch**: `main`
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/` (dejar vacío)
7. Click en **Save and Deploy**

### Opción B: Usando Wrangler CLI

1. Instala Wrangler:
```bash
npm install -g wrangler
```

2. Autentícate:
```bash
wrangler login
```

3. Despliega:
```bash
npm run build
wrangler pages deploy .next --project-name=portfolio-nicol
```

## Paso 4: Configurar variables de entorno (si es necesario)

Si necesitas variables de entorno para el formulario de contacto:

1. En Cloudflare Pages, ve a tu proyecto
2. Settings > Environment Variables
3. Agrega las variables necesarias (por ejemplo, para el email)

## Notas importantes

- Cloudflare Pages está configurado para usar Next.js con export estático
- El sitio se reconstruirá automáticamente cada vez que hagas push a la rama `main`
- El dominio personalizado se puede configurar en Settings > Custom domains

