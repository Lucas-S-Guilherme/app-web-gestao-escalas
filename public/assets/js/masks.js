import CleaveZen from 'cleave-zen';

document.addEventListener('DOMContentLoaded', function () {
  const cpfInput = document.getElementById('cpf_combatente');
  if (cpfInput) {
    new CleaveZen(cpfInput, {
      delimiters: ['.', '.', '-'], // Define os delimitadores da máscara
      blocks: [3, 3, 3, 2], // Define o tamanho de cada bloco
      numericOnly: true, // Aceita apenas números
    });
  }

  // Máscara para Telefone (opcional)
  const telefoneInput = document.getElementById('telefone_combatente');
  if (telefoneInput) {
    new CleaveZen(telefoneInput, {
      delimiters: ['(', ') ', '-'], // Define os delimitadores da máscara
      blocks: [0, 2, 5, 4], // Define o tamanho de cada bloco
      numericOnly: true, // Aceita apenas números
    });
  }

  // Remover máscara antes de enviar o formulário
  document.querySelector('form').addEventListener('submit', function (e) {
    if (cpfInput) {
      cpfInput.value = cpfInput.value.replace(/\D/g, ''); // Remove tudo que não for número
    }
    if (telefoneInput) {
      telefoneInput.value = telefoneInput.value.replace(/\D/g, ''); // Remove tudo que não for número
    }
  });
});

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica se tem 11 dígitos e não é uma sequência repetida
  
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;
  
    return true;
  }
  
  document.querySelector('form').addEventListener('submit', function (e) {
    const cpfInput = document.getElementById('cpf_combatente');
    if (cpfInput && !validarCPF(cpfInput.value)) {
      e.preventDefault(); // Impede o envio do formulário
      alert('CPF inválido! Por favor, insira um CPF válido.');
    }
  });