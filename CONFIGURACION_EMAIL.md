# 📧 Configuración del Formulario de Contacto

## Opción 1: Usar Resend (Recomendado)

Resend es un servicio moderno y fácil de usar para enviar emails desde aplicaciones.

### Pasos:

1. **Crear cuenta en Resend:**
   - Ve a https://resend.com
   - Crea una cuenta gratuita
   - Verifica tu dominio o usa el dominio de prueba

2. **Obtener API Key:**
   - Ve a https://resend.com/api-keys
   - Crea una nueva API Key
   - Copia la clave

3. **Configurar en Cloudflare Pages:**
   - Ve a Cloudflare Dashboard > tu proyecto > Settings > Environment Variables
   - Agrega la variable:
     - **Nombre**: `RESEND_API_KEY`
     - **Valor**: tu API key de Resend
     - **Environment**: Production (y Preview si quieres)

4. **Redesplegar:**
   - Ve a Deployments > Retry deployment
   - O haz commit y push de los cambios

### Configurar dominio de envío:

Para usar `contacto@nicolmena.com` como remitente:

1. Ve a Resend Dashboard > Domains
2. Agrega tu dominio `nicolmena.com`
3. Configura los registros DNS que Resend te proporciona
4. Espera a que se verifique el dominio

Mientras tanto, puedes usar el dominio de prueba de Resend: `onboarding@resend.dev`

## Opción 2: Otros Servicios

### SendGrid

1. Crea cuenta en SendGrid
2. Obtén API Key
3. Configura variable `SENDGRID_API_KEY` en Cloudflare Pages
4. Actualiza `functions/api/contact.ts` para usar SendGrid

### Nodemailer con SMTP

1. Configura un servidor SMTP (Gmail, Outlook, etc.)
2. Configura variables de entorno:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
3. Actualiza `functions/api/contact.ts` para usar Nodemailer

## Notas

- En desarrollo local, el formulario solo mostrará los datos en la consola
- En producción, los emails se enviarán automáticamente a `nicool.mena@gmail.com`
- El remitente del email será el email del usuario que completa el formulario (reply_to)



