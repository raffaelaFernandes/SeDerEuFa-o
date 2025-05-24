function configurarLista(inputId, listaId, storageKey) {
  const input = document.getElementById(inputId);
  const lista = document.getElementById(listaId);

  // Adiciona tarefa ao pressionar Enter
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      adicionarTarefa(input, lista, storageKey);
    }
  });

  // Marcando ou removendo tarefa
  lista.addEventListener('click', function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
    }
    salvarLista(lista, storageKey);
  });

  // Carregar tarefas salvas
  lista.innerHTML = localStorage.getItem(storageKey) || "";
}

function adicionarTarefa(input, lista, storageKey) {
  if (input.value.trim() === "") {
    alert("Digite uma tarefa!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = input.value;
  const span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
  lista.appendChild(li);
  input.value = "";

  salvarLista(lista, storageKey);
}

function salvarLista(lista, key) {
  localStorage.setItem(key, lista.innerHTML);
}
configurarLista("input-hoje", "lista-hoje", "tarefas-hoje");
configurarLista("input-amanha", "lista-amanha", "tarefas-amanha");
configurarLista("input-semana", "lista-semana", "tarefas-semana");