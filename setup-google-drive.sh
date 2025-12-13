#!/bin/bash

# Script para configurar variables de entorno de Google Drive en Cloudflare Pages
# Ejecuta: ./setup-google-drive.sh

echo "🔧 Configurando variables de entorno para Google Drive en Cloudflare Pages..."
echo ""

# Variables
FOLDER_ID="18ef9eP5TwBPEiQxxF8yRtKsZJKj18ZtV"
API_KEY="AIzaSyD4zD2JMJVUMDNH_3ivWnwAnGhqOdyB5r0"
PROJECT_NAME="portfolio-nicol"

echo "📝 Configurando GOOGLE_DRIVE_FOLDER_ID..."
wrangler pages secret put GOOGLE_DRIVE_FOLDER_ID --project-name=$PROJECT_NAME <<< "$FOLDER_ID"

echo "📝 Configurando GOOGLE_API_KEY..."
wrangler pages secret put GOOGLE_API_KEY --project-name=$PROJECT_NAME <<< "$API_KEY"

echo ""
echo "✅ Variables de entorno configuradas!"
echo ""
echo "⚠️  IMPORTANTE: Necesitas redesplegar el proyecto para que las variables surtan efecto."
echo "   Ejecuta: npm run build && wrangler pages deploy out --project-name=$PROJECT_NAME"
echo ""

