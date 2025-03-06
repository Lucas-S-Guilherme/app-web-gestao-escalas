# Sistema de Gestão de Escalas (SIGESC)

Bem-vindo(a) ao **SIGESC** – Sistema de Gestão de Escalas, desenvolvido como **projeto final** para a disciplina **Programação Web 2** do **IFRO**. Este sistema tem como objetivo gerenciar de forma simples e eficiente escalas de trabalho, combatentes, turnos, restrições e muito mais.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar](#como-executar)
- [Contribuições](#contribuições)
- [Licença](#licença)

---

## Visão Geral

O **SIGESC** é um sistema web voltado ao gerenciamento das escalas de trabalho de equipes como bombeiros civis ou brigadistas, permitindo:
1. Cadastro de combatentes (com funções, especializações e restrições).
2. Criação de escalas de trabalho (por período).
3. Definição de turnos de trabalho e alocação de combatentes em cada turno.
4. Aplicação de regras de descanso e demais requisitos legais.

O projeto foi desenvolvido para demonstrar conhecimentos em:
- **Backend (API)**: utilização do **NestJS** e **TypeORM** para orquestração do banco de dados.
- **Frontend**: uso de **Handlebars (HBS)** para geração de templates, auxiliado por **Bootstrap** para layout e estilos.
- **Banco de Dados**: criação e manipulação de tabelas MySQL, incluindo chaves estrangeiras, triggers e views.

---

## Tecnologias Utilizadas

| Tecnologia     | Descrição                                                                    |
|----------------|-------------------------------------------------------------------------------|
| **NestJS**     | Framework para construção de aplicativos server-side escaláveis em Node.js.  |
| **TypeORM**    | ORM para Node.js, gerenciando mapeamento objeto-relacional no banco MySQL.    |
| **MySQL**      | Banco de dados relacional para armazenamento seguro das informações.          |
| **Handlebars** | Template engine que facilita a criação de páginas HTML dinâmicas.             |
| **Bootstrap**  | Biblioteca CSS para estilização responsiva e componentes prontos.            |
| **Node.js**    | Plataforma que permite executar JavaScript do lado do servidor.               |

Além disso, há uso de bibliotecas auxiliares, como:
- **class-validator**: para validação de dados de entrada.
- **Express**: base subjacente do NestJS para roteamento e middlewares.
- **SQL**: manipulação do esquema de banco de dados (triggers, views, constraints, etc.).

---

## Principais Funcionalidades

1. **Gerenciamento de Combatentes**  
   - Cadastro de combatentes com CPF, data de nascimento, telefone, especializações, funções e restrições.
   - Criação de relacionamentos *many-to-many* para `combatente_funcao`, `combatente_especializacao` e `combatente_restricao`.

2. **Gestão de Escalas**  
   - Definição de **Escalas** com data de início, data de fim e vínculo a um usuário responsável.
   - Cada **Escala** pode possuir **múltiplos turnos** de trabalho associados.

3. **Turnos de Trabalho**  
   - Criação de turnos vinculados a uma escala (ex.: turnos diários, turnos de 12h, etc.).
   - Determinação de horário de início e fim.

4. **Alocação de Combatentes nos Turnos**  
   - Cada turno pode ter diferentes combatentes com intervalos de hora personalizáveis.
   - Trigger **verificar_descanso_antes_insert** para validar se o combatente atendeu às regras de descanso mínimo.

5. **Relatórios e Visualização**  
   - Visualização geral de escalas, turnos e combatentes alocados.
   - Uso de `views` (ex.: `combatente_ultimos_turnos`) para análise de dados.

---

## Estrutura do Projeto

A estrutura de pastas segue o padrão do NestJS, dividida em **módulos**, **controllers**, **services**, **entities** e **views**:

