export async function onRequestPost(context: {
  request: Request;
  env: {
    FORMSPREE_URL?: string;
  };
}) {
  try {
    const body = await context.request.json();
    const { nombre, email, telefono, asunto, mensaje } = body;

    // Validar campos requeridos
    if (!nombre || !email || !asunto || !mensaje) {
      return new Response(
        JSON.stringify({ error: 'Faltan campos requeridos' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Usar Formspree (solución simple, sin verificar dominio)
    const formspreeUrl = context.env.FORMSPREE_URL;

    if (formspreeUrl) {
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
        return new Response(
          JSON.stringify({ error: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Email enviado exitosamente con Formspree');
    } else {
      console.error('FORMSPREE_URL no configurada en Cloudflare Pages');
      return new Response(
        JSON.stringify({ error: 'Formulario no configurado' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Mensaje enviado correctamente' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error procesando contacto:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

