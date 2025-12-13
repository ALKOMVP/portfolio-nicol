# Portfolio Nicol Mena - Acrobacia y Circo

Portfolio profesional para artista de acrobacia y circo, construido con Next.js y React.

## Características

- 🎬 **Página de Inicio**: Video de fondo impactante
- 🎥 **Videos**: Galería con opción de cargar desde computadora
- 📸 **Fotografía**: Galería de imágenes con carga desde computadora
- 🎪 **Experiencia**: Timeline de eventos, shows y competencias
- 👤 **About**: Biografía y formación profesional
- 📧 **Contacto**: Formulario de contacto completo

## Tecnologías

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Diseño moderno con efectos glassmorphism y gradientes animados

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Producción

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
portfolio-nicol/
├── app/
│   ├── page.tsx          # Página de inicio con video
│   ├── videos/           # Página de videos
│   ├── fotografia/       # Página de fotografías
│   ├── experiencia/      # Página de experiencia
│   ├── about/            # Página sobre mí
│   ├── contacto/         # Página de contacto
│   ├── layout.tsx        # Layout principal
│   └── globals.css       # Estilos globales
├── components/
│   └── Navigation.tsx    # Componente de navegación
└── public/
    └── videos/           # Videos públicos
```

## Configuración del Formulario de Contacto

Para que el formulario de contacto funcione correctamente:

1. Renombra `app/api/contact/route.example.ts` a `route.ts`
2. Configura tu servicio de email preferido (SendGrid, Resend, Nodemailer, etc.)
3. Actualiza el email de destino en el código (actualmente: `nicol@portfolio.com`)
4. Configura las variables de entorno necesarias en un archivo `.env.local`

Ejemplo de variables de entorno:
```
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-contraseña-de-aplicacion
```

## Notas

- El video de fondo debe estar en `public/videos/background-video.mov`
- Actualiza los datos de contacto en `app/contacto/page.tsx` con tu información real

