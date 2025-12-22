// Utilidades para interactuar con Google Drive a través de Cloudflare Pages Functions

interface StoredFile {
  id: string;
  name: string;
  url: string;
  type: 'video' | 'photo';
  source?: 'google-drive';
  downloadUrl?: string;
  viewUrl?: string;
  directUrl?: string;
  alternativeUrl?: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
}

export async function getGoogleDriveVideos(): Promise<StoredFile[]> {
  try {
    const response = await fetch('/api/drive/videos');

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Failed to fetch Google Drive videos:', {
        status: response.status,
        error: errorData
      });
      return [];
    }

    const videos = await response.json();
    if (Array.isArray(videos)) {
      return videos;
    } else if (videos.error) {
      console.error('Google Drive API error:', videos);
      return [];
    }
    
    return videos;
  } catch (error) {
    console.error('Error fetching Google Drive videos:', error);
    return [];
  }
}

export async function getGoogleDrivePhotos(): Promise<StoredFile[]> {
  try {
    // Agregar timestamp para evitar caché del navegador
    const response = await fetch(`/api/drive/photos?t=${Date.now()}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Failed to fetch Google Drive photos:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // Mostrar mensaje más útil según el error
      if (response.status === 500 && errorData.error === 'GOOGLE_DRIVE_PHOTOS_FOLDER_ID not configured') {
        console.error('⚠️ La variable GOOGLE_DRIVE_PHOTOS_FOLDER_ID no está configurada en Cloudflare Pages');
      }
      
      return [];
    }

    const photos = await response.json();
    if (Array.isArray(photos)) {
      console.log(`✅ Se obtuvieron ${photos.length} fotos de Google Drive`);
      return photos;
    } else if (photos.error) {
      console.error('❌ Google Drive API error:', photos);
      return [];
    }
    
    return photos;
  } catch (error) {
    console.error('❌ Error fetching Google Drive photos:', error);
    return [];
  }
}

export async function getGoogleDriveHomeVideos(): Promise<StoredFile[]> {
  try {
    const response = await fetch('/api/drive/home-videos');

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Failed to fetch Google Drive home videos:', {
        status: response.status,
        error: errorData
      });
      return [];
    }

    const videos = await response.json();
    if (Array.isArray(videos)) {
      return videos;
    } else if (videos.error) {
      console.error('Google Drive API error:', videos);
      return [];
    }
    
    return videos;
  } catch (error) {
    console.error('Error fetching Google Drive home videos:', error);
    return [];
  }
}
