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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {driveVideos.map((video) => (
              <div
                key={video.id}
                className="relative group glass rounded-lg overflow-hidden hover-glow"
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
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2 truncate" title={video.name}>
                    {video.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Google Drive</span>
                    <div className="flex gap-2">
                      {video.directUrl && (
                        <a
                          href={video.directUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Ver en Drive
                        </a>
                      )}
                      {video.downloadUrl && (
                        <a
                          href={video.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Descargar
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

