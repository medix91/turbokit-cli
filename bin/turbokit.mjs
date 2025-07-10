#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';

function showLogo() {
  return new Promise((resolve, reject) => {
    figlet.text('Turbo Kit', { horizontalLayout: 'default' }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(chalk.cyan(data));
      console.log(chalk.bold('Turbokit CLI - Kickstart your app\n'));
      resolve();
    });
  });
}

async function main() {
  await showLogo();

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

  const answers = await inquirer.prompt(questions);

  console.log(chalk.bold('\n🎯 Résumé des choix :'));
  console.log(`- Nom du projet         : ${chalk.blue(answers.projectName)}`);
  console.log(`- Composant Navbar      : ${answers.includeNavbar ? '✅ Oui' : '❌ Non'}`);
  console.log(`- Composant Footer      : ${answers.includeFooter ? '✅ Oui' : '❌ Non'}`);
  console.log(`- axios + react-router  : ${answers.installDeps ? '✅ Oui' : '❌ Non'}`);
}

main();
