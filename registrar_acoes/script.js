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