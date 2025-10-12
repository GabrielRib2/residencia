document.addEventListener('DOMContentLoaded', () => {
    const newTaskBtn = document.getElementById('newTaskBtn');
    const taskModal = document.getElementById('taskModal');
    const closeBtn = document.querySelector('.close-btn');
    const taskForm = document.getElementById('taskForm');
    const taskLists = document.querySelectorAll('.task-list');

    closeBtn.addEventListener('click', () => {
        taskModal.style.display = 'none';
    });

    // Fecha o modal se o usuário clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    });

    // Adiciona uma nova tarefa
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const taskDate = document.getElementById('taskDate').value;
        createTaskCard(taskName, taskDate, 'todo');
        taskModal.style.display = 'none';
        taskForm.reset();
    });

    function createTaskCard(name, date, status) {
        const taskList = document.querySelector(`.task-list[data-status="${status}"]`);
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.setAttribute('draggable', 'true');

        // Formata a data para dd/mm
        const formattedDate = date ? new Date(date).toLocaleDateString('pt-BR').substring(0, 5) : 'Sem prazo';

        taskCard.innerHTML = `
            <h4>${name}</h4>
            <div class="task-card-footer">
                <p><i class="fas fa-calendar-alt"></i> ${formattedDate}</p>
                <div class="task-icons">
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash-alt trash-icon"></i>
                </div>
            </div>
        `;
        taskList.appendChild(taskCard);
        updateTaskCount();
    }

    // Funcionalidade de arrastar e soltar
    let draggedItem = null;

    taskLists.forEach(list => {
        list.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('task-card')) {
                draggedItem = e.target;
                setTimeout(() => {
                    e.target.style.display = 'none';
                }, 0);
            }
        });

        list.addEventListener('dragend', (e) => {
            setTimeout(() => {
                e.target.style.display = 'flex';
                draggedItem = null;
                updateTaskCount();
            }, 0);
        });

        list.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        list.addEventListener('dragenter', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('task-list')) {
                e.target.style.backgroundColor = '#e0e0e0';
            }
        });

        list.addEventListener('dragleave', (e) => {
            if (e.target.classList.contains('task-list')) {
                e.target.style.backgroundColor = '';
            }
        });

        list.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('task-list')) {
                e.target.appendChild(draggedItem);
                e.target.style.backgroundColor = '';
            }
        });
    });

    // Nova funcionalidade para deletar a tarefa
    document.addEventListener('click', (e) => {
        // Verifica se o clique foi em um ícone de lixeira
        if (e.target.classList.contains('fa-trash-alt')) {
            const taskCard = e.target.closest('.task-card');
            if (taskCard) {
                taskCard.remove();
                updateTaskCount();
            }
        }
    });

    // Função para atualizar a contagem de tarefas
    function updateTaskCount() {
        const columns = document.querySelectorAll('.kanban-column');
        columns.forEach(column => {
            const count = column.querySelector('.task-list').children.length;
            column.querySelector('.task-count').textContent = count;
        });
    }

    // Chamada inicial para atualizar a contagem
    updateTaskCount();
});
// Seletores do modal de edição
    const editModal = document.getElementById('editModal');
    const editCloseBtn = document.querySelector('.edit-close-btn');
    const editForm = document.getElementById('editForm');
    const editTaskNameInput = document.getElementById('editTaskName');
    const editTaskDateInput = document.getElementById('editTaskDate');
    let taskToEdit = null; // Variável para armazenar a tarefa sendo editada
    // No início do script.js
    const taskModal = document.getElementById('taskModal');
    const taskNameInput = document.getElementById('taskName');
    const taskDateInput = document.getElementById('taskDate');
    // ... e assim por diante.
    document.addEventListener('DOMContentLoaded', () => {
    // --- Variáveis de Seleção (Confirme que estão aqui) ---
    const taskModal = document.getElementById('taskModal');
    const taskNameInput = document.getElementById('taskName');
    const taskDateInput = document.getElementById('taskDate');
    const taskForm = document.getElementById('taskForm');
    const taskLists = document.querySelectorAll('.task-list');
    let taskToEdit = null;

    // ... (Mantenha todas as funções de abrir/fechar e a lógica de SUBMIT) ...

    // --- LÓGICA DE CLIQUE (LIXEIRA E LÁPIS) ---
    document.addEventListener('click', (e) => {
        const target = e.target;

        // LÓGICA DE DELETAR (LIXEIRA)
        if (target.classList.contains('trash-icon')) {
            target.closest('.task-card').remove();
            updateTaskCount();
        }

        // LÓGICA DE EDITAR (LÁPIS) - FOCO NA EDIÇÃO
        if (target.classList.contains('edit-icon')) {
            // Se o target for o ícone de lápis
            e.preventDefault(); // Impede qualquer ação padrão

            // 1. Encontra o card pai da tarefa e o armazena
            taskToEdit = target.closest('.task-card');
            
            // 2. Configura o modal para o modo "Edição"
            taskModal.querySelector('h2').textContent = 'Editar Tarefa';
            taskModal.querySelector('button[type="submit"]').textContent = 'Salvar Alterações';

            // 3. Preenche os campos do formulário
            taskNameInput.value = taskToEdit.querySelector('.task-name').textContent;
            
            // Lógica de conversão de data (DD/MM para YYYY-MM-DD)
            const taskDateText = taskToEdit.querySelector('.task-date').textContent.trim().replace('📅 ', '').replace('Sem prazo', '');
            if (taskDateText) {
                const [day, month] = taskDateText.split('/');
                const currentYear = new Date().getFullYear(); 
                taskDateInput.value = `${currentYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            } else {
                taskDateInput.value = '';
            }

            // 4. Torna o modal visível
            // Se o modal não abrir, esta linha é a principal suspeita.
            taskModal.style.display = 'flex'; 
        }
    });

    // ... (Mantenha as funções createTaskCard, updateTaskCount, Drag & Drop, etc.) ...
});
    