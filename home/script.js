document.addEventListener('DOMContentLoaded', function() {

    // Função para criar o gráfico de pizza (doughnut) de Status das Tarefas
    function createStatusChart() {
        const statusCtx = document.getElementById('statusChart').getContext('2d');
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['A fazer', 'Em andamento', 'Concluído'],
                datasets: [{
                    data: [60, 60, 60],
                    backgroundColor: [
                        '#3498db', // A fazer
                        '#f1c40f', // Em andamento
                        '#2ecc71'  // Concluído
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%', // Tamanho do buraco no centro do gráfico
                plugins: {
                    legend: {
                        display: false // Oculta a legenda do Chart.js, pois usamos uma legenda customizada no HTML
                    },
                    tooltip: {
                        enabled: false // Oculta o tooltip ao passar o mouse
                    }
                }
            }
        });
    }

    // Função para criar o gráfico de barras de Tarefas por Responsável
    function createResponsibleChart() {
        const responsibleCtx = document.getElementById('responsibleChart').getContext('2d');
        new Chart(responsibleCtx, {
            type: 'bar',
            data: {
                labels: ['João Vitor', 'Jean Lucas', 'Gabriel Allan', 'Lucca Denton', 'Júnior Santos', 'Breno Barbosa', 'Bob Marley'],
                datasets: [{
                    label: 'Tarefas Concluídas',
                    data: [80, 90, 110, 115, 85, 95, 75],
                    backgroundColor: '#2ecc71',
                    borderRadius: 5
                }]
            },
            options: {
                indexAxis: 'y', // Define o eixo X como o de valores e o Y como o de rótulos
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Função para criar o gráfico de barras misto de Progresso de Tarefas
    function createProgressChart() {
        const progressCtx = document.getElementById('progressChart').getContext('2d');
        new Chart(progressCtx, {
            type: 'bar',
            data: {
                labels: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.'],
                datasets: [{
                    label: 'Novas Tarefas',
                    data: [250, 180, 50, 60, 30, 40, 50, 70],
                    backgroundColor: '#3498db',
                    borderRadius: 5
                }, {
                    label: 'Tarefas Concluídas',
                    data: [200, 150, 400, 20, 10, 20, 30, 60],
                    backgroundColor: '#2ecc71',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#ecf0f1'
                        }
                    }
                }
            }
        });
    }

    // Chama as funções para criar os gráficos quando o documento estiver pronto
    createStatusChart();
    createResponsibleChart();
    createProgressChart();
});
document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Lógica do Chat Lateral I.A.
    // ----------------------------------------------------------------------

    // Elementos de controle do painel
    const openButton = document.getElementById('openAIChatButton');
    const closeButton = document.getElementById('closeChatButton');
    const chatPanel = document.getElementById('aiChatPanel');
    
    // Elementos de interação do chat
    const chatInput = document.getElementById('chatInput');
    const sendMessageButton = document.getElementById('sendMessageButton');
    const chatMessages = document.querySelector('.chat-messages');

    if (openButton && closeButton && chatPanel) {
        // Função para abrir o painel de chat
        openButton.addEventListener('click', (e) => {
            e.preventDefault();
            chatPanel.classList.add('open');
        });

        // Função para fechar o painel de chat
        closeButton.addEventListener('click', () => {
            chatPanel.classList.remove('open');
        });
        
        // Ativar envio de mensagem ao clicar no botão
        sendMessageButton.addEventListener('click', sendMessage);
        
        // Ativar envio de mensagem ao pressionar Enter no input
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        /**
         * Envia a mensagem do usuário e simula uma resposta da I.A.
         */
        function sendMessage() {
            const text = chatInput.value.trim();
            if (text === "") return; // Ignora mensagens vazias

            // 1. Adiciona a mensagem do usuário ao chat
            const userMessageDiv = document.createElement('div');
            userMessageDiv.classList.add('message', 'user-message');
            userMessageDiv.textContent = text;
            chatMessages.appendChild(userMessageDiv);

            chatInput.value = ''; // Limpa o input
            chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll para o final
            
            // 2. Simula o processamento e a resposta da IA (substitua isso pela sua chamada de API real)
            setTimeout(() => {
                const aiMessageDiv = document.createElement('div');
                aiMessageDiv.classList.add('message', 'system-message');
                
                const responseText = text.length > 5 ? 
                    `Entendido! Analisando sua solicitação sobre: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"` :
                    'Por favor, forneça mais detalhes para que eu possa ajudar com precisão.';
                    
                aiMessageDiv.textContent = responseText;
                chatMessages.appendChild(aiMessageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000); // 1 segundo de delay para simular a resposta da IA
        }
    }


    // ----------------------------------------------------------------------
    // 2. Lógica dos Gráficos (Exemplo - Mantenha seu código real aqui)
    // ----------------------------------------------------------------------

    // Gráfico Status das Tarefas (Donut Chart)
    const statusCtx = document.getElementById('statusChart');
    if (statusCtx) {
        new Chart(statusCtx, {
            type: 'doughnut',
            data: {
                labels: ['A fazer', 'Em andamento', 'Concluído'],
                datasets: [{
                    data: [60, 60, 60],
                    backgroundColor: ['#f7b731', '#1abc9c', '#3498db'],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                cutout: '80%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            }
        });
    }

    // Gráfico Tarefas por responsável (Bar Chart Horizontal)
    const responsibleCtx = document.getElementById('responsibleChart');
    if (responsibleCtx) {
        new Chart(responsibleCtx, {
            type: 'bar',
            data: {
                labels: ['João Vitor', 'Jean Lucas', 'Gabriel Allan', 'Lucca Denton', 'Júnior Santos', 'Breno Barbosa', 'Bob Marley'],
                datasets: [{
                    label: 'Total de Tarefas',
                    data: [85, 92, 105, 115, 78, 90, 65],
                    backgroundColor: '#1abc9c',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y', // Define o eixo X como o índice (horizontal)
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        // Não é necessário configuração específica
                    }
                }
            }
        });
    }

    // Gráfico Progresso de Tarefas (Bar Chart Vertical)
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
        new Chart(progressCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Novas Tarefas',
                    data: [250, 270, 280, 260, 290, 310, 300],
                    backgroundColor: '#3498db',
                    borderRadius: 5
                }, {
                    label: 'Tarefas Concluídas',
                    data: [380, 400, 390, 420, 410, 430, 450],
                    backgroundColor: '#1abc9c',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
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