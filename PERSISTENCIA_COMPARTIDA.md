# 📦 Persistencia Compartida de Archivos

## Estado Actual

Actualmente, los videos y fotos se guardan en **IndexedDB** del navegador del usuario. Esto significa que:

✅ **Funciona:**
- Los archivos persisten entre sesiones del mismo usuario
- No se pierden al recargar la página
- Funciona completamente offline

❌ **Limitaciones:**
- Solo el usuario que subió los archivos puede verlos
- No se comparten entre diferentes navegadores/dispositivos
- No se comparten entre diferentes usuarios

## Para Compartir Archivos Entre Todos los Usuarios

Si necesitas que cualquier usuario que visite el sitio pueda ver los archivos cargados por otros, necesitarás implementar un backend. Aquí hay opciones:

### Opción 1: Cloudflare R2 + API Routes (Recomendado)

1. **Habilitar R2 en Cloudflare:**
   - Ve a Cloudflare Dashboard > R2
   - Crea un bucket para almacenar archivos

2. **Crear API Routes en Next.js:**
   - `app/api/upload/route.ts` - Para subir archivos
   - `app/api/files/route.ts` - Para listar archivos
   - `app/api/files/[id]/route.ts` - Para obtener/eliminar archivos

3. **Actualizar las páginas:**
   - Modificar `app/videos/page.tsx` y `app/fotografia/page.tsx`
   - Reemplazar IndexedDB con llamadas a la API

### Opción 2: Cloudinary (Servicio externo)

1. Crear cuenta en Cloudinary
2. Usar su SDK para subir archivos
3. Guardar URLs en una base de datos (Cloudflare D1 o similar)

### Opción 3: Base de Datos + Almacenamiento

1. **Cloudflare D1** (SQLite) para metadatos
2. **Cloudflare R2** para archivos
3. API Routes para gestionar todo

## Implementación Rápida con R2

Si quieres implementar persistencia compartida ahora:

```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  // Subir a R2 usando Wrangler
  // Guardar URL en D1 o retornar URL pública
  
  return NextResponse.json({ url: '...', id: '...' });
}
```

## Nota Importante

La implementación actual con IndexedDB es perfecta para:
- Portfolios personales
- Galerías privadas
- Demos y prototipos

Si necesitas compartir archivos públicamente, contacta para implementar una de las opciones anteriores.

