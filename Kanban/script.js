document.addEventListener('DOMContentLoaded', () => {
    const newTaskBtn = document.getElementById('newTaskBtn');
    const taskModal = document.getElementById('taskModal');
    const closeBtn = document.querySelector('.close-btn');
    const taskForm = document.getElementById('taskForm');
    const taskLists = document.querySelectorAll('.task-list');

    // Abre o modal
    newTaskBtn.addEventListener('click', () => {
        taskModal.style.display = 'flex';
    });

    // Fecha o modal
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