// Utilidades para almacenar archivos en IndexedDB

const DB_NAME = 'portfolio-nicol-db';
const DB_VERSION = 1;
const STORE_VIDEOS = 'videos';
const STORE_PHOTOS = 'photos';

interface FileData {
  id: string;
  name: string;
  blob: Blob;
  type: string;
  uploadedAt: number;
}

// Inicializar base de datos
function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORE_VIDEOS)) {
        const videoStore = db.createObjectStore(STORE_VIDEOS, { keyPath: 'id' });
        videoStore.createIndex('uploadedAt', 'uploadedAt', { unique: false });
      }
      
      if (!db.objectStoreNames.contains(STORE_PHOTOS)) {
        const photoStore = db.createObjectStore(STORE_PHOTOS, { keyPath: 'id' });
        photoStore.createIndex('uploadedAt', 'uploadedAt', { unique: false });
      }
    };
  });
}

// Guardar archivo
export async function saveFile(
  file: File,
  type: 'video' | 'photo'
): Promise<string> {
  const db = await initDB();
  const storeName = type === 'video' ? STORE_VIDEOS : STORE_PHOTOS;
  const store = db.transaction(storeName, 'readwrite').objectStore(storeName);

  const fileData: FileData = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: file.name,
    blob: file,
    type: file.type,
    uploadedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const request = store.add(fileData);
    request.onsuccess = () => resolve(fileData.id);
    request.onerror = () => reject(request.error);
  });
}

// Obtener todos los archivos
export async function getAllFiles(type: 'video' | 'photo'): Promise<FileData[]> {
  const db = await initDB();
  const storeName = type === 'video' ? STORE_VIDEOS : STORE_PHOTOS;
  const store = db.transaction(storeName, 'readonly').objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Obtener URL de blob desde ID
export async function getFileUrl(id: string, type: 'video' | 'photo'): Promise<string | null> {
  const db = await initDB();
  const storeName = type === 'video' ? STORE_VIDEOS : STORE_PHOTOS;
  const store = db.transaction(storeName, 'readonly').objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => {
      if (request.result) {
        const url = URL.createObjectURL(request.result.blob);
        resolve(url);
      } else {
        resolve(null);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

// Eliminar archivo
export async function deleteFile(id: string, type: 'video' | 'photo'): Promise<void> {
  const db = await initDB();
  const storeName = type === 'video' ? STORE_VIDEOS : STORE_PHOTOS;
  const store = db.transaction(storeName, 'readwrite').objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Cargar todos los archivos y crear URLs
export async function loadAllFilesWithUrls(
  type: 'video' | 'photo'
): Promise<Array<{ id: string; name: string; url: string }>> {
  const files = await getAllFiles(type);
  return files.map((file) => ({
    id: file.id,
    name: file.name,
    url: URL.createObjectURL(file.blob),
  }));
}

