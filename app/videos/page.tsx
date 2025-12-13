'use client';

import { useState, useEffect } from 'react';
import { getGoogleDriveVideos } from '@/lib/api-storage';

interface VideoFile {
  id: string;
  name: string;
  url: string;
  source?: 'google-drive';
  downloadUrl?: string;
  directUrl?: string;
}

export default function VideosPage() {
  const [driveVideos, setDriveVideos] = useState<VideoFile[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // Cargar videos de Google Drive al iniciar
  useEffect(() => {
    const loadGoogleDriveVideos = async () => {
      try {
        // Cargar videos de Google Drive
        const googleVideos = await getGoogleDriveVideos();
        console.log('Videos de Google Drive cargados:', googleVideos);
        // Filtrar solo videos de Google Drive y mapear al tipo correcto
        const mappedVideos: VideoFile[] = googleVideos.map(v => ({
          id: v.id,
          name: v.name,
          url: v.url,
          source: 'google-drive' as const,
          downloadUrl: v.downloadUrl,
          directUrl: v.directUrl,
          alternativeUrl: v.alternativeUrl,
        }));
        setDriveVideos(mappedVideos);
      } catch (error) {
        console.error('Error cargando videos de Google Drive:', error);
        setDriveVideos([]);
      } finally {
        setIsInitializing(false);
      }
    };
    loadGoogleDriveVideos();
    
    // Recargar periódicamente para obtener nuevos archivos
    const interval = setInterval(() => {
      getGoogleDriveVideos()
        .then((videos) => {
          console.log('Videos de Google Drive actualizados:', videos);
          const mappedVideos: VideoFile[] = videos.map(v => ({
            id: v.id,
            name: v.name,
            url: v.url,
            source: 'google-drive' as const,
            downloadUrl: v.downloadUrl,
            directUrl: v.directUrl,
            alternativeUrl: v.alternativeUrl,
          }));
          setDriveVideos(mappedVideos);
        })
        .catch((error) => {
          console.error('Error actualizando videos de Google Drive:', error);
        });
    }, 30000); // Cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

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

        {isInitializing && (
          <div className="text-center text-gray-400 mb-8">Cargando videos...</div>
        )}

        {/* Grid de videos */}
        {!isInitializing && driveVideos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No hay videos disponibles aún.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {driveVideos.map((video) => (
                <div
                  key={video.id}
                  className="relative group glass rounded-lg overflow-hidden hover-glow cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative w-full h-64 bg-black flex items-center justify-center">
                    <iframe
                      src={video.url}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={video.name}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 text-white font-medium">
                        Ver en pantalla completa
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2 truncate" title={video.name}>
                      {video.name}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400">Google Drive</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal de video ampliado */}
            {selectedVideo && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                onClick={() => setSelectedVideo(null)}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-full max-w-[95vw] max-h-[95vh] bg-black">
                    <iframe
                      src={selectedVideo.url}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={selectedVideo.name}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 px-4 py-2 rounded-lg">
                    <p className="text-white font-medium truncate mr-4">{selectedVideo.name}</p>
                  </div>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white rounded-full p-3 z-10"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

