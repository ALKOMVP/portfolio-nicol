# 🌐 Guía: Verificar Dominio en Resend

Esta guía te permitirá enviar emails a cualquier dirección, no solo a tu propia cuenta.

## 📋 Requisitos Previos

- Tener acceso al DNS de tu dominio (ej: `nicolmena.com`)
- Tener cuenta en Resend (https://resend.com)
- Tener API Key de Resend

## 🚀 Pasos para Verificar el Dominio

### Paso 1: Agregar Dominio en Resend

1. Ve a https://resend.com/domains
2. Haz clic en el botón **"Add Domain"** o **"Add"**
3. Ingresa tu dominio (ej: `nicolmena.com`)
   - ⚠️ **NO** incluyas `www.` ni `http://` ni `https://`
   - Solo el dominio: `nicolmena.com`
4. Haz clic en **"Add"** o **"Continue"**

### Paso 2: Obtener los Registros DNS

Después de agregar el dominio, Resend te mostrará varios registros DNS que necesitas agregar. Normalmente son:

1. **TXT Record** para verificación SPF
2. **TXT Record** para verificación DKIM
3. **CNAME Record** para tracking (opcional)

Ejemplo de lo que verás:
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: resend._domainkey
Value: [una clave larga de DKIM]

Type: CNAME
Name: resend
Value: resend.com
```

### Paso 3: Agregar Registros DNS en tu Proveedor

Necesitas agregar estos registros donde administras tu DNS. Esto depende de dónde esté alojado tu dominio:

#### Si tu dominio está en Cloudflare:

1. Ve a Cloudflare Dashboard
2. Selecciona tu dominio
3. Ve a **DNS** > **Records**
4. Haz clic en **"Add record"**
5. Para cada registro que Resend te dio:
   - Selecciona el **Type** (TXT o CNAME)
   - En **Name**, ingresa el nombre (ej: `@` o `resend._domainkey`)
   - En **Content/Value**, pega el valor que Resend te dio
   - Haz clic en **"Save"**
6. Repite para todos los registros

#### Si tu dominio está en otro proveedor (GoDaddy, Namecheap, etc.):

1. Inicia sesión en tu proveedor de dominio
2. Busca la sección de **DNS** o **DNS Management**
3. Agrega cada registro que Resend te proporcionó
4. Guarda los cambios

### Paso 4: Esperar la Verificación

1. Vuelve a https://resend.com/domains
2. Verás tu dominio con estado **"Pending"** o **"Verifying"**
3. La verificación puede tardar desde unos minutos hasta 24 horas
4. Una vez verificado, el estado cambiará a **"Verified"** ✅

### Paso 5: Actualizar el Código

Una vez que el dominio esté verificado, actualiza el código:

#### En `app/api/contact/route.ts`:
```typescript
from: 'contacto@nicolmena.com', // Tu dominio verificado
to: 'alancorcos@hotmail.com', // Ahora puedes enviar a cualquier email
```

#### En `functions/api/contact.ts`:
```typescript
from: 'contacto@nicolmena.com', // Tu dominio verificado
to: 'nicool.mena@gmail.com', // Email del cliente
```

### Paso 6: Probar

1. Reinicia el servidor si es necesario
2. Envía un mensaje desde el formulario
3. Verifica que llegue al email de destino

## 🔍 Verificar Estado de los Registros DNS

Si la verificación tarda mucho, puedes verificar que los registros estén correctos:

### Usando herramientas online:

1. **MXToolbox**: https://mxtoolbox.com/TXTLookup.aspx
   - Ingresa `nicolmena.com` y busca registros TXT
   - Deberías ver los registros de Resend

2. **DNS Checker**: https://dnschecker.org
   - Verifica que los registros se propaguen globalmente

## ⚠️ Problemas Comunes

### "Domain verification failed"
- Verifica que los registros DNS estén correctos
- Espera más tiempo (puede tardar hasta 24 horas)
- Asegúrate de que no haya espacios extra en los valores

### "DNS records not found"
- Verifica que guardaste los cambios en tu proveedor DNS
- Espera a que se propaguen (puede tardar minutos u horas)
- Verifica que el nombre del registro sea exacto (ej: `resend._domainkey`)

### "Still pending after 24 hours"
- Contacta el soporte de Resend
- Verifica que los registros DNS estén correctos usando las herramientas online

## 📝 Notas Importantes

- **Una vez verificado**, puedes usar cualquier email con ese dominio como `from`
- Ejemplos válidos: `contacto@nicolmena.com`, `noreply@nicolmena.com`, `info@nicolmena.com`
- **Puedes enviar a cualquier email** una vez verificado el dominio
- El dominio debe estar activo y accesible

## 🎯 Resumen Rápido

1. ✅ Agrega dominio en Resend
2. ✅ Copia los registros DNS que te da Resend
3. ✅ Agrega esos registros en tu proveedor DNS
4. ✅ Espera la verificación (minutos a horas)
5. ✅ Actualiza el código con el dominio verificado
6. ✅ ¡Listo! Puedes enviar a cualquier email

## 📞 Soporte

Si tienes problemas:
- Documentación de Resend: https://resend.com/docs
- Soporte de Resend: support@resend.com
- Comunidad: https://resend.com/discord

