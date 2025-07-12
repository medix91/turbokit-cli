import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

/**
 * Crée le fichier `main` (main.tsx ou main.jsx) avec import du CSS global
 * @param {string} projectPath - Chemin absolu du projet
 * @param {'tsx'|'jsx'} scriptType - Extension à utiliser (tsx ou jsx)
 */
export function createMainFile(projectPath, scriptType) {
  const mainFilePath = path.join(projectPath, 'src', `main.${scriptType}`);
  const isTsx = scriptType === 'tsx';

  const mainContent = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')${isTsx ? ' as HTMLElement' : ''}).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  fs.writeFileSync(mainFilePath, mainContent, 'utf8');
  console.log(chalk.gray(`✔ Créé src/main.${scriptType}`));
}

/**
 * Crée le fichier `App` (App.tsx ou App.jsx) avec Navbar/Footer si nécessaire
 * @param {string} projectPath - Chemin absolu du projet
 * @param {Object} options
 * @param {boolean} options.includeNavbar
 * @param {boolean} options.includeFooter
 * @param {'tsx'|'jsx'} options.scriptType
 */
export function createAppFile(projectPath, { includeNavbar, includeFooter, scriptType }) {
  const appFilePath = path.join(projectPath, 'src', `App.${scriptType}`);

  const importNavbar = includeNavbar ? `import Navbar from './components/Navbar';\n` : '';
  const importFooter = includeFooter ? `import Footer from './components/Footer';\n` : '';

  const baseApp = `
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900">Bienvenue dans Turbokit</h1>
    </div>
  );
}
`;

  const fullApp = `
export default function App() {
  return (
    <>
      ${includeNavbar ? '<Navbar />' : ''}
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-900">Bienvenue dans Turbokit</h1>
      </main>
      ${includeFooter ? '<Footer />' : ''}
    </>
  );
}
`;

  // Note le petit espace après le import React to avoid concatenation
  const content = `import React from 'react';
${importNavbar}${importFooter}
${(includeNavbar || includeFooter) ? fullApp : baseApp}`;

  fs.writeFileSync(appFilePath, content.trimStart(), 'utf8');
  console.log(chalk.gray(`✔ Créé src/App.${scriptType}`));
}
