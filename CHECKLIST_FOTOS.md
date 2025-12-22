# ✅ Checklist - Fotos No Aparecen

Sigue estos pasos en orden para diagnosticar por qué las fotos no aparecen:

## 🔍 Paso 1: Verificar en la Consola del Navegador

1. Abre la página de fotos: `http://localhost:3000/fotografia` (o tu URL de producción)
2. Presiona `F12` para abrir las herramientas de desarrollador
3. Ve a la pestaña **Console**
4. Busca estos mensajes:

### ✅ Si ves esto (TODO BIEN):
```
✅ Fotos de Google Drive cargadas: X fotos
✅ Se obtuvieron X fotos de Google Drive
🔄 Fotos de Google Drive actualizadas: X fotos
```
→ Las fotos se están cargando correctamente. Si no las ves, puede ser un problema de visualización.

### ❌ Si ves esto (HAY UN ERROR):
```
❌ Failed to fetch Google Drive photos: ...
⚠️ La variable GOOGLE_DRIVE_PHOTOS_FOLDER_ID no está configurada
```
→ Necesitas configurar la variable de entorno (ver Paso 2)

---

## 🔧 Paso 2: Verificar Variables de Entorno

### Si estás en desarrollo local:

1. Crea un archivo `.env.local` en la raíz del proyecto (si no existe)
2. Agrega estas líneas:
```env
GOOGLE_DRIVE_PHOTOS_FOLDER_ID=tu_folder_id_aqui
GOOGLE_API_KEY=tu_api_key_aqui
```
3. Reinicia el servidor de desarrollo (`npm run dev`)

### Si estás en producción (Cloudflare Pages):

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Selecciona tu proyecto **portfolio-nicol**
3. Ve a **Settings** > **Environment Variables**
4. Verifica que existan estas variables:
   - `GOOGLE_DRIVE_PHOTOS_FOLDER_ID` (con el ID de tu carpeta de fotos)
   - `GOOGLE_API_KEY` (opcional pero recomendado)
5. Si no existen, créalas y luego **redespliega** el proyecto

---

## 📁 Paso 3: Verificar la Carpeta en Google Drive

1. Abre [Google Drive](https://drive.google.com/)
2. Ve a la carpeta donde subiste las fotos
3. Verifica estos puntos:

### ✅ La carpeta está compartida correctamente:
- Haz clic derecho en la carpeta > **Compartir**
- Debe estar configurada como **"Cualquiera con el enlace"** o **"Público"**
- Si dice "Restringido", cámbialo a "Cualquiera con el enlace"

### ✅ Las fotos están en la carpeta correcta:
- Verifica que las fotos nuevas estén dentro de la carpeta (no en subcarpetas)
- El ID de la carpeta debe coincidir con el configurado en `GOOGLE_DRIVE_PHOTOS_FOLDER_ID`

### ✅ Obtener el ID de la carpeta:
1. Abre la carpeta en Google Drive
2. Copia la URL de la barra de direcciones
3. El ID es la parte después de `/folders/`
   - Ejemplo: `https://drive.google.com/drive/folders/1ABC123xyz...`
   - El ID es: `1ABC123xyz...`

### ✅ Las fotos son archivos de imagen válidos:
- Formatos soportados: JPG, PNG, GIF, WebP, BMP, TIFF
- Las fotos NO deben estar en la papelera
- Las fotos deben estar completamente subidas (no en proceso)

---

## 🧪 Paso 4: Probar la Conexión Directamente

Ejecuta el script de prueba para verificar que la API funciona:

```bash
npm run test:photos
```

O directamente:

```bash
node scripts/test-photos-api.js [TU_FOLDER_ID] [TU_API_KEY]
```

**Ejemplo:**
```bash
node scripts/test-photos-api.js 1ABC123xyz... AIzaSyD4zD2JMJVUMDNH_3ivWnwAnGhqOdyB5r0
```

Este script te mostrará:
- ✅ Si la conexión funciona
- 📸 Cuántas fotos encuentra
- 📋 Lista de todas las fotos con sus nombres

---

## 🌐 Paso 5: Verificar la Respuesta de la API

1. En el navegador, ve a la pestaña **Network** (Red) en las herramientas de desarrollador
2. Recarga la página (F5)
3. Busca una petición a `/api/drive/photos`
4. Haz clic en ella y ve a la pestaña **Response** (Respuesta)

### ✅ Si ves un array con fotos:
```json
[
  {
    "id": "drive-...",
    "name": "foto.jpg",
    "url": "...",
    ...
  }
]
```
→ La API está funcionando. Si no ves las fotos en la página, puede ser un problema del frontend.

### ❌ Si ves un error:
```json
{
  "error": "GOOGLE_DRIVE_PHOTOS_FOLDER_ID not configured"
}
```
→ Configura la variable de entorno (ver Paso 2)

```json
{
  "error": "Failed to fetch photos from Google Drive",
  "details": "..."
}
```
→ Revisa los detalles del error. Puede ser:
- Error 403: La carpeta no está compartida públicamente
- Error 404: El Folder ID es incorrecto
- Error 400: Problema con la API Key

---

## ⏱️ Paso 6: Esperar el Procesamiento

Google Drive puede tardar unos minutos en procesar las fotos después de subirlas:

1. Espera 2-3 minutos después de subir las fotos
2. Recarga la página
3. Verifica que las fotos aparezcan en Google Drive antes de esperarlas en el sitio

---

## 🔄 Paso 7: Redesplegar (Solo Producción)

Si estás en producción y cambiaste las variables de entorno:

1. Ve a Cloudflare Dashboard > Deployments
2. Haz clic en **Retry deployment** en el último deployment
3. O haz un nuevo commit y push:
```bash
git add .
git commit -m "Actualizar configuración de fotos"
git push
```

---

## 📝 Resumen de Problemas Comunes

| Problema | Solución |
|----------|----------|
| "GOOGLE_DRIVE_PHOTOS_FOLDER_ID not configured" | Configura la variable de entorno en Cloudflare Pages |
| Error 403 (Forbidden) | Comparte la carpeta como "Cualquiera con el enlace" |
| Error 404 (Not Found) | Verifica que el Folder ID sea correcto |
| Las fotos aparecen en Drive pero no en el sitio | Espera 2-3 minutos y recarga la página |
| Solo aparecen algunas fotos | Verifica que todas estén en la carpeta correcta y compartidas |

---

## 🆘 Si Nada Funciona

1. Verifica los logs en Cloudflare Pages:
   - Ve a Cloudflare Dashboard > tu proyecto > Deployments
   - Haz clic en el último deployment
   - Revisa los logs de la función `/api/drive/photos`

2. Verifica la consola del navegador para errores específicos

3. Ejecuta el script de prueba para verificar la conexión directa con Google Drive



