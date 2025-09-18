document.querySelector('.login-form').addEventListener('submit', function(event) {
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!');
        event.preventDefault();
    }
});
const cpfInput = document.getElementById('cpf');

cpfInput.addEventListener('input', function(event) {
    let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    value = value.replace(/(\d{3})(\d)/, '$1.$2');     // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2');     // Adiciona o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen
    
    event.target.value = value.substring(0, 14); // Limita o tamanho para 14 caracteres
});
document.querySelector('.toggle-password').addEventListener('click', function() {
    const senhaInput = document.getElementById('senha');
    const type = senhaInput.getAttribute('type') === 'password' ? 'text' : 'password';
    senhaInput.setAttribute('type', type);
});

