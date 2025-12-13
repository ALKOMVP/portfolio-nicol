export async function onRequestGet(context: {
  request: Request;
  env: {
    GOOGLE_DRIVE_FOLDER_ID?: string;
    GOOGLE_API_KEY?: string;
  };
}) {
  try {
    const folderId = context.env.GOOGLE_DRIVE_FOLDER_ID;
    const apiKey = context.env.GOOGLE_API_KEY;

    if (!folderId) {
      return new Response(
        JSON.stringify({ error: 'GOOGLE_DRIVE_FOLDER_ID not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Construir URL de la API de Google Drive
    // q parameter busca archivos de video en la carpeta específica
    const query = `'${folderId}' in parents and mimeType contains 'video' and trashed=false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,size,createdTime,modifiedTime)&orderBy=createdTime desc${apiKey ? `&key=${apiKey}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Drive API error:', errorText);
      // Retornar error detallado para debugging
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch videos from Google Drive',
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
    const videos = files.map((file: any) => {
      // URL de visualización en iframe (preview de Google Drive)
      const viewUrl = `https://drive.google.com/file/d/${file.id}/preview`;
      // URL directa para video (mejor calidad, requiere que el archivo esté compartido públicamente)
      const directUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
      // URL alternativa usando uc?export=view (puede funcionar mejor en algunos casos)
      const alternativeUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;

      return {
        id: `drive-${file.id}`,
        name: file.name,
        url: viewUrl, // URL de preview para iframe (recomendado)
        directUrl: directUrl, // URL directa para descarga/reproducción
        alternativeUrl: alternativeUrl, // URL alternativa
        downloadUrl: directUrl,
        type: 'video',
        source: 'google-drive',
        size: file.size,
        createdTime: file.createdTime,
        modifiedTime: file.modifiedTime,
      };
    });

    return new Response(JSON.stringify(videos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300', // Cache por 5 minutos
      },
    });
  } catch (error) {
    console.error('Error fetching Google Drive videos:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch videos from Google Drive' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

