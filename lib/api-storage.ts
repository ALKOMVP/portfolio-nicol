// Utilidades para almacenar archivos compartidos a través de API

interface FileData {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: number;
}

// Subir archivo al servidor
export async function uploadFile(file: File, type: 'video' | 'photo'): Promise<FileData> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al subir archivo');
  }

  return response.json();
}

// Obtener todos los archivos del servidor
export async function getAllFiles(type: 'video' | 'photo'): Promise<FileData[]> {
  const endpoint = type === 'video' ? '/api/files/videos' : '/api/files/photos';
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Error al obtener archivos');
  }

  return response.json();
}

// Eliminar archivo del servidor
export async function deleteFile(id: string, type: 'video' | 'photo'): Promise<void> {
  const response = await fetch(`/api/files/${id}?type=${type}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar archivo');
  }
}

