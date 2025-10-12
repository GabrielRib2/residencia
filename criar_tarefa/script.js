document.addEventListener("DOMContentLoaded", function () {
  const novaTarefaForm = document.getElementById("novaTarefaForm");
  const cancelBtn = document.getElementById("cancelBtn");

  // Simulação de Submissão do Formulário
  novaTarefaForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Em um projeto real, você coletaria os dados do formulário aqui
    const titulo = document.getElementById("titulo").value;

    alert(`Tarefa "${titulo}" criada com sucesso! (Simulação)`);

    // Redireciona de volta para o Kanban após a simulação de criação
    // Ajuste o caminho conforme sua estrutura de pastas, ex: window.location.href = '../kanban.html';
    window.location.href = "../kanban/kanban.html";
  });

  // Botão Cancelar: Redireciona de volta para o Kanban
  cancelBtn.addEventListener("click", function () {
    // Redireciona de volta para o Kanban
    window.location.href = "../kanban/kanban.html";
  });
});
