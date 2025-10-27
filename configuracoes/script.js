document.addEventListener('DOMContentLoaded', function() {
    // --- Seletores da Página ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const segurancaForm = document.getElementById('segurancaForm'); 
    
    // Variáveis do Formulário de Segurança
    const novaSenhaInput = document.getElementById('novaSenha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');


    // =======================================================
    // --- 1. LÓGICA DE TROCA DE ABAS (Trocar Abas de Conteúdo)
    // =======================================================

    function showTab(tabName) {
        // Remove a classe 'active' de todos os botões e painéis
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Ativa o botão e o painel correspondente
        const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        const activePane = document.getElementById(tabName);
        
        if (activeButton) {
            activeButton.classList.add('active');
        }
        if (activePane) {
            activePane.classList.add('active');
        }
    }

    // Adiciona evento de clique para a troca de abas
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            showTab(tabName);
        });
    });

    // Inicializa a primeira aba como 'Informações do Usuário'
    showTab('info-usuario');


    // =======================================================
    // --- 2. LÓGICA DE SEGURANÇA (Alterar Senha e Validação)
    // =======================================================

    if (segurancaForm) {
        segurancaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 1. Validação de Senhas Coincidentes
            if (novaSenhaInput.value !== confirmarSenhaInput.value) {
                alert('Erro: A Nova Senha e a Confirmação de Senha não coincidem!');
                confirmarSenhaInput.focus();
                return;
            }

            // 2. Validação de Complexidade (Mínimo 8 caracteres)
            if (novaSenhaInput.value.length < 8) {
                 alert('Erro: A nova senha deve ter no mínimo 8 caracteres.');
                 novaSenhaInput.focus();
                 return;
            }

            // Se passar nas validações
            alert('Senha alterada com sucesso! (Simulação de envio de dados)');
            segurancaForm.reset();
        });
    }

    // =======================================================
    // --- 3. LÓGICA DE MOSTRAR/OCULTAR SENHA (Ícone de Olho)
    // =======================================================
    
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Verifica se o clique foi no ícone de olho
        if (target.classList.contains('toggle-password')) {
            const targetId = target.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput) {
                // Alterna o tipo do input (password <-> text)
                const isPassword = passwordInput.getAttribute('type') === 'password';
                passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
                
                // Alterna o ícone (olho aberto <-> olho fechado)
                target.classList.toggle('fa-eye-slash'); 
            }
        }
    });
    
    // (Opcional: Lógica do botão Salvar Perfil para evitar erros no console)
    const salvarPerfilBtn = document.querySelector('#info-usuario .salvar-btn');
    if (salvarPerfilBtn) {
        salvarPerfilBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Perfil de usuário salvo com sucesso!');
        });
    }
});
// --- LÓGICA DE ADMINISTRAÇÃO DE USUÁRIOS ---
    const atualizarListaBtn = document.getElementById('atualizarListaBtn');
    const editPermsBtn = document.querySelector('.edit-perms-btn');
    const removeUserBtn = document.querySelector('.remove-user-btn');

    if (atualizarListaBtn) {
        atualizarListaBtn.addEventListener('click', function() {
            // Simulação de atualização de dados da tabela
        });
    }

    if (editPermsBtn) {
        editPermsBtn.addEventListener('click', function() {
            // Em uma aplicação real, você faria uma requisição AJAX para abrir um modal de edição
        });
    }

    if (removeUserBtn) {
        removeUserBtn.addEventListener('click', function() {
            // Simulação de remoção de usuário
            if (confirm('Tem certeza que deseja remover o usuário Administrador Sistema?')) {
                // Aqui você adicionaria a lógica para remover a linha da tabela (DOM) e do banco de dados.
            }
        });
    }
    document.addEventListener('DOMContentLoaded', function() {
    // ... (Seus seletores e lógica de abas e segurança existentes) ...

    // --- Seletores do Modal de Permissões (NOVO) ---
    const permissionsModal = document.getElementById('permissionsModal');
    const closeBtnPerms = document.querySelector('.close-btn-perms');
    const editPermsBtn = document.querySelector('.edit-perms-btn'); // Botão na aba Administração
    const permissionsForm = document.getElementById('permissionsForm');
    
    // --- 1. Abrir Modal ao Clicar em "Editar Permissões" ---
    if (editPermsBtn) {
        editPermsBtn.addEventListener('click', function() {
            // Aqui você faria uma requisição para carregar as permissões reais do usuário
            permissionsModal.style.display = 'flex';
        });
    }

    // --- 2. Fechar Modal (Botão X) ---
    if (closeBtnPerms) {
        closeBtnPerms.addEventListener('click', function() {
            permissionsModal.style.display = 'none';
        });
    }
    
    // --- 3. Fechar Modal (Clique fora) ---
    window.addEventListener('click', function(e) {
        if (e.target === permissionsModal) {
            permissionsModal.style.display = 'none';
        }
    });

    // --- 4. Submissão do Formulário de Permissões ---
    if (permissionsForm) {
        permissionsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de coleta de dados
            const checkboxes = Array.from(e.target.querySelectorAll('input[type="checkbox"]'));
            const permissoesAtivas = checkboxes
                .filter(cb => cb.checked)
                .map(cb => cb.name);
            
            alert(`Permissões salvas para: ${permissoesAtivas.join(', ')}`);
            
            permissionsModal.style.display = 'none';
            // Em uma aplicação real, você faria uma requisição para salvar as mudanças no servidor.
        });
    }
    
    // ... (Restante do seu código JavaScript, como a lógica das abas, segurança e salvar perfil) ...
});
// ... (Código JavaScript existente) ...

document.addEventListener('DOMContentLoaded', function() {
    // --- Seletores da Página ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // NOVO SELETOR: Elemento P do cabeçalho
    const headerDescription = document.getElementById('headerDescription'); 
    
    // ... (O restante dos seus seletores de formulário e segurança) ...


    // =======================================================
    // --- LÓGICA DE TROCA DE ABAS (AGORA ATUALIZA O TEXTO)
    // =======================================================

    function showTab(tabName) {
        // Mapeamento dos textos de descrição por aba
        const descriptions = {
            'info-usuario': 'Gerencie suas informações pessoais e de contato.',
            'seguranca': 'Altere sua senha de acesso e configure opções de segurança.',
            'administracao': 'Gerencie usuários e suas permissões de acesso às páginas do sistema.'
        };

        // 1. Lógica de Ativação (existente)
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        const activePane = document.getElementById(tabName);
        
        if (activeButton) {
            activeButton.classList.add('active');
        }
        if (activePane) {
            activePane.classList.add('active');
        }
        
        // 2. LÓGICA DE MUDANÇA DE TEXTO (NOVO)
        if (headerDescription) {
            // Usa o texto mapeado, ou um fallback se a aba não estiver mapeada
            headerDescription.textContent = descriptions[tabName] || 'Gerencie suas configurações de usuário';
        }
    }

    // ... (O restante da sua lógica de cliques de abas, validação, etc.) ...
    
    // Chama a inicialização da primeira aba no final do DOMContentLoaded
    showTab('info-usuario');
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

// ... (Restante do código JavaScript) ...