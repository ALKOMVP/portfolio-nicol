'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function Home() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const videos = [
    '/videos/background-video.mp4',
    '/videos/cabaret-video.mp4',
  ];

  // Precargar videos en segundo plano (el primero se carga automáticamente por el elemento video)
  useEffect(() => {
    // Habilitar scroll inmediatamente (el primer video se reproducirá automáticamente)
    // Los demás videos se precargan en segundo plano
    setVideosLoaded(true);
    
    // Precargar los demás videos en segundo plano
    videos.slice(1).forEach((src) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      video.src = src;
      video.muted = true;
      video.playsInline = true;
      video.load();
    });
  }, [videos]);

  // Reproducir el primer video inmediatamente al montar
  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      // Reproducir el primer video tan pronto como esté disponible
      const tryPlay = () => {
        if (firstVideo.readyState >= 2) {
          firstVideo.currentTime = 0;
          firstVideo.play().catch(() => {});
        } else {
          // Esperar a que el video esté listo
          const handleCanPlay = () => {
            firstVideo.currentTime = 0;
            firstVideo.play().catch(() => {});
            firstVideo.removeEventListener('canplay', handleCanPlay);
          };
          firstVideo.addEventListener('canplay', handleCanPlay);
          firstVideo.load();
        }
      };
      
      // Intentar reproducir inmediatamente
      tryPlay();
    }
  }, []);

  // Cambiar video cuando cambia el índice
  useEffect(() => {
    const validIndex = currentVideoIndex % videos.length;
    const currentVideo = videoRefs.current[validIndex];
    
    if (currentVideo) {
      // Pausar todos los videos primero
      videoRefs.current.forEach((video, index) => {
        if (video && index !== validIndex) {
          video.pause();
          video.currentTime = 0;
        }
      });
      
      // Reproducir el video actual
      if (currentVideo.readyState >= 2) {
        // Video ya está cargado
        currentVideo.currentTime = 0;
        currentVideo.play().catch(() => {});
      } else {
        // Esperar a que el video se cargue
        const handleCanPlay = () => {
          currentVideo.currentTime = 0;
          currentVideo.play().catch(() => {});
          currentVideo.removeEventListener('canplay', handleCanPlay);
        };
        currentVideo.addEventListener('canplay', handleCanPlay);
        currentVideo.load();
      }
    }
  }, [currentVideoIndex, videos.length]);

  const handleNextVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      const currentValidIndex = prevIndex % videos.length;
      const nextIndex = (currentValidIndex + 1) % videos.length;
      return nextIndex;
    });
  }, [videos.length]);

  const handlePreviousVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      const currentValidIndex = prevIndex % videos.length;
      const prevVideoIndex = currentValidIndex === 0 ? videos.length - 1 : currentValidIndex - 1;
      return prevVideoIndex;
    });
  }, [videos.length]);

  // Prevenir scroll del body cuando está en la página de inicio
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Detectar scroll en cualquier parte de la pantalla y cambiar video
  useEffect(() => {
    // Deshabilitar scroll mientras los videos se cargan
    if (!videosLoaded) return;

    let videoChangeTimeout: NodeJS.Timeout;
    let lastChangeTime = 0;
    const DEBOUNCE_TIME = 300; // Tiempo mínimo entre cambios (ms)

    const handleWheel = (e: WheelEvent) => {
      // Prevenir scroll real
      e.preventDefault();
      e.stopPropagation();
      
      // Detectar dirección del scroll
      const deltaY = e.deltaY;
      
      // Cambiar video según la dirección del scroll (con debounce)
      if (Math.abs(deltaY) > 10) {
        const now = Date.now();
        const timeSinceLastChange = now - lastChangeTime;
        
        if (timeSinceLastChange >= DEBOUNCE_TIME) {
          clearTimeout(videoChangeTimeout);
          lastChangeTime = now;
          
          videoChangeTimeout = setTimeout(() => {
            if (deltaY > 0) {
              // Scroll hacia abajo - siguiente video
              handleNextVideo();
            } else {
              // Scroll hacia arriba - video anterior
              handlePreviousVideo();
            }
          }, 50);
        }
      }
    };

    // Detectar scroll con touch (móvil)
    let touchStartY = 0;
    let touchChanged = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchChanged = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (Math.abs(deltaY) > 50 && !touchChanged) {
        touchChanged = true;
        if (deltaY > 0) {
          // Deslizar hacia abajo - siguiente video
          handleNextVideo();
        } else {
          // Deslizar hacia arriba - video anterior
          handlePreviousVideo();
        }
      }
    };

    // Agregar listeners a window y document para capturar scroll en toda la pantalla
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      clearTimeout(videoChangeTimeout);
    };
  }, [handleNextVideo, handlePreviousVideo, videosLoaded]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden fixed inset-0"
      onWheel={(e) => e.preventDefault()}
    >
      {/* Videos pre-cargados - todos renderizados pero solo uno visible */}
      {videos.map((videoSrc, index) => {
        const validIndex = currentVideoIndex % videos.length;
        const isActive = index === validIndex;
        const isFirstVideo = index === 0;
        
        return (
          <video
            key={`video-${index}`}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            autoPlay={isFirstVideo}
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            onError={(e) => {
              console.error('Error cargando video:', videoSrc);
            }}
            onCanPlay={() => {
              // Reproducir automáticamente cuando el video puede reproducirse
              if (isActive && videoRefs.current[index]) {
                const video = videoRefs.current[index];
                if (video && video.paused) {
                  video.play().catch(() => {});
                }
              }
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
        );
      })}
      
      {/* Bloqueo invisible mientras carga */}
      {!videosLoaded && (
        <div className="absolute inset-0 z-30 pointer-events-none" />
      )}

      {/* Indicador de video actual */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {videos.map((_, index) => {
          const activeIndex = currentVideoIndex % videos.length;
          return (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? 'bg-white w-8'
                  : 'bg-white/40 w-2'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

