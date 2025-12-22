import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const folderId = process.env.GOOGLE_DRIVE_PHOTOS_FOLDER_ID;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!folderId) {
      return NextResponse.json(
        { error: 'GOOGLE_DRIVE_PHOTOS_FOLDER_ID not configured' },
        { status: 500 }
      );
    }

    // Construir URL de la API de Google Drive
    const query = `'${folderId}' in parents and (mimeType contains 'image/' or mimeType='image/jpeg' or mimeType='image/png' or mimeType='image/gif' or mimeType='image/webp' or mimeType='image/bmp' or mimeType='image/tiff') and trashed=false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,size,createdTime,modifiedTime,thumbnailLink)&orderBy=createdTime desc${apiKey ? `&key=${apiKey}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Drive API error:', errorText);
      return NextResponse.json(
        { 
          error: 'Failed to fetch photos from Google Drive',
          details: errorText,
          folderId: folderId,
          hasApiKey: !!apiKey
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    const files = data.files || [];

    console.log(`Found ${files.length} photos in folder ${folderId}`);

    // Convertir a formato compatible con el frontend
    const photos = files.map((file: any) => {
      const viewUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
      const highResUrl = file.thumbnailLink 
        ? file.thumbnailLink.replace(/=s\d+/, '')
        : viewUrl;
      const thumbnailUrl = file.thumbnailLink 
        ? file.thumbnailLink.replace(/=s\d+/, '=s400')
        : `https://drive.google.com/uc?export=view&id=${file.id}`;
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;

      return {
        id: `drive-${file.id}`,
        name: file.name,
        url: thumbnailUrl,
        viewUrl: highResUrl,
        downloadUrl: downloadUrl,
        type: 'photo',
        source: 'google-drive',
        size: file.size,
        createdTime: file.createdTime,
        modifiedTime: file.modifiedTime,
      };
    });

    return NextResponse.json(photos, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Error fetching Google Drive photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos from Google Drive' },
      { status: 500 }
    );
  }
}

