document.addEventListener('DOMContentLoaded', function() {
    // --- Seletores Principais da Página Financeiro ---
    const valorDespesaInput = document.getElementById('valorDespesa');
    const exportBtn = document.getElementById('exportBtn');
    const registroForm = document.getElementById('registroFinanceiroForm');
    const acordeaoHeaders = document.querySelectorAll('.acordeao-header');

    // =======================================================
    // --- 1. LÓGICA DE MÁSCARA MONETÁRIA (R$)
    // =======================================================

    // Função helper para formatar o número com a localidade brasileira (R$)
    function currencyFormatter(number) {
        if (typeof number === 'string') {
            number = parseFloat(number.replace('.', '').replace(',', '.'));
        }
        return number.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        });
    }

    // Função que aplica a máscara monetária ao input
    function formatCurrency(e) {
        let value = e.target.value;
        
        // Remove tudo que não for dígito
        value = value.replace(/\D/g, ''); 
        
        if (value === '') {
            e.target.value = '';
            return;
        }

        // Converte para número e divide por 100 para ter centavos
        let numericValue = parseInt(value, 10) / 100;
        
        // Formata o valor final
        e.target.value = currencyFormatter(numericValue);
    }
    
    // Aplica a máscara ao campo Valor da Despesa
    if (valorDespesaInput) {
        valorDespesaInput.addEventListener('input', formatCurrency);
        
        // Opcional: Adiciona o símbolo R$ e 0,00 se o campo estiver vazio ao perder o foco
        valorDespesaInput.addEventListener('blur', (e) => {
            if (e.target.value === '' || e.target.value === 'R$ 0,00') {
                e.target.value = currencyFormatter(0);
            }
        });
        // Formata o valor inicial ao carregar
        if (!valorDespesaInput.value) {
            valorDespesaInput.value = currencyFormatter(0);
        }
    }

    // =======================================================
    // --- 2. LÓGICA DE EXPORTAÇÃO (CSV) e SALVAR
    // =======================================================

    // Funções de exportar e salvar (mantidas)
    // ... (Seu código de exportação para CSV e salvar informações aqui) ...
    function exportToCSV() {
        const now = new Date();
        const dateStr = now.toLocaleDateString('pt-BR').replace(/\//g, '-');
        
        // Coleta os campos de interesse
        const fields = [
            { id: 'dataRegistro', label: 'Data de Registro' },
            { id: 'valorDespesa', label: 'Valor da Despesa' },
            { id: 'tipoTransacao', label: 'Tipo de Transação' },
            { id: 'categoria', label: 'Categoria' },
            { id: 'descricao', label: 'Descrição' },
        ];

        const header = fields.map(f => `"${f.label}"`).join(';');
        
        const dataRow = fields.map(f => {
            const input = document.getElementById(f.id);
            let value = input ? input.value.replace(/"/g, '""') : '';
            return `"${value}"`;
        }).join(';');

        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(header + '\n' + dataRow);

        const link = document.createElement('a');
        link.setAttribute('href', csvContent);
        link.setAttribute('download', `RegistroFinanceiro_${dateStr}.csv`);

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('Dados financeiros exportados com sucesso para CSV!');
    }
    
    // Evento do botão Exportar
    if (exportBtn) {
        exportBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            exportToCSV();
        });
    }

    // Evento do botão Salvar (Exemplo)
    const salvarBtn = document.querySelector('.salvar-btn');
    if(salvarBtn) {
        salvarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulação de validação
            if (registroForm.checkValidity()) {
                alert('Registro salvo com sucesso!');
                registroForm.reset(); 
            } else {
                registroForm.reportValidity();
            }
        });
    }
    

    // =======================================================
    // --- 3. LÓGICA DO ACORDEÃO (Histórico de Transações)
    // =======================================================
    
    if (acordeaoHeaders.length > 0) {
        acordeaoHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const body = this.nextElementSibling;
                this.classList.toggle('active');

                if (body.style.maxHeight) {
                    body.style.maxHeight = null;
                    body.style.paddingTop = '0';
                    body.style.paddingBottom = '0';
                } else {
                    body.style.maxHeight = body.scrollHeight + 30 + "px"; // Adiciona padding para evitar corte
                    body.style.paddingTop = '15px';
                    body.style.paddingBottom = '15px';
                }
                
                // Opcional: Fecha todos os outros itens abertos
                closeOtherAcordeons(this);
            });
        });
    }

    function closeOtherAcordeons(currentHeader) {
        acordeaoHeaders.forEach(header => {
            if (header !== currentHeader && header.classList.contains('active')) {
                header.classList.remove('active');
                const body = header.nextElementSibling;
                body.style.maxHeight = null;
                body.style.paddingTop = '0';
                body.style.paddingBottom = '0';
            }
        });
    }
    
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