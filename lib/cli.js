import inquirer from 'inquirer';
import chalk from 'chalk';

export async function promptUser() {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: chalk.green('Nom du projet ?'),
      validate: input => input ? true : 'Le nom du projet est obligatoire'
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
