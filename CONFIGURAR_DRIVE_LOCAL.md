# 📁 Configurar Google Drive en Desarrollo Local

## Problema

Las funciones de Cloudflare Pages (`functions/api/drive/`) solo funcionan en producción, no en desarrollo local con `npm run dev`.

## Solución

He creado rutas API de Next.js que funcionan en desarrollo local. Solo necesitas configurar las variables de entorno.

## Pasos Rápidos:

### 1. Obtener el Folder ID de Google Drive

Para **Fotos**:
1. Abre Google Drive
2. Ve a la carpeta donde están las fotos
3. Copia el ID de la URL (la parte después de `/folders/`)
   - Ejemplo: `https://drive.google.com/drive/folders/1ABC123xyz...`
   - El ID es: `1ABC123xyz...`

Para **Videos**:
1. Abre Google Drive
2. Ve a la carpeta donde están los videos
3. Copia el ID de la URL

### 2. Obtener API Key de Google (Opcional pero Recomendado)

1. Ve a https://console.cloud.google.com/
2. Crea un proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Library**
4. Busca "Google Drive API" y haz clic en **Enable**
5. Ve a **APIs & Services** > **Credentials**
6. Haz clic en **Create Credentials** > **API Key**
7. Copia la API Key

### 3. Configurar Variables en `.env.local`

Crea o edita el archivo `.env.local` en la raíz del proyecto:

```env
# Google Drive - Fotos
GOOGLE_DRIVE_PHOTOS_FOLDER_ID=tu_folder_id_de_fotos

# Google Drive - Videos
GOOGLE_DRIVE_FOLDER_ID=tu_folder_id_de_videos

# Google Drive API Key (opcional pero recomendado)
GOOGLE_API_KEY=tu_api_key_aqui
```

**Ejemplo:**
```env
GOOGLE_DRIVE_PHOTOS_FOLDER_ID=1ABC123xyz...
GOOGLE_DRIVE_FOLDER_ID=1XYZ789abc...
GOOGLE_API_KEY=AIzaSyD4zD2JMJVUMDNH_3ivWnwAnGhqOdyB5r0
```

### 4. Reiniciar el Servidor

```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

## ✅ Verificar que Funciona

1. Abre http://localhost:3000/fotografia
2. Deberías ver las fotos de Google Drive
3. Abre http://localhost:3000/videos
4. Deberías ver los videos de Google Drive

## 🔍 Verificar en la Consola

Si no ves las fotos/videos:

1. Abre la consola del navegador (F12)
2. Ve a la pestaña **Network**
3. Busca peticiones a `/api/drive/photos` o `/api/drive/videos`
4. Haz clic y revisa la respuesta

Si ves un error:
- `GOOGLE_DRIVE_PHOTOS_FOLDER_ID not configured` → Agrega la variable en `.env.local`
- `403 Forbidden` → Verifica que la carpeta esté compartida públicamente
- `404 Not Found` → Verifica que el Folder ID sea correcto

## 📝 Notas Importantes

- **Las carpetas deben estar compartidas** como "Cualquiera con el enlace" o "Público"
- **Las fotos/videos deben estar directamente en la carpeta** (no en subcarpetas)
- **Reinicia el servidor** después de cambiar `.env.local`
- **En producción**, Cloudflare Pages usará automáticamente las funciones de `functions/api/drive/`

## 🆘 Si No Funciona

1. Verifica que `.env.local` existe y tiene las variables correctas
2. Verifica que reiniciaste el servidor
3. Verifica que las carpetas estén compartidas públicamente
4. Revisa la consola del servidor para errores
5. Revisa la consola del navegador (F12) para errores

