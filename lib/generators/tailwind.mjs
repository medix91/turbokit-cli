import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Configure Tailwind et PostCSS pour compatibilité avec PostCSS v7
 * - Renomme .js → .cjs si nécessaire
 * - Ajoute les bons chemins dans la clé `content`
 * 
 * @param {string} projectPath - Chemin absolu du projet
 */
export function setupTailwind(projectPath) {
  // 🔧 POSTCSS
  const postcssJs = path.join(projectPath, 'postcss.config.js');
  const postcssCjs = path.join(projectPath, 'postcss.config.cjs');
  if (fs.existsSync(postcssJs)) {
    fs.renameSync(postcssJs, postcssCjs);
    console.log(chalk.gray('✔ Renommé postcss.config.js → postcss.config.cjs'));
  } else {
    console.log(chalk.yellow('⚠ postcss.config.js introuvable'));
  }

  // 🎨 TAILWIND
  const tailwindJs = path.join(projectPath, 'tailwind.config.js');
  const tailwindCjs = path.join(projectPath, 'tailwind.config.cjs');
  if (fs.existsSync(tailwindJs)) {
    let content = fs.readFileSync(tailwindJs, 'utf8');

    // Mise à jour du champ content
    content = content.replace(
      /content:\s*\[\s*\]/,
      `content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]`
    );

    fs.writeFileSync(tailwindJs, content, 'utf8');
    fs.renameSync(tailwindJs, tailwindCjs);
    console.log(chalk.gray('✔ Modifié et renommé tailwind.config.js → tailwind.config.cjs'));
  } else {
    console.log(chalk.yellow('⚠ tailwind.config.js introuvable'));
  }
}
