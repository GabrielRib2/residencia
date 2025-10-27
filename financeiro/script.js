document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('exportBtn');
    const fileInput = document.getElementById('fileInput');
    const salvarBtn = document.getElementById('salvarInfoBtn');
    const registroForm = document.getElementById('registroFinanceiroForm');

    // 1. LÓGICA DE MÁSCARA MONETÁRIA (R$)
    const valueInputs = document.querySelectorAll('input[placeholder="R$ 0.00"]');

    valueInputs.forEach(input => {
        // Adiciona o ouvinte de evento para formatar a cada dígito digitado
        input.addEventListener('input', formatCurrency);
        
        // Formata o valor inicial (se houver)
        if (input.value) {
            input.value = currencyFormatter(input.value);
        }
    });

    function formatCurrency(e) {
        let value = e.target.value;
        
        // 1. Remove tudo que não for dígito
        value = value.replace(/\D/g, ''); 
        
        // 2. Se o valor for vazio, sai
        if (value === '') {
            e.target.value = '';
            return;
        }

        // 3. Converte para número e divide por 100 para ter centavos
        let numericValue = parseInt(value, 10) / 100;
        
        // 4. Formata o valor final
        e.target.value = currencyFormatter(numericValue);
    }
    
    // Função helper para formatar o número com a localidade brasileira
    function currencyFormatter(number) {
        return number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
    }


    // 2. Funcionalidade do botão "Exportar" (Abrir documentos)
    exportBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // 3. Funcionalidade do botão "Salvar Informações"
    salvarBtn.addEventListener('click', (e) => {
        e.preventDefault(); 

        if (registroForm.checkValidity()) {
            alert('Informações financeiras salvas com sucesso! (Simulação de POST de dados)');
            registroForm.reset(); 
        } else {
            registroForm.reportValidity();
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // ... (Seu código JavaScript existente aqui: máscara, exportar, salvar) ...

    // =======================================================
    // --- LÓGICA DO ACORDEÃO (Histórico de Transações) ---
    // =======================================================
    const acordeaoHeaders = document.querySelectorAll('.acordeao-header');

    acordeaoHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Pega o corpo da lista que deve ser expandida/recolhida
            const body = this.nextElementSibling;
            
            // 1. Alterna a classe 'active' no header (para girar o ícone)
            this.classList.toggle('active');

            // 2. Expande ou recolhe o corpo
            if (body.style.maxHeight) {
                // Se estiver aberto, fecha
                body.style.maxHeight = null;
                body.style.padding = '0 15px'; // Remove o padding vertical ao fechar
            } else {
                // Se estiver fechado, abre. 
                // Define maxHeight para a altura total do conteúdo
                body.style.maxHeight = body.scrollHeight + "px";
                body.style.padding = '15px'; // Adiciona o padding vertical ao abrir
            }
            
            // Opcional: Fecha todos os outros itens abertos
            // closeOtherAcordeons(this);
        });
    });

    // Função opcional para fechar os outros (melhora a usabilidade)
    function closeOtherAcordeons(currentHeader) {
        acordeaoHeaders.forEach(header => {
            if (header !== currentHeader && header.classList.contains('active')) {
                header.classList.remove('active');
                const body = header.nextElementSibling;
                body.style.maxHeight = null;
                body.style.padding = '0 15px';
            }
        });
    }

    // ... (Seu código JavaScript existente continua aqui) ...
});
document.addEventListener('DOMContentLoaded', function() {
    
    // ... (Seu código JavaScript existente: Máscara, Salvar, Acordeão) ...

    const exportBtn = document.getElementById('exportBtn');
    const registroForm = document.getElementById('registroFinanceiroForm');

    // -----------------------------------------------------------------
    // --- FUNÇÃO DE EXPORTAÇÃO PARA CSV (EXCEL) ---
    // -----------------------------------------------------------------
    function exportToCSV() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('pt-BR').replace(/\//g, '-');
        const timeStr = now.toLocaleTimeString('pt-BR').replace(/:/g, '-');
        
        // Coleta os campos de interesse e seus rótulos
        const fields = [
            { id: 'dataRegistro', label: 'Data de Registro' },
            { id: 'valorLocacao', label: 'Valor da Locação do Imóvel' },
            { id: 'valorJuridica', label: 'Valor da Assessoria Jurídica' },
            { id: 'valorComunicacao', label: 'Valor da Assessoria de Comunicação' },
            { id: 'valorCombustivel', label: 'Valor do Combustível' },
            { id: 'despesasDebito', label: 'Despesas do Débito' },
            { id: 'despesasCredito', label: 'Despesas no Crédito' },
            { id: 'outrasDespesas', label: 'Outras Despesas' },
        ];

        // 1. Gera o Cabeçalho (Rótulos)
        const header = fields.map(f => `"${f.label}"`).join(';');
        
        // 2. Gera os Dados (Valores do Formulário)
        const dataRow = fields.map(f => {
            const input = document.getElementById(f.id);
            // Remove aspas e quebras de linha que poderiam quebrar o CSV
            let value = input ? input.value.replace(/"/g, '""') : '';
            return `"${value}"`;
        }).join(';');

        // Constrói o conteúdo CSV completo
        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(header + '\n' + dataRow);

        // 3. Cria um link temporário para download
        const link = document.createElement('a');
        link.setAttribute('href', csvContent);
        // Define o nome do arquivo para download
        link.setAttribute('download', `RegistroFinanceiro_${dateStr}_${timeStr}.csv`);

        // 4. Simula o clique e remove o link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('Dados financeiros exportados com sucesso para CSV!');
    }
    
    // --- ATUALIZAÇÃO DO BOTÃO EXPORTAR ---
    if (exportBtn) {
        exportBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Impede qualquer ação padrão do botão
            
            // Em vez de abrir o seletor de arquivos, exportamos para CSV
            exportToCSV();
        });
    }

    // ... (O restante da sua lógica JavaScript continua aqui: Salvar, Máscara, Acordeão) ...

});
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica do Assistente I.A. ---
    const assistantToggleBtn = document.getElementById('assistant-toggle-btn');
    const chatPanel = document.getElementById('assistantChatPanel');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatBody = document.getElementById('chatBody');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    // 1. Abrir/Fechar o Painel (Toggle)
    if (assistantToggleBtn) {
        assistantToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            chatPanel.classList.toggle('open');
        });
    }

    // 2. Fechar o Painel (Botão X)
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatPanel.classList.remove('open');
        });
    }

    // 3. Simular Envio de Mensagem
    function sendMessage() {
        const userText = chatInput.value.trim();
        if (userText === "") return;

        // Adiciona a mensagem do usuário
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('chat-message-user');
        userMessageDiv.style.backgroundColor = '#d3e0ff'; // Cor de fundo do usuário
        userMessageDiv.style.marginLeft = 'auto'; // Alinha à direita
        userMessageDiv.textContent = userText;
        chatBody.appendChild(userMessageDiv);

        chatInput.value = ''; // Limpa o input
        chatBody.scrollTop = chatBody.scrollHeight; // Scroll para o final

        // Simulação de Resposta da IA
        setTimeout(() => {
            const aiResponseDiv = document.createElement('div');
            aiResponseDiv.classList.add('chat-message-ai');
            aiResponseDiv.textContent = `Entendi: "${userText}". Por favor, especifique mais para que eu possa ajudá-lo com seu gerenciamento!`;
            chatBody.appendChild(aiResponseDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', sendMessage);
    }
    
    // Enviar mensagem ao pressionar Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// ... (Restante do seu código JavaScript para outras páginas) ...