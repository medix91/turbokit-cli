import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * Pose les questions CLI à l'utilisateur pour la génération du projet
 * @returns {Promise<Object>} Réponses de l'utilisateur
 */
export async function promptUser() {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: chalk.green('Nom du projet ?'),
      validate: input =>
        input.trim() !== '' ? true : 'Le nom du projet est obligatoire.'
    },
    {
      type: 'list',
      name: 'scriptType',
      message: chalk.cyan('Quel type de projet souhaitez-vous générer ?'),
      choices: [
        { name: 'TypeScript (.tsx)', value: 'tsx' },
        { name: 'JavaScript (.jsx)', value: 'jsx' }
      ],
      default: 'tsx'
    },
    {
      type: 'confirm',
      name: 'includeNavbar',
      message: chalk.yellow('Inclure un composant Navbar ?'),
      default: false
    },
    {
      type: 'confirm',
      name: 'includeFooter',
      message: chalk.yellow('Inclure un composant Footer ?'),
      default: false
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: chalk.yellow('Installer axios + react-router-dom ?'),
      default: false
    }
  ];

  return await inquirer.prompt(questions);
}
