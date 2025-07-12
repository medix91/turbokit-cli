import fs from 'fs';
import path from 'path';

/**
 * Supprime un fichier s'il existe.
 * @param {string} filePath - Chemin absolu du fichier à supprimer.
 * @returns {boolean} true si supprimé, false sinon.
 */
export function safeUnlink(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (err) {
    console.error(`Erreur suppression fichier ${filePath}:`, err);
    return false;
  }
}

/**
 * Crée un dossier s'il n'existe pas.
 * @param {string} dirPath - Chemin absolu du dossier à créer.
 */
export function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Remplace un texte dans un fichier.
 * @param {string} filePath - Chemin du fichier.
 * @param {RegExp|string} searchValue - Texte ou regex à rechercher.
 * @param {string} replaceValue - Texte de remplacement.
 */
export function replaceInFile(filePath, searchValue, replaceValue) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(searchValue, replaceValue);
  fs.writeFileSync(filePath, content, 'utf8');
}
