A documentação é a alma de qualquer projeto de software bem-sucedido. Um `README.md` bem estruturado não só impressiona os avaliadores, mas também mostra o seu profissionalismo e cuidado com a manutenibilidade do código.

Aqui está o código Markdown completo para o seu `README.md`. Crie este arquivo na raiz do seu projeto (junto com o `.gitignore`) e cole o conteúdo abaixo.

---

```markdown
<h1 align="center">⛩️ Otaku Sushi Bar 🍣</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Concluído-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

<p align="center">
  <strong>Um sistema completo de cardápio digital e gerenciamento de pedidos com temática de animes.</strong>
</p>

---

## 📖 Sobre o Projeto

O **Otaku Sushi Bar** é uma aplicação web Full-Stack dividida em duas interfaces principais: a visão do **Cliente** (onde é possível explorar o cardápio no estilo de uma plataforma de streaming e realizar pedidos) e a visão do **Restaurante / Admin** (onde é feito o gerenciamento do cardápio e o monitoramento em tempo real dos pedidos na cozinha - KDS).

## 🎯 Motivação e Objetivo

Este projeto foi desenvolvido como **Trabalho Final** da disciplina, com o objetivo prático de implementar uma API RESTful utilizando o ecossistema Node.js. 

O foco central é demonstrar o domínio sobre os verbos HTTP e as operações **CRUD**:
*   **C**reate (`POST`): Adição de novos pratos e envio de novos pedidos.
*   **R**ead (`GET`): Listagem do cardápio e busca da fila de pedidos.
*   **U**pdate (`PUT`): Atualização de itens do cardápio e alteração do status do pedido (Preparando ➔ Pronto ➔ Finalizado).
*   **D**elete (`DELETE`): Remoção de itens do cardápio.

> **Nota Arquitetural:** Para manter a simplicidade e focar na construção da API, o projeto utiliza a manipulação nativa do módulo `fs` (File System) do Node.js para persistir os dados em arquivos `.json`, simulando um banco de dados real sem a necessidade de infraestrutura externa.

---

## ⚙️ Funcionalidades

### 🍣 Área do Cliente
- **Cardápio Interativo:** Visualização de pratos e bebidas em formato de "episódios".
- **Filtro de Categorias:** Navegação dinâmica entre Comidas e Bebidas.
- **Carrinho de Compras:** Adição e remoção de itens com cálculo automático do total.
- **Envio de Pedidos:** Integração direta com a API para disparar os pedidos para a cozinha informando a mesa.

### 🔪 Área do Restaurante (Admin)
- **Gestão de Cardápio (CRUD):** Formulário completo para adicionar, editar e excluir itens do menu.
- **Monitor de Pedidos (KDS):** Acompanhamento da fila de pedidos por ordem de chegada.
- **Controle de Status:** Atualização do fluxo do prato na cozinha (`Preparando`, `Pronto` e `Finalizado`).

---

## 🚀 Pré-requisitos

Antes de começar, você precisará ter a seguinte ferramenta instalada em sua máquina:
* [Node.js](https://nodejs.org/en/) (que já inclui o gerenciador de pacotes `npm`).

---

## 🛠️ Como rodar a aplicação localmente

### 1. Clonando o repositório
```bash
git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
cd SEU_REPOSITORIO

```

### 2. Iniciando o Backend (Servidor e API)

Abra um terminal e navegue até a pasta do backend para instalar as dependências e iniciar o servidor:

```bash
cd backend
npm install
node server.js

```

> O servidor estará rodando e escutando as requisições na porta `http://localhost:3000`.

### 3. Iniciando o Frontend (Interface)

Como o frontend foi construído utilizando apenas HTML, CSS e JS Vanilla (sem frameworks complexos de build), **não é necessário rodar nenhum comando npm**.

Basta abrir o arquivo `frontend/index.html` diretamente no seu navegador, ou utilizar a extensão **Live Server** no VS Code para uma melhor experiência de desenvolvimento.

---

## 🗂️ Estrutura de Diretórios

```text
📦 PING-PONG-ATUAL
 ┣ 📂 backend
 ┃ ┣ 📂 controllers    # Lógica de manipulação de dados
 ┃ ┣ 📂 data           # Banco de dados simulado (db.json e orders.json)
 ┃ ┣ 📂 routes         # Definição dos endpoints da API REST
 ┃ ┣ 📜 server.js      # Ponto de entrada do Express
 ┃ ┗ 📜 package.json   # Dependências do backend (Express, CORS)
 ┣ 📂 frontend
 ┃ ┣ 📜 index.html     # Visão do Cliente
 ┃ ┣ 📜 app.js         # Lógica de consumo da API (Cliente)
 ┃ ┣ 📜 admin.html     # Visão do Restaurante (Dashboard KDS)
 ┃ ┣ 📜 admin.js       # Lógica de consumo da API (Admin)
 ┃ ┗ 📜 style.css      # Estilização global da aplicação
 ┗ 📜 .gitignore

```

---

## 👨‍💻 Autor

Desenvolvido por **Caique de Jesus Cardim (kyoshy)**, como parte dos requisitos acadêmicos no **Instituto Federal Catarinense (IFC) Campus Brusque**.

Construído com código limpo, separação de responsabilidades e foco em boas práticas de Engenharia de Software.

```

```
