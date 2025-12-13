# 🔄 Migración a Cloudflare R2 para Persistencia Permanente

## Estado Actual

Actualmente los archivos se almacenan en memoria del servidor (Map en Node.js). Esto funciona pero:
- ✅ Los archivos son compartidos entre todos los usuarios
- ❌ Se pierden al reiniciar el servidor
- ❌ Limitado por la memoria del servidor

## Migración a Cloudflare R2 + D1

Para persistencia permanente y escalable:

### Paso 1: Habilitar R2 y D1

1. Ve a Cloudflare Dashboard > R2
2. Crea un bucket: `portfolio-files`
3. Ve a Cloudflare Dashboard > D1
4. Crea una base de datos: `portfolio-db`

### Paso 2: Configurar Wrangler

Actualiza `wrangler.toml`:

```toml
name = "portfolio-nicol"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".next"

[[r2_buckets]]
binding = "FILES_BUCKET"
bucket_name = "portfolio-files"

[[d1_databases]]
binding = "DB"
database_name = "portfolio-db"
database_id = "tu-database-id"
```

### Paso 3: Crear Schema D1

```sql
CREATE TABLE files (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  uploaded_at INTEGER NOT NULL
);
```

### Paso 4: Actualizar API Routes

Ver `app/api/upload/route.ts` y `app/api/files/*/route.ts` para ejemplos de integración con R2 y D1.

## Solución Temporal Actual

La solución actual funciona para desarrollo y testing. Los archivos se comparten entre usuarios mientras el servidor esté activo.

