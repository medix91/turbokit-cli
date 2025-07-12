#!/usr/bin/env node
import { promptUser } from '../lib/cli/promptUser.mjs';
import { generateProject } from '../lib/generators/generateProject.mjs';
import { showLogo } from '../lib/cli/logo.mjs';  

async function main() {
    showLogo(); 
  try {
    const answers = await promptUser();
    await generateProject(answers);
  } catch (err) {
    console.error('Erreur :', err);
  }
}

main();
