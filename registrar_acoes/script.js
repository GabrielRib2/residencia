document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    const imagePreviewDiv = document.getElementById('imagePreview');
    const submitBtn = document.getElementById('submitBtn');
    const registroForm = document.getElementById('registroForm');

    // 1. Tornar a área de upload clicável
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // 2. Mostrar o nome da imagem e o preview após a seleção
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;

            // Mostrar preview da imagem
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreviewDiv.innerHTML = `<img src="${event.target.result}" alt="Preview da imagem">`;
            };
            reader.readAsDataURL(file);

        } else {
            fileNameDisplay.textContent = 'Selecionar Imagem';
            imagePreviewDiv.innerHTML = '';
        }
    });

    // 3. Ação do botão "Registrar Ação" (simulação de submissão)
    submitBtn.addEventListener('click', () => {
        // Dispara o evento de submissão do formulário
        if (registroForm.checkValidity()) {
            alert('Ação registrada com sucesso! (Simulação de envio de dados)');
            registroForm.reset();
            fileNameDisplay.textContent = 'Selecionar Imagem';
            imagePreviewDiv.innerHTML = '';
            // Em uma aplicação real, você faria uma requisição AJAX aqui.
        } else {
            // Se a validação falhar (campos obrigatórios vazios),
            // disparamos o submit do formulário para mostrar as mensagens de erro nativas.
            registroForm.reportValidity();
        }
    });
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