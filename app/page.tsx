'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const videos = [
    '/videos/background-video.mp4',
    '/videos/cabaret-video.mp4',
  ];

  const handleNextVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      // Asegurar que siempre tenemos un índice válido
      const currentValidIndex = prevIndex % videos.length;
      const nextIndex = (currentValidIndex + 1) % videos.length;
      return nextIndex;
    });
  }, [videos.length]);

  const handlePreviousVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      // Asegurar que siempre tenemos un índice válido
      const currentValidIndex = prevIndex % videos.length;
      const prevVideoIndex = currentValidIndex === 0 ? videos.length - 1 : currentValidIndex - 1;
      return prevVideoIndex;
    });
  }, [videos.length]);

  useEffect(() => {
    if (videoRef.current && videos.length > 0) {
      // Asegurar que el índice es válido
      const validIndex = currentVideoIndex % videos.length;
      const videoSrc = videos[validIndex];
      const currentSrc = videoRef.current.getAttribute('src') || videoRef.current.src;
      const expectedSrc = videoSrc.startsWith('http') ? videoSrc : videoSrc;
      
      // Cargar y reproducir el video (siempre actualizar para asegurar que funciona)
      videoRef.current.src = videoSrc;
      videoRef.current.load();
      
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video reproducido correctamente
          })
          .catch((error) => {
            console.log('Error al reproducir video:', error);
            // Intentar reproducir nuevamente después de un breve delay
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }, 200);
          });
      }
    }
  }, [currentVideoIndex, videos]);

  // Prevenir scroll del body cuando está en la página de inicio
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Detectar scroll en cualquier parte de la pantalla y cambiar video
  useEffect(() => {
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
  }, [handleNextVideo, handlePreviousVideo]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden fixed inset-0"
      onWheel={(e) => e.preventDefault()}
    >
      {/* Video de fondo */}
      {videos.length > 0 && (() => {
        const validIndex = currentVideoIndex % videos.length;
        const videoSrc = videos[validIndex];
        return (
          <video
            key={`video-${validIndex}`}
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
            onError={(e) => {
              console.error('Error cargando video:', videoSrc);
              // Intentar recargar el video
              if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play().catch(() => {});
              }
            }}
            onLoadedData={() => {
              // Asegurar que el video se reproduce cuando se carga
              if (videoRef.current && videoRef.current.paused) {
                videoRef.current.play().catch(() => {});
              }
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
        );
      })()}

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

