'use client';

import { useState, useEffect } from 'react';
import { getGoogleDrivePhotos } from '@/lib/api-storage';

interface PhotoFile {
  id: string;
  name: string;
  url: string;
  source?: 'google-drive';
  viewUrl?: string;
  downloadUrl?: string;
}

export default function FotografiaPage() {
  const [drivePhotos, setDrivePhotos] = useState<PhotoFile[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoFile | null>(null);

  // Cargar fotos de Google Drive al iniciar
  useEffect(() => {
    const loadGoogleDrivePhotos = async () => {
      try {
        // Cargar fotos de Google Drive
        const googlePhotos = await getGoogleDrivePhotos();
        console.log('Fotos de Google Drive cargadas:', googlePhotos);
        setDrivePhotos(googlePhotos);
      } catch (error) {
        console.error('Error cargando fotos de Google Drive:', error);
        setDrivePhotos([]);
      } finally {
        setIsInitializing(false);
      }
    };
    loadGoogleDrivePhotos();
    
    // Recargar periódicamente para obtener nuevos archivos
    const interval = setInterval(() => {
      getGoogleDrivePhotos()
        .then((photos) => {
          console.log('Fotos de Google Drive actualizadas:', photos);
          setDrivePhotos(photos);
        })
        .catch((error) => {
          console.error('Error actualizando fotos de Google Drive:', error);
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
            Fotografía
          </h1>
          <p className="text-gray-400 text-lg">
            Galería de fotografías de acrobacia y circo
          </p>
        </div>

        {isInitializing && (
          <div className="text-center text-gray-400 mb-8">Cargando fotos...</div>
        )}

        {/* Grid de fotos */}
        {!isInitializing && drivePhotos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No hay fotografías disponibles aún.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {drivePhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative group glass rounded-lg overflow-hidden hover-glow cursor-pointer bg-black"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-medium">
                    Ver más
                  </span>
                </div>
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Google Drive
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de foto ampliada */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <img
              src={selectedPhoto.viewUrl || selectedPhoto.url}
              alt={selectedPhoto.name}
              className="max-w-full max-h-[90vh] object-contain bg-black/50 rounded-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <p className="text-white font-medium">{selectedPhoto.name}</p>
              {selectedPhoto.downloadUrl && (
                <a
                  href={selectedPhoto.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  Descargar
                </a>
              )}
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white rounded-full p-3"
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
    </div>
  );
}

