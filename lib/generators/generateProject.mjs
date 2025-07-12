import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

import { cleanProject } from './cleanup.mjs';
import { setupTailwind } from './tailwind.mjs';
import { createMainFile, createAppFile } from './appFile.mjs';
import { copyTemplateFile } from './copyTemplates.mjs';

/**
 * Génère le projet complet en orchestrant toutes les étapes
 * @param {Object} answers - réponses CLI utilisateur
 * @param {string} answers.projectName - Nom du projet
 * @param {'tsx'|'jsx'} answers.scriptType - Type de script
 * @param {boolean} answers.includeNavbar - Inclure Navbar ?
 * @param {boolean} answers.includeFooter - Inclure Footer ?
 * @param {boolean} answers.installDeps - Installer axios + react-router-dom ?
 */
export async function generateProject(answers) {
  const projectPath = path.resolve(process.cwd(), answers.projectName);
  const ext = answers.scriptType; // 'tsx' ou 'jsx'

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`❌ Le dossier '${answers.projectName}' existe déjà. Abandon.`));
    return;
  }

  console.log(chalk.blue(`📁 Création du projet '${answers.projectName}'...`));

  // 1. Création du projet Vite avec le bon template
  const viteTemplate = ext === 'tsx' ? 'react-ts' : 'react';
  execSync(`npm create vite@latest ${answers.projectName} -- --template ${viteTemplate}`, {
    stdio: 'inherit'
  });

  // 2. Installation Tailwind CSS v3 (postcss7-compat)
  console.log(chalk.blue('💨 Installation Tailwind CSS v3...'));
  execSync(
    `npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9`,
    { cwd: projectPath, stdio: 'inherit' }
  );

  // 3. Initialisation des fichiers tailwind.config.js et postcss.config.js
  execSync(`npx tailwindcss init -p`, { cwd: projectPath, stdio: 'inherit' });

  // 4. Configurer Tailwind et renommer fichiers en .cjs
  setupTailwind(projectPath);

  // 5. Nettoyage fichiers inutiles + ajout de global.css
  cleanProject(projectPath, ext);

  // 6. Création de main.[ext] et App.[ext]
 createMainFile(projectPath, ext);
  createAppFile(projectPath, {
    includeNavbar: answers.includeNavbar,
    includeFooter: answers.includeFooter,
    scriptType: ext
  });

  // 7. Copie des composants demandés
  if (answers.includeNavbar) {
    console.log(chalk.blue('✨ Ajout du composant Navbar...'));
    copyTemplateFile(projectPath, `Navbar.${ext}`);
  }
  if (answers.includeFooter) {
    console.log(chalk.blue('✨ Ajout du composant Footer...'));
    copyTemplateFile(projectPath, `Footer.${ext}`);
  }

  // 8. Installation des dépendances optionnelles
  if (answers.installDeps) {
    console.log(chalk.blue('📦 Installation de axios et react-router-dom...'));
    execSync(`npm install axios react-router-dom`, {
      cwd: projectPath,
      stdio: 'inherit'
    });
  }

  // 9. Mise à jour du titre dans index.html
  const indexPath = path.join(projectPath, 'index.html');
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  indexContent = indexContent.replace(
    /<title>.*<\/title>/,
    `<title>Turbokit - ${answers.projectName}</title>`
  );
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(chalk.gray('✔ Modifié titre dans index.html'));

  // 10. Message final
  console.log(chalk.green(`\n✅ Projet '${answers.projectName}' généré avec succès !`));
  console.log(chalk.yellow(`\n➡ Pour démarrer :\n  cd ${answers.projectName}\n  npm install\n  npm run dev\n`));
}
