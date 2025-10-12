document.addEventListener('DOMContentLoaded', function() {
    
    // Lógica para os ícones de Opções na Tabela
    const dataTable = document.querySelector('.data-table');
    
    if (dataTable) {
        dataTable.addEventListener('click', function(e) {
            const target = e.target;
            const row = target.closest('tr');
            
            if (!row) return;

            const actionType = row.cells[2].textContent; // Tipo da Ação

            if (target.classList.contains('edit-icon')) {
                alert(`Editar Ação: ${actionType} em ${row.cells[0].textContent}`);
                // Adicionar aqui a lógica para abrir um modal de edição
            } 
            
            if (target.classList.contains('trash-icon')) {
                if (confirm(`Tem certeza que deseja remover a ação: ${actionType}?`)) {
                    // Lógica para remover a linha (simulação)
                    row.remove(); 
                }
            }
        });
    }
});