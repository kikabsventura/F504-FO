//-------------------FORMULARIO PROPOSTAS---------------------

function ResetFotosProposta() {
  localStorage.removeItem("FotoArtista");
  localStorage.removeItem("FotoApresentacao");
  localStorage.removeItem("FotoPortfolio1");
  localStorage.removeItem("FotoPortfolio2");
  localStorage.removeItem("FotoPortfolio3");
  localStorage.removeItem("FotoPortfolio4");
  localStorage.removeItem("FotoPortfolio5");
  localStorage.removeItem("FotoPortfolio6");
}

// CRIAR PROPOSTAS
function registarProposta() {
  // Obtém as informações do utilizador do localStorage
  const user = localStorage.getItem('user');

  // Obtém os valores dos campos do formulário
  let nome = document.getElementById("NomeProposta").value;
  let tipo = document.getElementById("TipoEventoProposta").value;
  let breve_artista = document.getElementById("BreveDescricaoArtista").value;
  let breve_evento = document.getElementById("BreveDescricaoEvento").value;
  let comentario = document.getElementById("ComentarioArtista").value;
  let descricao = document.getElementById("DescricaoEvento").value;

  // Obtem as fotos do localStorage
  let fotoArtista = localStorage.getItem("FotoArtista");
  let fotoApresentacao = localStorage.getItem("FotoApresentacao");
  let fotoPortfolio1 = localStorage.getItem("FotoPortfolio1");
  let fotoPortfolio2 = localStorage.getItem("FotoPortfolio2");
  let fotoPortfolio3 = localStorage.getItem("FotoPortfolio3");
  let fotoPortfolio4 = localStorage.getItem("FotoPortfolio4");
  let fotoPortfolio5 = localStorage.getItem("FotoPortfolio5");
  let fotoPortfolio6 = localStorage.getItem("FotoPortfolio6");

  // Cria um objeto com as informações da proposta, incluindo as fotos e o estado "Pendente"
  const proposta = {
      nome: nome,
      tipo: tipo,
      breve_artista: breve_artista,
      breve_evento: breve_evento,
      comentario: comentario,
      descricao: descricao,
      foto_artista: fotoArtista,
      foto_apresentacao: fotoApresentacao,
      foto_portfolio_1: fotoPortfolio1,
      foto_portfolio_2: fotoPortfolio2,
      foto_portfolio_3: fotoPortfolio3,
      foto_portfolio_4: fotoPortfolio4,
      foto_portfolio_5: fotoPortfolio5,
      foto_portfolio_6: fotoPortfolio6,
      estado: "Pendente", // Definindo o estado como "Pendente"
      utilizador: user,
  };

  // Adiciona a proposta ao array de propostas
  let propostas;
  if (localStorage.getItem("propostas")) {
      propostas = JSON.parse(localStorage.getItem("propostas"));
  } else {
      propostas = [];
  }
  propostas.push(proposta);

  // Armazena o array de propostas no localStorage
  localStorage.setItem("propostas", JSON.stringify(propostas));

  // Adiciona a proposta ao histórico do usuário
  let propostasUsuario;
  if (localStorage.getItem("propostasUsuario")) {
      propostasUsuario = JSON.parse(localStorage.getItem("propostasUsuario"));
  } else {
      propostasUsuario = [];
  }
  propostasUsuario.push(proposta);
  localStorage.setItem("propostasUsuario", JSON.stringify(propostasUsuario));

  // Limpa os campos do formulário e as fotos do localStorage
  alert("A proposta foi efetuada com sucesso!");
  document.getElementById("formPropostas").reset();
  ResetFotosProposta();
}

  function CarregarPropostas() {
    let tabela = document.getElementById("tbbodyPropostas");
  
  // Obtém o array de funcionários armazenado no localStorage
    let propostasLocalStorage = JSON.parse(localStorage.getItem("propostas"));
  
    // Loop através do array de funcionários e adiciona-os à tabela
    propostasLocalStorage.forEach(function(proposta, index) {
      // Cria uma nova linha na tabela
      let novaLinha = tabela.insertRow(-1);
  
      // Preenche as células da linha com as informações do funcionário
      novaLinha.insertCell(0).innerHTML = index + 1; // ID começa em 1
      novaLinha.insertCell(1).innerHTML = proposta.nome;
      novaLinha.insertCell(2).innerHTML = proposta.tipo;
  
      let botoes = novaLinha.insertCell(3);
      botoes.style.display = "flex";
      botoes.style.gap = "5px";
  
      
        let botaoEditarProposta = document.createElement("button");
        botaoEditarProposta.classList.add("btn-edit");
        botaoEditarProposta.style.borderRadius = "50%";
        botaoEditarProposta.innerHTML = "<i class='fas fa-edit'></i>";
       // botaoEditarProposta.innerHTML = "<i class='fa-sharp fa-solid fa-circle-plus' style='color: #f31233;'></i>";
        
        botoes.appendChild(botaoEditarProposta);
  
      botaoEditarProposta.addEventListener("click", function() {
        window.location.href = `Gerir_Proposta.html?index=${index}`;
      });
  
  });
  };
  
  function CarregarGerirProposta() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let index = urlParams.get('index');
  
    const propostasLocalStorage = JSON.parse(localStorage.getItem('propostas'));
    const proposta = propostasLocalStorage[index];
  
    document.getElementById('EditNomeEvento').value = proposta.nome;
    document.getElementById('EditTipoEvento').value = proposta.tipo;
    document.getElementById('EditBreveDescricaoArtista').value = proposta.breve_artista;
    document.getElementById('EditBreveDescricaoEvento').value = proposta.breve_evento;
    document.getElementById('EditComentarioArtista').value = proposta.comentario;
    document.getElementById('EditDescricao').value = proposta.descricao;
  
    // Setando os atributos src das imagens
    document.getElementById('EditFotoArtista').style.backgroundImage = `url(${proposta.foto_artista})`;
    document.getElementById('EditFotoApresentacao').style.backgroundImage = `url(${proposta.foto_apresentacao})`;
    document.getElementById('EditPortfolio1').style.backgroundImage = `url(${proposta.foto_portfolio_1})`;
    document.getElementById('EditPortfolio2').style.backgroundImage = `url(${proposta.foto_portfolio_2})`;
    document.getElementById('EditPortfolio3').style.backgroundImage = `url(${proposta.foto_portfolio_3})`;
    document.getElementById('EditPortfolio4').style.backgroundImage = `url(${proposta.foto_portfolio_4})`;
    document.getElementById('EditPortfolio5').style.backgroundImage = `url(${proposta.foto_portfolio_5})`;
    document.getElementById('EditPortfolio6').style.backgroundImage = `url(${proposta.foto_portfolio_6})`;
  
    let btnEditar = document.getElementById("botaoAceitar");
  
    btnEditar.addEventListener("click", function() {
  
      proposta.nome = document.getElementById('EditNomeEvento').value;
      proposta.tipo = document.getElementById('EditTipoEvento').value;
      proposta.breve_artista = document.getElementById('EditBreveDescricaoArtista').value;
      proposta.breve_evento = document.getElementById('EditBreveDescricaoEvento').value;
      proposta.comentario = document.getElementById('EditComentarioArtista').value;
      proposta.descricao = document.getElementById('EditDescricao').value;    
  
      // Salva os dados atualizados da proposta no localStorage
      propostasLocalStorage[index] = proposta;
      localStorage.setItem('propostas', JSON.stringify(propostasLocalStorage));
  
      alert("Os dados da proposta foram alterados com sucesso!");
      // Redireciona de volta para a página de listagem de propostas
      window.location.href = `Listar_Propostas.html`;
    });
  
    botaoAceitar.addEventListener("click", function() {
      atualizarEstadoProposta(proposta.nome, "Aprovada");
  
      // Move a proposta para a lista de eventos
      let eventosLocalStorage = JSON.parse(localStorage.getItem("eventos"));
      if (!eventosLocalStorage) {
          eventosLocalStorage = [];
      }
      eventosLocalStorage.push(proposta);
      localStorage.setItem("eventos", JSON.stringify(eventosLocalStorage));
  
      // Remove a proposta da lista de propostas
      propostasLocalStorage.splice(index, 1);
      localStorage.setItem('propostas', JSON.stringify(propostasLocalStorage));
  
      alert("A proposta foi aceite com sucesso!");
      // Redireciona para a página de listagem de propostas
      window.location.href = "Listar_Propostas.html";
    });
  
    botaoRecusar.addEventListener("click", function() {
      atualizarEstadoProposta(proposta.nome, "Recusada");
      // Remove a proposta da lista de propostas
      propostasLocalStorage.splice(index, 1);
      localStorage.setItem('propostas', JSON.stringify(propostasLocalStorage));
  
      alert("A proposta foi recusada com sucesso!");
      // Redireciona para a página de listagem de propostas
      window.location.href = "Listar_Propostas.html";
    });
  }
  
  function atualizarEstadoProposta(nomeProposta, estado) {
    // Obtém o array de propostas do usuário armazenado no localStorage
    let propostasUsuario = JSON.parse(localStorage.getItem("propostasUsuario"));

    // Encontra a proposta no array de propostas do usuário pelo nome
    const proposta = propostasUsuario.find(p => p.nome === nomeProposta);

    // Verifica se a proposta foi encontrada
    if (proposta) {
        // Atualiza o estado da proposta
        proposta.estado = estado;

        // Salva o array atualizado de propostas do usuário no localStorage
        localStorage.setItem('propostasUsuario', JSON.stringify(propostasUsuario));
    } else {
        console.error(`Proposta "${nomeProposta}" não encontrada.`);
    }
}


  
//-------------------------------------------JAVA SCRIPT DESIGN FORMULARIO---------------------------------------------


// Function to trigger file input when the styled button is clicked
function triggerFileInput(inputId) {
    document.getElementById(inputId).click();
    event.preventDefault(); // Prevent default action (Estava a abrir duas file explorer tabs)
}

// Function to update the file name display
function updateFileName(input, displayId) {
    var fileName = input.files[0].name;
    document.getElementById(displayId).textContent = fileName;
}

// Função para mostrar a foto selecionada
function updateImagePreview(textPlaceholderId, imagePreviewId, input) {
    var textPlaceholder = document.getElementById(textPlaceholderId);
    var imagePreview = document.getElementById(imagePreviewId);
    
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            textPlaceholder.style.display = 'none';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// Função para mostrar a foto selecionada no portfolio
function mostrarFoto(input, previewId) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var preview = document.getElementById(previewId);
            preview.src = e.target.result;
            preview.style.display = 'block';
            var textBox = input.parentNode.nextSibling; // Obtém o elemento da caixa de texto seguinte ao botão de input de fotografia
            textBox.style.height = 'auto'; // Define a altura da caixa de texto para 'auto' para que ela possa se ajustar ao conteúdo
        };
        reader.readAsDataURL(input.files[0]);
    }
}
