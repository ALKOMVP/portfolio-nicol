// Sistema de internacionalización

export type Language = 'es' | 'en' | 'pt';

export interface Translations {
  nav: {
    home: string;
    videos: string;
    photography: string;
    experience: string;
    about: string;
    contact: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    selectSubject: string;
    subjects: {
      show: string;
      workshop: string;
      collaboration: string;
      press: string;
      other: string;
    };
    alsoContact: string;
    professionalContact: string;
    availableFor: string;
    availableItems: string[];
  };
  about: {
    title: string;
    miniBio: string;
    fullBio: string;
    seeMore: string;
    seeLess: string;
  };
  whatsapp: {
    message: string;
  };
  videos: {
    title: string;
    subtitle: string;
    loading: string;
    noVideos: string;
    viewMore: string;
    download: string;
  };
  photography: {
    title: string;
    subtitle: string;
    loading: string;
    noPhotos: string;
    download: string;
  };
  experience: {
    title: string;
    subtitle: string;
    types: {
      festival: string;
      theater: string;
      cultural: string;
      convention: string;
      research: string;
      residency: string;
    };
    events: Array<{
      id: string;
      title: string;
      date: string;
      location: string;
      description: string;
      type: string;
    }>;
  };
}

const translations: Record<Language, Translations> = {
  es: {
    nav: {
      home: 'Inicio',
      videos: 'Videos',
      photography: 'Fotografía',
      experience: 'Experiencia',
      about: 'Sobre Mí',
      contact: 'Contacto',
    },
    home: {
      title: 'Nicol Mena',
      subtitle: 'Artista Circense',
    },
    contact: {
      title: 'Contacto',
      subtitle: '¿Tienes un proyecto en mente? ¡Hablemos!',
      name: 'Nombre Completo *',
      email: 'Email *',
      phone: 'Teléfono',
      subject: 'Asunto *',
      message: 'Mensaje *',
      send: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Mensaje enviado con éxito! Te contactaré pronto.',
      error: 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.',
      selectSubject: 'Selecciona un asunto',
      subjects: {
        show: 'Contratación para Show',
        workshop: 'Workshop o Clase',
        collaboration: 'Colaboración',
        press: 'Prensa y Medios',
        other: 'Otro',
      },
      alsoContact: 'También puedes contactarme directamente:',
      professionalContact: 'Contacto profesional',
      availableFor: 'Disponible para:',
      availableItems: [
        'Festivales internacionales',
        'Contratación artística',
        'Compañías de circo contemporáneo',
        'Eventos culturales',
        'Residencias, colaboraciones y giras',
      ],
    },
    about: {
      title: 'Sobre Mí',
      miniBio: 'Nicol Mena es una artista circense chilena radicada en Brasil, especializada en Hula Hoop y contorsión. Egresada de la Escuela Nacional de Circo Luiz Olimecha, ha presentado su trabajo en Europa y Latinoamérica, incluyendo Pflasterspektakel, PRT–Bochum, Theatre Spektakel y el Festival de Rua. Su obra combina técnica, investigación corporal y una presencia escénica poética y contemporánea.',
      fullBio: 'Nicol Mena (Los Ángeles, Chile) es una artista circense y creadora escénica radicada en Brasil. Su trabajo une técnica, investigación corporal y una sensibilidad contemporánea que integra movimiento, presencia y una estética centrada en la conexión sensorial con el público.\n\nEgresada de la Escuela Nacional de Circo Luiz Olimecha (Río de Janeiro, 2024) y titulada como Ingeniera Civil Industrial por la Universidad del Bío–Bío, Nicol combina precisión técnica con una mirada analítica que nutre sus procesos creativos y performativos.\n\nEspecialista en Hula Hoop y contorsión, su trayectoria incorpora además experiencia en mano a mano, lira aérea y handstand. Inició su formación en el circo a los 14 años, luego de una infancia vinculada al teatro escolar y la gimnasia. Ha sido parte de compañías y procesos creativos en Chile y Brasil, como Luz Roja y Enlace, desarrollando piezas de circo teatro y circo contemporáneo.\n\nEn 2022 se trasladó a Brasil para profesionalizar su trabajo y consolidar un lenguaje propio, caracterizado por la exploración del cuerpo–objeto, la geometría del movimiento y una presencia escénica que habita lo poético y lo emocional.\n\nSu obra se ha presentado en Latinoamérica y Europa, destacando Pflasterspektakel (Austria), PRT–Bochum (Alemania), Theatre Spektakel (Suiza), el Festival de Rua de Salvador (Brasil), la Convención Nacional de Circo de Chile, y el programa SBT – São Paulo.\n\nActualmente, Nicol desarrolla piezas que exploran la relación entre presencia, fluidez y arquitectura corporal. Su práctica se sostiene en la investigación constante, el entrenamiento disciplinado y la creación de experiencias que apuestan por la autenticidad, la precisión técnica y la expresión contemporánea.',
      seeMore: 'Ver más',
      seeLess: 'Ver menos',
    },
    whatsapp: {
      message: 'Hola! Me gustaría ponerme en contacto contigo.',
    },
    videos: {
      title: 'Videos',
      subtitle: 'Galería de videos de acrobacia y circo',
      loading: 'Cargando videos...',
      noVideos: 'No hay videos disponibles aún.',
      viewMore: 'Ver más',
      download: 'Descargar',
    },
    photography: {
      title: 'Fotografía',
      subtitle: 'Galería de fotografías de acrobacia y circo',
      loading: 'Cargando fotos...',
      noPhotos: 'No hay fotografías disponibles aún.',
      download: 'Descargar',
    },
    experience: {
      title: 'Experiencia',
      subtitle: 'Eventos, shows y experiencias profesionales',
      types: {
        festival: 'Festival',
        theater: 'Teatro',
        cultural: 'Espacio Cultural',
        convention: 'Convención',
        research: 'Investigación',
        residency: 'Residencia',
      },
      events: [
        {
          id: '9',
          title: 'Residencia CADE – Creación Escénica Circense',
          date: '2025',
          location: 'Florianópolis, Brasil',
          description: 'Residencia de investigación en circo contemporáneo y creación escénica.',
          type: 'residency',
        },
        {
          id: '1',
          title: 'PORTALES – Pflasterspektakel',
          date: '2025',
          location: 'Linz, Austria',
          description: 'Presentación del solo Portales en festival europeo de gran formato.',
          type: 'festival',
        },
        {
          id: '2',
          title: 'PORTALES – Theater Spektakel',
          date: '2025',
          location: 'Zúrich, Suiza',
          description: 'Participación con Portales en reconocido festival europeo.',
          type: 'theater',
        },
        {
          id: '3',
          title: 'PORTALES – Berlin lacht!',
          date: '2025',
          location: 'Berlín, Alemania',
          description: 'Función de Portales en espacio público.',
          type: 'festival',
        },
        {
          id: '4',
          title: 'PORTALES – PRT Bochum',
          date: '2025',
          location: 'Bochum, Alemania',
          description: 'Presentación de Portales en programación europea.',
          type: 'cultural',
        },
        {
          id: '5',
          title: 'PORTALES – Festival Internacional de Rua de Bahia',
          date: '2025',
          location: 'Salvador de Bahía, Brasil',
          description: 'Función de Portales en festival de referencia en Brasil.',
          type: 'festival',
        },
        {
          id: '6',
          title: 'PORTALES – Centro Coreográfico do Rio de Janeiro',
          date: '2024',
          location: 'Río de Janeiro, Brasil',
          description: 'Función de Portales en espacio dedicado a la investigación del movimiento.',
          type: 'cultural',
        },
        {
          id: '7',
          title: 'PORTALES – Convención Nacional de Circo',
          date: '2024',
          location: 'Santiago, Chile',
          description: 'Presentación de Portales en encuentro profesional del circo chileno.',
          type: 'convention',
        },
        {
          id: '8',
          title: 'Investigación y creación – PORTALES',
          date: '2023',
          location: 'Escuela Nacional de Circo Luiz Olimecha, Río de Janeiro, Brasil',
          description: 'Presentación del proceso creativo del solo.',
          type: 'research',
        },
      ],
    },
  },
  en: {
    nav: {
      home: 'Home',
      videos: 'Videos',
      photography: 'Photography',
      experience: 'Experience',
      about: 'About',
      contact: 'Contact',
    },
    home: {
      title: 'Nicol Mena',
      subtitle: 'Circus Artist',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Do you have a project in mind? Let\'s talk!',
      name: 'Full Name *',
      email: 'Email *',
      phone: 'Phone',
      subject: 'Subject *',
      message: 'Message *',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully! I will contact you soon.',
      error: 'There was an error sending the message. Please try again.',
      selectSubject: 'Select a subject',
      subjects: {
        show: 'Show Booking',
        workshop: 'Workshop or Class',
        collaboration: 'Collaboration',
        press: 'Press and Media',
        other: 'Other',
      },
      alsoContact: 'You can also contact me directly:',
      professionalContact: 'Professional Contact',
      availableFor: 'Available for:',
      availableItems: [
        'International festivals',
        'Artistic bookings',
        'Contemporary circus companies',
        'Cultural events',
        'Residencies, collaborations & touring',
      ],
    },
    about: {
      title: 'About Me',
      miniBio: 'Nicol Mena is a Chilean circus artist based in Brazil, specialized in Hula Hoop and contortion. Graduated from the National Circus School Luiz Olimecha, she has presented her work in Europe and Latin America, including Pflasterspektakel, PRT–Bochum, Theatre Spektakel and Festival de Rua. Her work combines technique, body research and a poetic and contemporary stage presence.',
      fullBio: 'Nicol Mena (Los Ángeles, Chile) is a circus artist and stage creator based in Brazil. Her work combines technique, body research and a contemporary sensibility that integrates movement, presence and an aesthetic centered on sensory connection with the audience.\n\nGraduated from the National Circus School Luiz Olimecha (Rio de Janeiro, 2024) and with a degree in Industrial Civil Engineering from the Universidad del Bío–Bío, Nicol combines technical precision with an analytical perspective that nourishes her creative and performative processes.\n\nSpecialist in Hula Hoop and contortion, her trajectory also incorporates experience in hand to hand, aerial lyra and handstand. She began her circus training at the age of 14, after a childhood linked to school theater and gymnastics. She has been part of companies and creative processes in Chile and Brazil, such as Luz Roja and Enlace, developing pieces of circus theater and contemporary circus.\n\nIn 2022 she moved to Brazil to professionalize her work and consolidate her own language, characterized by the exploration of the body-object, the geometry of movement and a stage presence that inhabits the poetic and the emotional.\n\nHer work has been presented in Latin America and Europe, highlighting Pflasterspektakel (Austria), PRT–Bochum (Germany), Theatre Spektakel (Switzerland), Festival de Rua de Salvador (Brazil), the National Circus Convention of Chile, and the SBT – São Paulo program.\n\nCurrently, Nicol develops pieces that explore the relationship between presence, fluidity and body architecture. Her practice is sustained in constant research, disciplined training and the creation of experiences that bet on authenticity, technical precision and contemporary expression.',
      seeMore: 'See more',
      seeLess: 'See less',
    },
    whatsapp: {
      message: 'Hello! I would like to get in touch with you.',
    },
    videos: {
      title: 'Videos',
      subtitle: 'Gallery of acrobatics and circus videos',
      loading: 'Loading videos...',
      noVideos: 'No videos available yet.',
      viewMore: 'View more',
      download: 'Download',
    },
    photography: {
      title: 'Photography',
      subtitle: 'Gallery of acrobatics and circus photographs',
      loading: 'Loading photos...',
      noPhotos: 'No photographs available yet.',
      download: 'Download',
    },
    experience: {
      title: 'Experience',
      subtitle: 'Events, shows and professional experiences',
      types: {
        festival: 'Festival',
        theater: 'Theater',
        cultural: 'Cultural Space',
        convention: 'Convention',
        research: 'Research',
        residency: 'Residency',
      },
      events: [
        {
          id: '9',
          title: 'CADE Residency – Scenic Circus Creation',
          date: '2025',
          location: 'Florianópolis, Brazil',
          description: 'Research residency in contemporary circus and scenic creation.',
          type: 'residency',
        },
        {
          id: '1',
          title: 'PORTALES – Pflasterspektakel',
          date: '2025',
          location: 'Linz, Austria',
          description: 'Presentation of the solo Portales at a major European festival.',
          type: 'festival',
        },
        {
          id: '2',
          title: 'PORTALES – Theater Spektakel',
          date: '2025',
          location: 'Zurich, Switzerland',
          description: 'Participation with Portales at a recognized European festival.',
          type: 'theater',
        },
        {
          id: '3',
          title: 'PORTALES – Berlin lacht!',
          date: '2025',
          location: 'Berlin, Germany',
          description: 'Performance of Portales in public space.',
          type: 'festival',
        },
        {
          id: '4',
          title: 'PORTALES – PRT Bochum',
          date: '2025',
          location: 'Bochum, Germany',
          description: 'Presentation of Portales in European programming.',
          type: 'cultural',
        },
        {
          id: '5',
          title: 'PORTALES – International Street Arts Festival of Bahia',
          date: '2025',
          location: 'Salvador de Bahia, Brazil',
          description: 'Performance of Portales at a reference festival in Brazil.',
          type: 'festival',
        },
        {
          id: '6',
          title: 'PORTALES – Centro Coreográfico do Rio de Janeiro',
          date: '2024',
          location: 'Rio de Janeiro, Brazil',
          description: 'Performance of Portales at a space dedicated to movement research.',
          type: 'cultural',
        },
        {
          id: '7',
          title: 'PORTALES – National Circus Convention',
          date: '2024',
          location: 'Santiago, Chile',
          description: 'Presentation of Portales at a professional meeting of Chilean circus.',
          type: 'convention',
        },
        {
          id: '8',
          title: 'Research and Creation – PORTALES',
          date: '2023',
          location: 'Escola Nacional de Circo Luiz Olimecha, Rio de Janeiro, Brazil',
          description: 'Presentation of the creative process of the solo.',
          type: 'research',
        },
      ],
    },
  },
  pt: {
    nav: {
      home: 'Início',
      videos: 'Vídeos',
      photography: 'Fotografia',
      experience: 'Experiência',
      about: 'Sobre Mim',
      contact: 'Contato',
    },
    home: {
      title: 'Nicol Mena',
      subtitle: 'Artista Circense',
    },
    contact: {
      title: 'Contato',
      subtitle: 'Tem um projeto em mente? Vamos conversar!',
      name: 'Nome Completo *',
      email: 'Email *',
      phone: 'Telefone',
      subject: 'Assunto *',
      message: 'Mensagem *',
      send: 'Enviar Mensagem',
      sending: 'Enviando...',
      success: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
      error: 'Houve um erro ao enviar a mensagem. Por favor, tente novamente.',
      selectSubject: 'Selecione um assunto',
      subjects: {
        show: 'Contratação para Show',
        workshop: 'Workshop ou Aula',
        collaboration: 'Colaboração',
        press: 'Imprensa e Mídia',
        other: 'Outro',
      },
      alsoContact: 'Você também pode entrar em contato diretamente:',
      professionalContact: 'Contato Profissional',
      availableFor: 'Disponível para:',
      availableItems: [
        'Festivais internacionais',
        'Contratações artísticas',
        'Companhias de circo contemporâneo',
        'Eventos culturais',
        'Residências, colaborações e turnês',
      ],
    },
    about: {
      title: 'Sobre Mim',
      miniBio: 'Nicol Mena é uma artista circense chilena radicada no Brasil, especializada em Hula Hoop e contorcionismo. Formada pela Escola Nacional de Circo Luiz Olimecha, apresentou seu trabalho na Europa e na América Latina, incluindo Pflasterspektakel, PRT–Bochum, Theatre Spektakel e Festival de Rua. Sua obra combina técnica, pesquisa corporal e uma presença cênica poética e contemporânea.',
      fullBio: 'Nicol Mena (Los Ángeles, Chile) é uma artista circense e criadora cênica radicada no Brasil. Seu trabalho une técnica, pesquisa corporal e uma sensibilidade contemporânea que integra movimento, presença e uma estética centrada na conexão sensorial com o público.\n\nFormada pela Escola Nacional de Circo Luiz Olimecha (Rio de Janeiro, 2024) e graduada em Engenharia Civil Industrial pela Universidad del Bío–Bío, Nicol combina precisão técnica com um olhar analítico que nutre seus processos criativos e performativos.\n\nEspecialista em Hula Hoop e contorcionismo, sua trajetória incorpora ainda experiência em mão a mão, lira aérea e handstand. Iniciou sua formação no circo aos 14 anos, após uma infância vinculada ao teatro escolar e à ginástica. Foi parte de companhias e processos criativos no Chile e no Brasil, como Luz Roja e Enlace, desenvolvendo peças de circo teatro e circo contemporâneo.\n\nEm 2022 mudou-se para o Brasil para profissionalizar seu trabalho e consolidar uma linguagem própria, caracterizada pela exploração do corpo-objeto, a geometria do movimento e uma presença cênica que habita o poético e o emocional.\n\nSua obra foi apresentada na América Latina e na Europa, destacando-se Pflasterspektakel (Áustria), PRT–Bochum (Alemanha), Theatre Spektakel (Suíça), Festival de Rua de Salvador (Brasil), a Convenção Nacional de Circo do Chile e o programa SBT – São Paulo.\n\nAtualmente, Nicol desenvolve peças que exploram a relação entre presença, fluidez e arquitetura corporal. Sua prática se sustenta na pesquisa constante, no treinamento disciplinado e na criação de experiências que apostam na autenticidade, na precisão técnica e na expressão contemporânea.',
      seeMore: 'Ver mais',
      seeLess: 'Ver menos',
    },
    whatsapp: {
      message: 'Olá! Gostaria de entrar em contato com você.',
    },
    videos: {
      title: 'Vídeos',
      subtitle: 'Galeria de vídeos de acrobacia e circo',
      loading: 'Carregando vídeos...',
      noVideos: 'Nenhum vídeo disponível ainda.',
      viewMore: 'Ver mais',
      download: 'Baixar',
    },
    photography: {
      title: 'Fotografia',
      subtitle: 'Galeria de fotografias de acrobacia e circo',
      loading: 'Carregando fotos...',
      noPhotos: 'Nenhuma fotografia disponível ainda.',
      download: 'Baixar',
    },
    experience: {
      title: 'Experiência',
      subtitle: 'Eventos, shows e experiências profissionais',
      types: {
        festival: 'Festival',
        theater: 'Teatro',
        cultural: 'Espaço Cultural',
        convention: 'Convenção',
        research: 'Pesquisa',
        residency: 'Residência',
      },
      events: [
        {
          id: '9',
          title: 'Residência CADE – Criação Cênica Circense',
          date: '2025',
          location: 'Florianópolis, Brasil',
          description: 'Residência de pesquisa em circo contemporâneo e criação cênica.',
          type: 'residency',
        },
        {
          id: '1',
          title: 'PORTALES – Pflasterspektakel',
          date: '2025',
          location: 'Linz, Áustria',
          description: 'Apresentação do solo Portales em festival europeu de grande formato.',
          type: 'festival',
        },
        {
          id: '2',
          title: 'PORTALES – Theater Spektakel',
          date: '2025',
          location: 'Zurique, Suíça',
          description: 'Participação com Portales em reconhecido festival europeu.',
          type: 'theater',
        },
        {
          id: '3',
          title: 'PORTALES – Berlin lacht!',
          date: '2025',
          location: 'Berlim, Alemanha',
          description: 'Apresentação de Portales em espaço público.',
          type: 'festival',
        },
        {
          id: '4',
          title: 'PORTALES – PRT Bochum',
          date: '2025',
          location: 'Bochum, Alemanha',
          description: 'Apresentação de Portales em programação europeia.',
          type: 'cultural',
        },
        {
          id: '5',
          title: 'PORTALES – Festival Internacional de Rua da Bahia',
          date: '2025',
          location: 'Salvador da Bahia, Brasil',
          description: 'Apresentação de Portales em festival de referência no Brasil.',
          type: 'festival',
        },
        {
          id: '6',
          title: 'PORTALES – Centro Coreográfico do Rio de Janeiro',
          date: '2024',
          location: 'Rio de Janeiro, Brasil',
          description: 'Apresentação de Portales em espaço dedicado à pesquisa do movimento.',
          type: 'cultural',
        },
        {
          id: '7',
          title: 'PORTALES – Convenção Nacional de Circo',
          date: '2024',
          location: 'Santiago, Chile',
          description: 'Apresentação de Portales em encontro profissional do circo chileno.',
          type: 'convention',
        },
        {
          id: '8',
          title: 'Pesquisa e criação – PORTALES',
          date: '2023',
          location: 'Escola Nacional de Circo Luiz Olimecha, Rio de Janeiro, Brasil',
          description: 'Apresentação do processo criativo do solo.',
          type: 'research',
        },
      ],
    },
  },
};

export const getTranslations = (lang: Language): Translations => {
  return translations[lang] || translations.es;
};

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

