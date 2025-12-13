export async function onRequestGet(
  context: {
    request: Request;
    params: { id: string };
    env: {
      FILES_KV: any;
    };
  }
) {
  try {
    const fileId = context.params.id;
    const fileData = await context.env.FILES_KV.getWithMetadata(fileId);

    if (!fileData.value) {
      return new Response('File not found', { status: 404 });
    }

    // El archivo está almacenado como data URL (base64)
    const dataUrl = fileData.value as string;
    const metadata = fileData.metadata as {
      name: string;
      type: string;
      contentType: string;
      uploadedAt: string;
    };

    // Extraer el base64 del data URL
    const base64Match = dataUrl.match(/^data:.*?;base64,(.+)$/);
    if (!base64Match) {
      return new Response('Invalid file format', { status: 500 });
    }

    const base64 = base64Match[1];
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return new Response(bytes, {
      headers: {
        'Content-Type': metadata.contentType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${metadata.name}"`,
      },
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return new Response('Failed to fetch file', { status: 500 });
  }
}

export async function onRequestDelete(
  context: {
    request: Request;
    params: { id: string };
    env: {
      FILES_KV: any;
    };
  }
) {
  try {
    const fileId = context.params.id;

    // Eliminar archivo de KV
    await context.env.FILES_KV.delete(fileId);

    // Eliminar metadatos de KV
    await context.env.FILES_KV.delete(`meta:${fileId}`);

    return new Response(
      JSON.stringify({ message: 'File deleted successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error deleting file:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete file' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

