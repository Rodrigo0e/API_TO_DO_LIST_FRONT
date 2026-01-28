const API = "https://produtask.onrender.com//tarefas";

let minhasTarefas = [];
let filtroSelecionado = "todas";
let tarefaEmEdicao = null;

function notificar(mensagem, tipo = "sucesso") {
  const cores = {
    sucesso: "#4CAF50",
    erro: "#F44336",
    info: "#2196F3",
    aviso: "#FF9800"
  };

  Toastify({
    text: mensagem,
    duration: 2000,
    gravity: "top",
    position: "right",
    style: { background: cores[tipo] }
  }).showToast();
}

function mostrarConfirm(mensagem) {
  return new Promise((resolve) => {
    const modal = document.getElementById("modal-confirm");
    document.getElementById("confirm-message").textContent = mensagem;
    modal.classList.add("show");

    const btnConfirm = document.getElementById("btn-confirm");
    const btnCancel = document.getElementById("btn-cancel");

    const fechar = () => {
      modal.classList.remove("show");
      btnConfirm.removeEventListener("click", confirmar);
      btnCancel.removeEventListener("click", cancelar);
    };

    const confirmar = () => {
      fechar();
      resolve(true);
    };

    const cancelar = () => {
      fechar();
      resolve(false);
    };

    btnConfirm.addEventListener("click", confirmar);
    btnCancel.addEventListener("click", cancelar);
  });
}

function mostrarAlerta(mensagem) {
  return new Promise((resolve) => {
    const modal = document.getElementById("modal-alert");
    document.getElementById("alert-message").textContent = mensagem;
    modal.classList.add("show");

    const btnOk = document.getElementById("btn-alert-ok");

    const fechar = () => {
      modal.classList.remove("show");
      btnOk.removeEventListener("click", fechar);
    };

    btnOk.addEventListener("click", fechar);
  });
}

async function buscarTarefas() {
  try {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    const resposta = await response.json();
    
    if (Array.isArray(resposta)) {
      return resposta;
    }
    if (resposta && Array.isArray(resposta.data)) {
      return resposta.data;
    }
    
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function salvarTarefa(titulo, descricao, prioridade, status) {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descricao, prioridade, status })
    });
    if (!response.ok) {
      throw new Error("Falha ao salvar");
    }
    notificar("Tarefa criada com sucesso!", "sucesso");
    return await response.json();
  } catch (error) {
    console.error(error);
    notificar("Erro ao criar tarefa", "erro");
    return null;
  }
}

async function atualizarTarefa(id, titulo, descricao, prioridade, status) {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descricao, prioridade, status })
    });
    if (!response.ok) {
      throw new Error("Falha ao atualizar");
    }
    notificar("Tarefa atualizada com sucesso!", "sucesso");
    return await response.json();
  } catch (error) {
    console.error(error);
    notificar("Erro ao atualizar tarefa", "erro");
    return null;
  }
}

async function mudarStatus(id, status) {
  try {
    const response = await fetch(`${API}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      throw new Error("Falha ao atualizar status");
    }
    notificar(`Status atualizado para: ${status}`, "info");
    return await response.json();
  } catch (error) {
    console.error(error);
    notificar("Erro ao atualizar status", "erro");
    return null;
  }
}

async function removerTarefa(id) {
  try {
    const response = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Falha ao remover");
    }
    notificar("Tarefa removida com sucesso!", "aviso");
    return await response.json();
  } catch (error) {
    console.error(error);
    notificar("Erro ao remover tarefa", "erro");
    return null;
  }
}

function ordenarPorPrioridade(tarefas) {
  const ordem = { alta: 1, media: 2, baixa: 3 };
  return [...tarefas].sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade]);
}

async function atualizarLista() {
  minhasTarefas = await buscarTarefas();
  mostrarTarefas();
}

function mostrarTarefas() {
  const element = document.getElementById("tarefas-container");
  
  if (!element) {
    return;
  }

  if (!Array.isArray(minhasTarefas)) {
    minhasTarefas = [];
  }

  let resultado = minhasTarefas;
  
  if (filtroSelecionado !== "todas") {
    resultado = minhasTarefas.filter(t => t.status === filtroSelecionado);
  }

  resultado = ordenarPorPrioridade(resultado);

  if (resultado.length === 0) {
    element.innerHTML = '<div class="empty-state"><p>Nenhuma tarefa encontrada. Crie uma nova tarefa!</p></div>';
    return;
  }

  element.innerHTML = resultado.map(t => `
    <div class="tarefa-card" data-id="${t.id}">
      <div class="tarefa-header">
        <h3>${t.titulo}</h3>
        <span class="prioridade-badge prioridade-${t.prioridade}">${t.prioridade}</span>
      </div>
      <p class="tarefa-descricao">${t.descricao}</p>
      <div class="tarefa-footer">
        <div class="tarefa-status">
          <select class="status-select" data-id="${t.id}">
            <option value="pendente" ${t.status === "pendente" ? "selected" : ""}>Pendente</option>
            <option value="em andamento" ${t.status === "em andamento" ? "selected" : ""}>Em Andamento</option>
            <option value="concluida" ${t.status === "concluida" ? "selected" : ""}>Concluída</option>
          </select>
        </div>
        <div class="tarefa-acoes">
          <button class="btn btn-edit" data-id="${t.id}">Editar</button>
          <button class="btn btn-delete" data-id="${t.id}">Deletar</button>
        </div>
      </div>
    </div>
  `).join("");

  attachEventos();
}

function attachEventos() {
  document.querySelectorAll(".status-select").forEach(select => {
    select.addEventListener("change", async (e) => {
      const id = e.target.dataset.id;
      const novoStatus = e.target.value;
      await mudarStatus(id, novoStatus);
      await atualizarLista();
    });
  });

  document.querySelectorAll(".btn-delete").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      const confirma = await mostrarConfirm("Deseja remover esta tarefa?");
      if (confirma) {
        await removerTarefa(id);
        await atualizarLista();
      }
    });
  });

  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const tarefa = minhasTarefas.find(x => x.id == id);
      if (tarefa) {
        abrirModal(tarefa);
      }
    });
  });
}

function abrirModal(tarefa) {
  tarefaEmEdicao = tarefa;
  document.getElementById("edit-titulo").value = tarefa.titulo;
  document.getElementById("edit-descricao").value = tarefa.descricao;
  document.getElementById("edit-prioridade").value = tarefa.prioridade;
  document.getElementById("edit-status").value = tarefa.status;
  document.getElementById("modal-editar").classList.add("show");
}

function fecharModal() {
  document.getElementById("modal-editar").classList.remove("show");
  tarefaEmEdicao = null;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-tarefa");
  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const prioridade = document.getElementById("prioridade").value;
    const status = document.getElementById("status").value;

    if (!titulo || !descricao || !prioridade || !status) {
      mostrarAlerta("Preencha todos os campos");
      return;
    }

    await salvarTarefa(titulo, descricao, prioridade, status);
    form.reset();
    await atualizarLista();
  });

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      filtroSelecionado = e.target.dataset.filter;
      mostrarTarefas();
    });
  });

  const modal = document.getElementById("modal-editar");
  const formEditar = document.getElementById("form-editar");
  const btnCancelar = document.getElementById("btn-cancelar");
  const closeBtn = document.querySelector(".modal-close");

  closeBtn.addEventListener("click", fecharModal);
  btnCancelar.addEventListener("click", fecharModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      fecharModal();
    }
  });

  formEditar.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (!tarefaEmEdicao) return;

    const titulo = document.getElementById("edit-titulo").value.trim();
    const descricao = document.getElementById("edit-descricao").value.trim();
    const prioridade = document.getElementById("edit-prioridade").value;
    const status = document.getElementById("edit-status").value;

    if (!titulo || !descricao || !prioridade || !status) {
      mostrarAlerta("Preencha todos os campos");
      return;
    }

    await atualizarTarefa(tarefaEmEdicao.id, titulo, descricao, prioridade, status);
    fecharModal();
    await atualizarLista();
  });

  atualizarLista();
});