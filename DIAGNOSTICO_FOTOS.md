# 🔍 Diagnóstico - Fotos No Aparecen

## Pasos para Diagnosticar

### 1. Verificar en la Consola del Navegador

1. Abre la página de fotos en tu navegador
2. Presiona `F12` para abrir las herramientas de desarrollador
3. Ve a la pestaña **Console**
4. Busca estos mensajes:

**✅ Si ves:**
```
✅ Fotos de Google Drive cargadas: X fotos
🔄 Fotos de Google Drive actualizadas: X fotos
```
→ Las fotos se están cargando correctamente

**❌ Si ves:**
```
❌ Error cargando fotos de Google Drive: ...
Failed to fetch Google Drive photos: ...
```
→ Hay un error que necesita ser resuelto

### 2. Verificar la Respuesta de la API

1. En el navegador, ve a la pestaña **Network** (Red)
2. Recarga la página (F5)
3. Busca una petición a `/api/drive/photos`
4. Haz clic en ella y ve a la pestaña **Response** (Respuesta)

**✅ Si ves un array con fotos:**
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
→ La API está funcionando correctamente

**❌ Si ves un error:**
```json
{
  "error": "GOOGLE_DRIVE_PHOTOS_FOLDER_ID not configured"
}
```
→ Necesitas configurar la variable de entorno

### 3. Verificar Variables de Entorno en Cloudflare

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Selecciona tu proyecto **portfolio-nicol**
3. Ve a **Settings** > **Environment Variables**
4. Verifica que exista:
   - `GOOGLE_DRIVE_PHOTOS_FOLDER_ID` (con el ID de tu carpeta de fotos)
   - `GOOGLE_API_KEY` (opcional pero recomendado)

### 4. Verificar la Carpeta en Google Drive

1. Abre [Google Drive](https://drive.google.com/)
2. Ve a la carpeta donde subiste las fotos
3. Verifica:
   - ✅ La carpeta está compartida como **"Cualquiera con el enlace"** o **"Público"**
   - ✅ Las fotos están en formato de imagen (JPG, PNG, GIF, WebP, etc.)
   - ✅ Las fotos NO están en la papelera
   - ✅ El ID de la carpeta coincide con el configurado en Cloudflare

### 5. Obtener el ID de la Carpeta

1. Abre la carpeta en Google Drive
2. Copia la URL de la barra de direcciones
3. El ID es la parte después de `/folders/`
   - Ejemplo: `https://drive.google.com/drive/folders/1ABC123xyz...`
   - El ID es: `1ABC123xyz...`

### 6. Probar la Conexión Directamente

Ejecuta el script de prueba:

```bash
npm run test:photos
```

O directamente:

```bash
node scripts/test-photos-api.js [TU_FOLDER_ID] [TU_API_KEY]
```

Este script te mostrará:
- ✅ Si la conexión funciona
- 📸 Cuántas fotos encuentra
- 📋 Lista de todas las fotos

## Soluciones Comunes

### Problema: "GOOGLE_DRIVE_PHOTOS_FOLDER_ID not configured"
**Solución:** Configura la variable de entorno en Cloudflare Pages y redespliega

### Problema: Error 403 (Forbidden)
**Solución:** 
- Verifica que la carpeta esté compartida públicamente
- Verifica que la API Key tenga permisos para Google Drive API
- Verifica que Google Drive API esté habilitada en Google Cloud Console

### Problema: Error 404 (Not Found)
**Solución:**
- Verifica que el Folder ID sea correcto
- Verifica que la carpeta exista en Google Drive

### Problema: Las fotos aparecen pero no se cargan las imágenes
**Solución:**
- Verifica que cada foto individual también esté compartida públicamente
- Algunas fotos pueden tardar en procesarse en Google Drive

### Problema: Las fotos no aparecen después de subirlas
**Solución:**
- Espera hasta 15 segundos (la página se actualiza automáticamente)
- Recarga la página (Ctrl+R o Cmd+R)
- Verifica que las fotos estén en la carpeta correcta
- Verifica que las fotos sean archivos de imagen válidos

## Cambios Recientes

- ✅ Caché deshabilitado completamente (sin caché)
- ✅ Actualización automática cada 15 segundos (antes 30)
- ✅ Mejor logging en consola para debugging
- ✅ Mejor manejo de errores



