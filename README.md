
# Trip app

Aplicación que te permite listas los viajes, ver los puntos de inicio y final de cada viajes en un mapa de Google Maps.

## Instalación

1. Clona el repositorio

2. Instalar las depenencias

```bash
    npm install
```

3. Crea un archivo ***.env*** en la raiz del proyecto, e incluye las siguiente variables de entorno:

```bash
    VITE_GOOGLE_API_KEY
    VITE_MAP_ID
```

**VITE_GOOGLE_API_KEY** corresponde a la clave de tu api de google maps que tienes en tu cuenta, [más información aquí](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=es-419).

**VITE_MAP_ID** corresponde a un id valido que este configurado en el perfil de google maps, [ver aquí](https://developers.google.com/maps/documentation/javascript/advanced-markers/start?hl=es-419).

## Iniciar proyecto

Abre una terminal y ejecuta el siguiente comando

```bash
    npm run dev
```

El proyecto de ejecutara en el puerto *5173*, lo puedes abrir desde el navegador http://localhost:5173/
    
