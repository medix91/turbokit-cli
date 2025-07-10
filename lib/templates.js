import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin absolu vers dossier templates
const templatesDir = path.resolve(__dirname, '../templates');

export function copyTemplateFile(projectPath, fileName) {
  const src = path.resolve(templatesDir, fileName);
  const destDir = path.join(projectPath, 'src', 'components');
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const dest = path.join(destDir, fileName);

  if (!fs.existsSync(src)) {
    console.log(chalk.red(`❌ Template ${fileName} non trouvé dans ${templatesDir}`));
    return;
  }

  fs.copyFileSync(src, dest);
  console.log(chalk.green(`✔ Copié ${fileName} dans ${dest}`));
}
