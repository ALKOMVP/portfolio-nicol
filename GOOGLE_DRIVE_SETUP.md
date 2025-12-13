# 📁 Integración con Google Drive - Pasos para Implementar

## 📋 Opción 1: Carpeta Pública (Más Simple - Recomendado)

### Paso 1: Preparar Carpeta en Google Drive

1. Abre [Google Drive](https://drive.google.com/)
2. Crea una carpeta nueva o selecciona una existente con tus videos
3. Haz clic derecho en la carpeta > **Share** (Compartir)
4. Cambia el acceso a **"Anyone with the link"** (Cualquiera con el enlace)
5. **Copia el ID de la carpeta** de la URL:
   - La URL se ve así: `https://drive.google.com/drive/folders/1ABC123xyz...`
   - El ID es la parte después de `/folders/` (ej: `1ABC123xyz...`)

### Paso 2: Crear API Key de Google (Opcional pero Recomendado)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Library**
4. Busca "Google Drive API" y haz clic en **Enable**
5. Ve a **APIs & Services** > **Credentials**
6. Haz clic en **Create Credentials** > **API Key**
7. Copia la API Key generada
8. (Opcional) Restringe la API Key a solo Google Drive API para mayor seguridad

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env.local` (NO lo subas a Git):

```env
GOOGLE_DRIVE_FOLDER_ID=tu_folder_id_aqui
GOOGLE_API_KEY=tu_api_key_aqui (opcional pero recomendado)
```

Para producción en Cloudflare Pages:
1. Ve a tu proyecto en Cloudflare Dashboard
2. **Settings** > **Environment Variables**
3. Agrega:
   - `GOOGLE_DRIVE_FOLDER_ID` = tu folder ID
   - `GOOGLE_API_KEY` = tu API key (opcional)

### Paso 4: Implementar Función para Listar Videos

Se creará una función en `functions/api/drive/videos.ts` que:
- Use la API de Google Drive para listar archivos de la carpeta
- Filtre solo videos (MP4, WebM, etc.)
- Retorne URLs directas de descarga

### Paso 5: Actualizar Frontend

Actualizar `app/videos/page.tsx` para:
- Cargar videos desde Google Drive al iniciar
- Mostrar los videos junto con los videos subidos manualmente
- Agregar un toggle o sección separada para "Videos de Google Drive"

---

## 📋 Opción 2: Con Autenticación OAuth (Más Complejo)

### Paso 1: Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombra el proyecto (ej: "portfolio-nicol-drive")

### Paso 2: Habilitar Google Drive API

1. En el menú lateral, ve a **APIs & Services** > **Library**
2. Busca "Google Drive API"
3. Haz clic en **Enable**

### Paso 3: Configurar OAuth Consent Screen

1. Ve a **APIs & Services** > **OAuth consent screen**
2. Selecciona **External** (si no tienes cuenta de Google Workspace)
3. Completa la información:
   - **App name**: Portfolio Nicol Mena
   - **User support email**: Tu email
   - **Developer contact**: Tu email
4. Haz clic en **Save and Continue**
5. En **Scopes**, agrega:
   - `https://www.googleapis.com/auth/drive.readonly` (solo lectura)
6. Haz clic en **Save and Continue**
7. Agrega tu email como **Test user** (si estás en modo testing)
8. Haz clic en **Save and Continue**

### Paso 4: Crear Credenciales OAuth 2.0

1. Ve a **APIs & Services** > **Credentials**
2. Haz clic en **Create Credentials** > **OAuth client ID**
3. Selecciona **Web application**
4. Configura:
   - **Name**: Portfolio Nicol Drive Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (para desarrollo)
     - `https://tu-dominio.pages.dev` (tu dominio de producción)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/google/callback` (para desarrollo)
     - `https://tu-dominio.pages.dev/api/auth/google/callback` (producción)
5. Haz clic en **Create**
6. **Copia el Client ID y Client Secret**

### Paso 5: Compartir Carpeta de Google Drive

1. Abre Google Drive en tu navegador
2. Crea o selecciona la carpeta con los videos
3. Haz clic derecho en la carpeta > **Share**
4. Cambia el acceso a **"Anyone with the link"** o **"Public"**
5. **Copia el ID de la carpeta** de la URL

### Paso 6: Configurar Variables de Entorno

```env
GOOGLE_CLIENT_ID=tu_client_id_aqui
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_DRIVE_FOLDER_ID=tu_folder_id_aqui
GOOGLE_REDIRECT_URI=https://tu-dominio.pages.dev/api/auth/google/callback
```

---

## 🎯 Recomendación

**Usa la Opción 1 (Carpeta Pública)** porque:
- ✅ Más simple de implementar
- ✅ No requiere autenticación del usuario
- ✅ Funciona inmediatamente
- ✅ Menos código y configuración
- ✅ Perfecto para mostrar videos públicos

La Opción 2 (OAuth) solo es necesaria si:
- Necesitas acceso a carpetas privadas
- Quieres que cada usuario vea sus propias carpetas
- Necesitas permisos de escritura

---

## 📝 Notas Importantes

- **Formato de videos**: Asegúrate de que los videos estén en formato compatible (MP4 recomendado)
- **Límites de Google Drive**: Google Drive tiene límites de ancho de banda, considera usar un proxy/CDN para producción
- **Tamaño de archivos**: Los videos muy grandes pueden tardar en cargar
- **URLs directas**: Google Drive genera URLs temporales, necesitarás refrescarlas periódicamente

## 🔧 Próximos Pasos de Implementación

Una vez que tengas el `FOLDER_ID` y opcionalmente la `API_KEY`, puedo implementar:
1. Función de Cloudflare Pages para listar videos de Drive
2. Actualización del frontend para mostrar los videos
3. Integración con el sistema actual de videos subidos manualmente

