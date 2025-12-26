# 📧 Configurar Email en Desarrollo Local

Para recibir emails reales en desarrollo local, necesitas configurar Resend API.

## Pasos Rápidos:

### 1. Crear cuenta en Resend (si no tienes)
- Ve a https://resend.com
- Crea una cuenta gratuita (tiene 100 emails/día gratis)

### 2. Obtener API Key
- Ve a https://resend.com/api-keys
- Haz clic en "Create API Key"
- Copia la clave (empieza con `re_`)

### 3. Crear archivo `.env.local`
En la raíz del proyecto, crea un archivo llamado `.env.local`:

```bash
cd /Users/alko/projects/portfolio-nicol
touch .env.local
```

### 4. Agregar la API Key
Abre `.env.local` y agrega:

```env
RESEND_API_KEY=re_tu_api_key_aqui
```

**Ejemplo:**
```env
RESEND_API_KEY=re_abc123xyz456...
```

### 5. Reiniciar el servidor
```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

## Verificar que Funciona

1. Abre el formulario de contacto en http://localhost:3000/contacto
2. Completa y envía el formulario
3. Deberías recibir el email en `alancorcos@hotmail.com`

## Notas

- El email se envía desde `onboarding@resend.dev` (dominio de prueba de Resend)
- El email llega a `alancorcos@hotmail.com` (configurado para pruebas)
- En producción, cambiará automáticamente a `nicool.mena@gmail.com`

## Si No Funciona

1. Verifica que `.env.local` existe y tiene la API Key correcta
2. Verifica que reiniciaste el servidor después de crear `.env.local`
3. Revisa la consola del servidor para ver errores
4. Verifica que la API Key sea válida en https://resend.com/api-keys


