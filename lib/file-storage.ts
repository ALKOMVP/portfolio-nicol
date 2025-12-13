// Almacenamiento usando Cloudflare KV para persistencia compartida

interface StoredFile {
  data: string; // base64 data URL
  name: string;
  type: string;
  uploadedAt: number;
}

// Storage en memoria compartido (funciona mientras el servidor esté activo)
// Para persistencia permanente, configurar Cloudflare KV
const storage = new Map<string, StoredFile>();

// Helper para obtener storage desde KV (cuando esté configurado)
export async function getFileFromKV(key: string, env?: any): Promise<StoredFile | null> {
  // Si hay KV configurado, usarlo
  if (env?.FILES) {
    const data = await env.FILES.get(key);
    return data ? JSON.parse(data) : null;
  }
  // Fallback a Map en memoria
  return storage.get(key) || null;
}

export async function setFileInKV(key: string, file: StoredFile, env?: any): Promise<void> {
  // Si hay KV configurado, usarlo
  if (env?.FILES) {
    await env.FILES.put(key, JSON.stringify(file));
  } else {
    // Fallback a Map en memoria
    storage.set(key, file);
  }
}

export async function deleteFileFromKV(key: string, env?: any): Promise<boolean> {
  // Si hay KV configurado, usarlo
  if (env?.FILES) {
    await env.FILES.delete(key);
    return true;
  } else {
    // Fallback a Map en memoria
    return storage.delete(key);
  }
}

export async function getAllFilesFromKV(type: 'video' | 'photo', env?: any): Promise<Array<[string, StoredFile]>> {
  // Si hay KV configurado, listar desde KV
  if (env?.FILES) {
    const keys = await env.FILES.list();
    const files: Array<[string, StoredFile]> = [];
    
    for (const key of keys.keys) {
      const data = await env.FILES.get(key.name);
      if (data) {
        const file: StoredFile = JSON.parse(data);
        const isMatch = type === 'video' 
          ? file.type.startsWith('video/')
          : file.type.startsWith('image/');
        if (isMatch) {
          files.push([key.name, file]);
        }
      }
    }
    return files;
  }
  
  // Fallback a Map en memoria
  return Array.from(storage.entries()).filter(([_, file]) => {
    return type === 'video' 
      ? file.type.startsWith('video/')
      : file.type.startsWith('image/');
  });
}
