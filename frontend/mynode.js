const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
const dotenv = require("dotenv").config({ path: "./.env" });

const makeEnvContent = (production) => {
  const backendUrl = production
    ? process.env.PROD_API_BACKEND
    : process.env.DEV_API_BACKEND;

  return `export const environment = {
  production: ${production},
  firebase: {
    apiKey: '${process.env.FIREBASE_API_KEY}',
    authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
    projectId: '${process.env.FIREBASE_PROJECT_ID}',
    appId: '${process.env.FIREBASE_APP_ID}',
    storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
  },
  api: {
    backend: '${backendUrl}',
  },
};\n`;
};

const writeEnvFile = (fileName, content) => {
  const targetPath = path.join(__dirname, `./src/environments/${fileName}`);
  fs.writeFileSync(targetPath, content);
};

// Generate both files
writeEnvFile("environment.ts", makeEnvContent(false));
writeEnvFile("environment.prod.ts", makeEnvContent(true));
