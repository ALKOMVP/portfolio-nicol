# 🔑 Solucionar Error de API Key de Google

## Error Actual

```
API key not valid. Please pass a valid API key.
```

Esto significa que la API key en `.env.local` no es válida o no tiene los permisos correctos.

## Solución Rápida

### Opción 1: Crear una Nueva API Key

1. **Ve a Google Cloud Console:**
   - https://console.cloud.google.com/

2. **Selecciona o crea un proyecto:**
   - Si no tienes proyecto, haz clic en "Select a project" > "New Project"
   - Dale un nombre (ej: "portfolio-nicol")

3. **Habilita Google Drive API:**
   - Ve a **APIs & Services** > **Library**
   - Busca "Google Drive API"
   - Haz clic en **Enable**

4. **Crea una nueva API Key:**
   - Ve a **APIs & Services** > **Credentials**
   - Haz clic en **Create Credentials** > **API Key**
   - Se creará una nueva API Key
   - **Copia la clave** (empieza con `AIza...`)

5. **Actualizar `.env.local`:**
   ```env
   GOOGLE_API_KEY=tu_nueva_api_key_aqui
   ```

6. **Reiniciar el servidor:**
   ```bash
   # Detén el servidor (Ctrl+C)
   npm run dev
   ```

### Opción 2: Verificar la API Key Actual

Si ya tienes una API Key:

1. **Verifica que Google Drive API esté habilitada:**
   - Ve a https://console.cloud.google.com/
   - Selecciona tu proyecto
   - Ve a **APIs & Services** > **Library**
   - Busca "Google Drive API"
   - Debe decir **"Enabled"** (si dice "Enable", haz clic)

2. **Verifica que la API Key tenga permisos:**
   - Ve a **APIs & Services** > **Credentials**
   - Haz clic en tu API Key
   - En "API restrictions", verifica que esté permitida para "Google Drive API"
   - O déjala sin restricciones para pruebas

3. **Verifica que la API Key esté en `.env.local`:**
   - Abre `.env.local`
   - Verifica que `GOOGLE_API_KEY` tenga el valor correcto
   - No debe tener espacios ni comillas

### Opción 3: Usar Sin API Key (Limitado)

Puedes probar sin API Key, pero tendrás límites:

1. **Elimina o comenta la línea en `.env.local`:**
   ```env
   # GOOGLE_API_KEY=...
   ```

2. **Reinicia el servidor**

⚠️ **Nota:** Sin API Key, Google Drive puede limitar las peticiones y puede no funcionar bien.

## Verificar que Funciona

1. Abre http://localhost:3000/fotografia
2. Abre la consola del navegador (F12)
3. Ve a la pestaña **Network**
4. Busca la petición a `photos`
5. Debería mostrar las fotos en lugar del error

## Errores Comunes

### "API key not valid"
- La API Key es incorrecta o fue revocada
- Solución: Crea una nueva API Key

### "API key not created"
- No hay API Key en `.env.local`
- Solución: Agrega `GOOGLE_API_KEY=tu_key` en `.env.local`

### "Google Drive API has not been used"
- Google Drive API no está habilitada
- Solución: Habilita Google Drive API en Google Cloud Console

### "403 Forbidden"
- La carpeta no está compartida públicamente
- Solución: Comparte la carpeta como "Cualquiera con el enlace"

## 📝 Ejemplo de `.env.local` Correcto

```env
# Google Drive - Fotos
GOOGLE_DRIVE_PHOTOS_FOLDER_ID=1xybpLe_pRDU0Unf3j3XCfJtJ0LgpGJ8d

# Google Drive - Videos
GOOGLE_DRIVE_FOLDER_ID=tu_folder_id_de_videos

# Google Drive API Key
GOOGLE_API_KEY=AIzaSyD4zD2JMJVUMDNH_3ivWnwAnGhqOdyB5r0
```

⚠️ **Importante:** 
- No incluyas espacios alrededor del `=`
- No uses comillas alrededor del valor
- No compartas tu `.env.local` (está en `.gitignore`)


