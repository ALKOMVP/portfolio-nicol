'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Sobre Mí
          </h1>
        </div>

        {/* Contenido */}
        <div className="glass rounded-2xl p-8 md:p-12 hover-glow">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Soy Nicol Mena, una apasionada artista de circo y acrobacia con años de
              experiencia en el mundo del espectáculo. Mi amor por las artes
              circenses comenzó desde muy joven, y desde entonces he dedicado mi
              vida a perfeccionar mi técnica y expresar mi arte a través del
              movimiento.
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Especializada en acrobacia aérea con telas, trapecio y acrobacia de
              suelo, he tenido el privilegio de participar en numerosos festivales,
              shows y competencias tanto a nivel nacional como internacional. Cada
              presentación es una oportunidad para contar una historia única y
              conmover al público con la belleza y la fuerza del movimiento.
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              Mi enfoque combina la técnica precisa con la expresión artística,
              creando rutinas que no solo demuestran habilidad física, sino que
              también transmiten emociones y narrativas profundas. Creo firmemente
              que el circo es una forma de arte completa que puede inspirar,
              emocionar y transformar.
            </p>

            <div className="mt-12 pt-8 border-t border-white/10">
              <h2 className="text-3xl font-bold mb-6 gradient-text">
                Formación y Especialidades
              </h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">✦</span>
                  <span>Acrobacia Aérea con Telas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">✦</span>
                  <span>Trapecio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">✦</span>
                  <span>Acrobacia de Suelo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">✦</span>
                  <span>Danza Contemporánea</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-3">✦</span>
                  <span>Coreografía y Dirección Artística</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

