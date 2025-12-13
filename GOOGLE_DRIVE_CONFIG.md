# 🔧 Configuración de Google Drive

## Variables de Entorno Necesarias

Para que la integración con Google Drive funcione, necesitas configurar estas variables en Cloudflare Pages:

1. **GOOGLE_DRIVE_FOLDER_ID**: `18ef9eP5TwBPEiQxxF8yRtKsZJKj18ZtV`
2. **GOOGLE_API_KEY**: `AIzaSyD4zD2JMJVUMDNH_3ivWnwAnGhqOdyB5r0`

## 📝 Pasos para Configurar en Cloudflare Pages

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Selecciona tu cuenta
3. Ve a **Pages** > **portfolio-nicol**
4. Haz clic en **Settings** (Configuración)
5. Ve a la sección **Environment Variables**
6. Haz clic en **Add variable** para cada variable:

   **Variable 1:**
   - **Variable name**: `GOOGLE_DRIVE_FOLDER_ID`
   - **Value**: `1U2SPoBhdyh80mQYwIyHixJ4FK-jcrOl6`
   - **Environment**: Production (y Preview si quieres)

   **Variable 2:**
   - **Variable name**: `GOOGLE_API_KEY`
   - **Value**: `AIzaSyD4zD2JMJVUMDNH_3ivWnwAnGhqOdyB5r0`
   - **Environment**: Production (y Preview si quieres)

7. Haz clic en **Save**
8. **Redespliega** el proyecto para que las variables surtan efecto

## ✅ Verificación

Una vez configuradas las variables y redesplegado:
- Ve a la página de Videos en tu sitio
- Deberías ver una sección "Videos de Google Drive" con los videos de tu carpeta
- Los videos se cargarán automáticamente desde Google Drive

## 🔒 Seguridad

- Las variables de entorno están seguras en Cloudflare
- La API Key está restringida a solo Google Drive API (recomendado)
- Los videos deben estar en una carpeta pública o compartida con "Cualquiera con el enlace"

