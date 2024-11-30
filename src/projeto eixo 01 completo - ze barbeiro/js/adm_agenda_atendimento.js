// Definição das URLs
var urlUsuarios = 'http://localhost:3000/usuarios'; // Rota para usuários
var urlBarbeiros = 'http://localhost:3000/barbeiros'; // Rota para barbeiros
var urlAgendamento = 'http://localhost:3000/agendamento'; // Rota para agendamentos
var urlServicos = 'http://localhost:3000/servicos'; // Rota para serviços

// Verifica se o administrador está logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado || usuarioLogado.tipousuario !== 'administrador') {
    alert('Você não está logado ou não tem permissão para acessar esta página.');
    window.location.href = 'index.html'; // Redireciona para a página de login
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    getListaBarbeiros();
});

// Função para obter a lista de barbeiros
// function getListaBarbeiros() {
//     const xhrBarbeiros = new XMLHttpRequest();
//     xhrBarbeiros.open("GET", urlBarbeiros, true);
//     xhrBarbeiros.onreadystatechange = function () {
//         if (xhrBarbeiros.readyState === 4 && xhrBarbeiros.status === 200) {
//             const barbeiros = JSON.parse(xhrBarbeiros.responseText);

//             const xhrUsuarios = new XMLHttpRequest();
//             xhrUsuarios.open("GET", urlUsuarios, true);
//             xhrUsuarios.onreadystatechange = function () {
//                 if (xhrUsuarios.readyState === 4 && xhrUsuarios.status === 200) {
//                     const usuarios = JSON.parse(xhrUsuarios.responseText);
//                     const datalistBarbeiro = document.getElementById('barbeiros-cad');
//                     datalistBarbeiro.innerHTML = ''; // Limpa o datalist

//                     // Preenche o datalist com nomes de barbeiros, armazenando o ID em `data-id`
//                     barbeiros.forEach(function(barbeiro) {
//                         const usuario = usuarios.find(user => user.id === barbeiro.id);
//                         if (usuario) {
//                             const option = document.createElement('option');
//                             option.value = usuario.nome; // Exibe o nome
//                             option.setAttribute("data-id", barbeiro.id); // Armazena o ID
//                             datalistBarbeiro.appendChild(option);
//                         }
//                     });
//                 }
//             };
//             xhrUsuarios.send();
//         }
//     };
//     xhrBarbeiros.send();
// }


// Função para obter a lista de barbeiros
function getListaBarbeiros() {
    const xhrBarbeiros = new XMLHttpRequest();
    xhrBarbeiros.open("GET", urlBarbeiros, true);
    xhrBarbeiros.onreadystatechange = function () {
        if (xhrBarbeiros.readyState === 4 && xhrBarbeiros.status === 200) {
            const barbeiros = JSON.parse(xhrBarbeiros.responseText);

            const xhrUsuarios = new XMLHttpRequest();
            xhrUsuarios.open("GET", urlUsuarios, true);
            xhrUsuarios.onreadystatechange = function () {
                if (xhrUsuarios.readyState === 4 && xhrUsuarios.status === 200) {
                    const usuarios = JSON.parse(xhrUsuarios.responseText);
                    const selectBarbeiro = document.getElementById('barbeiros-cadastrados');
                    selectBarbeiro.innerHTML = '<option value="" disabled selected>Selecione um barbeiro</option>'; // Limpa e adiciona opção padrão

                    // Preenche o select com nomes de barbeiros, armazenando o ID como value
                    barbeiros.forEach(function(barbeiro) {
                        const usuario = usuarios.find(user => user.id === barbeiro.id);
                        if (usuario) {
                            const option = document.createElement('option');
                            option.value = barbeiro.id; // Armazena o ID
                            option.textContent = usuario.nome; // Exibe o nome
                            selectBarbeiro.appendChild(option);
                        }
                    });
                }
            };
            xhrUsuarios.send();
        }
    };
    xhrBarbeiros.send();
}



// Captura o ID do barbeiro ao selecionar um nome
document.getElementById('barbeiros-cadastrados').addEventListener('input', function() {
    const input = this;
    const datalist = document.getElementById('barbeiros-cad');
    const option = Array.from(datalist.options).find(opt => opt.value === input.value);

    if (option) {
        input.setAttribute('data-id', option.getAttribute('data-id')); // Armazena o ID no campo
    }
});

// // Busca agenda de atendimento
// document.querySelector('input[value="Buscar"]').addEventListener('click', function() {
//     const input = document.getElementById('barbeiros-cadastrados');
//     const barbeiroId = input.getAttribute('data-id'); // Pega o ID do atributo `data-id`
//     const dataSelecionada = document.querySelector('input[type="date"]').value;

//     if (barbeiroId && dataSelecionada) {
//         getAgendaAtendimento(barbeiroId, dataSelecionada);
//     } else {
//         alert("Por favor, selecione um barbeiro e uma data.");
//     }
// });


// Evento para buscar agenda de atendimento
document.querySelector('input[value="Buscar"]').addEventListener('click', function() {
    const selectBarbeiro = document.getElementById('barbeiros-cadastrados');
    const barbeiroId = selectBarbeiro.value; // O value agora contém o ID do barbeiro
    const dataSelecionada = document.querySelector('input[type="date"]').value;

    if (barbeiroId && dataSelecionada) {
        getAgendaAtendimento(barbeiroId, dataSelecionada);
    } else {
        alert("Por favor, selecione um barbeiro e uma data.");
    }
});



// Função para obter a agenda de atendimento
function getAgendaAtendimento(barbeiroId, dataSelecionada) {
    const xhrBarbeiros = new XMLHttpRequest();
    xhrBarbeiros.open("GET", `${urlBarbeiros}/${barbeiroId}`, true);
    xhrBarbeiros.onreadystatechange = function () {
        if (xhrBarbeiros.readyState === 4 && xhrBarbeiros.status === 200) {
            const barbeiro = JSON.parse(xhrBarbeiros.responseText);

            // Converte a data selecionada para o dia da semana
            const [year, month, day] = dataSelecionada.split("-");
            const data = new Date(year, month - 1, day);
            const diasSemana = ["Domingo", "Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sábado"];
            const diaSemana = diasSemana[data.getDay()];

            // Valida se o dia da semana está nos diasDisponiveis do barbeiro
            if (!barbeiro.parametrosAgenda.diasDisponiveis.includes(diaSemana)) {
                alert(`O barbeiro não atende no dia selecionado (${diaSemana}).`);
                return;
            }

            const horarioInicial = parseInt(barbeiro.parametrosAgenda.horarioInicial.split(':')[0]);
            const horarioFinal = parseInt(barbeiro.parametrosAgenda.horarioFinal.split(':')[0]);

            // Requisição para buscar todos os agendamentos do barbeiro
            const xhrAgendamentos = new XMLHttpRequest();
            xhrAgendamentos.open("GET", `${urlAgendamento}?idbarbeiro=${barbeiroId}`, true);
            xhrAgendamentos.onreadystatechange = function () {
                if (xhrAgendamentos.readyState === 4 && xhrAgendamentos.status === 200) {
                    let agendamentos = JSON.parse(xhrAgendamentos.responseText);

                    // Converte a data selecionada para o formato DD/MM/YYYY
                    const dataFormatada = `${day}/${month}/${year}`;

                    // Filtra os agendamentos localmente para a data específica
                    agendamentos = agendamentos.filter(ag => ag.data === dataFormatada);

                    // Busca dados de usuários e serviços antes de preencher a tabela
                    getUsuariosEServicos((usuarios, servicos) => {
                        preencherTabela(horarioInicial, horarioFinal, agendamentos, dataFormatada, usuarios, servicos);
                    });
                } else if (xhrAgendamentos.readyState === 4) {
                    console.error("Erro ao carregar agendamentos:", xhrAgendamentos.status);
                }
            };
            xhrAgendamentos.send();
        } else if (xhrBarbeiros.readyState === 4) {
            console.error("Erro ao carregar dados do barbeiro:", xhrBarbeiros.status);
        }
    };
    xhrBarbeiros.send();
}



// Função para obter usuários e serviços
function getUsuariosEServicos(callback) {
    let usuarios, servicos;

    const xhrUsuarios = new XMLHttpRequest();
    xhrUsuarios.open("GET", urlUsuarios, true);
    xhrUsuarios.onload = function () {
        if (xhrUsuarios.status === 200) {
            usuarios = JSON.parse(xhrUsuarios.responseText);

            const xhrServicos = new XMLHttpRequest();
            xhrServicos.open("GET", urlServicos, true);
            xhrServicos.onload = function () {
                if (xhrServicos.status === 200) {
                    servicos = JSON.parse(xhrServicos.responseText);
                    callback(usuarios, servicos); // Chama o callback com os dados
                } else {
                    console.error("Erro ao carregar serviços:", xhrServicos.status);
                }
            };
            xhrServicos.send();
        } else {
            console.error("Erro ao carregar usuários:", xhrUsuarios.status);
        }
    };
    xhrUsuarios.send();
}

// Função para preencher a tabela com dados
function preencherTabela(horarioInicial, horarioFinal, agendamentos, dataSelecionada, usuarios, servicos) {
    const tabelaBody = document.getElementById('tabela-agenda-atendimento-body');
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la novamente

    let horarioInicioEmMinutos = horarioInicial * 60;
    let horarioFimEmMinutos = horarioFinal * 60;

    while (horarioInicioEmMinutos <= horarioFimEmMinutos) {
        const horas = Math.floor(horarioInicioEmMinutos / 60).toString().padStart(2, '0');
        const minutos = (horarioInicioEmMinutos % 60).toString().padStart(2, '0');
        const horarioFormatado = `${horas}:${minutos}`;

        // Verifica se há um agendamento específico para o horário atual e a data selecionada
        const agendamento = agendamentos.find(
            ag => ag.horariodeinicio === horarioFormatado && ag.data === dataSelecionada
        );

        const cliente = agendamento ? usuarios.find(user => user.id === agendamento.idcliente) : null;
        const servico = agendamento ? servicos.find(svc => svc.id === agendamento.idservico) : null;

        // Cria a linha da tabela
        const row = document.createElement('tr');
        const cellData = document.createElement('td');
        const cellCliente = document.createElement('td');
        const cellServico = document.createElement('td');
        const cellValor = document.createElement('td');
        const cellHorario = document.createElement('td');
        const cellStatus = document.createElement('td');

        cellData.textContent = dataSelecionada;
        cellCliente.textContent = cliente ? cliente.nome : '';
        cellServico.textContent = servico ? servico.nome : '';
        cellValor.textContent = servico ? servico.valor : '';
        cellHorario.textContent = horarioFormatado;
        cellStatus.textContent = agendamento ? agendamento.status : '';

        row.appendChild(cellData);
        row.appendChild(cellCliente);
        row.appendChild(cellServico);
        row.appendChild(cellValor);
        row.appendChild(cellHorario);
        row.appendChild(cellStatus);
        tabelaBody.appendChild(row);

        // Incrementa o horário em 30 minutos
        horarioInicioEmMinutos += 30;
    }
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