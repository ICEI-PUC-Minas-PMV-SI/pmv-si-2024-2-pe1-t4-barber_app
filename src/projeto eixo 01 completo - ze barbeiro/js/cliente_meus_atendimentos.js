// URLs das APIs
const urlUsuarios = 'http://localhost:3000/usuarios';
const urlBarbeiros = 'http://localhost:3000/barbeiros';
const urlAgendamentos = 'http://localhost:3000/agendamento';
const urlServicos = 'http://localhost:3000/servicos';

// Recupera o ID do usuário logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuarioLogado || usuarioLogado.tipousuario !== 'cliente') {
    alert('Você não tem permissão para acessar esta página!');
    window.location.href = 'index.html'; // Redireciona para a página de login
}

const clienteId = usuarioLogado.id;

// Evento de clique no botão "Buscar"
document.getElementById('buscar-agendamentos').addEventListener('click', function () {
    const dataInicio = document.getElementById('data-inicio').value;
    const dataFim = document.getElementById('data-fim').value;
    const statusFiltro = document.querySelector('input[name="statusFiltro"]:checked')?.value;

    if (!dataInicio || !dataFim) {
        alert('Por favor, selecione o período.');
        return;
    }

    buscarAgendamentos(clienteId, dataInicio, dataFim, statusFiltro);
});

// Função para buscar agendamentos no servidor

function buscarAgendamentos(barbeiroId, dataInicio, dataFim, statusFiltro) {
    const xhrAgendamentos = new XMLHttpRequest();
    xhrAgendamentos.open('GET', `${urlAgendamentos}?idcliente=${clienteId}`, true);
    xhrAgendamentos.onload = function () {
        if (xhrAgendamentos.status === 200) {
            const agendamentos = JSON.parse(xhrAgendamentos.responseText);

            // Converte as datas para objetos Date
            const inicio = new Date(dataInicio);
            const fim = new Date(dataFim);

            // Filtra os agendamentos por intervalo de datas e status
            const agendamentosFiltrados = agendamentos.filter(ag => {
                const dataAgendamento = new Date(ag.data.split('/').reverse().join('-'));

                // Verifica se a data está no intervalo
                const isWithinDateRange = dataAgendamento >= inicio && dataAgendamento <= fim;

                // Verifica o status com base no filtro selecionado
                const isStatusMatched = statusFiltro
                    ? ag.status === statusFiltro // Para "Concluído"
                    : ag.status !== 'Concluído'; // Para "Não Concluído"

                return isWithinDateRange && isStatusMatched;
            });

            getUsuariosEServicos((usuarios, servicos) => {
                preencherTabela(agendamentosFiltrados, usuarios, servicos);
            });
        } else {
            console.error('Erro ao buscar agendamentos:', xhrAgendamentos.status);
        }
    };
    xhrAgendamentos.send();
}


// Função para preencher a tabela com os agendamentos
function preencherTabela(agendamentos, usuarios, servicos) {
    const tabelaBody = document.getElementById('tabela-agenda-atendimento-body');
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la

    // Filtra os agendamentos para incluir apenas os do cliente logado
    const agendamentosFiltrados = agendamentos.filter(agendamento => agendamento.idcliente === clienteId);
    
    agendamentosFiltrados.forEach(agendamento => {
        const cliente = usuarios.find(user => user.id === agendamento.idcliente);
        const barbeiro = usuarios.find(user => user.id === agendamento.idbarbeiro);
        const servico = servicos.find(svc => svc.id === agendamento.idservico);

        
        // if(cliente.id === usuarioLogado.id){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${agendamento.data}</td>
            <td>${cliente ? cliente.nome : ''}</td>
            <td>${barbeiro ? barbeiro.nome : ''}</td>
            <td>${servico ? servico.nome : ''}</td>
            <td>${servico ? servico.valor : ''}</td>

            <td>${agendamento.horariodeinicio}</td>
            <td>${agendamento.status}</td>
        `;
        tabelaBody.appendChild(row);
        // }
    });
    
}

// Função para buscar usuários e serviços no servidor
function getUsuariosEServicos(callback) {
    let usuarios, servicos;

    const xhrUsuarios = new XMLHttpRequest();
    xhrUsuarios.open('GET', urlUsuarios, true);
    xhrUsuarios.onload = function () {
        if (xhrUsuarios.status === 200) {
            usuarios = JSON.parse(xhrUsuarios.responseText);

            const xhrServicos = new XMLHttpRequest();
            xhrServicos.open('GET', urlServicos, true);
            xhrServicos.onload = function () {
                if (xhrServicos.status === 200) {
                    servicos = JSON.parse(xhrServicos.responseText);
                    callback(usuarios, servicos);
                }
            };
            xhrServicos.send();
        }
    };
    xhrUsuarios.send();
}



// Função para carregar os dados do usuário logado
function carregarDadosUsuarioLogado() {
    // Verifica se o usuário logado tem um ID válido
    if (usuarioLogado && usuarioLogado.id) {
        // Faz a requisição para buscar os dados do usuário logado
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${urlUsuarios}/${usuarioLogado.id}`, true);
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
    xhr.open('GET', `${urlUsuarios}/${usuarioLogado.id}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const usuario = JSON.parse(xhr.responseText);

            if (usuario.senha !== senhaAtual) {
                alert('Senha atual incorreta.');
                return;
            }

            // Atualiza a senha do usuário
            const xhrUpdate = new XMLHttpRequest();
            xhrUpdate.open('PATCH', `${urlUsuarios}/${usuarioLogado.id}`, true);
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