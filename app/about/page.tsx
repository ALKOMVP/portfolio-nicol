'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            {t.about.title}
          </h1>
        </div>

        {/* Contenido */}
        <div className="glass rounded-2xl p-8 md:p-12 hover-glow">
          <div className="prose prose-invert max-w-none">
            {/* Mini Bio */}
            <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'mb-6' : ''}`}>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {t.about.miniBio}
              </p>
            </div>

            {/* Bio Completa (Expandible) */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-lg md:text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                  {t.about.fullBio.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Botón Ver más/menos */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleToggle}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg hover-glow font-medium transition-all flex items-center gap-2 group"
              >
                <span>{isExpanded ? t.about.seeLess : t.about.seeMore}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
