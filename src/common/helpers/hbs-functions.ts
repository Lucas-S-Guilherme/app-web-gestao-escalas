const helpers = {
  dateFormat: (date: string) => {
    const locale = new Date(date);
    return locale.toLocaleDateString('pt-BR');
  },
  inc: (value: string) => parseInt(value) + 1,
  json: (value: any) => {
    console.log(value);
    return JSON.stringify(value);
  },
  'error-message': (errors: any[], key: string) => errors?.find(i => i.property == key)?.message,
  'error-messages': (errors: any[], key: string) => errors?.find(i => i.property == key)?.messages,
  // Adicionando o helper `eq`
  eq: (a: any, b: any, options: any) => {
    return a === b ? options.fn(this) : options.inverse(this);
  },
};

export const hbsRegisterHelpers = (hbs: any) => {
  for (const functionName in helpers) {
    hbs.registerHelper(functionName, helpers[functionName]);
  }
};