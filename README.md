# Produtask - Gerenciador de Tarefas

Aplicação web para gerenciar tarefas de forma eficiente. Sistema completo com criação, edição, exclusão e filtros por status e prioridade.

## Visao Geral

Produtask é uma aplicação frontend desenvolvida em JavaScript que se integra com o backend de uma API REST para gerenciar tarefas. A aplicação oferece uma interface limpa e responsiva com funcionalidades avançadas de filtro, ordenação por prioridade e notificações em tempo real.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- Toastify JS (Notificações)

## Funcionalidades

- Criar novas tarefas com título, descrição, prioridade e status
- Editar tarefas através de um modal personalizado
- Deletar tarefas com confirmação
- Filtrar tarefas por status (Todas, Pendentes, Em Andamento, Concluída)
- Mudar status da tarefa diretamente do card
- Ordenar tarefas automaticamente por prioridade (Alta > Média > Baixa)
- Notificações visuais com Toastify para cada ação
- Alerts e confirms personalizados com modais
- Interface responsiva para dispositivos móveis

## Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexão com a internet
- API backend rodando em: https://api-to-do-list-nr73.onrender.com/tarefas

## Instalacao

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/api-to-do-list-front.git
cd api-to-do-list-front
```

## Estrutura do Projeto

```
api-to-do-list-front/
├── index.html              # Arquivo HTML principal
├── README.md              # Este arquivo
└── src/
    ├── css/
    │   ├── base/
    │   ├── components/
    │   ├── layout/
    │   └── main.css
    └── script/
        └── script.js      # JavaScript principal
```

## Como Usar

### Criar uma Tarefa

1. Preencha os campos do formulário:
   - Título: Nome da tarefa
   - Descrição: Detalhes da tarefa
   - Prioridade: Baixa, Média ou Alta
   - Status: Pendente, Em Andamento ou Concluída

2. Clique em "Adicionar tarefa"

3. A tarefa será criada e aparecerá na lista com notificação de sucesso

### Editar uma Tarefa

1. Clique no botão "Editar" do card da tarefa

2. Um modal abrirá com os dados da tarefa preenchidos

3. Faça as alterações necessárias

4. Clique em "Salvar" para confirmar

### Deletar uma Tarefa

1. Clique no botão "Deletar" do card da tarefa

2. Uma modal de confirmação aparecerá

3. Clique em "Confirmar" para deletar ou "Cancelar" para voltar

### Mudar Status da Tarefa

1. Clique no select de status no card da tarefa

2. Selecione o novo status (Pendente, Em Andamento, Concluída)

3. A mudança é salva automaticamente

### Filtrar Tarefas

1. Clique em um dos botões de filtro:
   - Todas: Mostra todas as tarefas
   - Pendentes: Mostra apenas tarefas pendentes
   - Em Andamento: Mostra apenas tarefas em andamento
   - Concluída: Mostra apenas tarefas concluídas

2. As tarefas serão filtradas e ordenadas por prioridade

## Endpoints da API

A aplicação se conecta aos seguintes endpoints:

```
GET  /tarefas                    Lista todas as tarefas
POST /tarefas                    Cria uma nova tarefa
GET  /tarefas/:id                Busca uma tarefa por ID
PUT  /tarefas/:id                Atualiza uma tarefa completa
PATCH /tarefas/:id/status        Atualiza apenas o status
DELETE /tarefas/:id              Deleta uma tarefa
```

## Estrutura do CSS

O arquivo CSS está organizado em seções:

1. Variáveis CSS (cores, espaçamentos, sombras)
2. Estilos globais (body, html)
3. Componentes (buttons, forms, badges)
4. Cards de tarefas
5. Modals
6. Media queries responsivas
7. Animações

## Estrutura do JavaScript

O arquivo script.js está organizado por funcionalidade:

1. Funcoes de API (Fetch)
   - buscarTarefas()
   - salvarTarefa()
   - atualizarTarefa()
   - mudarStatus()
   - removerTarefa()

2. Funcoes de Interface
   - mostrarTarefas()
   - abrirModal()
   - fecharModal()
   - ordenarPorPrioridade()

3. Funcoes de Notificacao
   - mostrarAlerta()
   - mostrarConfirm()

4. Inicializacao
   - initForm()
   - initFiltros()
   - initModal()
   - DOMContentLoaded

## Notificacoes

A aplicação usa Toastify para exibir notificações:

- Tarefa criada: Verde
- Tarefa atualizada: Verde
- Status alterado: Azul
- Tarefa deletada: Laranja
- Erro na operação: Vermelho

## Responsividade

A aplicação é totalmente responsiva e se adapta a:

- Desktops (1200px+)
- Tablets (768px - 1199px)
- Smartphones (até 767px)

## Funcoes JavaScript Principais

### buscarTarefas()
Busca todas as tarefas da API

### salvarTarefa(titulo, descricao, prioridade, status)
Cria uma nova tarefa

### atualizarTarefa(id, titulo, descricao, prioridade, status)
Atualiza uma tarefa existente

### mudarStatus(id, status)
Altera apenas o status de uma tarefa

### removerTarefa(id)
Deleta uma tarefa

### ordenarPorPrioridade(tarefas)
Ordena tarefas por prioridade (Alta > Média > Baixa)

### mostrarTarefas()
Renderiza as tarefas no DOM

### mostrarAlerta(mensagem)
Exibe um alerta personalizado

### mostrarConfirm(mensagem)
Exibe uma confirmação personalizada

## Tratamento de Erros

A aplicação trata erros de forma elegante:

- Notificações de erro em caso de falha na requisição
- Validação de campos obrigatórios
- Confirmação antes de deletar
- Modal amigável para alertas

## Melhorias que irei fazer no Futuro

- Autenticacao de usuarios
- Armazenamento local (localStorage)
- Busca e pesquisa de tarefas
- Categorias ou tags
- Prazos e datas de entrega
- Notificacoes por email
- Modo escuro
- Exportar tarefas em PDF


## Contribuicao

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (git checkout -b feature/NovaFeature)
3. Commit suas mudancas (git commit -m 'Adiciona NovaFeature')
4. Push para a branch (git push origin feature/NovaFeature)
5. Abra um Pull Request

## Autor

Rodrigo Barros Souza