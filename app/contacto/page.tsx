'use client';

import { useState, FormEvent } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // TODO: Configurar el endpoint de tu API aquí
    // Ejemplo de implementación:
    // 1. Crear un archivo app/api/contact/route.ts
    // 2. Usar un servicio como SendGrid, Resend, o Nodemailer para enviar emails
    // 3. El email llegará a: nicol@portfolio.com (configurar en el servicio de email)
    try {
      // Simulación - Reemplazar con llamada real a API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Error al enviar');
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Contacto
          </h1>
          <p className="text-gray-400 text-lg">
            ¿Tienes un proyecto en mente? ¡Hablemos!
          </p>
        </div>

        {/* Formulario */}
        <div className="glass rounded-2xl p-8 md:p-12 hover-glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                placeholder="+54 11 1234-5678"
              />
            </div>

            <div>
              <label htmlFor="asunto" className="block text-sm font-medium mb-2">
                Asunto *
              </label>
              <select
                id="asunto"
                name="asunto"
                required
                value={formData.asunto}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
              >
                <option value="">Selecciona un asunto</option>
                <option value="show">Contratación para Show</option>
                <option value="workshop">Workshop o Clase</option>
                <option value="colaboracion">Colaboración</option>
                <option value="prensa">Prensa y Medios</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
                Mensaje *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={6}
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors resize-none"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
                ¡Mensaje enviado con éxito! Te contactaré pronto.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg hover-glow font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>

          {/* Información de contacto adicional */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">
              También puedes contactarme directamente:
            </p>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-medium">Email:</span>{' '}
                <a href="mailto:nicol@portfolio.com" className="hover:text-white transition-colors">
                  nicol@portfolio.com
                </a>
              </p>
              <p>
                <span className="font-medium">Teléfono:</span>{' '}
                <a href="tel:+541112345678" className="hover:text-white transition-colors">
                  +54 11 1234-5678
                </a>
              </p>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              * Actualiza estos datos de contacto con tu información real
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

