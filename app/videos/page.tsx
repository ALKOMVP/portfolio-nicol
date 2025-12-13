'use client';

import { useState, useRef, useEffect } from 'react';
import { uploadFile, getAllFiles, deleteFile } from '@/lib/api-storage';

interface VideoFile {
  id: string;
  name: string;
  url: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar videos compartidos al iniciar
  useEffect(() => {
    const loadSharedVideos = async () => {
      try {
        // Intentar cargar desde el servidor (compartido)
        const sharedVideos = await getAllFiles('video');
        setVideos(sharedVideos);
        
        // Guardar en localStorage como cache
        localStorage.setItem('portfolio-videos', JSON.stringify(sharedVideos));
      } catch (error) {
        console.error('Error cargando videos compartidos:', error);
        // Fallback: cargar desde localStorage si hay error
        try {
          const cached = localStorage.getItem('portfolio-videos');
          if (cached) {
            setVideos(JSON.parse(cached));
          }
        } catch (e) {
          console.error('Error cargando desde cache:', e);
        }
      } finally {
        setIsInitializing(false);
      }
    };
    loadSharedVideos();
    
    // Recargar periódicamente para obtener nuevos archivos
    const interval = setInterval(() => {
      getAllFiles('video')
        .then((videos) => {
          setVideos(videos);
          localStorage.setItem('portfolio-videos', JSON.stringify(videos));
        })
        .catch(() => {});
    }, 30000); // Cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsLoading(true);
    const newVideos: VideoFile[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('video/')) {
          // Subir al servidor (compartido)
          const uploadedFile = await uploadFile(file, 'video');
          newVideos.push({
            id: uploadedFile.id,
            name: uploadedFile.name,
            url: uploadedFile.url,
          });
        }
      }

      setVideos((prev) => [...prev, ...newVideos]);
    } catch (error) {
      console.error('Error subiendo videos:', error);
      alert('Error al subir videos. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeVideo = async (id: string) => {
    try {
      // Eliminar del servidor (compartido)
      await deleteFile(id, 'video');
      // Eliminar del estado
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error('Error eliminando video:', error);
      alert('Error al eliminar video. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Videos
          </h1>
          <p className="text-gray-400 text-lg">
            Galería de videos de acrobacia y circo
          </p>
        </div>

        {/* Botón de carga */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-4 glass rounded-lg hover-glow font-medium transition-all"
          >
            Cargar Videos
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {isInitializing && (
          <div className="text-center text-gray-400 mb-8">Cargando videos guardados...</div>
        )}

        {isLoading && (
          <div className="text-center text-gray-400 mb-8">Subiendo videos...</div>
        )}

        {/* Grid de videos */}
        {!isInitializing && videos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No hay videos cargados aún. ¡Comienza agregando algunos!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="relative group glass rounded-lg overflow-hidden hover-glow"
              >
                <video
                  src={video.url}
                  controls
                  className="w-full h-64 object-cover"
                >
                  Tu navegador no soporta videos HTML5.
                </video>
                <div className="p-4">
                  <h3 className="font-medium mb-2 truncate">{video.name}</h3>
                  <button
                    onClick={() => removeVideo(video.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

