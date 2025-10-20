document.addEventListener('DOMContentLoaded', function() {
    
    // 1. MÁSCARA DE CPF
    const cpfInput = document.getElementById('cpf');
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(event) {
            let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            value = value.replace(/(\d{3})(\d)/, '$1.$2');     // Adiciona o primeiro ponto
            value = value.replace(/(\d{3})(\d)/, '$1.$2');     // Adiciona o segundo ponto
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen
            
            event.target.value = value.substring(0, 14); // Limita o tamanho
        });
    }

    // 2. MOSTRAR/OCULTAR SENHA
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
    
    // 3. Simulação de Submissão (Para fins de teste)
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
});