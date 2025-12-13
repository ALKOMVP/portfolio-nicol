export async function onRequestGet(
  context: {
    request: Request;
    params: { type: string };
    env: {
      FILES_KV: any;
    };
  }
) {
  try {
    const type = context.params.type;
    if (type !== 'videos' && type !== 'photos') {
      return new Response(JSON.stringify({ error: 'Invalid type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const fileType = type === 'videos' ? 'video' : 'photo';
    const prefix = `meta:${fileType}-`;

    // Listar todas las keys con el prefijo
    const keys = await context.env.FILES_KV.list({ prefix });
    const files = [];

    for (const key of keys.keys) {
      const metaData = await context.env.FILES_KV.get(key.name);
      if (metaData) {
        const meta = JSON.parse(metaData);
        files.push({
          id: meta.id,
          name: meta.name,
          url: `/api/files/${meta.id}`,
          type: meta.type,
        });
      }
    }

    // Ordenar por fecha de subida (más recientes primero)
    files.sort((a, b) => {
      const aId = a.id.split('-')[1];
      const bId = b.id.split('-')[1];
      return parseInt(bId) - parseInt(aId);
    });

    return new Response(JSON.stringify(files), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch files' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

