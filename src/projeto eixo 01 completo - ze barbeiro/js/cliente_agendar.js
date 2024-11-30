// URLs das APIs
const urlUsuarios = 'http://localhost:3000/usuarios';
const urlBarbeiros = 'http://localhost:3000/barbeiros';
const urlAgendamentos = 'http://localhost:3000/agendamento';
const urlServicos = 'http://localhost:3000/servicos';

// Verifica se o cliente está logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado || usuarioLogado.tipousuario !== 'cliente') {
    alert('Você não está logado ou não tem permissão para acessar esta página.');
    window.location.href = 'index.html'; // Redireciona para a página de login
} else {
    const nomeUsuario = usuarioLogado.nome;
    const saudacaoChave = `saudacaoExibida_${usuarioLogado.id}`; // Cria uma chave única por usuário
    const saudacaoExibida = localStorage.getItem(saudacaoChave);

    if (!saudacaoExibida) {
        // Exibe a saudação no primeiro acesso
        alert(`Olá, ${nomeUsuario}!`);
        localStorage.setItem(saudacaoChave, 'true'); // Marca como exibida para este usuário
    }
}


// else {
//     // Verifica se o nome está disponível e exibe a saudação
//     const nomeUsuario = usuarioLogado.nome || "Cliente";
//     alert(`Olá, ${nomeUsuario}!`);
// }
// console.log(JSON.parse(localStorage.getItem('usuarioLogado')));

// ID do cliente logado
const clienteId = usuarioLogado.id;

// Ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
      getListaBarbeirosCliente();
    


     // Adiciona validação para impedir datas anteriores à atual
     document.querySelector('input[type="date"]').addEventListener('change', function () {
        const dataSelecionada = new Date(this.value + "T00:00:00"); // Ajusta para o início do dia
        const dataAtual = new Date();
        
        // Zera as horas, minutos, segundos e milissegundos da data atual
        dataAtual.setHours(0, 0, 0, 0);

        if (dataSelecionada < dataAtual) {
            alert("Você não pode selecionar uma data anterior à data atual.");
            this.value = ''; // Limpa o campo de data selecionada
        }
    });

});




// Função para formatar a data no formato DD/MM/AAAA
function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
}

// // Função para obter a lista de barbeiros

// function getListaBarbeirosCliente() {
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
//                     const datalistBarbeiro = document.getElementById('cliente-barbeiros-cad');
//                     datalistBarbeiro.innerHTML = ''; // Limpa o datalist
//                     barbeiros
//                         .filter(barbeiro => barbeiro.statusBarbeiro) // Filtra barbeiros com status true
//                         .forEach(barbeiro => {
//                             const usuario = usuarios.find(user => user.id === barbeiro.id);
//                             if (usuario) {
//                                 const option = document.createElement('option');
//                                 option.value = usuario.nome;
//                                 option.setAttribute("data-id", barbeiro.id);
//                                 datalistBarbeiro.appendChild(option);
//                             }
//                         });
//                 }
//             };
//             xhrUsuarios.send();
//         }
//     };
//     xhrBarbeiros.send();
// }

function getListaBarbeirosCliente() {
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
                    selectBarbeiro.innerHTML = '<option value="">Selecione um barbeiro</option>'; // Limpa o select e adiciona a opção padrão

                    barbeiros
                        .filter(barbeiro => barbeiro.statusBarbeiro) // Filtra barbeiros com status true
                        .forEach(barbeiro => {
                            const usuario = usuarios.find(user => user.id === barbeiro.id);
                            if (usuario) {
                                const option = document.createElement('option');
                                option.value = barbeiro.id; // Use o ID como valor da opção
                                option.textContent = usuario.nome; // Exibe o nome do barbeiro
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


// Captura o ID do barbeiro selecionado e atualiza os serviços disponíveis
// document.getElementById('barbeiros-cadastrados').addEventListener('input', function () {
//     const input = this;
//     const datalist = document.getElementById('cliente-barbeiros-cad');
//     const option = Array.from(datalist.options).find(opt => opt.value === input.value);

//     if (option) {
//         const barbeiroId = option.getAttribute('data-id');
//         input.setAttribute('data-id', barbeiroId);
//         atualizarServicos(barbeiroId); // Atualiza a lista de serviços disponíveis
//     }
// });

document.getElementById('barbeiros-cadastrados').addEventListener('change', function () {
    const barbeiroId = this.value; // Obtém o ID do barbeiro selecionado

    if (barbeiroId) {
        atualizarServicos(barbeiroId); // Atualiza a lista de serviços com base no barbeiro selecionado
    }
});


// Atualiza os serviços disponíveis com base no barbeiro selecionado

// function atualizarServicos(barbeiroId) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", `${urlBarbeiros}/${barbeiroId}`, true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             const barbeiro = JSON.parse(xhr.responseText);
//             const datalistServico = document.getElementById('cliente-servico-cad');
//             datalistServico.innerHTML = ''; // Limpa o datalist

//             // Obtém a lista completa de serviços
//             const xhrServicos = new XMLHttpRequest();
//             xhrServicos.open("GET", urlServicos, true);
//             xhrServicos.onreadystatechange = function () {
//                 if (xhrServicos.readyState === 4 && xhrServicos.status === 200) {
//                     const servicos = JSON.parse(xhrServicos.responseText);

//                     // Filtra os serviços do barbeiro que também estão ativos
//                     barbeiro.servico.forEach(servicoNome => {
//                         const servicoAtivo = servicos.find(
//                             servico => servico.nome === servicoNome && servico.status === true
//                         );

//                         if (servicoAtivo) {
//                             // Adiciona ao datalist apenas serviços ativos
//                             const option = document.createElement('option');
//                             option.value = servicoAtivo.nome;
//                             datalistServico.appendChild(option);
//                         }
//                     });
//                 }
//             };
//             xhrServicos.send();
//         }
//     };
//     xhr.send();
// }


// Função para atualizar os serviços disponíveis com base no barbeiro selecionado
function atualizarServicos(barbeiroId) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${urlBarbeiros}/${barbeiroId}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const barbeiro = JSON.parse(xhr.responseText);
            const selectServico = document.getElementById('servicos-cadastrados');
            selectServico.innerHTML = '<option value="">Selecione um serviço</option>'; // Limpa e adiciona a opção padrão

            // Obtém a lista completa de serviços
            const xhrServicos = new XMLHttpRequest();
            xhrServicos.open("GET", urlServicos, true);
            xhrServicos.onreadystatechange = function () {
                if (xhrServicos.readyState === 4 && xhrServicos.status === 200) {
                    const servicos = JSON.parse(xhrServicos.responseText);

                    // Adiciona os serviços disponíveis ao <select>
                    barbeiro.servico.forEach(servicoNome => {
                        const servicoAtivo = servicos.find(
                            servico => servico.nome === servicoNome && servico.status === true
                        );

                        if (servicoAtivo) {
                            const option = document.createElement('option');
                            option.value = servicoAtivo.id; // ID do serviço como valor
                            option.textContent = servicoAtivo.nome; // Nome visível no select
                            selectServico.appendChild(option);
                        }
                    });
                }
            };
            xhrServicos.send();
        }
    };
    xhr.send();
}


// Evento do botão "Buscar" para carregar horários do barbeiro
// document.querySelector('input[value="Buscar"]').addEventListener('click', function () {
//     const barbeiroInput = document.getElementById('barbeiros-cadastrados');
//     const dataSelecionada = document.querySelector('input[type="date"]').value;
//     const barbeiroId = barbeiroInput.getAttribute('data-id');

//     if (barbeiroId && dataSelecionada) {
//         getAgendaAtendimento(barbeiroId, dataSelecionada);
//     } else {
//         alert("Por favor, selecione um barbeiro e uma data.");
//     }
// });

// Evento do botão "Buscar" para carregar horários do barbeiro
document.querySelector('input[value="Buscar"]').addEventListener('click', function () {
    const barbeiroInput = document.getElementById('barbeiros-cadastrados');
    const dataSelecionada = document.querySelector('input[type="date"]').value;
    const barbeiroId = barbeiroInput.value; // Obtém o valor selecionado no <select>

    if (barbeiroId && dataSelecionada) {
        getAgendaAtendimento(barbeiroId, dataSelecionada);
    } else {
        alert("Por favor, selecione um barbeiro e uma data.");
    }
});



// Função para buscar a agenda e preencher a tabela
function getAgendaAtendimento(barbeiroId, dataSelecionada) {
    const xhrBarbeiros = new XMLHttpRequest();
    xhrBarbeiros.open("GET", `${urlBarbeiros}/${barbeiroId}`, true);
    xhrBarbeiros.onreadystatechange = function () {
        if (xhrBarbeiros.readyState === 4 && xhrBarbeiros.status === 200) {
            const barbeiro = JSON.parse(xhrBarbeiros.responseText);

            // Verifica se o dia da semana é compatível
            const diasDisponiveis = barbeiro.parametrosAgenda.diasDisponiveis;
            const data = new Date(dataSelecionada);
            const diaSemanaSelecionado = obterDiaSemana(data);

            if (!diasDisponiveis.includes(diaSemanaSelecionado)) {
                alert(`O barbeiro não atende no dia ${diaSemanaSelecionado}.`);
                return;
            }

            // Continua carregando a agenda
            const horarioInicial = parseInt(barbeiro.parametrosAgenda.horarioInicial.split(':')[0]);
            const horarioFinal = parseInt(barbeiro.parametrosAgenda.horarioFinal.split(':')[0]);

            const xhrAgendamentos = new XMLHttpRequest();
            xhrAgendamentos.open("GET", `${urlAgendamentos}?idbarbeiro=${barbeiroId}&data=${formatarData(dataSelecionada)}`, true);
            xhrAgendamentos.onreadystatechange = function () {
                if (xhrAgendamentos.readyState === 4 && xhrAgendamentos.status === 200) {
                    const agendamentos = JSON.parse(xhrAgendamentos.responseText);

                    preencherTabela(
                        barbeiroId,
                        horarioInicial,
                        horarioFinal,
                        agendamentos,
                        dataSelecionada
                    );
                }
            };
            xhrAgendamentos.send();
        }
    };
    xhrBarbeiros.send();
}

// Função corrigida para obter o dia da semana em português
function obterDiaSemana(data) {
    const diasSemana = [
        "Domingo", "Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"
    ];
    return diasSemana[data.getUTCDay()]; // Usa getUTCDay() para consistência com datas
}




// // Função para incluir agendamentos
// document.getElementById('btn-incluir-atendimento').addEventListener('click', function () {
//     const checkboxes = document.querySelectorAll('.select-checkbox:checked');
//     const servicoInput = document.getElementById('servicos-cadastrados');
//     const servicoSelecionado = servicoInput.value;

//     if (!servicoSelecionado) {
//         alert('Selecione um serviço.');
//         return;
//     }

//     // Obter o ID do serviço com base no nome selecionado
//     const xhrServicos = new XMLHttpRequest();
//     xhrServicos.open("GET", urlServicos, true);
//     xhrServicos.onreadystatechange = function () {
//         if (xhrServicos.readyState === 4 && xhrServicos.status === 200) {
//             const servicos = JSON.parse(xhrServicos.responseText);
//             const servico = servicos.find(svc => svc.nome === servicoSelecionado);

//             if (!servico) {
//                 alert('Serviço selecionado não encontrado.');
//                 return;
//             }

//             const servicoId = servico.id; // ID do serviço selecionado

//             const agendamentos = [];
//             checkboxes.forEach(checkbox => {
//                 const horario = checkbox.dataset.horario;
//                 const data = formatarData(checkbox.dataset.data); // Formata a data corretamente
//                 const barbeiroId = checkbox.dataset.barbeiroId;

//                 agendamentos.push({
//                     idbarbeiro: barbeiroId,
//                     idcliente: clienteId,
//                     idservico: servicoId,
//                     data,
//                     horariodeinicio: horario,
//                     horariodefim: calcularHorarioFim(horario, 30),
//                     status: 'Agendado'
//                 });
//             });

//             // Envia os agendamentos para o servidor
//             agendamentos.forEach(agendamento => {
//                 const xhr = new XMLHttpRequest();
//                 xhr.open("POST", urlAgendamentos, true);
//                 xhr.setRequestHeader("Content-Type", "application/json");
//                 xhr.onreadystatechange = function () {
//                     if (xhr.readyState === 4 && xhr.status === 201) {
//                         console.log("Agendamento criado:", agendamento);
//                     }
//                 };
//                 xhr.send(JSON.stringify(agendamento));
//             });
            

//             alert('Agendamentos realizados com sucesso!');
//             location.reload();
//         }
//     };
//     xhrServicos.send();
// });

// Função para incluir agendamentos
document.getElementById('btn-incluir-atendimento').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.select-checkbox:checked');
    const servicoInput = document.getElementById('servicos-cadastrados');
    const servicoSelecionadoId = servicoInput.value; // Obtém o ID do serviço selecionado

    console.log("ID do serviço selecionado:", servicoSelecionadoId);

    if (!servicoSelecionadoId) {
        alert('Selecione um serviço.');
        return;
    }

    const xhrServicos = new XMLHttpRequest();
    xhrServicos.open("GET", urlServicos, true);
    xhrServicos.onreadystatechange = function () {
        if (xhrServicos.readyState === 4 && xhrServicos.status === 200) {
            const servicos = JSON.parse(xhrServicos.responseText);
            console.log("Serviços retornados da API:", servicos);

            // Ajuste para comparar IDs como strings
            const servico = servicos.find(svc => svc.id === servicoSelecionadoId);

            if (!servico) {
                console.error("Serviço não encontrado para o ID:", servicoSelecionadoId);
                alert('Serviço selecionado não encontrado.');
                return;
            }

            console.log("Serviço encontrado:", servico);

            const agendamentos = [];
            checkboxes.forEach(checkbox => {
                const horario = checkbox.dataset.horario;
                const data = formatarData(checkbox.dataset.data);
                const barbeiroId = checkbox.dataset.barbeiroId;

                agendamentos.push({
                    idbarbeiro: barbeiroId,
                    idcliente: clienteId,
                    idservico: servico.id,
                    data,
                    horariodeinicio: horario,
                    horariodefim: calcularHorarioFim(horario, 30),
                    status: 'Agendado'
                });
            });

            agendamentos.forEach(agendamento => {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", urlAgendamentos, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 201) {
                        console.log("Agendamento criado:", agendamento);
                    }
                };
                xhr.send(JSON.stringify(agendamento));
            });

            alert('Agendamentos realizados com sucesso!');
            location.reload();
        } else if (xhrServicos.readyState === 4) {
            alert('Erro ao obter os serviços. Tente novamente.');
        }
    };
    xhrServicos.send();
});



function preencherTabela(barbeiroId, horarioInicial, horarioFinal, agendamentos, dataSelecionada) {
    const tabelaBody = document.getElementById('tabela-agenda-atendimento-body');
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la novamente

    const dataFormatada = formatarData(dataSelecionada);

    let horarioAtualEmMinutos = horarioInicial * 60;
    const horarioFinalEmMinutos = horarioFinal * 60;

    // Obter lista de usuários e barbeiros
    let usuarios = [];
    let barbeiros = [];

    const xhrUsuarios = new XMLHttpRequest();
    xhrUsuarios.open("GET", urlUsuarios, false); // Requisição síncrona
    xhrUsuarios.onreadystatechange = function () {
        if (xhrUsuarios.readyState === 4 && xhrUsuarios.status === 200) {
            usuarios = JSON.parse(xhrUsuarios.responseText);
        }
    };
    xhrUsuarios.send();

    const xhrBarbeiros = new XMLHttpRequest();
    xhrBarbeiros.open("GET", urlBarbeiros, false); // Requisição síncrona
    xhrBarbeiros.onreadystatechange = function () {
        if (xhrBarbeiros.readyState === 4 && xhrBarbeiros.status === 200) {
            barbeiros = JSON.parse(xhrBarbeiros.responseText);
        }
    };
    xhrBarbeiros.send();

    while (horarioAtualEmMinutos <= horarioFinalEmMinutos) {
        const horas = Math.floor(horarioAtualEmMinutos / 60).toString().padStart(2, '0');
        const minutos = (horarioAtualEmMinutos % 60).toString().padStart(2, '0');
        const horarioFormatado = `${horas}:${minutos}`;

        // Busca o agendamento correspondente
        const agendamento = agendamentos.find(
            ag => ag.horariodeinicio === horarioFormatado && ag.data === dataFormatada
        );

        // Filtra apenas os horários livres e os agendamentos do cliente logado
        if (!agendamento || agendamento.idcliente === clienteId) {
            const row = document.createElement('tr');
            const cellData = document.createElement('td');
            const cellBarbeiro = document.createElement('td'); // Nova célula para o nome do barbeiro
            const cellHorario = document.createElement('td');
            const cellServico = document.createElement('td'); // Nova célula para o serviço
            const cellValor = document.createElement('td'); // Nova célula para o valor
            const cellStatus = document.createElement('td');
            const cellAcao = document.createElement('td');

            cellData.textContent = dataFormatada;
            cellHorario.textContent = horarioFormatado;

            if (!agendamento) {
                // Caso de horário livre
                cellStatus.textContent = '';
                cellServico.textContent = ''; // Serviço vazio para horários livres
                cellBarbeiro.textContent = ''; // Nome do barbeiro vazio para horários livres

                // Adiciona checkbox para agendar
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('select-checkbox');
                checkbox.dataset.horario = horarioFormatado;
                checkbox.dataset.data = dataSelecionada;
                checkbox.dataset.barbeiroId = barbeiroId;
                cellAcao.appendChild(checkbox);
            } else if (agendamento.idcliente === clienteId) {
                // Caso de agendamento do cliente logado
                cellStatus.textContent = agendamento.status;

                // Busca o serviço correspondente pelo ID
                const xhrServicos = new XMLHttpRequest();
                xhrServicos.open("GET", `${urlServicos}/${agendamento.idservico}`, false); // Requisição síncrona
                xhrServicos.onreadystatechange = function () {
                    if (xhrServicos.readyState === 4 && xhrServicos.status === 200) {
                        const servico = JSON.parse(xhrServicos.responseText);
                        cellServico.textContent = servico.nome || 'N/A';
                        cellValor.textContent = servico.valor || 'N/A';
                    }
                };
                xhrServicos.send();

                // Busca o barbeiro correspondente pelo ID
                const barbeiro = barbeiros.find(bar => bar.id === agendamento.idbarbeiro);
                if (barbeiro) {
                    const usuario = usuarios.find(user => user.id === barbeiro.id);
                    cellBarbeiro.textContent = usuario ? usuario.nome : 'N/A';
                }

                if (agendamento.status === 'Agendado') {
                    // Adiciona checkbox para cancelar
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.classList.add('cancel-checkbox');
                    checkbox.dataset.agendamentoId = agendamento.id;
                    cellAcao.appendChild(checkbox);
                }
            }

            // Adiciona as células na linha
            row.appendChild(cellData);
            row.appendChild(cellBarbeiro); // Adiciona a célula do nome do barbeiro
            row.appendChild(cellServico);
            row.appendChild(cellValor);
            row.appendChild(cellHorario);
            row.appendChild(cellStatus);
            row.appendChild(cellAcao);
            tabelaBody.appendChild(row);
        }

        horarioAtualEmMinutos += 30; // Incrementa em 30 minutos
    }
}




// Função para cancelar agendamentos
document.getElementById('btn-cancelar-agendamento').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.cancel-checkbox:checked');

    if (checkboxes.length === 0) {
        alert('Selecione pelo menos um agendamento para cancelar.');
        return;
    }

    checkboxes.forEach(checkbox => {
        const agendamentoId = checkbox.dataset.agendamentoId;

        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `${urlAgendamentos}/${agendamentoId}`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(`Agendamento ${agendamentoId} cancelado com sucesso.`);
            }
        };
        xhr.send();
    });

    alert('Agendamentos cancelados com sucesso!');
    location.reload();
});



// Função para calcular o horário de término
function calcularHorarioFim(horarioInicio, duracao) {
    const [horas, minutos] = horarioInicio.split(':').map(Number);
    const totalMinutos = horas * 60 + minutos + duracao;
    const horasFim = Math.floor(totalMinutos / 60).toString().padStart(2, '0');
    const minutosFim = (totalMinutos % 60).toString().padStart(2, '0');
    return `${horasFim}:${minutosFim}`;
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


