import { NextRequest, NextResponse } from 'next/server';
import { deleteFileFromKV } from '@/lib/file-storage';

// DELETE - Eliminar archivo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
  context?: { env?: any }
) {
  try {
    const { id } = params;
    
    // @ts-ignore - env puede estar disponible en Cloudflare Pages
    const env = (globalThis as any).process?.env || context?.env;
    // Eliminar del almacenamiento compartido
    const deleted = await deleteFileFromKV(id, env);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error eliminando archivo:', error);
    return NextResponse.json({ error: 'Error al eliminar archivo' }, { status: 500 });
  }
}

