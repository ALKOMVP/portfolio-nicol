export async function onRequestGet(context: {
  request: Request;
  env: {
    GOOGLE_DRIVE_HOME_FOLDER_ID?: string;
    GOOGLE_API_KEY?: string;
  };
}) {
  try {
    const folderId = context.env.GOOGLE_DRIVE_HOME_FOLDER_ID || '1Gj3qv_TpqaQ7WQ0YwB1Anf3IQ4fpicCz';
    const apiKey = context.env.GOOGLE_API_KEY;

    // Construir URL de la API de Google Drive
    // q parameter busca archivos de video en la carpeta específica
    const query = `'${folderId}' in parents and mimeType contains 'video' and trashed=false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,size,createdTime,modifiedTime)&orderBy=createdTime desc${apiKey ? `&key=${apiKey}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Drive API error:', errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch home videos from Google Drive',
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
    // Para la portada, necesitamos URLs directas para usar en elementos <video>
    const videos = files.map((file: any) => {
      // Múltiples URLs para intentar, en orden de preferencia
      // 1. URL con uc?export=view (a veces funciona mejor)
      const viewUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
      // 2. URL con uc?export=download
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
      // 3. URL alternativa con confirmación
      const altUrl = `https://drive.google.com/uc?id=${file.id}&export=download`;

      return {
        id: `drive-${file.id}`,
        name: file.name,
        url: viewUrl, // Intentar primero con view
        alternativeUrl: downloadUrl, // Fallback a download
        thirdUrl: altUrl, // Tercera opción
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
    console.error('Error fetching Google Drive home videos:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch home videos from Google Drive' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

