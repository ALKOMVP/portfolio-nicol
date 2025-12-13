// Este es un archivo de ejemplo. 
// Renómbralo a route.ts y configura tu servicio de email preferido.
// Opciones populares: SendGrid, Resend, Nodemailer, etc.

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

    // Aquí implementarías el envío del email usando tu servicio preferido
    // Ejemplo con Nodemailer:
    /*
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      // Configuración de tu proveedor de email
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nicol@portfolio.com', // Email donde quieres recibir los mensajes
      subject: `Contacto Portfolio: ${asunto}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    */

    // Por ahora, solo retornamos éxito
    return NextResponse.json(
      { message: 'Mensaje enviado con éxito' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}

