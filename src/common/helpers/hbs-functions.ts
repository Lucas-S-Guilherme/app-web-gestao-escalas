const helpers = {
  // Formata a data no padrão BR (dia/mês/ano)
  dateFormatBR: (date: string | Date) => {
    if (!date) return ''; // Se a data for nula ou indefinida, retorna uma string vazia
    const locale = new Date(date);
    return locale.toLocaleDateString('pt-BR'); // Formata a data no padrão BR
  },

  // Incrementa um valor (já existente)
  inc: (value: string) => parseInt(value) + 1,

  // Converte um objeto para JSON (já existente)
  json: (value: any) => {
    console.log(value);
    return JSON.stringify(value);
  },

  // Retorna a mensagem de erro para uma propriedade específica (já existente)
  'error-message': (errors: any[], key: string) => errors?.find(i => i.property == key)?.message,

  // Retorna as mensagens de erro para uma propriedade específica (já existente)
  'error-messages': (errors: any[], key: string) => errors?.find(i => i.property == key)?.messages,

  // Compara dois valores (já existente)
  eq: (a: any, b: any, options: any) => {
    return a === b ? options.fn(this) : options.inverse(this);
  },
};

// Registra as helpers no Handlebars
export const hbsRegisterHelpers = (hbs: any) => {
  for (const functionName in helpers) {
    hbs.registerHelper(functionName, helpers[functionName]);
  }
};