import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, asunto, mensaje } = body;

    // Validar campos requeridos
    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Usar Formspree (solución simple, sin verificar dominio)
    const formspreeUrl = process.env.FORMSPREE_URL;

    if (formspreeUrl) {
      try {
        const response = await fetch(formspreeUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre,
            email,
            telefono: telefono || '',
            asunto,
            mensaje,
            _subject: `Nuevo contacto: ${asunto}`,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Error enviando email con Formspree:', errorData);
          return NextResponse.json(
            { error: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' },
            { status: 500 }
          );
        }

        console.log('Email enviado exitosamente con Formspree');
        
        return NextResponse.json(
          { success: true, message: 'Mensaje enviado correctamente' },
          { status: 200 }
        );
      } catch (error) {
        console.error('Error en la petición a Formspree:', error);
        return NextResponse.json(
          { error: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' },
          { status: 500 }
        );
      }
    } else {
      // Si no hay Formspree configurado, mostrar instrucciones
      console.log('⚠️ FORMSPREE_URL no configurada.');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Para configurar Formspree:');
      console.log('1. Ve a https://formspree.io y crea una cuenta');
      console.log('2. Crea un nuevo formulario');
      console.log('3. Configura el email de destino: alancorcos@hotmail.com');
      console.log('4. Copia la URL del formulario');
      console.log('5. Agrega en .env.local: FORMSPREE_URL=tu_url_aqui');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      return NextResponse.json(
        { error: 'Formulario no configurado. Por favor, configura FORMSPREE_URL.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error procesando contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

