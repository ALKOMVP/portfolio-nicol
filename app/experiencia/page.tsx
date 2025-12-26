'use client';

import { useLanguage } from '@/contexts/LanguageContext';

type EventType = 'festival' | 'theater' | 'cultural' | 'convention' | 'research' | 'residency';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  type: EventType;
}

export default function ExperienciaPage() {
  const { t } = useLanguage();
  
  // Usar los eventos de las traducciones con cast de tipo
  const events: Event[] = t.experience.events as Event[];

  const getTypeColor = (type: EventType) => {
    switch (type) {
      case 'festival':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/30';
      case 'theater':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'cultural':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'convention':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'research':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'residency':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTypeLabel = (type: EventType) => {
    return t.experience.types[type];
  };

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            {t.experience.title}
          </h1>
          <p className="text-gray-400 text-lg">
            {t.experience.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent"></div>

          {/* Eventos */}
          <div className="space-y-12">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Punto en la línea */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-black z-10"></div>

                {/* Contenido del evento */}
                <div
                  className={`ml-20 md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="glass rounded-lg p-6 hover-glow">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                          event.type
                        )}`}
                      >
                        {getTypeLabel(event.type)}
                      </span>
                      <span className="text-gray-400 text-sm">{event.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-300 mb-3">{event.location}</p>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
