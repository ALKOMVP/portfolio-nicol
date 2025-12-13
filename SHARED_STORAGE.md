# 📦 Almacenamiento Compartido - Implementado

## ✅ Estado Actual

Se ha implementado persistencia compartida usando **Cloudflare Pages Functions** y **Cloudflare KV**.

### Cómo Funciona

1. **Subida de archivos**: Los archivos se suben a través de `/api/upload` y se almacenan en Cloudflare KV como base64
2. **Listado**: Los archivos se obtienen desde `/api/files/videos` o `/api/files/photos`
3. **Visualización**: Los archivos se sirven desde `/api/files/[id]`
4. **Eliminación**: Los archivos se eliminan desde `/api/files/[id]` con método DELETE

### Limitaciones

⚠️ **Tamaño máximo por archivo: 20MB**
- Cloudflare KV tiene un límite de 25MB por valor
- Se ha configurado un límite de 20MB para dejar margen
- Archivos más grandes mostrarán un error al intentar subirlos

### Sincronización

- Los archivos se cargan automáticamente al abrir las páginas de Videos o Fotografía
- Se recargan automáticamente cada 30 segundos para ver nuevos archivos subidos por otros usuarios
- Los archivos son **compartidos entre todos los usuarios** que visiten el sitio

### Estructura de Archivos

```
functions/
  api/
    upload.ts          # POST /api/upload - Subir archivos
    files/
      [type].ts        # GET /api/files/videos o /api/files/photos
      [id].ts          # GET /api/files/[id] - Obtener archivo
                       # DELETE /api/files/[id] - Eliminar archivo
```

### Próximos Pasos (Opcional)

Para archivos más grandes (>20MB), se puede migrar a Cloudflare R2:
1. Habilitar R2 en Cloudflare Dashboard
2. Crear bucket `portfolio-files`
3. Actualizar las funciones para usar R2 en lugar de KV

## 🚀 Sitio Desplegado

**URL:** https://eb31624f.portfolio-nicol.pages.dev

Los archivos ahora son compartidos entre todos los usuarios.

