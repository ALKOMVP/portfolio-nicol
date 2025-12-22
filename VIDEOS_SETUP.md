# 🎥 Configuración de Videos para Cloudflare Pages

## ⚠️ Problema

Los videos son demasiado grandes (>25MB) para Cloudflare Pages. Cloudflare Pages tiene un límite de 25MB por archivo.

## ✅ Soluciones

### Opción 1: Cloudflare R2 (Recomendado - Gratis hasta 10GB)

1. **Crear bucket en R2:**
   ```bash
   wrangler r2 bucket create portfolio-videos
   ```

2. **Subir videos:**
   ```bash
   wrangler r2 object put portfolio-videos/background-video.mov --file=public/videos/background-video.mov
   wrangler r2 object put portfolio-videos/cabaret-video.mov --file=public/videos/cabaret-video.mov
   ```

3. **Crear dominio público para R2:**
   - Ve a Cloudflare Dashboard > R2 > Manage R2 API Tokens
   - Crea un dominio público para el bucket
   - Obtendrás una URL como: `https://pub-xxxxx.r2.dev/`

4. **Actualizar las URLs en el código:**
   - Reemplaza `/videos/background-video.mov` con la URL de R2
   - Reemplaza `/videos/cabaret-video.mov` con la URL de R2

### Opción 2: Optimizar Videos

Reducir el tamaño de los videos usando ffmpeg:

```bash
# Instalar ffmpeg si no lo tienes
# macOS: brew install ffmpeg

# Optimizar videos
ffmpeg -i public/videos/background-video.mov -vcodec libx264 -crf 28 -preset slow -vf scale=1920:-1 -acodec aac -b:a 128k public/videos/background-video-optimized.mp4

ffmpeg -i public/videos/cabaret-video.mov -vcodec libx264 -crf 28 -preset slow -vf scale=1920:-1 -acodec aac -b:a 128k public/videos/cabaret-video-optimized.mp4
```

Luego actualiza las referencias en el código.

### Opción 3: Usar CDN Externo

Sube los videos a:
- YouTube (privado, embed)
- Vimeo
- Cloudinary
- AWS S3
- Otro servicio de almacenamiento

Y actualiza las URLs en el código.

## 🔧 Implementación Rápida (R2)

Si quieres usar R2 ahora mismo:

1. Crea el bucket:
   ```bash
   wrangler r2 bucket create portfolio-videos
   ```

2. Sube los videos:
   ```bash
   wrangler r2 object put portfolio-videos/background-video.mov --file=public/videos/background-video.mov --content-type="video/quicktime"
   wrangler r2 object put portfolio-videos/cabaret-video.mov --file=public/videos/cabaret-video.mov --content-type="video/quicktime"
   ```

3. Configura dominio público en Cloudflare Dashboard

4. Actualiza `app/page.tsx` con las nuevas URLs


