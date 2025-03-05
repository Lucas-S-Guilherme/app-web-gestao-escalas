// generate-entity.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Função para gerar módulo, controller e service
function generateEntity(entityName) {
  try {
    // Cria o módulo
    execSync(`npx nest g mo ${entityName}`, { stdio: 'inherit' });

    // Cria o controller
    execSync(`npx nest g co ${entityName}`, { stdio: 'inherit' });

    // Cria o service
    execSync(`npx nest g s ${entityName}`, { stdio: 'inherit' });

    console.log(`Entidade "${entityName}" criada com sucesso!`);
  } catch (error) {
    console.error(`Erro ao criar a entidade "${entityName}":`, error);
  }
}

// Nome da entidade (pode ser passado como argumento)
const entityName = process.argv[2];

if (!entityName) {
  console.error('Por favor, informe o nome da entidade.');
  process.exit(1);
}

generateEntity(entityName);