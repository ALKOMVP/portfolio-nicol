import { NextRequest, NextResponse } from 'next/server';
import { getAllFilesFromKV } from '@/lib/file-storage';

// GET - Obtener todas las fotos
export async function GET(request: NextRequest, context?: { env?: any }) {
  try {
    // @ts-ignore - env puede estar disponible en Cloudflare Pages
    const env = (globalThis as any).process?.env || context?.env;
    // Obtener todas las fotos del almacenamiento compartido
    const files = await getAllFilesFromKV('photo', env);
    const photos = files.map(([id, file]) => ({
      id,
      name: file.name,
      url: file.data,
      type: file.type,
      uploadedAt: file.uploadedAt,
    }))
    .sort((a, b) => b.uploadedAt - a.uploadedAt);

    return NextResponse.json(photos);
  } catch (error) {
    console.error('Error obteniendo fotos:', error);
    return NextResponse.json({ error: 'Error al obtener fotos' }, { status: 500 });
  }
}

