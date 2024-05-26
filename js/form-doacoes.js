//-------------------DOAÇÕES---------------------

function CarregarSelectEvento() {

    // Seleciona o elemento do select de locais
    let selectEvento = document.querySelector('#SelectEventoDoacao');
    console.log('Select de eventos:', selectEvento);

    // Verifica se o elemento foi encontrado
    if (selectEvento) {
        // Busca os dados de locais do localStorage
        let dataEvento = JSON.parse(localStorage.getItem("eventos"));
        let htmlEvento = '<option selected value="">Evento</option>';

        // Cria as opções do select com base nos dados de locais
        dataEvento.forEach(function(evento) {
            htmlEvento += `<option value="${evento.nome}">${evento.nome}</option>`;
        });

        // Define o HTML gerado no select de locais
        selectEvento.innerHTML = htmlEvento;
    } else {
        console.log('Elemento #SelectEventoDoacao não encontrado.');
    }
}

// CRIAR DOAÇÕES
function registarDoacao() {
    // Obtém os valores dos campos do formulário
    let nome = document.getElementById("NomeDoacao").value;
    let apelido = document.getElementById("ApelidoDoacao").value;
    let telefone = document.getElementById("TelefoneDoacao").value;
    let email = document.getElementById("EmailDoacao").value;
    let evento_doacao = document.getElementById("SelectEventoDoacao").value;
    let valor_doacao = document.getElementById("SelectValorDoacao").value;;


    // Verifica se todos os campos foram preenchidos
    if (!nome || !apelido || !telefone || !email || !evento_doacao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Cria um objeto com as informações da doação
    const doacao = {
        nome: nome,
        apelido: apelido,
        telefone: telefone,
        email: email,
        evento_doacao: evento_doacao,
        valor_doacao: valor_doacao
    };

    // Verifica se já existem doações no localStorage
    let doacoes = [];
    if (localStorage.getItem("doacoes")) {
        doacoes = JSON.parse(localStorage.getItem("doacoes"));
    }

    // Adiciona a nova doação ao array de doações
    doacoes.push(doacao);

    // Armazena o array atualizado de doações no localStorage
    localStorage.setItem("doacoes", JSON.stringify(doacoes));

    // Armazena os dados do utilizador em localStorage
    localStorage.setItem("dadosUtilizador", JSON.stringify(doacao));

    // Redireciona para a página de escolha do método de pagamento
    window.location.href = "form-doacoes2.html";

    // Limpa o formulário após o registo da doação
    document.getElementById("formDoacoes").reset();
}

//POR NA LISTA DE DOAÇÕES
function CarregarDoacao() {
    let tabela = document.getElementById("tbbodyDoacoes");

    // Obtém o array de doações armazenado no localStorage
    let doacoesLocalStorage = JSON.parse(localStorage.getItem("doacoes"));

    // Limpa a tabela antes de adicionar as novas doações
    tabela.innerHTML = "";

    // Loop através do array de doações e adiciona-os à tabela
    doacoesLocalStorage.forEach(function(doacao, index) {
        // Cria uma nova linha na tabela
        let novaLinha = tabela.insertRow(-1);

        // Preenche as células da linha com as informações da doação
        novaLinha.insertCell(0).innerHTML = index + 1; // ID começa em 1
        novaLinha.insertCell(1).innerHTML = doacao.nome + " " + doacao.apelido;
        novaLinha.insertCell(2).innerHTML = doacao.telefone;
        novaLinha.insertCell(3).innerHTML = doacao.email;
        novaLinha.insertCell(4).innerHTML = doacao.evento_doacao;
        novaLinha.insertCell(5).innerHTML = doacao.valor_doacao; // Adiciona o valor da doação

        let botoes = novaLinha.insertCell(6);
        botoes.style.display = "flex";
        botoes.style.gap = "5px";
    
        let botaoRemover = document.createElement("button");
        botaoRemover.classList.add("btn-remove");
        botaoRemover.style.borderRadius = "50%";
        botaoRemover.innerHTML = "<i class='fas fa-trash'></i>";
        botoes.appendChild(botaoRemover);
    
        botaoRemover.addEventListener("click", function() {
            // Remove a doação do array
            doacoesLocalStorage.splice(index, 1);
    
            // Remove a linha da tabela
            tabela.deleteRow(novaLinha.rowIndex - 1);
    
            // Atualiza o localStorage com o novo array de doações
            localStorage.setItem("doacoes", JSON.stringify(doacoesLocalStorage));
        });
    });
}
