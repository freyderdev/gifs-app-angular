
const fs = require('node:fs');
const path = require('node:path');

// Obtener la API Key desde las variables de entorno
const apiKey = process.env.GIPHY_API_KEY;

if (!apiKey) {
  throw new Error('Missing GIPHY_API_KEY environment variable');
}

// Configuración del entorno de producción
const environment = {
  production: true,
  companyName: 'Gifs',
  companyName2: 'App',
  companySlogan: 'Maneja tus gifs',
  giphyApikey: apiKey,
  giphyUrl: 'https://api.giphy.com/v1',
};

// Ruta donde Angular espera encontrar el archivo
const outputPath = path.join(
  process.cwd(),
  'src/environments/environment.ts'
);

// Generar el archivo environment.ts
fs.writeFileSync(
  outputPath,
  `export const environment = ${JSON.stringify(environment, null, 2)};\n`
);

console.log('Production environment generated successfully.');
