import { NextRequest, NextResponse } from 'next/server';
import { setFileInKV } from '@/lib/file-storage';

// POST - Subir archivo
export async function POST(request: NextRequest, context?: { env?: any }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('type') as string; // 'video' | 'photo'

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 });
    }

    // Convertir archivo a base64 para almacenamiento temporal
    // En producción, esto se subirá a Cloudflare R2
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Guardar en almacenamiento compartido
    // @ts-ignore - env puede estar disponible en Cloudflare Pages
    const env = (globalThis as any).process?.env || context?.env;
    await setFileInKV(id, {
      data: dataUrl,
      name: file.name,
      type: file.type,
      uploadedAt: Date.now(),
    }, env);

    const fileData = {
      id,
      name: file.name,
      url: dataUrl,
      type: file.type,
      uploadedAt: Date.now(),
    };

    return NextResponse.json(fileData);
  } catch (error) {
    console.error('Error subiendo archivo:', error);
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 });
  }
}

