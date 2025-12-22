import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!folderId) {
      return NextResponse.json(
        { error: 'GOOGLE_DRIVE_FOLDER_ID not configured' },
        { status: 500 }
      );
    }

    // Construir URL de la API de Google Drive
    const query = `'${folderId}' in parents and mimeType contains 'video' and trashed=false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,size,createdTime,modifiedTime)&orderBy=createdTime desc${apiKey ? `&key=${apiKey}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Drive API error:', errorText);
      return NextResponse.json(
        { 
          error: 'Failed to fetch videos from Google Drive',
          details: errorText,
          folderId: folderId,
          hasApiKey: !!apiKey
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const files = data.files || [];

    // Convertir a formato compatible con el frontend
    const videos = files.map((file: any) => {
      // URL para embed de Google Drive
      const embedUrl = `https://drive.google.com/file/d/${file.id}/preview`;
      // URL directa de descarga
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
      // URL alternativa
      const directUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;

      return {
        id: `drive-${file.id}`,
        name: file.name,
        url: embedUrl,
        downloadUrl: downloadUrl,
        directUrl: directUrl,
        alternativeUrl: directUrl,
        type: 'video',
        source: 'google-drive',
        size: file.size,
        createdTime: file.createdTime,
        modifiedTime: file.modifiedTime,
      };
    });

    return NextResponse.json(videos, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching Google Drive videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos from Google Drive' },
      { status: 500 }
    );
  }
}

