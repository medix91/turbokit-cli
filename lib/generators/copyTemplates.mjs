import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Copie un fichier template depuis le dossier ./templates vers src/components du projet généré
 *
 * @param {string} projectPath - Chemin absolu du projet généré
 * @param {string} fileName - Nom du fichier template à copier (ex: Navbar.tsx ou Footer.jsx)
 */
export function copyTemplateFile(projectPath, fileName) {
  const templatesDir = path.resolve(process.cwd(), 'templates');
  const srcPath = path.join(templatesDir, fileName);
  const destDir = path.join(projectPath, 'src', 'components');
  const destPath = path.join(destDir, fileName);

  // Vérifie si le fichier source existe
  if (!fs.existsSync(srcPath)) {
    console.error(chalk.red(`❌ Le fichier template '${fileName}' est introuvable dans /templates`));
    process.exit(1);
  }

  // Crée le dossier src/components si non existant
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Copie le fichier
  fs.copyFileSync(srcPath, destPath);
  console.log(chalk.gray(`✔ Copié ${fileName} dans src/components`));
}
