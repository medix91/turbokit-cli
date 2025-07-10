import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { copyTemplateFile } from './templates.js';

export async function generateProject(answers) {
  const projectPath = path.resolve(process.cwd(), answers.projectName);

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`❌ Le dossier ${answers.projectName} existe déjà. Abandon.`));
    return;
  }

  console.log(chalk.blue(`📁 Création du projet '${answers.projectName}'...`));

  // 1. Crée le projet vite React TS (mode non interactif)
  execSync(
    `npm create vite@latest ${answers.projectName} -- --template react-ts --yes`,
    { stdio: 'inherit' }
  );

  // 2. Installation Tailwind CSS v3 (postcss7-compat)
  console.log(chalk.blue('💨 Installation Tailwind CSS v3...'));
  execSync(
    `npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9`,
    { cwd: projectPath, stdio: 'inherit' }
  );

  // 3. Init config Tailwind + PostCSS
  execSync(`npx tailwindcss init -p`, { cwd: projectPath, stdio: 'inherit' });

  // 4. Remplace postcss.config.js par postcss.config.cjs (évite erreurs ES module)
  const postcssJs = path.join(projectPath, 'postcss.config.js');
  const postcssCjs = path.join(projectPath, 'postcss.config.cjs');
  if (fs.existsSync(postcssJs)) {
    fs.renameSync(postcssJs, postcssCjs);
    console.log(chalk.gray('✔ postcss.config.js renommé en postcss.config.cjs'));
  }

const tailwindJsPath = path.join(projectPath, 'tailwind.config.js');
const tailwindCjsPath = path.join(projectPath, 'tailwind.config.cjs');

if (fs.existsSync(tailwindJsPath)) {
  let tailwindConfig = fs.readFileSync(tailwindJsPath, 'utf8');

  // Remplace content: [] par le bon pattern
  tailwindConfig = tailwindConfig.replace(
    /content:\s*\[\s*\]/,
    `content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]`
  );

  // Écrit le contenu modifié dans tailwind.config.js (temporairement)
  fs.writeFileSync(tailwindJsPath, tailwindConfig, 'utf8');

  // Renomme ensuite le fichier en .cjs
  fs.renameSync(tailwindJsPath, tailwindCjsPath);

  console.log(chalk.gray('✔ Modifié tailwind.config.js et renommé en tailwind.config.cjs'));
}

  // 6. Supprime fichiers inutiles par défaut
  const filesToRemove = ['src/index.css', 'src/logo.svg', 'src/App.tsx', 'src/main.tsx'];
  filesToRemove.forEach(file => {
    const filePath = path.join(projectPath, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(chalk.gray(`✔ Supprimé ${file}`));
    }
  });

  // 7. Crée dossier styles + global.css
  const stylesDir = path.join(projectPath, 'src', 'styles');
  if (!fs.existsSync(stylesDir)) fs.mkdirSync(stylesDir, { recursive: true });
  const globalCssPath = path.join(stylesDir, 'global.css');
  const globalCssContent = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
  fs.writeFileSync(globalCssPath, globalCssContent, 'utf8');
  console.log(chalk.gray('✔ Créé src/styles/global.css'));

  // 8. Crée src/main.tsx
  const mainTsxPath = path.join(projectPath, 'src', 'main.tsx');
  const mainTsxContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;
  fs.writeFileSync(mainTsxPath, mainTsxContent, 'utf8');
  console.log(chalk.gray('✔ Créé src/main.tsx'));

  // 9. Crée src/App.tsx selon options
  const appTsxPath = path.join(projectPath, 'src', 'App.tsx');
  let appTsxContent = `import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900">Bienvenue dans Turbokit</h1>
    </div>
  );
}
`;

  if (answers.includeNavbar || answers.includeFooter) {
    appTsxContent = `import React from 'react';\n`;
    if (answers.includeNavbar) appTsxContent += `import Navbar from './components/Navbar';\n`;
    if (answers.includeFooter) appTsxContent += `import Footer from './components/Footer';\n`;
    appTsxContent += `\nexport default function App() {\n  return (\n    <> \n`;
    if (answers.includeNavbar) appTsxContent += `      <Navbar />\n`;
    appTsxContent += `      <main className="min-h-screen flex items-center justify-center bg-gray-50">\n`;
    appTsxContent += `        <h1 className="text-3xl font-bold text-gray-900">Bienvenue dans Turbokit</h1>\n`;
    appTsxContent += `      </main>\n`;
    if (answers.includeFooter) appTsxContent += `      <Footer />\n`;
    appTsxContent += `    </>\n  );\n}\n`;
  }
  fs.writeFileSync(appTsxPath, appTsxContent, 'utf8');
  console.log(chalk.gray('✔ Créé src/App.tsx'));

  // 10. Copier Navbar/Footer si demandé
  if (answers.includeNavbar) {
    console.log(chalk.blue('✨ Ajout du composant Navbar...'));
    copyTemplateFile(projectPath, 'Navbar.jsx');
  }
  if (answers.includeFooter) {
    console.log(chalk.blue('✨ Ajout du composant Footer...'));
    copyTemplateFile(projectPath, 'Footer.jsx');
  }

  // 11. Installer axios + react-router-dom si demandé
  if (answers.installDeps) {
    console.log(chalk.blue('📦 Installation axios et react-router-dom...'));
    execSync(`npm install axios react-router-dom`, { cwd: projectPath, stdio: 'inherit' });
  }

  // 12. Modifier titre dans index.html
  const indexPath = path.join(projectPath, 'index.html');
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  indexContent = indexContent.replace(
    /<title>.*<\/title>/,
    `<title>Turbokit - ${answers.projectName}</title>`
  );
  fs.writeFileSync(indexPath, indexContent, 'utf8');
  console.log(chalk.gray('✔ Modifié titre dans index.html'));

  console.log(chalk.green(`\n✅ Projet '${answers.projectName}' généré avec succès !`));
}
