
document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("servicos-cadastrados");

    // Inputs do modal de edição
    const inputEditNome = document.getElementById('edit-servico');
    const inputEditPreco = document.getElementById('edit-valorservico');
    const inputEditTempo = document.getElementById('edit-Temposervico');
    const selectEditStatus = document.getElementById('edit-status'); // Select para o status no modal de edição
    const hiddenEditId = document.createElement('input'); // ID oculto para o serviço em edição
    hiddenEditId.type = 'hidden';
    document.body.appendChild(hiddenEditId);

    // Inputs do modal de cadastro
    const inputNome = document.getElementById('servico');
    const inputPreco = document.getElementById('valorservico');
    const inputTempo = document.getElementById('Temposervico');

    // Função para carregar e exibir os serviços na tabela
    function carregarServicos() {
        container.innerHTML = ""; // Limpa o container antes de adicionar novos elementos

        // Cria uma tabela para exibir os serviços
        const tabela = document.createElement("table");
        tabela.classList.add("table", );

        // Adiciona o cabeçalho da tabela
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>SERVIÇO</th>
                <th>VALOR</th>
                <th>TEMPO</th>
                <th>STATUS</th>
                <th></th>
            </tr>
        `;
        tabela.appendChild(thead);

        const tbody = document.createElement("tbody");

        // Busca os serviços do db.json
        fetch("http://localhost:3000/servicos")
            .then(response => response.json())
            .then(servicos => {
                servicos.forEach(servico => {
                    const linha = document.createElement("tr");

                    const nome = document.createElement("td");
                    nome.textContent = servico.nome;
                    linha.appendChild(nome);

                    const preco = document.createElement("td");
                    preco.textContent = servico.valor || "Dados inválidos";
                    linha.appendChild(preco);

                    const tempo = document.createElement("td");
                    tempo.textContent = servico.tempo;
                    linha.appendChild(tempo);

                    // Coluna para o status
                    const status = document.createElement("td");
                    status.textContent = servico.status ? "Ativo" : "Inativo"; // Exibe Ativo/Inativo
                    linha.appendChild(status);

                    // Coluna para as ações
                    const acoes = document.createElement("td");

                    // Botão de editar
                    const btnEditar = document.createElement("button");
                    btnEditar.textContent = "Editar";
                    btnEditar.classList.add("btn", "btn-warning", "btn-sm", "btn-editar-servico");
                    btnEditar.setAttribute('data-bs-toggle', 'modal');
                    btnEditar.setAttribute('data-bs-target', '#edit-cadastroModalServico');
                    btnEditar.addEventListener("click", () => abrirEdicao(servico));
                    acoes.appendChild(btnEditar);

                    tbody.appendChild(linha);
                    linha.appendChild(acoes);
                });
            })
            .catch(error => console.error("Erro ao carregar serviços:", error));

        tabela.appendChild(tbody);
        container.appendChild(tabela);
    }

    // Função para abrir o modal de edição com os dados do serviço
    function abrirEdicao(servico) {
        inputEditNome.value = servico.nome;
        inputEditPreco.value = servico.valor;
        inputEditTempo.value = servico.tempo;
        selectEditStatus.value = servico.status ? "Ativo" : "Inativo"; // Preenche o select com o status atual
        hiddenEditId.value = servico.id; // Armazena o ID no input escondido
    }

    // Função para salvar as alterações do serviço (modal de edição)
    document.querySelector('#edit-cadastroModalServico .btn-popup').addEventListener('click', function () {
        const id = hiddenEditId.value;
        const nome = inputEditNome.value;
        const preco = inputEditPreco.value;
        const tempo = inputEditTempo.value;
        const status = selectEditStatus.value === "Ativo"; // Converte para booleano

        // Atualiza o serviço no db.json
        fetch(`http://localhost:3000/servicos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, valor: preco, tempo, status }) // Inclui o status booleano
        })
            .then(response => response.json())
            .then(() => {
                carregarServicos();
                const modal = bootstrap.Modal.getInstance(document.getElementById('edit-cadastroModalServico'));
                modal.hide(); // Fecha o modal após salvar
            })
            .catch(error => console.error('Erro ao editar serviço:', error));
    });

    // Função para salvar um novo serviço (modal de cadastro)
    document.querySelector('#cadastroModalServico .btn-popup').addEventListener('click', function () {
        const nome = inputNome.value;
        const preco = inputPreco.value;
        const tempo = inputTempo.value;

        // Status padrão para novos serviços é Ativo
        const status = true;

        // Adiciona um novo serviço no db.json
        fetch("http://localhost:3000/servicos", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, valor: preco, tempo, status })
        })
            .then(response => response.json())
            .then(() => {
                carregarServicos();
                const modal = bootstrap.Modal.getInstance(document.getElementById('cadastroModalServico'));
                modal.hide(); // Fecha o modal após salvar
                // Limpa os campos do formulário de cadastro
                inputNome.value = "";
                inputPreco.value = "";
                inputTempo.value = "";
            })
            .catch(error => console.error('Erro ao cadastrar serviço:', error));
    });

    // Carrega os serviços ao iniciar
    carregarServicos();
});

let selectedRow = null;


var urlUsuario = 'http://localhost:3000/usuarios'; // Rota para usuarios
var urlBarbeiro = 'http://localhost:3000/barbeiros'; // Rota para 
var urlServico = 'http://localhost:3000/servicos'; // Rota para barbeiros
var urlAgendamento = 'http://localhost:3000/agendamentos'; // Rota para barbeiros

// Verifica se o administrador está logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado || usuarioLogado.tipousuario !== 'administrador') {
    alert('Você não está logado ou não tem permissão para acessar esta página.');
    window.location.href = 'index.html'; // Redireciona para a página de login
}


// Função para carregar os dados do usuário logado
function carregarDadosUsuarioLogado() {
    // Verifica se o usuário logado tem um ID válido
    if (usuarioLogado && usuarioLogado.id) {
        // Faz a requisição para buscar os dados do usuário logado
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${urlUsuario}/${usuarioLogado.id}`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Converte a resposta JSON em objeto
                const usuario = JSON.parse(xhr.responseText);

                // Preenche os campos do modal com os dados do usuário
                document.getElementById('usuarioNome').value = usuario.nome || 'N/A';
                document.getElementById('usuarioEmail').value = usuario.email || 'N/A';
                document.getElementById('usuarioTelefone').value = usuario.telefone || 'N/A';
            } else if (xhr.readyState === 4) {
                alert('Erro ao carregar os dados do usuário.');
            }
        };
        xhr.send();
    } else {
        alert('Erro: Usuário logado inválido.');
    }
}

// Evento para carregar os dados ao abrir o modal "Minha Conta"
const minhaContaModal = document.getElementById('minhaContaModal');
minhaContaModal.addEventListener('show.bs.modal', carregarDadosUsuarioLogado);


// Função para alterar a senha do usuário logado
function alterarSenhaUsuarioLogado() {
    const senhaAtual = document.getElementById('senhaAtual').value;
    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarNovaSenha = document.getElementById('confirmarNovaSenha').value;

    // Validações
    if (!senhaAtual || !novaSenha || !confirmarNovaSenha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    if (novaSenha !== confirmarNovaSenha) {
        alert('A nova senha e a confirmação não coincidem.');
        return;
    }

    // Verifica se a senha atual está correta
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${urlUsuario}/${usuarioLogado.id}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const usuario = JSON.parse(xhr.responseText);

            if (usuario.senha !== senhaAtual) {
                alert('Senha atual incorreta.');
                return;
            }

            // Atualiza a senha do usuário
            const xhrUpdate = new XMLHttpRequest();
            xhrUpdate.open('PATCH', `${urlUsuario}/${usuarioLogado.id}`, true);
            xhrUpdate.setRequestHeader('Content-Type', 'application/json');
            xhrUpdate.onreadystatechange = function () {
                if (xhrUpdate.readyState === 4 && xhrUpdate.status === 200) {
                    alert('Senha alterada com sucesso!');
                    document.getElementById('formAlterarSenha').reset();
                    const alterarSenhaModal = bootstrap.Modal.getInstance(document.getElementById('alterarSenhaModal'));
                    alterarSenhaModal.hide();
                } else if (xhrUpdate.readyState === 4) {
                    alert('Erro ao alterar a senha. Tente novamente.');
                }
            };

            xhrUpdate.send(JSON.stringify({ senha: novaSenha }));
        } else if (xhr.readyState === 4) {
            alert('Erro ao verificar a senha atual. Tente novamente.');
        }
    };

    xhr.send();
}

// Evento para o botão "Alterar Senha"
// document.getElementById('btnAlterarSenha').addEventListener('click', alterarSenhaUsuarioLogado);

document.getElementById('btnAlterarSenha').addEventListener('click', function (event) {
    event.preventDefault();

    alterarSenhaUsuarioLogado();
})