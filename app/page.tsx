'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export default function Home() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Videos para desktop (alta resolución)
  const desktopVideos = [
    '/videos/background-video-1.mp4',
    '/videos/background-video-2.mp4',
    '/videos/background-video-3.mp4',
  ];
  
  // Videos para mobile (baja resolución, carga rápida)
  const mobileVideos = [
    '/videos/background-video-1-mobile.mp4',
    '/videos/background-video-2-mobile.mp4',
    '/videos/background-video-3-mobile.mp4',
  ];
  
  // Seleccionar videos según dispositivo
  const videos = isMobile ? mobileVideos : desktopVideos;

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                             (window.innerWidth <= 768);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Técnica agresiva: Crear un video oculto para desbloquear autoplay
  useEffect(() => {
    // Crear un video oculto que se reproduce primero para "desbloquear" el autoplay
    const unlockVideo = document.createElement('video');
    unlockVideo.style.position = 'fixed';
    unlockVideo.style.top = '-9999px';
    unlockVideo.style.width = '1px';
    unlockVideo.style.height = '1px';
    unlockVideo.muted = true;
    unlockVideo.playsInline = true;
    unlockVideo.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAg1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjA1MSBhMDhhZTg1IC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMAA=';
    document.body.appendChild(unlockVideo);
    
    // Intentar reproducir el video oculto para desbloquear autoplay
    unlockVideo.play().catch(() => {});

    // Técnica optimizada para desktop
    const tryAutoPlay = async () => {
      const firstVideo = videoRefs.current[0];
      if (!firstVideo || isMobile) return; // En mobile se maneja en otro useEffect
      
      // En desktop, usar estrategia más agresiva
      firstVideo.muted = true;
      firstVideo.playsInline = true;
      firstVideo.setAttribute('autoplay', '');
      firstVideo.setAttribute('muted', '');
      firstVideo.setAttribute('playsinline', '');
      firstVideo.setAttribute('webkit-playsinline', 'true');
      firstVideo.setAttribute('x5-video-player-type', 'h5');
      firstVideo.setAttribute('x5-video-player-fullscreen', 'true');
      
      const attempts = [
        () => firstVideo.play(),
        () => new Promise(resolve => setTimeout(() => firstVideo.play().then(resolve).catch(resolve), 50)),
        () => new Promise(resolve => setTimeout(() => firstVideo.play().then(resolve).catch(resolve), 100)),
        () => new Promise(resolve => setTimeout(() => firstVideo.play().then(resolve).catch(resolve), 200)),
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
    };

    // En desktop, usar estrategia más agresiva
    if (!isMobile) {
      tryAutoPlay();
      
      if (document.readyState === 'complete') {
        setTimeout(tryAutoPlay, 50);
        setTimeout(tryAutoPlay, 100);
        setTimeout(tryAutoPlay, 200);
      } else {
        window.addEventListener('load', () => {
          setTimeout(tryAutoPlay, 50);
          setTimeout(tryAutoPlay, 100);
        }, { once: true });
      }
      
      const firstVideo = videoRefs.current[0];
      if (firstVideo) {
        const playWhenReady = () => {
          firstVideo.muted = true;
          firstVideo.playsInline = true;
          firstVideo.play().then(() => {
            if (!firstVideo.paused) {
              setUserInteracted(true);
            }
          }).catch(() => {});
        };
        
        firstVideo.addEventListener('loadeddata', playWhenReady, { once: true });
        firstVideo.addEventListener('canplay', playWhenReady, { once: true });
        firstVideo.addEventListener('canplaythrough', playWhenReady, { once: true });
        firstVideo.addEventListener('loadedmetadata', playWhenReady, { once: true });
      }
    }

    return () => {
      if (!isMobile && unlockVideo && document.body.contains(unlockVideo)) {
        document.body.removeChild(unlockVideo);
      }
    };
  }, [isMobile]);

  // Habilitar scroll inmediatamente y precargar videos
  useEffect(() => {
    // En mobile, habilitar scroll inmediatamente sin esperar
    // No precargar nada en mobile para máxima velocidad inicial
    setVideosLoaded(true);
    
    // En desktop, precargar los demás videos en segundo plano
    if (!isMobile) {
      videos.slice(1).forEach((src) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = src;
        video.muted = true;
        video.playsInline = true;
        video.load();
      });
    }
  }, [videos, isMobile]);

  // Cambiar video cuando cambia el índice
  useEffect(() => {
    // Calcular el índice válido usando módulo para ciclar correctamente
    const validIndex = ((currentVideoIndex % videos.length) + videos.length) % videos.length;
    const currentVideo = videoRefs.current[validIndex];
    
    if (!currentVideo) return;
    
    // Pausar todos los videos primero
    videoRefs.current.forEach((video, index) => {
      if (video && index !== validIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });
    
    // En mobile, asegurar que el video se carga y reproduce correctamente
    if (isMobile) {
      // Asegurar que el video tenga la fuente correcta ANTES de cualquier otra operación
      const currentVideoSrc = videos[validIndex];
      const source = currentVideo.querySelector('source');
      
      if (source) {
        const currentSrc = source.getAttribute('src');
        if (currentSrc !== currentVideoSrc) {
          // Si la fuente no coincide, actualizar y recargar
          source.setAttribute('src', currentVideoSrc);
          currentVideo.load();
        }
      }
      
      // Si el video no tiene datos cargados, forzar carga
      if (currentVideo.readyState === 0 || currentVideo.readyState === 1) {
        currentVideo.load();
      }
      
      // También precargar el siguiente video para anticipar el scroll
      const nextIndex = (validIndex + 1) % videos.length;
      const nextVideo = videoRefs.current[nextIndex];
      if (nextVideo) {
        const nextVideoSrc = videos[nextIndex];
        const nextSource = nextVideo.querySelector('source');
        if (nextSource) {
          const nextSrc = nextSource.getAttribute('src');
          if (nextSrc !== nextVideoSrc) {
            nextSource.setAttribute('src', nextVideoSrc);
            nextVideo.load();
          }
        }
        if (nextVideo.readyState === 0 || nextVideo.readyState === 1) {
          nextVideo.load();
        }
      }
    }
    
    // Asegurar todos los atributos necesarios para móviles
    currentVideo.muted = true;
    currentVideo.playsInline = true;
    currentVideo.setAttribute('autoplay', '');
    currentVideo.setAttribute('muted', '');
    currentVideo.setAttribute('playsinline', '');
    currentVideo.setAttribute('webkit-playsinline', 'true');
    currentVideo.setAttribute('x5-video-player-type', 'h5');
    currentVideo.setAttribute('x5-video-player-fullscreen', 'true');
    
    // Función agresiva para reproducir el video
    const forcePlay = async () => {
      // Asegurar atributos antes de cada intento
      currentVideo.muted = true;
      currentVideo.playsInline = true;
      
      // Si el video no tiene datos, forzar carga primero
      if (currentVideo.readyState < 2) {
        currentVideo.load();
        
        // Esperar a que tenga datos antes de reproducir
        const playWhenReady = () => {
          currentVideo.muted = true;
          currentVideo.playsInline = true;
          const playAttempts = [
            () => currentVideo.play(),
            () => new Promise(resolve => setTimeout(() => currentVideo.play().then(resolve).catch(resolve), 50)),
            () => new Promise(resolve => setTimeout(() => currentVideo.play().then(resolve).catch(resolve), 100)),
          ];
          
          playAttempts[0]().catch(() => {
            playAttempts[1]().catch(() => {
              playAttempts[2]().catch(() => {});
            });
          });
        };
        
        currentVideo.addEventListener('loadeddata', playWhenReady, { once: true });
        currentVideo.addEventListener('canplay', playWhenReady, { once: true });
        currentVideo.addEventListener('canplaythrough', playWhenReady, { once: true });
        
        return;
      }
      
      // Si tiene datos, intentar reproducir inmediatamente con múltiples intentos
      const playAttempts = [
        () => currentVideo.play(),
        () => new Promise(resolve => setTimeout(() => currentVideo.play().then(resolve).catch(resolve), 50)),
        () => new Promise(resolve => setTimeout(() => currentVideo.play().then(resolve).catch(resolve), 100)),
        () => new Promise(resolve => setTimeout(() => currentVideo.play().then(resolve).catch(resolve), 200)),
      ];
      
      try {
        await playAttempts[0]();
        if (currentVideo.paused) {
          await playAttempts[1]();
        }
        if (currentVideo.paused) {
          await playAttempts[2]();
        }
        if (currentVideo.paused) {
          await playAttempts[3]();
        }
      } catch (error) {
        // Si todos fallan, intentar cuando tenga más datos
        const playOnReady = () => {
          currentVideo.muted = true;
          currentVideo.playsInline = true;
          currentVideo.play().catch(() => {});
        };
        
        currentVideo.addEventListener('canplay', playOnReady, { once: true });
        currentVideo.addEventListener('canplaythrough', playOnReady, { once: true });
      }
    };
    
    // Resetear el tiempo del video
    currentVideo.currentTime = 0;
    
    // Intentar reproducir inmediatamente
    forcePlay();
    
    // Intentar múltiples veces con delays para asegurar reproducción
    setTimeout(() => {
      if (currentVideo.paused) {
        forcePlay();
      }
    }, 50);
    
    setTimeout(() => {
      if (currentVideo.paused) {
        forcePlay();
      }
    }, 150);
    
    setTimeout(() => {
      if (currentVideo.paused) {
        forcePlay();
      }
    }, 300);
  }, [currentVideoIndex, videos.length, userInteracted, isMobile]);

  const handleNextVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      // Incrementar el índice normalmente, el módulo se aplica al calcular qué video mostrar
      return prevIndex + 1;
    });
  }, []);

  const handlePreviousVideo = useCallback(() => {
    setCurrentVideoIndex((prevIndex) => {
      // Decrementar el índice normalmente, el módulo se aplica al calcular qué video mostrar
      if (prevIndex <= 0) {
        // Si está en 0 o menos, ir al último video
        return videos.length - 1;
      }
      return prevIndex - 1;
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
        // Calcular el índice válido usando módulo para ciclar correctamente
        const validIndex = ((currentVideoIndex % videos.length) + videos.length) % videos.length;
        const isActive = index === validIndex;
        const isFirstVideo = index === 0;
        
        return (
          <video
            key={`video-${index}-${isMobile ? 'mobile' : 'desktop'}-${videoSrc}`}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            autoPlay={isFirstVideo}
            loop
            muted
            playsInline
            preload="auto"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            x5-video-orientation="portraint"
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            onError={(e) => {
              console.error('Error cargando video:', videoSrc, e);
            }}
            onCanPlay={() => {
              // Reproducir automáticamente cuando el video puede reproducirse
              if (isActive && videoRefs.current[index]) {
                const video = videoRefs.current[index];
                if (video && video.paused) {
                  video.muted = true;
                  video.playsInline = true;
                  video.setAttribute('autoplay', '');
                  video.setAttribute('muted', '');
                  video.setAttribute('playsinline', '');
                  
                  // Intentar reproducir múltiples veces de forma agresiva
                  const playAttempts = [
                    () => video.play(),
                    () => new Promise(resolve => setTimeout(() => video.play().then(resolve).catch(resolve), 50)),
                    () => new Promise(resolve => setTimeout(() => video.play().then(resolve).catch(resolve), 100)),
                  ];
                  
                  playAttempts[0]().then(() => {
                    if (!video.paused) {
                      setUserInteracted(true);
                    }
                  }).catch(() => {
                    playAttempts[1]().then(() => {
                      if (!video.paused) {
                        setUserInteracted(true);
                      }
                    }).catch(() => {
                      playAttempts[2]().catch(() => {});
                    });
                  });
                }
              }
            }}
            onLoadedData={() => {
              // Forzar reproducción cuando el video tiene datos cargados
              if (isActive && videoRefs.current[index]) {
                const video = videoRefs.current[index];
                if (!video) return;
                
                // En mobile, reproducir inmediatamente cuando tiene datos
                if (isMobile && video.paused) {
                  video.muted = true;
                  video.playsInline = true;
                  video.play().then(() => {
                    if (!video.paused) {
                      setUserInteracted(true);
                    }
                  }).catch(() => {
                    setTimeout(() => {
                      video.muted = true;
                      video.playsInline = true;
                      video.play().catch(() => {});
                    }, 100);
                  });
                }
              }
            }}
            onCanPlayThrough={() => {
              // Asegurar reproducción cuando el video puede reproducirse completamente
              if (isActive && videoRefs.current[index]) {
                const video = videoRefs.current[index];
                if (video && video.paused) {
                  video.muted = true;
                  video.playsInline = true;
                  video.play().catch(() => {});
                }
              }
            }}
            onLoadedMetadata={() => {
              // Intentar reproducir cuando se cargan los metadatos (especialmente para iOS)
              if (isActive && videoRefs.current[index]) {
                const video = videoRefs.current[index];
                if (video) {
                  video.muted = true;
                  video.playsInline = true;
                  video.setAttribute('autoplay', '');
                  video.setAttribute('muted', '');
                  video.setAttribute('playsinline', '');
                  
                  // Intentar reproducir inmediatamente con múltiples intentos
                  const playAttempts = [
                    () => video.play(),
                    () => new Promise(resolve => setTimeout(() => video.play().then(resolve).catch(resolve), 50)),
                    () => new Promise(resolve => setTimeout(() => video.play().then(resolve).catch(resolve), 100)),
                  ];
                  
                  playAttempts[0]().then(() => {
                    if (!video.paused) {
                      setUserInteracted(true);
                    }
                  }).catch(() => {
                    playAttempts[1]().then(() => {
                      if (!video.paused) {
                        setUserInteracted(true);
                      }
                    }).catch(() => {
                      playAttempts[2]().catch(() => {});
                    });
                  });
                }
              }
            }}
            onPlay={() => {
              // Marcar como interactuado cuando el video se reproduce
              if (isActive) {
                setUserInteracted(true);
              }
            }}
            onPlaying={() => {
              // Asegurar que el video sigue reproduciéndose
              if (isActive && videoRefs.current[index]) {
                const video = videoRefs.current[index];
                if (video.paused) {
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
          const activeIndex = ((currentVideoIndex % videos.length) + videos.length) % videos.length;
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
