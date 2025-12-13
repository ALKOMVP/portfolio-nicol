'use client';

import { useState, useRef, useEffect } from 'react';
import { uploadFile, getFiles, deleteFile } from '@/lib/api-storage';

interface PhotoFile {
  id: string;
  name: string;
  url: string;
}

export default function FotografiaPage() {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cargar fotos compartidas al iniciar
  useEffect(() => {
    const loadSharedPhotos = async () => {
      try {
        const sharedPhotos = await getFiles('photo');
        setPhotos(sharedPhotos);
      } catch (error) {
        console.error('Error cargando fotos compartidas:', error);
      } finally {
        setIsInitializing(false);
      }
    };
    loadSharedPhotos();
    
    // Recargar periódicamente para obtener nuevos archivos
    const interval = setInterval(() => {
      getFiles('photo')
        .then((photos) => setPhotos(photos))
        .catch(() => {});
    }, 30000); // Cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsLoading(true);
    const newPhotos: PhotoFile[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          // Subir al servidor (compartido)
          const uploadedFile = await uploadFile(file, 'photo');
          newPhotos.push({
            id: uploadedFile.id,
            name: uploadedFile.name,
            url: uploadedFile.url,
          });
        }
      }

      setPhotos((prev) => [...prev, ...newPhotos]);
    } catch (error) {
      console.error('Error subiendo fotos:', error);
      alert('Error al subir fotos. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removePhoto = async (id: string) => {
    try {
      // Eliminar del servidor (compartido)
      await deleteFile(id, 'photo');
      // Eliminar del estado
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error eliminando foto:', error);
      alert('Error al eliminar foto. Por favor, intenta nuevamente.');
    }
  };

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

        {/* Botón de carga */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-4 glass rounded-lg hover-glow font-medium transition-all"
          >
            Cargar Imágenes
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {isInitializing && (
          <div className="text-center text-gray-400 mb-8">Cargando fotos guardadas...</div>
        )}

        {isLoading && (
          <div className="text-center text-gray-400 mb-8">Subiendo imágenes...</div>
        )}

        {/* Grid de fotos */}
        {!isInitializing && photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No hay fotografías cargadas aún. ¡Comienza agregando algunas!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="relative group glass rounded-lg overflow-hidden hover-glow cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-64 object-contain bg-black transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-medium">
                    Ver más
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(photo.id);
                  }}
                  className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="w-4 h-4"
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
              src={selectedPhoto.url}
              alt={selectedPhoto.name}
              className="max-w-full max-h-[90vh] object-contain bg-black/50 rounded-lg"
            />
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

