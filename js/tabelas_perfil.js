//-------------------USER: TABELA PROPOSTAS---------------------

function UserProposta() {
    let tabela = document.getElementById("tbbodyUserPropostas");
    
    // Limpa todas as linhas existentes na tabela
    tabela.innerHTML = '';

    // Obter informações do utilizador do localStorage
    const user = localStorage.getItem('user');

    // Obtém o array de propostas do usuário armazenado no localStorage
    let propostasUsuario = JSON.parse(localStorage.getItem("propostasUsuario"));

    // Função para obter a classe CSS com base no estado da proposta
    function getEstadoBadgeClass(estado) {
        switch (estado) {
            case "Aprovada":
                return "badge-success";
            case "Recusada":
                return "badge-danger";
            default:
                return "badge-secondary"; // Caso o estado seja indefinido, "Pendente" é o padrão
        }
    }

    // Loop através das propostas do usuário e adicioná-las à tabela ou atualizá-las se já existirem
    propostasUsuario.forEach(function(proposta, index) {
        if (proposta.utilizador === user) {
            // Cria uma nova linha na tabela para a proposta
            let novaLinha = tabela.insertRow(-1);

            // Preenche as células da linha com as informações da proposta
            novaLinha.insertCell(0).innerHTML = index + 1; // ID começa em 1
            novaLinha.insertCell(1).innerHTML = proposta.nome;

            // Cria um elemento de botão para exibir o estado da proposta
            let estadoButton = document.createElement("button");
            estadoButton.classList.add("btn", "badge", "badge-pill", getEstadoBadgeClass(proposta.estado));
            estadoButton.innerText = proposta.estado || "Pendente"; // Mostra o estado ou "Pendente" se não houver estado definido
            novaLinha.insertCell(2).appendChild(estadoButton);

            let botoes = novaLinha.insertCell(3);
            botoes.style.display = "flex";
            botoes.style.gap = "5px";

            // Botão para editar a proposta
            let botaoEditarProposta = document.createElement("button");
            botaoEditarProposta.classList.add("btn-edit");
            botaoEditarProposta.style.borderRadius = "50%";
            botaoEditarProposta.innerHTML = "<i class='fas fa-edit'></i>";
            botoes.appendChild(botaoEditarProposta);

            botaoEditarProposta.addEventListener("click", function() {
                // Redirecionar para a página de edição da proposta, passando o índice da proposta como parâmetro
                window.location.href = `perfil_propostas_detalhes.html?index=${index}`;
            });
        }
    });
}

function UserDetalhesProposta() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let index = urlParams.get('index');

    const propostasUsuarioArmazenadas = JSON.parse(localStorage.getItem('propostasUsuario'));
    const proposta = propostasUsuarioArmazenadas[index];

    document.getElementById('EditNomeEvento').value = proposta.nome;
    document.getElementById('EditTipoEvento').value = proposta.tipo;
    document.getElementById('EditBreveDescricaoArtista').value = proposta.desc_artista;
    document.getElementById('EditBreveDescricaoEvento').value = proposta.breve_evento;
    document.getElementById('EditComentarioArtista').value = proposta.comentario;
    document.getElementById('EditDescricao').value = proposta.descricao;
}

//-------------------USER: TABELA DOAÇÕES---------------------

function UserDoacao() {
    let tabela = document.getElementById("tbbodyUserDoacoes");

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
        novaLinha.insertCell(1).innerHTML = doacao.evento_doacao;
        novaLinha.insertCell(2).innerHTML = doacao.valor_doacao; // Adiciona o valor da doação

        // Cria uma célula para o estado do evento com o estilo correspondente
        let estadoCell = novaLinha.insertCell(3);
        let estadoSpan = document.createElement("span");
        estadoSpan.style.fontSize = "14px";
        estadoSpan.style.display = "flex";
        estadoSpan.style.flexDirection = "column";
        estadoSpan.style.alignItems = "center";

        // Define o estado padrão se não estiver presente
        let estado = doacao.estado || "Aprovado";

        // Define o texto e a classe de estilo com base no estado do evento
        switch (estado) {
            default:
                estadoSpan.textContent = "Aprovado";
                estadoSpan.classList.add("badge", "badge-success");
        }

        // Adiciona o elemento de estado à célula da tabela
        estadoCell.appendChild(estadoSpan);
    });
}