import figlet from 'figlet';
import chalk from 'chalk';

/**
 * Affiche le logo ASCII de Turbokit dans le terminal
 */
export function showLogo() {
  const logo = figlet.textSync('Turbo Kit', {
    font: 'Standard', // Autres options : 'Slant', 'Big', 'Ghost', etc.
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });

  console.log(chalk.cyan(logo));
  console.log(chalk.bold.green('       Kickstart your app\n'));
}
