# 🔧 Solución de Problemas - Fotos de Google Drive

## Problema: Las fotos no aparecen después de subirlas

Si subiste fotos nuevas a Google Drive pero no las ves en la sección de fotos, sigue estos pasos:

### ✅ Paso 1: Verificar la Configuración

1. **Verifica que la variable de entorno esté configurada en Cloudflare Pages:**
   - Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Selecciona tu proyecto **portfolio-nicol**
   - Ve a **Settings** > **Environment Variables**
   - Verifica que exista la variable `GOOGLE_DRIVE_PHOTOS_FOLDER_ID` con el ID correcto de tu carpeta

2. **Verifica que las fotos estén en la carpeta correcta:**
   - Abre Google Drive
   - Ve a la carpeta que configuraste en `GOOGLE_DRIVE_PHOTOS_FOLDER_ID`
   - Verifica que las fotos nuevas estén ahí

3. **Verifica los permisos de la carpeta:**
   - Haz clic derecho en la carpeta > **Compartir**
   - Debe estar configurada como **"Cualquiera con el enlace"** o **"Público"**

### ✅ Paso 2: Probar la Conexión

Ejecuta el script de prueba para verificar que todo funcione:

```bash
# Opción 1: Con variables de entorno
export GOOGLE_DRIVE_PHOTOS_FOLDER_ID=tu_folder_id_aqui
export GOOGLE_API_KEY=tu_api_key_aqui
node scripts/test-photos-api.js

# Opción 2: Pasando los parámetros directamente
node scripts/test-photos-api.js tu_folder_id_aqui tu_api_key_aqui
```

Este script te mostrará:
- ✅ Si la conexión funciona
- 📸 Cuántas fotos se encontraron
- 📋 Lista de todas las fotos en la carpeta

### ✅ Paso 3: Esperar o Forzar Actualización

Después de subir fotos nuevas:

1. **Espera hasta 1 minuto** - El caché se actualiza cada minuto
2. **Recarga la página** - Presiona `Ctrl+R` (Windows/Linux) o `Cmd+R` (Mac)
3. **Limpia el caché del navegador** - Presiona `Ctrl+Shift+R` (Windows/Linux) o `Cmd+Shift+R` (Mac)

### ✅ Paso 4: Verificar en la Consola del Navegador

1. Abre la página de fotos en tu navegador
2. Presiona `F12` para abrir las herramientas de desarrollador
3. Ve a la pestaña **Console**
4. Busca mensajes que digan:
   - `"Fotos de Google Drive cargadas:"` - Debería mostrar un array con las fotos
   - `"Error cargando fotos de Google Drive:"` - Si hay un error, aparecerá aquí

### ⚠️ Problemas Comunes

#### Error: "GOOGLE_DRIVE_PHOTOS_FOLDER_ID not configured"
- **Solución**: Configura la variable de entorno en Cloudflare Pages y redespliega

#### Error 403: Forbidden
- **Solución**: Verifica que la carpeta esté compartida públicamente y que la API Key tenga permisos

#### Error 404: Not Found
- **Solución**: Verifica que el Folder ID sea correcto (cópialo de la URL de Google Drive)

#### Las fotos aparecen pero no se cargan las imágenes
- **Solución**: Verifica que cada foto individual también esté compartida públicamente

### 🔄 Redesplegar después de Cambios

Si cambiaste las variables de entorno en Cloudflare Pages:

1. Ve a **Deployments** en Cloudflare Pages
2. Haz clic en **Retry deployment** en el último deployment
3. O haz un nuevo commit y push para activar un nuevo deployment

### 📝 Notas Importantes

- El caché se actualiza automáticamente cada **1 minuto**
- La página recarga las fotos cada **30 segundos**
- Las fotos deben ser archivos de imagen (JPG, PNG, GIF, WebP, etc.)
- Las fotos en la papelera no aparecerán





