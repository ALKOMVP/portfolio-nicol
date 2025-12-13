import { NextRequest, NextResponse } from 'next/server';
import { getAllFilesFromKV } from '@/lib/file-storage';

// GET - Obtener todos los videos
export async function GET(request: NextRequest, context?: { env?: any }) {
  try {
    // @ts-ignore - env puede estar disponible en Cloudflare Pages
    const env = (globalThis as any).process?.env || context?.env;
    // Obtener todos los videos del almacenamiento compartido
    const files = await getAllFilesFromKV('video', env);
    const videos = files.map(([id, file]) => ({
      id,
      name: file.name,
      url: file.data,
      type: file.type,
      uploadedAt: file.uploadedAt,
    }))
    .sort((a, b) => b.uploadedAt - a.uploadedAt);

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error obteniendo videos:', error);
    return NextResponse.json({ error: 'Error al obtener videos' }, { status: 500 });
  }
}

