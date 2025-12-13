// Utilidades para interactuar con las Cloudflare Pages Functions

interface StoredFile {
  id: string;
  name: string;
  url: string;
  type: 'video' | 'photo';
  source?: 'uploaded' | 'google-drive';
  downloadUrl?: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
}

export async function uploadFile(file: File, type: 'video' | 'photo'): Promise<StoredFile> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to upload file' }));
    throw new Error(error.error || 'Failed to upload file');
  }

  return response.json();
}

export async function getFiles(type: 'video' | 'photo'): Promise<StoredFile[]> {
  const endpoint = type === 'video' ? '/api/files/videos' : '/api/files/photos';
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} files`);
  }

  return response.json();
}

export async function getGoogleDriveVideos(): Promise<StoredFile[]> {
  const response = await fetch('/api/drive/videos');

  if (!response.ok) {
    // Si falla, retornar array vacío en lugar de lanzar error
    console.warn('Failed to fetch Google Drive videos');
    return [];
  }

  return response.json();
}

export async function deleteFile(id: string, type: 'video' | 'photo'): Promise<void> {
  // No permitir eliminar archivos de Google Drive desde aquí
  if (id.startsWith('drive-')) {
    throw new Error('Cannot delete Google Drive files from this interface');
  }

  const response = await fetch(`/api/files/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete file');
  }
}

