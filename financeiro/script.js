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