'use client';

import { useState, useRef } from 'react';

interface VideoFile {
  id: string;
  name: string;
  url: string;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsLoading(true);
    const newVideos: VideoFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        newVideos.push({
          id: Date.now().toString() + i,
          name: file.name,
          url,
        });
      }
    }

    setVideos((prev) => [...prev, ...newVideos]);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeVideo = (id: string) => {
    setVideos((prev) => {
      const video = prev.find((v) => v.id === id);
      if (video) {
        URL.revokeObjectURL(video.url);
      }
      return prev.filter((v) => v.id !== id);
    });
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

        {isLoading && (
          <div className="text-center text-gray-400 mb-8">Cargando videos...</div>
        )}

        {/* Grid de videos */}
        {videos.length === 0 ? (
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

