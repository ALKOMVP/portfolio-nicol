# 🔧 Solución al Error de Cloudflare Pages

## ❌ Error que estás viendo:
```
✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project.
For Pages, please run `wrangler pages deploy` instead.
```

## ✅ Solución: Usar la Integración Directa de GitHub (Recomendado)

El error ocurre porque Cloudflare está intentando usar comandos de Workers en lugar de Pages. La mejor solución es usar la integración directa de GitHub desde el dashboard de Cloudflare.

### Pasos para corregir:

1. **Ve al Dashboard de Cloudflare Pages:**
   - https://dash.cloudflare.com/
   - Ve a **Pages** en el menú lateral

2. **Si ya tienes el proyecto creado:**
   - Ve a tu proyecto `portfolio-nicol`
   - Click en **Settings** > **Builds & deployments**
   - Verifica que la configuración sea:
     - **Framework preset**: `Next.js`
     - **Build command**: `npm run build`
     - **Build output directory**: `.next`
     - **Root directory**: (vacío)

3. **Si NO tienes el proyecto creado aún:**
   - Click en **Create a project**
   - Selecciona **Connect to Git**
   - Conecta tu cuenta de GitHub si no lo has hecho
   - Selecciona el repositorio: `ALKOMVP/portfolio-nicol`
   - Configuración:
     - **Project name**: `portfolio-nicol`
     - **Production branch**: `main`
     - **Framework preset**: `Next.js`
     - **Build command**: `npm run build`
     - **Build output directory**: `.next`
     - **Root directory**: (dejar vacío)
   - Click en **Save and Deploy**

4. **Eliminar configuración incorrecta (si existe):**
   - Si tienes algún comando de despliegue manual configurado, elimínalo
   - Cloudflare Pages debe construir automáticamente desde GitHub

## 🔄 Alternativa: Usar Wrangler CLI correctamente

Si prefieres usar Wrangler CLI manualmente, usa el comando correcto:

```bash
# Instalar wrangler
npm install -g wrangler

# Autenticarse
wrangler login

# Construir el proyecto
npm run build

# Desplegar usando el comando de PAGES (no Workers)
wrangler pages deploy .next --project-name=portfolio-nicol
```

**NOTA:** El comando correcto es `wrangler pages deploy`, NO `wrangler deploy`.

## 📝 Verificación

Después de configurar correctamente:

1. Haz un pequeño cambio en el código
2. Haz commit y push:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. Ve a Cloudflare Pages > tu proyecto > Deployments
4. Deberías ver un nuevo deployment iniciándose automáticamente
5. Espera 2-5 minutos para que termine el build

## 🆘 Si el error persiste

1. **Verifica los logs:**
   - Cloudflare Pages > tu proyecto > Deployments
   - Click en el deployment fallido
   - Revisa los logs de build

2. **Verifica que el build funciona localmente:**
   ```bash
   npm run build
   ```
   Si falla localmente, corrige los errores primero.

3. **Limpia la caché:**
   - Cloudflare Pages > Settings > Builds & deployments
   - Click en "Clear build cache"
   - Intenta desplegar nuevamente

4. **Verifica la versión de Node:**
   - En Cloudflare Pages > Settings > Builds & deployments
   - Node version: `18` o superior

## ✅ Configuración Correcta Final

- ✅ Integración directa con GitHub activada
- ✅ Framework: Next.js
- ✅ Build command: `npm run build`
- ✅ Build output: `.next`
- ✅ Auto-deploy desde `main` branch activado

