# PWA Icons Setup

Para que la PWA funcione correctamente, necesitas agregar los siguientes archivos en la carpeta `public/`:

1. **pwa-192x192.png** - Ícono de 192x192px
2. **pwa-512x512.png** - Ícono de 512x512px  
3. **apple-touch-icon.png** - Ícono de 180x180px para iOS
4. **favicon.ico** - Favicon estándar

## Generar íconos automáticamente

Puedes usar herramientas online como:
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

O usar este diseño base:
- Fondo: Gradiente rosa-púrpura (#ec4899 → #c026d3)
- Texto: "G15" o "Gemma 15" en blanco
- Fuente: Playfair Display (bold)

## Verificar PWA

Una vez agregados los íconos, verifica que la PWA funcione:

1. Build: `npm run build`
2. Preview: `npm run preview`
3. Abrir DevTools → Application → Manifest
4. Verificar que todos los íconos carguen correctamente
