#!/bin/bash

# Script para crear y conectar el repositorio en GitHub
# Ejecuta este script después de crear el repositorio en GitHub

echo "🚀 Configurando repositorio GitHub para portfolio-nicol"
echo ""
echo "PASO 1: Ve a https://github.com/new y crea un nuevo repositorio:"
echo "   - Nombre: portfolio-nicol"
echo "   - Descripción: Portfolio de acrobacia y circo - Nicol Mena"
echo "   - NO marques 'Add a README file'"
echo "   - Click en 'Create repository'"
echo ""
read -p "¿Ya creaste el repositorio en GitHub? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📦 Conectando repositorio local con GitHub..."
    git remote add origin https://github.com/ALKOMVP/portfolio-nicol.git 2>/dev/null || git remote set-url origin https://github.com/ALKOMVP/portfolio-nicol.git
    git branch -M main
    echo ""
    echo "📤 Subiendo código a GitHub..."
    git push -u origin main
    echo ""
    echo "✅ ¡Listo! Tu código está en GitHub"
    echo ""
    echo "🌐 Ahora ve a Cloudflare Pages para configurar el despliegue:"
    echo "   1. https://dash.cloudflare.com/"
    echo "   2. Pages > Create a project"
    echo "   3. Conecta GitHub y selecciona el repositorio portfolio-nicol"
    echo "   4. Framework: Next.js"
    echo "   5. Build command: npm run build"
    echo "   6. Build output: .next"
else
    echo "❌ Por favor crea el repositorio primero y luego ejecuta este script nuevamente"
fi

