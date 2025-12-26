# 🚀 Solución Rápida - Fotos No Aparecen

## ⚡ Solución Inmediata (5 minutos)

### Si estás en DESARROLLO LOCAL:

1. **Crea el archivo `.env.local`** en la raíz del proyecto:
```bash
cd /Users/alko/projects/portfolio-nicol
touch .env.local
```

2. **Abre el archivo y agrega:**
```env
GOOGLE_DRIVE_PHOTOS_FOLDER_ID=TU_FOLDER_ID_AQUI
GOOGLE_API_KEY=TU_API_KEY_AQUI
```

3. **Obtén el Folder ID:**
   - Abre Google Drive
   - Ve a la carpeta donde están las fotos
   - Copia el ID de la URL (la parte después de `/folders/`)
   - Ejemplo: `https://drive.google.com/drive/folders/1ABC123xyz...`
   - El ID es: `1ABC123xyz...`

4. **Reinicia el servidor:**
```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

5. **Prueba la conexión:**
```bash
npm run test:photos
```

### Si estás en PRODUCCIÓN (Cloudflare Pages):

1. **Ve a Cloudflare Dashboard:**
   - https://dash.cloudflare.com/
   - Selecciona tu proyecto **portfolio-nicol**
   - Ve a **Settings** > **Environment Variables**

2. **Verifica/Crea estas variables:**
   - `GOOGLE_DRIVE_PHOTOS_FOLDER_ID` = ID de tu carpeta de fotos
   - `GOOGLE_API_KEY` = Tu API Key de Google (opcional pero recomendado)

3. **Redespliega:**
   - Ve a **Deployments**
   - Haz clic en **Retry deployment** en el último deployment
   - O haz commit y push de los cambios

---

## 🔍 Verificación Rápida

### Paso 1: Verificar en la Consola del Navegador

1. Abre la página: `http://localhost:3000/fotografia` (o tu URL de producción)
2. Presiona `F12` → pestaña **Console**
3. Busca estos mensajes:

**✅ Si ves esto:**
```
✅ Fotos de Google Drive cargadas: X fotos
✅ Se obtuvieron X fotos de Google Drive
```
→ Las fotos se están cargando. Si no las ves visualmente, puede ser un problema de CSS o renderizado.

**❌ Si ves esto:**
```
❌ Failed to fetch Google Drive photos
⚠️ La variable GOOGLE_DRIVE_PHOTOS_FOLDER_ID no está configurada
```
→ Necesitas configurar las variables de entorno (ver arriba).

### Paso 2: Probar la Conexión Directa

Ejecuta este comando para verificar que Google Drive responde:

```bash
npm run test:photos
```

O directamente con tus valores:

```bash
node scripts/test-photos-api.js TU_FOLDER_ID TU_API_KEY
```

**Ejemplo:**
```bash
node scripts/test-photos-api.js 1ABC123xyz... AIzaSyD4zD2JMJVUMDNH_3ivWnwAnGhqOdyB5r0
```

Este script te dirá:
- ✅ Si la conexión funciona
- 📸 Cuántas fotos encuentra
- 📋 Lista de todas las fotos

---

## ✅ Checklist Rápido

Marca cada punto cuando lo verifiques:

- [ ] La carpeta en Google Drive está compartida como **"Cualquiera con el enlace"**
- [ ] Las fotos están dentro de la carpeta (no en subcarpetas)
- [ ] Las fotos son archivos de imagen (JPG, PNG, GIF, etc.)
- [ ] Las fotos NO están en la papelera
- [ ] La variable `GOOGLE_DRIVE_PHOTOS_FOLDER_ID` está configurada
- [ ] El Folder ID es correcto (cópialo de la URL de Google Drive)
- [ ] Si estás en desarrollo: el archivo `.env.local` existe y tiene las variables
- [ ] Si estás en producción: las variables están en Cloudflare Pages
- [ ] Reiniciaste el servidor después de cambiar `.env.local` (solo desarrollo)
- [ ] Redesplegaste después de cambiar variables en Cloudflare (solo producción)

---

## 🆘 Si Nada Funciona

1. **Ejecuta el script de prueba:**
```bash
npm run test:photos
```

2. **Comparte el resultado:**
   - ¿Qué mensaje aparece?
   - ¿Cuántas fotos encuentra?
   - ¿Hay algún error?

3. **Verifica en Google Drive:**
   - ¿Puedes ver las fotos en Google Drive?
   - ¿La carpeta está compartida públicamente?
   - ¿El Folder ID es correcto?

4. **Verifica la consola del navegador:**
   - ¿Qué mensajes aparecen?
   - ¿Hay algún error en rojo?

---

## 📝 Notas Importantes

- ⏱️ Google Drive puede tardar 2-3 minutos en procesar fotos nuevas
- 🔄 La página se actualiza automáticamente cada 15 segundos
- 🚫 No uses caché del navegador: presiona `Ctrl+Shift+R` (Windows/Linux) o `Cmd+Shift+R` (Mac)
- 📁 Las fotos deben estar directamente en la carpeta, no en subcarpetas




