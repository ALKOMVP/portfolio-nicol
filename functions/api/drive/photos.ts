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
    const query = `'${folderId}' in parents and mimeType contains 'image' and trashed=false`;
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

    // Convertir a formato compatible con el frontend
    const photos = files.map((file: any) => {
      // URL directa de visualización en alta calidad (usar export=view para mejor calidad)
      const viewUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
      // URL de descarga
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
      // URL para thumbnail (más pequeña para el grid)
      const thumbnailUrl = file.thumbnailLink 
        ? file.thumbnailLink.replace(/=s\d+/, '=s400') // Tamaño mediano para thumbnails
        : `https://drive.google.com/uc?export=view&id=${file.id}`;

      return {
        id: `drive-${file.id}`,
        name: file.name,
        url: thumbnailUrl, // URL del thumbnail para el grid
        viewUrl: viewUrl, // URL en alta calidad para el modal
        downloadUrl: downloadUrl,
        type: 'photo',
        source: 'google-drive',
        size: file.size,
        createdTime: file.createdTime,
        modifiedTime: file.modifiedTime,
      };
    });

    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300', // Cache por 5 minutos
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

