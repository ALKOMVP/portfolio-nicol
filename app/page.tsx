'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function Home() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const videos = [
    '/videos/background-video.mp4',
    '/videos/cabaret-video.mp4',
  ];

  // Intentar reproducir automáticamente sin interacción del usuario
  useEffect(() => {
    // Técnica 1: Intentar reproducir inmediatamente cuando el componente se monta
    const tryAutoPlay = async () => {
      const firstVideo = videoRefs.current[0];
      if (firstVideo) {
        // Asegurar todos los atributos necesarios para autoplay en iOS
        firstVideo.muted = true;
        firstVideo.playsInline = true;
        firstVideo.setAttribute('autoplay', '');
        firstVideo.setAttribute('muted', '');
        firstVideo.setAttribute('playsinline', '');
        
        // Intentar reproducir múltiples veces con diferentes estrategias
        const attempts = [
          () => firstVideo.play(),
          () => new Promise(resolve => setTimeout(() => firstVideo.play().then(resolve).catch(resolve), 100)),
          () => new Promise(resolve => setTimeout(() => firstVideo.play().then(resolve).catch(resolve), 300)),
          () => new Promise(resolve => setTimeout(() => firstVideo.play().then(resolve).catch(resolve), 500)),
        ];
        
        for (const attempt of attempts) {
          try {
            await attempt();
            if (!firstVideo.paused) {
              setUserInteracted(true);
              break;
            }
          } catch (error) {
            // Continuar con el siguiente intento
          }
        }
      }
    };

    // Intentar inmediatamente
    tryAutoPlay();

    // Intentar cuando el DOM esté completamente listo
    if (document.readyState === 'complete') {
      setTimeout(tryAutoPlay, 100);
    } else {
      window.addEventListener('load', tryAutoPlay, { once: true });
    }

    // Intentar cuando el video tenga datos cargados
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      const playWhenReady = () => {
        if (firstVideo.readyState >= 2) { // HAVE_CURRENT_DATA
          firstVideo.muted = true;
          firstVideo.playsInline = true;
          firstVideo.play().catch(() => {});
        }
      };
      
      firstVideo.addEventListener('loadeddata', playWhenReady, { once: true });
      firstVideo.addEventListener('canplay', playWhenReady, { once: true });
      firstVideo.addEventListener('canplaythrough', playWhenReady, { once: true });
    }

    return () => {
      window.removeEventListener('load', tryAutoPlay);
    };
  }, []);

  // Habilitar scroll inmediatamente y precargar videos
  useEffect(() => {
    setVideosLoaded(true);
    
    // Precargar los demás videos en segundo plano (sin bloquear)
    videos.slice(1).forEach((src) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = src;
      video.muted = true;
      video.playsInline = true;
      video.load();
    });
  }, [videos]);

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
      
      // Reproducir el video actual (asegurar atributos para móviles)
      currentVideo.muted = true;
      currentVideo.playsInline = true;
      currentVideo.currentTime = 0;
      
      // Intentar reproducir (funcionará mejor después de la primera interacción)
      const tryPlay = async () => {
        try {
          await currentVideo.play();
        } catch (error) {
          // Si falla y el usuario ya interactuó, intentar de nuevo
          if (userInteracted) {
            setTimeout(() => {
              currentVideo.play().catch(() => {});
            }, 100);
          }
        }
      };
      
      tryPlay();
    }
  }, [currentVideoIndex, videos.length, userInteracted]);

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
      // Si es la primera interacción, intentar reproducir videos
      if (!userInteracted) {
        setUserInteracted(true);
        videoRefs.current.forEach((video) => {
          if (video && video.paused) {
            video.muted = true;
            video.playsInline = true;
            video.play().catch(() => {});
          }
        });
      }
      
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
  }, [handleNextVideo, handlePreviousVideo, videosLoaded, userInteracted]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden fixed inset-0"
      onWheel={(e) => e.preventDefault()}
      onTouchStart={() => {
        // Capturar primera interacción táctil para iOS
        if (!userInteracted) {
          setUserInteracted(true);
          const firstVideo = videoRefs.current[0];
          if (firstVideo && firstVideo.paused) {
            firstVideo.muted = true;
            firstVideo.playsInline = true;
            firstVideo.play().catch(() => {});
          }
        }
      }}
      onClick={() => {
        // Capturar primera interacción de click para iOS
        if (!userInteracted) {
          setUserInteracted(true);
          const firstVideo = videoRefs.current[0];
          if (firstVideo && firstVideo.paused) {
            firstVideo.muted = true;
            firstVideo.playsInline = true;
            firstVideo.play().catch(() => {});
          }
        }
      }}
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
            preload={isFirstVideo ? "auto" : "metadata"}
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
            webkit-playsinline="true"
            x-webkit-airplay="allow"
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
                if (video) {
                  video.muted = true;
                  video.playsInline = true;
                  video.setAttribute('autoplay', '');
                  video.setAttribute('muted', '');
                  video.setAttribute('playsinline', '');
                  
                  // Intentar reproducir múltiples veces
                  const tryPlay = async () => {
                    try {
                      await video.play();
                      if (!video.paused) {
                        setUserInteracted(true);
                      }
                    } catch (error) {
                      // Si falla, intentar de nuevo después de un delay
                      setTimeout(() => {
                        video.play().catch(() => {});
                      }, 100);
                    }
                  };
                  
                  tryPlay();
                }
              }
            }}
            onLoadedData={() => {
              // Forzar reproducción cuando el video tiene datos cargados
              if (isActive && videoRefs.current[index]) {
                const video = videoRefs.current[index];
                if (video && video.paused) {
                  video.muted = true;
                  video.playsInline = true;
                  video.setAttribute('autoplay', '');
                  video.setAttribute('muted', '');
                  video.setAttribute('playsinline', '');
                  
                  video.play().then(() => {
                    if (!video.paused) {
                      setUserInteracted(true);
                    }
                  }).catch(() => {});
                }
              }
            }}
            onLoadedMetadata={() => {
              // Intentar reproducir cuando se cargan los metadatos (especialmente para iOS)
              if (isActive && isFirstVideo && videoRefs.current[index]) {
                const video = videoRefs.current[index];
                if (video) {
                  video.muted = true;
                  video.playsInline = true;
                  video.setAttribute('autoplay', '');
                  video.setAttribute('muted', '');
                  video.setAttribute('playsinline', '');
                  
                  // Intentar reproducir inmediatamente
                  video.play().then(() => {
                    if (!video.paused) {
                      setUserInteracted(true);
                    }
                  }).catch(() => {
                    // Si falla, intentar de nuevo cuando tenga más datos
                    setTimeout(() => {
                      video.play().catch(() => {});
                    }, 200);
                  });
                }
              }
            }}
            onPlay={() => {
              // Marcar como interactuado cuando el video se reproduce
              if (isActive && isFirstVideo) {
                setUserInteracted(true);
              }
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
        );
      })}
      
      {/* Overlay invisible solo si el video no se está reproduciendo automáticamente */}
      {!userInteracted && (
        <div 
          className="absolute inset-0 z-40 cursor-pointer"
          onTouchStart={async (e) => {
            e.preventDefault();
            setUserInteracted(true);
            const firstVideo = videoRefs.current[0];
            if (firstVideo && firstVideo.paused) {
              firstVideo.muted = true;
              firstVideo.playsInline = true;
              try {
                await firstVideo.play();
              } catch (error) {
                setTimeout(() => {
                  firstVideo.play().catch(() => {});
                }, 100);
              }
            }
          }}
          onClick={async (e) => {
            e.preventDefault();
            setUserInteracted(true);
            const firstVideo = videoRefs.current[0];
            if (firstVideo && firstVideo.paused) {
              firstVideo.muted = true;
              firstVideo.playsInline = true;
              try {
                await firstVideo.play();
              } catch (error) {
                setTimeout(() => {
                  firstVideo.play().catch(() => {});
                }, 100);
              }
            }
          }}
          style={{ 
            touchAction: 'none',
            WebkitTapHighlightColor: 'transparent',
            opacity: 0 // Completamente invisible pero funcional
          }}
        />
      )}

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

