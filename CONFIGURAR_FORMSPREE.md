# 🚀 Configurar Formspree en 2 Minutos

## Pasos Rápidos:

### 1. Crear cuenta en Formspree
- Ve a https://formspree.io
- Haz clic en "Sign Up" (puedes usar Google/GitHub)
- Es gratis (50 envíos/mes)

### 2. Crear un formulario
- Una vez dentro, haz clic en **"New Form"**
- Nombre: "Contacto Portfolio" (o el que quieras)
- Email de destino: `alancorcos@hotmail.com`
- Haz clic en **"Create Form"**

### 3. Copiar la URL
- Formspree te dará una URL como:
  ```
  https://formspree.io/f/xxxxxxxxxx
  ```
- Copia esa URL completa

### 4. Agregar en `.env.local`
Crea o edita el archivo `.env.local` en la raíz del proyecto:

```env
FORMSPREE_URL=https://formspree.io/f/tu_id_aqui
```

**Ejemplo:**
```env
FORMSPREE_URL=https://formspree.io/f/xjvqkzpn
```

### 5. Reiniciar el servidor
```bash
# Detén el servidor (Ctrl+C)
npm run dev
```

## ✅ ¡Listo!

Ahora cuando alguien envíe el formulario:
- ✅ El email llegará a `alancorcos@hotmail.com`
- ✅ No necesitas verificar dominio
- ✅ No necesitas API keys complicadas
- ✅ Funciona inmediatamente

## 📝 Notas

- **Gratis**: 50 envíos/mes
- **Spam protection**: Incluido automáticamente
- **Sin configuración DNS**: No necesitas tocar DNS
- **Funciona en local y producción**: Mismo código

## 🔄 Para Cambiar el Email de Destino

1. Ve a https://formspree.io/forms
2. Haz clic en tu formulario
3. Cambia el "Send submissions to"
4. Guarda

¡Eso es todo! No necesitas cambiar código.

