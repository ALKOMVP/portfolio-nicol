'use client';

import { useState, FormEvent } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactoPage() {
  const { t } = useLanguage();
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

    try {
      // Detectar si estamos en desarrollo local o producción
      const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      
      let response: Response;
      
      if (isLocalhost) {
        // En desarrollo local, llamar directamente a Formspree
        const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL || 'https://formspree.io/f/xeeqaweg';
        response = await fetch(formspreeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono || '',
            asunto: formData.asunto,
            mensaje: formData.mensaje,
            _subject: `Nuevo contacto: ${formData.asunto}`,
          }),
        });
      } else {
        // En producción, usar la función de Cloudflare Pages
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      
      if (!response.ok) throw new Error('Error al enviar');
      
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
      });
    } catch (error) {
      console.error('Error enviando formulario:', error);
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
            {t.contact.title}
          </h1>
          <p className="text-gray-400 text-lg">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Formulario */}
        <div className="glass rounded-2xl p-8 md:p-12 hover-glow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                {t.contact.name}
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                placeholder={t.contact.name}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t.contact.email}
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
                {t.contact.phone}
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
                placeholder="+55 21 99999-9999"
              />
            </div>

            <div>
              <label htmlFor="asunto" className="block text-sm font-medium mb-2">
                {t.contact.subject}
              </label>
              <select
                id="asunto"
                name="asunto"
                required
                value={formData.asunto}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors"
              >
                <option value="">{t.contact.selectSubject}</option>
                <option value="show">{t.contact.subjects.show}</option>
                <option value="workshop">{t.contact.subjects.workshop}</option>
                <option value="colaboracion">{t.contact.subjects.collaboration}</option>
                <option value="prensa">{t.contact.subjects.press}</option>
                <option value="otro">{t.contact.subjects.other}</option>
              </select>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
                {t.contact.message}
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={6}
                value={formData.mensaje}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors resize-none"
                placeholder={t.contact.message}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
                {t.contact.success}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300">
                {t.contact.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-white/10 hover:bg-white/20 rounded-lg hover-glow font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t.contact.sending : t.contact.send}
            </button>
          </form>

          {/* Información de contacto adicional */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4 font-medium">
              {t.contact.professionalContact}
            </p>
            <div className="space-y-3 text-gray-300 mb-6">
              <p className="flex items-center gap-2">
                <span>📧</span>
                <span className="font-medium">Email:</span>{' '}
                <a href="mailto:nicool.mena@gmail.com" className="hover:text-white transition-colors">
                  nicool.mena@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>📱</span>
                <span className="font-medium">Instagram:</span>{' '}
                <a href="https://www.instagram.com/ni_colmena/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  @ni_colmena
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>🌐</span>
                <span className="font-medium">Sitio web:</span>{' '}
                <a href="https://www.nicolmena.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  www.nicolmena.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>💬</span>
                <span className="font-medium">WhatsApp:</span>{' '}
                <a href="https://wa.me/5521993965343" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +55 21 99396-5343
                </a>
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-3 font-medium">
                {t.contact.availableFor}
              </p>
              <ul className="space-y-2 text-gray-300">
                {t.contact.availableItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
