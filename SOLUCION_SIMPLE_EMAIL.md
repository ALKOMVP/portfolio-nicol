# 📧 Solución Simple para Emails - Formspree

Esta solución NO requiere verificar dominios ni configurar API keys complicadas.

## 🚀 Opción 1: Formspree (Recomendado - Más Simple)

### Pasos:

1. **Crear cuenta en Formspree:**
   - Ve a https://formspree.io
   - Crea una cuenta gratuita (50 envíos/mes gratis)
   - Haz clic en "New Form"

2. **Configurar el formulario:**
   - Nombre del formulario: "Contacto Portfolio"
   - Email de destino: `alancorcos@hotmail.com`
   - Formspree te dará una URL como: `https://formspree.io/f/xxxxxxxxxx`

3. **Copiar la URL del formulario:**
   - Copia la URL completa que Formspree te da

4. **Actualizar el código:**
   - El código ya está actualizado para usar Formspree
   - Solo necesitas agregar la URL en `.env.local`

### Configuración:

Crea o edita `.env.local`:
```env
FORMSPREE_URL=https://formspree.io/f/tu_id_aqui
```

¡Eso es todo! No necesitas API keys ni verificar dominios.

---

## 🚀 Opción 2: EmailJS (Alternativa)

Si prefieres EmailJS:

1. Ve a https://www.emailjs.com
2. Crea cuenta gratuita
3. Configura un servicio de email (Gmail, Outlook, etc.)
4. Crea un template
5. Obtén tu Public Key y Service ID
6. Actualiza el código para usar EmailJS

---

## ✅ Ventajas de Formspree

- ✅ No requiere verificar dominio
- ✅ No requiere API keys complicadas
- ✅ Configuración en 2 minutos
- ✅ 50 envíos/mes gratis
- ✅ Spam protection incluido
- ✅ Funciona inmediatamente

## 📝 Nota

El código ya está preparado para usar Formspree. Solo necesitas:
1. Crear cuenta en Formspree
2. Crear un formulario
3. Agregar la URL en `.env.local`
4. ¡Listo!



