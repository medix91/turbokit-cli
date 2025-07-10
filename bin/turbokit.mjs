#!/usr/bin/env node
import chalk from 'chalk';
import figlet from 'figlet';
import { promptUser } from '../lib/cli.js';
import { generateProject } from '../lib/generateProject.js';

function showLogo() {
  return new Promise((resolve, reject) => {
    figlet.text('Turbo Kit', { horizontalLayout: 'default' }, (err, data) => {
      if (err) return reject(err);
      console.log(chalk.cyan(data));
      console.log(chalk.bold('Turbokit CLI - Kickstart your app\n'));
      resolve();
    });
  });
}

async function main() {
  await showLogo();

  const answers = await promptUser();

  console.log(chalk.bold('\n🎯 Résumé des choix :'));
  console.log(`- Nom du projet         : ${chalk.blue(answers.projectName)}`);
  console.log(`- Composant Navbar      : ${answers.includeNavbar ? '✅ Oui' : '❌ Non'}`);
  console.log(`- Composant Footer      : ${answers.includeFooter ? '✅ Oui' : '❌ Non'}`);
  console.log(`- axios + react-router  : ${answers.installDeps ? '✅ Oui' : '❌ Non'}`);

  await generateProject(answers);
}

main();
