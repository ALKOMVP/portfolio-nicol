export async function onRequestPost(context: {
  request: Request;
  env: {
    FILES_KV: any;
  };
}) {
  try {
    const formData = await context.request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as 'video' | 'photo';

    if (!file || !type) {
      return new Response(JSON.stringify({ error: 'Missing file or type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Limitar tamaño a 20MB (KV tiene límite de 25MB)
    const MAX_SIZE = 20 * 1024 * 1024; // 20MB
    if (file.size > MAX_SIZE) {
      return new Response(
        JSON.stringify({ error: `File too large. Maximum size is ${MAX_SIZE / 1024 / 1024}MB` }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const fileId = `${type}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const arrayBuffer = await file.arrayBuffer();
    
    // Convertir ArrayBuffer a base64 de forma segura
    const bytes = new Uint8Array(arrayBuffer);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    const dataUrl = `data:${file.type};base64,${base64}`;

    // Guardar archivo completo en KV (base64)
    await context.env.FILES_KV.put(fileId, dataUrl, {
      metadata: {
        name: file.name,
        type: type,
        contentType: file.type,
        uploadedAt: Date.now().toString(),
      },
    });

    // Guardar metadatos para listado rápido
    await context.env.FILES_KV.put(
      `meta:${fileId}`,
      JSON.stringify({
        id: fileId,
        name: file.name,
        type: type,
        uploadedAt: Date.now(),
      })
    );

    const fileUrl = `/api/files/${fileId}`;

    return new Response(
      JSON.stringify({
        id: fileId,
        name: file.name,
        url: fileUrl,
        type: type,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return new Response(JSON.stringify({ error: 'Failed to upload file' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

