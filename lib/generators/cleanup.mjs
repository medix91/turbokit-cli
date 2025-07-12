import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Supprime les fichiers inutiles par défaut après création Vite
 * @param {string} projectPath - Chemin absolu du projet
 * @param {'tsx'|'jsx'} scriptType - Type de script utilisé (tsx ou jsx)
 */
export function cleanProject(projectPath, scriptType) {
  // Liste des fichiers à supprimer
  const filesToRemove = [
    'src/index.css',
    'src/logo.svg',
    `src/App.${scriptType}`,  // App.tsx ou App.jsx
    `src/main.${scriptType}`, // main.tsx ou main.jsx
  ];

  // Suppression des fichiers inutiles
  filesToRemove.forEach(file => {
    const filePath = path.join(projectPath, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(chalk.gray(`✔ Supprimé ${file}`));
    }
  });

  // Création du dossier styles + fichier global.css
  const stylesDir = path.join(projectPath, 'src', 'styles');
  if (!fs.existsSync(stylesDir)) fs.mkdirSync(stylesDir, { recursive: true });

  const globalCssPath = path.join(stylesDir, 'global.css');
  const globalCssContent = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
  fs.writeFileSync(globalCssPath, globalCssContent, 'utf8');
  console.log(chalk.gray('✔ Créé src/styles/global.css'));
}
