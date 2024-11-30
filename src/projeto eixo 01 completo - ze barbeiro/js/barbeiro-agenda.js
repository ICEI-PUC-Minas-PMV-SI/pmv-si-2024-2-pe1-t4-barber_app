// URLs das APIs
var urlUsuarios = 'http://localhost:3000/usuarios';
var urlBarbeiros = 'http://localhost:3000/barbeiros';
var urlAgendamentos = 'http://localhost:3000/agendamento';
var urlServicos = 'http://localhost:3000/servicos';

// // ID do barbeiro logado (simulado)
// const barbeiroId = "1";


// Recupera o ID do usuário logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

if (!usuarioLogado || usuarioLogado.tipousuario !== 'barbeiro') {
    alert('Você não tem permissão para acessar esta página!');
    window.location.href = 'index.html'; // Redireciona para a página de login
} else {
    const nomeUsuario = usuarioLogado.nome;
    const saudacaoChaveBarbeiro = `saudacaoExibidaBarbeiro${usuarioLogado.id}`; // Cria uma chave única por usuário
    const saudacaoExibidaBarbeiro = localStorage.getItem(saudacaoChaveBarbeiro);

    if (!saudacaoExibidaBarbeiro) {
        // Exibe a saudação no primeiro acesso
        alert(`Olá, ${nomeUsuario}!`);
        localStorage.setItem(saudacaoChaveBarbeiro, 'true'); // Marca como exibida para este usuário
    }
}

// else {
//     // Verifica se o nome está disponível e exibe a saudação
//     const nomeUsuario = usuarioLogado.nome;
//     alert(`Olá, ${nomeUsuario}!`);
// }



const barbeiroId = usuarioLogado.id;

document.addEventListener('DOMContentLoaded', function () {
    const dataInput = document.querySelector('input[type="date"]');

    // Adiciona validação para impedir datas anteriores à atual
    dataInput.addEventListener('change', function () {
        const dataSelecionada = new Date(this.value + "T00:00:00");
        const dataAtual = new Date();
        
        // Zera as horas da data atual para comparação precisa
        dataAtual.setHours(0, 0, 0, 0);

        if (dataSelecionada < dataAtual) {
            alert("Você não pode selecionar uma data anterior à data atual.");
            this.value = ''; // Limpa o campo de data selecionada
        }
    });
});


// Evento de clique no botão "Buscar"
document.querySelector('input[value="Buscar"]').addEventListener('click', function () {
    const dataSelecionada = document.querySelector('input[type="date"]').value;

    if (barbeiroId && dataSelecionada) {
        console.log("Barbeiro ID:", barbeiroId);
        console.log("Data selecionada:", dataSelecionada);
        getAgendaAtendimento(barbeiroId, dataSelecionada);
    } else {
        alert("Por favor, selecione uma data.");
    }
});


// // Função para obter a agenda do barbeiro


function getAgendaAtendimento(barbeiroId, dataSelecionada) {
    const xhrBarbeiros = new XMLHttpRequest();
    xhrBarbeiros.open("GET", `${urlBarbeiros}/${barbeiroId}`, true);
    xhrBarbeiros.onreadystatechange = function () {
        if (xhrBarbeiros.readyState === 4) {
            if (xhrBarbeiros.status === 200) {
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

                const xhrAgendamentos = new XMLHttpRequest();
                xhrAgendamentos.open("GET", `${urlAgendamentos}?idbarbeiro=${barbeiroId}`, true);
                xhrAgendamentos.onreadystatechange = function () {
                    if (xhrAgendamentos.readyState === 4) {
                        if (xhrAgendamentos.status === 200) {
                            let agendamentos = JSON.parse(xhrAgendamentos.responseText);

                            // Converte a data para o formato DD/MM/YYYY
                            const dataFormatada = `${day}/${month}/${year}`;

                            // Filtra os agendamentos para a data selecionada
                            agendamentos = agendamentos.filter(ag => ag.data === dataFormatada);

                            getUsuariosEServicos((usuarios, servicos) => {
                                preencherTabela(barbeiroId, horarioInicial, horarioFinal, agendamentos, dataFormatada, usuarios, servicos);
                            });
                        } else {
                            console.error("Erro ao buscar agendamentos:", xhrAgendamentos.status);
                        }
                    }
                };
                xhrAgendamentos.send();
            } else {
                console.error("Erro ao buscar dados do barbeiro:", xhrBarbeiros.status);
            }
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
                    callback(usuarios, servicos);
                }
            };
            xhrServicos.send();
        }
    };
    xhrUsuarios.send();
}

// Função para preencher a tabela
function preencherTabela(barbeiroId, horarioInicial, horarioFinal, agendamentos, dataSelecionada, usuarios, servicos) {
    const tabelaBody = document.getElementById('tabela-agenda-atendimento-body');
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la novamente

    let horarioInicioEmMinutos = horarioInicial * 60;
    let horarioFimEmMinutos = horarioFinal * 60;

    while (horarioInicioEmMinutos <= horarioFimEmMinutos) {
        const horas = Math.floor(horarioInicioEmMinutos / 60).toString().padStart(2, '0');
        const minutos = (horarioInicioEmMinutos % 60).toString().padStart(2, '0');
        const horarioFormatado = `${horas}:${minutos}`;

        const agendamento = agendamentos.find(
            ag => ag.horariodeinicio === horarioFormatado && ag.data === dataSelecionada
        );

        const cliente = agendamento ? usuarios.find(user => user.id === agendamento.idcliente) : null;
        const servico = agendamento ? servicos.find(svc => svc.id === agendamento.idservico) : null;

        const row = document.createElement('tr');
        const cellData = document.createElement('td');
        const cellCliente = document.createElement('td');
        const cellServico = document.createElement('td');
        const cellValor = document.createElement('td');

        const cellHorario = document.createElement('td');
        const cellStatus = document.createElement('td');
        const cellCheckbox = document.createElement('td');

        cellData.textContent = dataSelecionada;
        cellCliente.textContent = cliente ? cliente.nome : '';
        cellServico.textContent = servico ? servico.nome : '';
        cellValor.textContent = servico ? servico.valor : '';

        cellHorario.textContent = horarioFormatado;
        cellStatus.textContent = agendamento ? agendamento.status : '';

        // Adiciona o checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('select-checkbox');
        checkbox.dataset.horario = horarioFormatado;
        checkbox.dataset.data = dataSelecionada;
        checkbox.dataset.status = agendamento ? agendamento.status : '';
        checkbox.dataset.barbeiroId = barbeiroId;

        cellCheckbox.appendChild(checkbox);

        row.appendChild(cellData);
        row.appendChild(cellCliente);
        row.appendChild(cellServico);
        row.appendChild(cellValor);
        row.appendChild(cellHorario);
        row.appendChild(cellStatus);
        row.appendChild(cellCheckbox);
        tabelaBody.appendChild(row);

        horarioInicioEmMinutos += 30;
    }
}

// Evento do botão "Incluir Atendimento"
document.getElementById('btn-incluir-atendimento').addEventListener('click', function () {
    incluirAtendimento();
});

// Evento do botão "Cancelar Atendimento"
document.getElementById('btn-bloquear-atendimento').addEventListener('click', function () {
    bloquearAtendimento();
});

// Função para incluir um atendimento
function incluirAtendimento() {
    const checkboxes = document.querySelectorAll('.select-checkbox:checked');
    const agendamentos = [];

    checkboxes.forEach(checkbox => {
        const horario = checkbox.dataset.horario;
        const data = checkbox.dataset.data;
        const status = checkbox.dataset.status;
        const barbeiroId = checkbox.dataset.barbeiroId;

        if (!status || status === 'Cancelado') {
            agendamentos.push({
                idbarbeiro: barbeiroId,
                idcliente: null, // Substituir pelo cliente correto
                idservico: null, // Substituir pelo serviço correto
                data: data,
                horariodeinicio: horario,
                horariodefim: calcularHorarioFim(horario, 30),
                status: 'Agendado Barbeiro'
            });
        } else {
            alert(`O horário ${horario} já está ocupado.`);
        }
    });

    if (agendamentos.length > 0) {
        agendamentos.forEach(agendamento => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', urlAgendamentos, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status === 201) {
                    console.log('Atendimento incluído:', agendamento);
                } else {
                    alert('Erro ao incluir atendimento.');
                }
            };
            xhr.send(JSON.stringify(agendamento));
        });

        alert('Atendimentos incluídos com sucesso!');
        location.reload();
    }
}

// Função para bloquear um horário
function bloquearAtendimento() {
    const checkboxes = document.querySelectorAll('.select-checkbox:checked');
    const bloqueios = [];

    checkboxes.forEach(checkbox => {
        const horario = checkbox.dataset.horario;
        const data = checkbox.dataset.data;
        const status = checkbox.dataset.status;
        const barbeiroId = checkbox.dataset.barbeiroId;

        if (!status) {
            bloqueios.push({
                idbarbeiro: barbeiroId,
                idcliente: null,
                idservico: null,
                data: data,
                horariodeinicio: horario,
                horariodefim: calcularHorarioFim(horario, 30),
                status: 'Bloqueado'
            });
        } else {
            alert(`O horário ${horario} já está ocupado.`);
        }
    });

    if (bloqueios.length > 0) {
        bloqueios.forEach(bloqueio => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', urlAgendamentos, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status === 201) {
                    console.log('Horário bloqueado:', bloqueio);
                } else {
                    alert('Erro ao bloquear horário.');
                }
            };
            xhr.send(JSON.stringify(bloqueio));
        });

        alert('Horários bloqueados com sucesso!');
        location.reload();
    }
}

// Função para calcular o horário de fim
function calcularHorarioFim(horarioInicio, duracao) {
    const [horas, minutos] = horarioInicio.split(':').map(Number);
    const totalMinutos = horas * 60 + minutos + duracao;
    const horasFim = Math.floor(totalMinutos / 60).toString().padStart(2, '0');
    const minutosFim = (totalMinutos % 60).toString().padStart(2, '0');
    return `${horasFim}:${minutosFim}`;
}


// Evento do botão "Concluir Atendimento"
document.getElementById('btn-concluir-atendimento').addEventListener('click', function () {
    concluirAtendimento();
});

// Função para alterar o status para "Concluído"
function concluirAtendimento() {
    const checkboxes = document.querySelectorAll('.select-checkbox:checked');
    const atualizacoes = [];

    checkboxes.forEach(checkbox => {
        const horario = checkbox.dataset.horario;
        const data = checkbox.dataset.data;
        const status = checkbox.dataset.status;
        const barbeiroId = checkbox.dataset.barbeiroId;

        // Verifica se o status é "Agendado" ou "Agendado Barbeiro"
        if (status === 'Agendado' || status === 'Agendado Barbeiro') {
            atualizacoes.push({
                idbarbeiro: barbeiroId,
                data: data,
                horariodeinicio: horario,
                status: 'Concluído'
            });
        } else {
            alert(`O horário ${horario} não está no status "Agendado" ou "Agendado Barbeiro".`);
        }
    });

    if (atualizacoes.length > 0) {
        atualizacoes.forEach(atualizacao => {
            // Busca o agendamento correspondente no servidor
            const xhrGet = new XMLHttpRequest();
            xhrGet.open(
                'GET',
                `${urlAgendamentos}?idbarbeiro=${atualizacao.idbarbeiro}&data=${atualizacao.data}&horariodeinicio=${atualizacao.horariodeinicio}`,
                true
            );
            xhrGet.onload = function () {
                if (xhrGet.status === 200) {
                    const agendamentos = JSON.parse(xhrGet.responseText);
                    if (agendamentos.length > 0) {
                        const agendamento = agendamentos[0];

                        // Atualiza o status para "Concluído"
                        const xhrUpdate = new XMLHttpRequest();
                        xhrUpdate.open('PATCH', `${urlAgendamentos}/${agendamento.id}`, true);
                        xhrUpdate.setRequestHeader('Content-Type', 'application/json');
                        xhrUpdate.onload = function () {
                            if (xhrUpdate.status === 200) {
                                console.log(`Agendamento ${agendamento.id} concluído com sucesso.`);
                            } else {
                                alert(`Erro ao concluir o agendamento ${agendamento.id}.`);
                            }
                        };
                        xhrUpdate.send(JSON.stringify({
                            status: 'Concluído'
                        }));
                    }
                } else {
                    alert('Erro ao buscar agendamento para atualização.');
                }
            };
            xhrGet.send();
        });

        alert('Atendimentos concluídos com sucesso!');
        location.reload();
    } else {
        alert('Nenhum atendimento válido foi selecionado.');
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

// Evento do botão "Cancelar Bloqueio/Agendamento"
document.getElementById('btn-cancelar-agendamento').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.select-checkbox:checked');

    if (checkboxes.length === 0) {
        alert('Selecione pelo menos um agendamento para cancelar.');
        return;
    }

    checkboxes.forEach(checkbox => {
        const horario = checkbox.dataset.horario;
        const data = checkbox.dataset.data;
        const barbeiroId = checkbox.dataset.barbeiroId;
        const status = checkbox.dataset.status;

        // Verifica se o status é "Bloqueado" ou "Agendado Barbeiro"
        if (status === 'Bloqueado' || status === 'Agendado Barbeiro') {
            // Busca o agendamento correspondente no servidor
            const xhrGet = new XMLHttpRequest();
            xhrGet.open(
                'GET',
                `${urlAgendamentos}?idbarbeiro=${barbeiroId}&data=${data}&horariodeinicio=${horario}`,
                true
            );
            xhrGet.onload = function () {
                if (xhrGet.status === 200) {
                    const agendamentos = JSON.parse(xhrGet.responseText);

                    if (agendamentos.length > 0) {
                        const agendamento = agendamentos[0];

                        // Exclui o agendamento
                        const xhrDelete = new XMLHttpRequest();
                        xhrDelete.open('DELETE', `${urlAgendamentos}/${agendamento.id}`, true);
                        xhrDelete.onload = function () {
                            if (xhrDelete.status === 200) {
                                console.log(`Agendamento ${agendamento.id} cancelado com sucesso.`);
                            } else {
                                alert(`Erro ao cancelar o agendamento ${agendamento.id}.`);
                            }
                        };
                        xhrDelete.send();
                    }
                } else {
                    alert('Erro ao buscar o agendamento para exclusão.');
                }
            };
            xhrGet.send();
            alert('Cancelamentos realizados com sucesso!');
        } else {
            alert(`O horário ${horario} não está no status "Bloqueado" ou "Agendado Barbeiro".`);
        }
       
    });

    
    location.reload();
});


