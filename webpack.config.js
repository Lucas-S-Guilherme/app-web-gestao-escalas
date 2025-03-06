const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './public/assets/js/masks.js', // Caminho do arquivo de entrada
  output: {
    filename: 'bundle.js', // Nome do arquivo de saída
    path: path.resolve(__dirname, 'public/assets/js'), // Pasta de saída
  },
  target: 'web', // Define o ambiente de execução (neste caso, navegador)
  externals: [nodeExternals()], // Ignora dependências do Node.js
  module: {
    rules: [
      {
        test: /\.js$/, // Processa arquivos .js
        exclude: /node_modules/, // Ignora a pasta node_modules
        use: {
          loader: 'babel-loader', // Usa o Babel para transpilar o código
          options: {
            presets: ['@babel/preset-env'], // Usa o preset-env para compatibilidade
          },
        },
      },
    ],
  },
  mode: 'production', // Modo de produção (otimiza o bundle)
};