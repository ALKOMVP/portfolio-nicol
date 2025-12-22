export async function onRequestGet(context: {
  request: Request;
  env: {
    GOOGLE_DRIVE_PHOTOS_FOLDER_ID?: string;
    GOOGLE_API_KEY?: string;
  };
}) {
  try {
    const folderId = context.env.GOOGLE_DRIVE_PHOTOS_FOLDER_ID;
    const apiKey = context.env.GOOGLE_API_KEY;

    if (!folderId) {
      return new Response(
        JSON.stringify({ error: 'GOOGLE_DRIVE_PHOTOS_FOLDER_ID not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Construir URL de la API de Google Drive
    // q parameter busca archivos de imagen en la carpeta específica
    // Incluye múltiples tipos MIME de imágenes para asegurar que se encuentren todas
    const query = `'${folderId}' in parents and (mimeType contains 'image/' or mimeType='image/jpeg' or mimeType='image/png' or mimeType='image/gif' or mimeType='image/webp' or mimeType='image/bmp' or mimeType='image/tiff') and trashed=false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,size,createdTime,modifiedTime,thumbnailLink)&orderBy=createdTime desc${apiKey ? `&key=${apiKey}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Drive API error:', errorText);
      // Retornar error detallado para debugging
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch photos from Google Drive',
          details: errorText,
          folderId: folderId,
          hasApiKey: !!apiKey
        }),
        {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    const files = data.files || [];

    // Log para debugging con más detalles
    console.log(`Found ${files.length} photos in folder ${folderId}`);
    if (files.length > 0) {
      console.log('Photo names:', files.map((f: any) => f.name).join(', '));
    }

    // Convertir a formato compatible con el frontend
    const photos = files.map((file: any) => {
      // URL directa de visualización en máxima calidad (sin límite de tamaño)
      // Usar el ID directamente con export=view para obtener la imagen completa
      const viewUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
      // URL alternativa usando el thumbnailLink pero sin restricción de tamaño
      const highResUrl = file.thumbnailLink 
        ? file.thumbnailLink.replace(/=s\d+/, '') // Quitar restricción de tamaño para máxima resolución
        : viewUrl;
      // URL para thumbnail (más pequeña para el grid)
      const thumbnailUrl = file.thumbnailLink 
        ? file.thumbnailLink.replace(/=s\d+/, '=s400') // Tamaño mediano para thumbnails
        : `https://drive.google.com/uc?export=view&id=${file.id}`;
      // URL de descarga
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;

      return {
        id: `drive-${file.id}`,
        name: file.name,
        url: thumbnailUrl, // URL del thumbnail para el grid
        viewUrl: highResUrl, // URL en máxima calidad para el modal (sin restricción de tamaño)
        downloadUrl: downloadUrl,
        type: 'photo',
        source: 'google-drive',
        size: file.size,
        createdTime: file.createdTime,
        modifiedTime: file.modifiedTime,
      };
    });

    // Incluir información de debugging en la respuesta
    const responseData = {
      photos: photos,
      debug: {
        folderId: folderId,
        totalFiles: files.length,
        hasApiKey: !!apiKey,
        fileNames: files.map((f: any) => f.name),
      }
    };

    return new Response(JSON.stringify(responseData.photos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Sin caché para ver cambios inmediatos
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching Google Drive photos:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch photos from Google Drive' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

