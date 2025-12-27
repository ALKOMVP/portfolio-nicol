#!/usr/bin/env node

/**
 * Script para probar la API de fotos de Google Drive
 * Uso: node scripts/test-photos-api.js [FOLDER_ID] [API_KEY]
 */

const folderId = process.argv[2] || process.env.GOOGLE_DRIVE_PHOTOS_FOLDER_ID;
const apiKey = process.argv[3] || process.env.GOOGLE_API_KEY;

if (!folderId) {
  console.error('❌ Error: No se proporcionó GOOGLE_DRIVE_PHOTOS_FOLDER_ID');
  console.log('\nUso:');
  console.log('  node scripts/test-photos-api.js [FOLDER_ID] [API_KEY]');
  console.log('\nO configura las variables de entorno:');
  console.log('  export GOOGLE_DRIVE_PHOTOS_FOLDER_ID=tu_folder_id');
  console.log('  export GOOGLE_API_KEY=tu_api_key');
  process.exit(1);
}

console.log('🔍 Probando conexión con Google Drive...\n');
console.log(`📁 Folder ID: ${folderId}`);
console.log(`🔑 API Key: ${apiKey ? '✅ Configurada' : '⚠️  No configurada (opcional)'}\n`);

const query = `'${folderId}' in parents and mimeType contains 'image' and trashed=false`;
const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,size,createdTime,modifiedTime,thumbnailLink)&orderBy=createdTime desc${apiKey ? `&key=${apiKey}` : ''}`;

fetch(url)
  .then(async (response) => {
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error en la respuesta de Google Drive API:');
      console.error(`   Status: ${response.status}`);
      console.error(`   Error: ${errorText}\n`);
      
      if (response.status === 403) {
        console.log('💡 Posibles soluciones:');
        console.log('   1. Verifica que la carpeta esté compartida como "Cualquiera con el enlace"');
        console.log('   2. Verifica que la API Key tenga permisos para Google Drive API');
        console.log('   3. Verifica que Google Drive API esté habilitada en Google Cloud Console');
      } else if (response.status === 404) {
        console.log('💡 Posibles soluciones:');
        console.log('   1. Verifica que el Folder ID sea correcto');
        console.log('   2. Verifica que la carpeta exista en Google Drive');
      }
      process.exit(1);
    }
    
    const data = await response.json();
    const files = data.files || [];
    
    console.log(`✅ Conexión exitosa!\n`);
    console.log(`📸 Fotos encontradas: ${files.length}\n`);
    
    if (files.length === 0) {
      console.log('⚠️  No se encontraron fotos en la carpeta.');
      console.log('\n💡 Verifica que:');
      console.log('   1. Las fotos estén en la carpeta correcta');
      console.log('   2. Las fotos sean archivos de imagen (JPG, PNG, etc.)');
      console.log('   3. Las fotos no estén en la papelera');
    } else {
      console.log('📋 Lista de fotos:\n');
      files.forEach((file, index) => {
        const sizeMB = file.size ? (parseInt(file.size) / 1024 / 1024).toFixed(2) : 'N/A';
        const createdDate = file.createdTime ? new Date(file.createdTime).toLocaleDateString('es-ES') : 'N/A';
        console.log(`${index + 1}. ${file.name}`);
        console.log(`   ID: ${file.id}`);
        console.log(`   Tamaño: ${sizeMB} MB`);
        console.log(`   Creada: ${createdDate}`);
        console.log('');
      });
    }
    
    console.log('✅ Prueba completada exitosamente');
  })
  .catch((error) => {
    console.error('❌ Error al conectar con Google Drive API:');
    console.error(`   ${error.message}\n`);
    console.log('💡 Verifica tu conexión a internet y que la API Key sea válida');
    process.exit(1);
  });





