# ⚠️ IMPORTANTE - Cómo Funcionan las Fotos

## 🔴 Problema Común

Las funciones de Cloudflare Pages (`functions/api/drive/photos.ts`) **SOLO funcionan en producción**, NO en desarrollo local con `npm run dev`.

## ✅ Soluciones

### Opción 1: Probar en Producción (Recomendado)

1. **Asegúrate de que las variables estén configuradas en Cloudflare Pages:**
   - Ve a Cloudflare Dashboard > tu proyecto > Settings > Environment Variables
   - Verifica que exista `GOOGLE_DRIVE_PHOTOS_FOLDER_ID`
   - Verifica que exista `GOOGLE_API_KEY` (opcional)

2. **Redespliega el proyecto:**
   - Haz commit y push de los cambios
   - O ve a Deployments > Retry deployment

3. **Prueba en tu sitio de producción:**
   - Ve a `https://tu-sitio.pages.dev/fotografia`
   - Abre la consola del navegador (F12)
   - Verifica los mensajes

### Opción 2: Probar la Conexión Directamente (Sin el Sitio)

Ejecuta el script de prueba que funciona directamente con Google Drive:

```bash
npm run test:photos
```

O con tus valores específicos:

```bash
node scripts/test-photos-api.js TU_FOLDER_ID TU_API_KEY
```

Este script te dirá:
- ✅ Si Google Drive responde correctamente
- 📸 Cuántas fotos encuentra
- 📋 Lista de todas las fotos

---

## 🔍 Verificación Paso a Paso

### 1. Verifica que la carpeta esté compartida:

1. Abre Google Drive
2. Ve a la carpeta de fotos
3. Haz clic derecho > **Compartir**
4. Debe decir **"Cualquiera con el enlace"** o **"Público"**
5. Si dice "Restringido", cámbialo

### 2. Obtén el Folder ID:

1. Abre la carpeta en Google Drive
2. Copia la URL completa
3. El ID es la parte después de `/folders/`
   - Ejemplo: `https://drive.google.com/drive/folders/1ABC123xyz...`
   - El ID es: `1ABC123xyz...`

### 3. Verifica las variables en Cloudflare:

1. Ve a https://dash.cloudflare.com/
2. Selecciona tu proyecto **portfolio-nicol**
3. Ve a **Settings** > **Environment Variables**
4. Verifica que exista:
   - `GOOGLE_DRIVE_PHOTOS_FOLDER_ID` = tu folder ID
   - `GOOGLE_API_KEY` = tu API key (opcional)

### 4. Prueba la conexión:

```bash
npm run test:photos
```

Si el script funciona pero las fotos no aparecen en el sitio:
- Verifica que hayas redesplegado después de cambiar las variables
- Verifica la consola del navegador en producción
- Espera 2-3 minutos (Google Drive puede tardar en procesar)

---

## 🆘 Si el Script de Prueba Falla

Si `npm run test:photos` falla, el problema es con Google Drive, no con tu código:

### Error 403 (Forbidden):
- La carpeta NO está compartida públicamente
- La API Key no tiene permisos
- Google Drive API no está habilitada

### Error 404 (Not Found):
- El Folder ID es incorrecto
- La carpeta no existe

### No encuentra fotos:
- Las fotos están en una subcarpeta (deben estar directamente en la carpeta)
- Las fotos no son archivos de imagen válidos
- Las fotos están en la papelera

---

## 📝 Resumen

1. ✅ Las funciones de Cloudflare Pages solo funcionan en producción
2. ✅ Usa `npm run test:photos` para probar localmente
3. ✅ Verifica que la carpeta esté compartida públicamente
4. ✅ Verifica las variables en Cloudflare Pages
5. ✅ Redespliega después de cambiar variables
6. ✅ Espera 2-3 minutos después de subir fotos nuevas




