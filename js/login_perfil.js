//BOTAO LOGOUT
function logout() {
    // Limpar os dados do utilizador do armazenamento local
    localStorage.removeItem('nomeUtilizador');
    localStorage.removeItem('fotoUtilizador');
    localStorage.removeItem('emailUtilizador');
    localStorage.removeItem('telefoneUtilizador');
    localStorage.removeItem('localizacaoUtilizador');
    
    // Redirecionar o utilizador para a página de login
    window.location.href = "login.html";
} 

//GUARDAR INFORMAÇÃO E DISPLAY
// Recuperar informações do utilizador do localStorage
const nomeCompleto = localStorage.getItem('nomeUtilizador');
const fotoUtilizador = localStorage.getItem('fotoUtilizador');
const emailUtilizador = localStorage.getItem('emailUtilizador'); // Adicionado para recuperar o email do utilizador

// Dividir o nome completo em primeiro e último nome
// Verificar se nomeCompleto não é null antes de dividir
const partesNome = nomeCompleto ? nomeCompleto.split(' ') : ['', ''];
const primeiroNome = partesNome[0];
const ultimoNome = partesNome.slice(1).join(' '); // Todos os elementos restantes são considerados o último nome

// Preencher os elementos na página de perfil
function CarregarPerfil() {
    //Campos Não Editaveis
    document.getElementById('inputFirstName').value = primeiroNome;
    document.getElementById('inputLastName').value = ultimoNome;
    document.getElementById('inputEmailAddress').value = emailUtilizador; 
    //Campos Editaveis
    document.getElementById('inputPhone').value = localStorage.getItem('telefoneUtilizador');
    document.getElementById('inputLocation').value = localStorage.getItem('localizacaoUtilizador');
    document.getElementById('foto-user').src = localStorage.getItem('fotoUtilizador');
}

function EditarPerfil(){
    // Obter os novos valores inseridos nos campos do formulário
    let novoPrimeiroNome = document.getElementById('inputFirstName').value;
    let novoUltimoNome = document.getElementById('inputLastName').value;
    let novoEmail = document.getElementById('inputEmailAddress').value;
    let novoTelefone = document.getElementById('inputPhone').value;
    let novaLocalizacao = document.getElementById('inputLocation').value;
    let novaFotoUtilizador = document.getElementById('foto-user').src;

    // Atualizar os dados do utilizador no armazenamento local com os novos valores
    const novoNomeCompleto = novoPrimeiroNome + " " + novoUltimoNome;
    localStorage.setItem('nomeUtilizador', novoNomeCompleto);
    localStorage.setItem('emailUtilizador', novoEmail);
    localStorage.setItem('telefoneUtilizador', novoTelefone);
    localStorage.setItem('localizacaoUtilizador', novaLocalizacao);
    localStorage.setItem('fotoUtilizador', novaFotoUtilizador);

    // Exibir uma mensagem de sucesso
    alert("As suas alterações foram guardadas com sucesso!");

    console.log("Novo telefone:", novoTelefone);
    console.log("Nova localização:", novaLocalizacao);
    console.log("Nova foto do utilizador:", novaFotoUtilizador);
}


