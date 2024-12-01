var urlUsuario = 'http://localhost:3000/usuarios'; // Rota para usuarios
var urlBarbeiro = 'http://localhost:3000/barbeiros'; // Rota para 
var urlServico = 'http://localhost:3000/servicos'; // Rota para barbeiros
var urlAgendamento = 'http://localhost:3000/agendamentos'; // Rota para barbeiros

// Verifica se o administrador está logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado || usuarioLogado.tipousuario !== 'administrador') {
    alert('Você não está logado ou não tem permissão para acessar esta página.');
    window.location.href = 'index.html'; // Redireciona para a página de login
}else {
    const nomeUsuario = usuarioLogado.nome;
    const saudacaoChaveAdm = `saudacaoExibidaAdm${usuarioLogado.id}`; // Cria uma chave única por usuário
    const saudacaoExibidaAdm = localStorage.getItem(saudacaoChaveAdm);

    if (!saudacaoExibidaAdm) {
        // Exibe a saudação no primeiro acesso
        alert(`Olá, ${nomeUsuario}!`);
        localStorage.setItem(saudacaoChaveAdm, 'true'); // Marca como exibida para este usuário
    }
}




// else {
//     // Verifica se o nome está disponível e exibe a saudação
//     const nomeUsuario = usuarioLogado.nome;
//     alert(`Olá, ${nomeUsuario}!`);
// }


document.addEventListener('DOMContentLoaded', function () {
    getdata(); // Chama a função assim que o DOM estiver carregado
    // adm_barbeiro_EmDesenvolvimento
});

document.addEventListener('DOMContentLoaded', function () {
    getDataServico2(); // Chama a função assim que o DOM estiver carregado
    // adm_barbeiro_EmDesenvolvimento
});

document.addEventListener('DOMContentLoaded', function () {
    getDataServicoEditar(); // Chama a função assim que o DOM estiver carregado
    // adm_barbeiro_EmDesenvolvimento
});

document.getElementById('salvar-barbeiro').addEventListener('click', function (event) {
    event.preventDefault();

    createItem();
});



document.getElementById('salvar-edicao-barbeiro').addEventListener('click', function (event) {
    event.preventDefault();

    salvarEdicao();
});




function getdata() {
    // Primeira requisição para obter os dados dos barbeiros
    var requisicaoBarbeiros = new XMLHttpRequest();
    requisicaoBarbeiros.open('GET', urlBarbeiro, true); // url2 é a rota para 'barbeiros'
    requisicaoBarbeiros.onload = function () {
        if (requisicaoBarbeiros.status === 200) {
            var barbeiros = JSON.parse(requisicaoBarbeiros.responseText);

            // Segunda requisição para obter os dados dos usuários
            var requisicaoUsuarios = new XMLHttpRequest();
            requisicaoUsuarios.open('GET', urlUsuario, true); // url1 é a rota para 'usuarios'
            requisicaoUsuarios.onload = function () {
                if (requisicaoUsuarios.status === 200) {
                    var usuarios = JSON.parse(requisicaoUsuarios.responseText);
                    var saida = '';

                    // Loop para combinar os dados de usuários e barbeiros com o mesmo ID
                    for (var i = 0; i < barbeiros.length; i++) {
                        var barbeiro = barbeiros[i];

                        // Encontrar o usuário correspondente pelo ID
                        var usuarioCorrespondente = usuarios.find(function (usuario) {
                            return usuario.id === barbeiro.id;
                        });

                        // Se encontrar um usuário com o mesmo ID, exibe os dados combinados
                        if (usuarioCorrespondente) {
                            saida += `<tr>  
                              <td>${usuarioCorrespondente.nome}</td> <!-- Nome do usuário -->
                              <td>${barbeiro.servico}</td> <!-- Serviço do barbeiro -->
                              <td class="status">${barbeiro.statusBarbeiro ? 'Ativo': 'Inativo'}</td> <!-- Status do barbeiro -->
                               
                               <td><button id="btn-cad-barbeiro" type="button" class="btn-editar-barbeiro" data-bs-toggle="modal"
          data-bs-target="#modal-edicao" onclick="editarBarbeiro('${barbeiro.id}')"style="background-color: #c79655;">
          Editar
        </button></td>
                          </tr>`;
                        }
                    }

                    // <td><button class="editar" onclick="editarBarbeiro('${barbeiro.id}')">Editar</button></td>
                    // Inserir os dados combinados na tabela HTML
                    document.getElementById('listar-barbeiros-cadastrados').innerHTML = saida;
                }
            };
            requisicaoUsuarios.send(); // Enviar a segunda requisição
        }
    };
    requisicaoBarbeiros.send(); // Enviar a primeira requisição
}

function getDataServico2() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET",urlServico, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const dados = JSON.parse(xhr.responseText);

                const selectServico = document.getElementById('servico-cad-barbeiro');

                // Verifica se o select foi encontrado
                if (!selectServico) {
                    console.error("Elemento select com o ID 'servico-cad-barbeiro' não encontrado.");
                    return;
                }
                
                // Limpa as opções existentes no select, exceto a opção padrão
                selectServico.innerHTML = '<option value="" disabled selected>Selecione os serviços</option>';

                // Adiciona cada serviço como uma opção no select
                dados.forEach(function(servico) {
                    const option = document.createElement('option');
                    option.value = servico.nome;
                    option.textContent = servico.nome;
                    selectServico.appendChild(option);
                });
            } else {
                console.error("Erro ao carregar serviços:", xhr.status);
            }
        }
    };
    xhr.send();
}


function getDataServico() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", urlServico, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log("Status da Requisição:", xhr.status); // Log do status da requisição
            if (xhr.status === 200) {
                const dados = JSON.parse(xhr.responseText);
                console.log("Dados recebidos:", dados); // Verifique os dados recebidos no console

                const selectServico = document.getElementById('servico-cad-barbeiro');

                // Verifica se o select foi encontrado
                if (!selectServico) {
                    console.error("Elemento select com o ID 'servico-cad-barbeiro' não encontrado.");
                    return;
                }

                // Limpa as opções existentes no select, exceto a opção padrão
                selectServico.innerHTML = '<option value="" disabled selected>Selecione oss serviços</option>';

                // Verifique se há dados antes de tentar preencher o select
                if (Array.isArray(dados) && dados.length > 0) {
                    // Usando uma função convencional para iterar sobre os serviços
                    dados.forEach(function(servico) {
                        const option = document.createElement('option');
                        option.value = servico.nome;
                        option.textContent = servico.nome;
                        selectServico.appendChild(option);
                    });
                } else {
                    console.warn("Nenhum serviço encontrado nos dados retornados.");
                }
            } else {
                console.error("Erro ao carregar serviços:", xhr.status);
            }
        }
    };
    xhr.send();
}


function getDataServicoEditar() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET",urlServico, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const dados = JSON.parse(xhr.responseText);

                const selectServico = document.getElementById('edit-servico');

                // Verifica se o select foi encontrado
                if (!selectServico) {
                    console.error("Elemento select com o ID 'edit-servico' não encontrado.");
                    return;
                }
                
                // Limpa as opções existentes no select, exceto a opção padrão
                selectServico.innerHTML = '<option value="" disabled selected>Selecione os serviços</option>';

                // Adiciona cada serviço como uma opção no select
                dados.forEach(function(servico) {
                    const option = document.createElement('option');
                    option.value = servico.nome;
                    option.textContent = servico.nome;
                    selectServico.appendChild(option);
                });
            } else {
                console.error("Erro ao carregar serviços:", xhr.status);
            }
        }
    };
    xhr.send();
}




function createItem() {
    // Capturar os dados dos campos do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const confirmarEmail = document.getElementById("confirmarEmail").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const telefone = document.getElementById("telefone").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    

    // Verificação simples de senha e email
    if (email !== confirmarEmail) {
        alert("Os e-mails não coincidem!");
        return;
    }
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Função para verificar se o email já está cadastrado
    function verificarEmail(callback) {
        var requisicao = new XMLHttpRequest();
        requisicao.open('GET', `${urlUsuario}?email=${email}`, true); // Faz uma consulta para verificar o e-mail
        requisicao.onload = function () {
            if (requisicao.status === 200) {
                var dados = JSON.parse(requisicao.responseText);
                // Se encontrar algum usuário com o mesmo e-mail, retorna verdadeiro
                callback(dados.length > 0);
            }
        };
        requisicao.send();
    }

    // Verificar se o e-mail já está cadastrado antes de prosseguir com o cadastro
    verificarEmail(function (emailExistente) {
        if (emailExistente) {
            alert("Este e-mail já está cadastrado! Por favor, use um e-mail diferente.");
            return;
        }

        // Capturar os serviços selecionados
        const servicoSelect = document.getElementById("servico-cad-barbeiro");
        const servicos = [];
        for (let i = 0; i < servicoSelect.options.length; i++) {
            if (servicoSelect.options[i].selected) {
                servicos.push(servicoSelect.options[i].value);
            }
        }

        // Capturar os dias da semana selecionados
        const diasDisponiveis = [];
        const diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
        diasSemana.forEach(function (dia) {
            const checkbox = document.getElementById(dia);
            if (checkbox && checkbox.checked) {
                diasDisponiveis.push(dia.charAt(0).toUpperCase() + dia.slice(1));
            }
        });

        // Capturar os horários disponíveis
        const horarioInicial = document.getElementById("horarioinicial").value;
        const horarioFinal = document.getElementById("horariofinal").value;

        // Criar o objeto usuário
        const usuario = {
            nome: nome,
            email: email,
            senha: senha,
            telefone: telefone,
            dataNascimento: dataNascimento,
            tipousuario:"barbeiro"
        };

        // Conversão para JSON e envio dos dados do usuário
        const jsonData1 = JSON.stringify(usuario);
        const xhr1 = new XMLHttpRequest();
        xhr1.open("POST", "http://localhost:3000/usuarios", true);
        xhr1.setRequestHeader("Content-Type", "application/json");

        // Função de callback para quando a requisição de usuário for completada
        xhr1.onreadystatechange = function () {
            if (xhr1.readyState === 4) {
                if (xhr1.status === 201) {
                    alert("Usuário cadastrado com sucesso!");

                    // Captura o ID gerado na resposta do servidor
                    const resposta = JSON.parse(xhr1.responseText);
                    const idGerado = resposta.id;

                    // Criar o objeto barbeiro com o mesmo ID
                    const barbeiro = {
                        id: idGerado,
                        servico: servicos,
                        statusBarbeiro: true,
                        parametrosAgenda: {
                            diasDisponiveis: diasDisponiveis,
                            horarioInicial: horarioInicial,
                            horarioFinal: horarioFinal
                        }
                    };

                    // Conversão para JSON e envio dos dados do barbeiro
                    const jsonData2 = JSON.stringify(barbeiro);
                    const xhr2 = new XMLHttpRequest();
                    xhr2.open("POST", "http://localhost:3000/barbeiros", true);
                    xhr2.setRequestHeader("Content-Type", "application/json");

                    xhr2.onreadystatechange = function () {
                        if (xhr2.readyState === 4) {
                            if (xhr2.status === 201) {
                                alert("Barbeiro cadastrado com sucesso!");
                            } else {
                                console.error("Erro ao cadastrar barbeiro:", xhr2.responseText);
                                alert("Erro ao cadastrar barbeiro!");
                            }
                        }
                    };
                    xhr2.send(jsonData2);
                } else {
                    console.error("Erro ao cadastrar usuário:", xhr1.responseText);
                    alert("Erro ao cadastrar usuário!");
                }
            }
        };

        xhr1.send(jsonData1);
    });
}


//aqui 
function editarBarbeiro(id) {
    document.getElementById("edit-idd").value = id;
    var requisicaoBarbeiro = new XMLHttpRequest();
    requisicaoBarbeiro.open('GET', `${urlBarbeiro}/${id}`, true);
    requisicaoBarbeiro.onload = function () {
        if (requisicaoBarbeiro.status === 200) {
            var barbeiro = JSON.parse(requisicaoBarbeiro.responseText);

            var requisicaoUsuario = new XMLHttpRequest();
            requisicaoUsuario.open('GET', `${urlUsuario}/${id}`, true);
            requisicaoUsuario.onload = function () {
                if (requisicaoUsuario.status === 200) {
                    var usuario = JSON.parse(requisicaoUsuario.responseText);


                    // Armazena o ID no campo oculto para usá-lo na função salvarEdicao
                    document.getElementById("edit-idd").value = usuario.id;

                    // Preenche os campos do modal

                    document.getElementById("edit-nome").value = usuario.nome;
                    document.getElementById("edit-email").value = usuario.email;
                    document.getElementById("edit-senha").value = usuario.senha;
                    document.getElementById("edit-telefone").value = usuario.telefone;
                    document.getElementById("edit-dataNascimento").value = usuario.dataNascimento;
                    document.getElementById("edit-status").value = barbeiro.statusBarbeiro;
                    document.getElementById("edit-horarioinicial").value = barbeiro.parametrosAgenda.horarioInicial;
                    document.getElementById("edit-horariofinal").value = barbeiro.parametrosAgenda.horarioFinal;

                    // Seleciona os serviços
                    let servicoSelect = document.getElementById("edit-servico");
                    Array.from(servicoSelect.options).forEach(option => {
                        option.selected = barbeiro.servico.includes(option.value);
                    });

                    // Marca os checkboxes dos dias da semana
                    const diasSemana = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
                    diasSemana.forEach(function (dia) {
                        const checkbox = document.getElementById(`edit-${dia}`);
                        if (checkbox) {
                            checkbox.checked = barbeiro.parametrosAgenda.diasDisponiveis.includes(dia.charAt(0).toUpperCase() + dia.slice(1));
                        }
                    });

                    abrirModal(); // Exibe o modal de edição
                }
            };
            requisicaoUsuario.send();
        }
    };
    requisicaoBarbeiro.send();


}


function salvarEdicao() {
    console.log("Função salvarEdicao chamada");

    const id = document.getElementById("edit-idd").value; // Certifique-se de que o ID seja uma string

    console.log("ID recuperado:", `${id}`); // Adicione esta linha
    console.log(id);

    if (!id) {
        console.error("ID não definido para salvar edição");
        return;
    }
    const nome = document.getElementById("edit-nome").value;
    const email = document.getElementById("edit-email").value;
    const telefone = document.getElementById("edit-telefone").value;
    const dataNascimento = document.getElementById("edit-dataNascimento").value;
    const status = document.getElementById("edit-status").value === "true"; // Converte para booleano
    const horarioInicial = document.getElementById("edit-horarioinicial").value;
    const horarioFinal = document.getElementById("edit-horariofinal").value;

    // Capturar os serviços selecionados
    const servicoSelect = document.getElementById("edit-servico");
    const servicos = Array.from(servicoSelect.options)
        .filter(option => option.selected)
        .map(option => option.value);

    // Capturar os dias da semana selecionados
    const diasDisponiveis = [];
    ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"].forEach(dia => {
        const checkbox = document.getElementById(`edit-${dia}`);
        if (checkbox && checkbox.checked) {
            diasDisponiveis.push(dia.charAt(0).toUpperCase() + dia.slice(1));
        }
    });

    // Objeto com os dados do usuário atualizado
    const usuarioAtualizado = {
        id: id,
        nome: nome,
        email: email,
        telefone: telefone,
        dataNascimento: dataNascimento
    };

    // Objeto com os dados do barbeiro atualizado
    const barbeiroAtualizado = {
        id: id,
        servico: servicos,
        statusBarbeiro: status,
        parametrosAgenda: {
            diasDisponiveis: diasDisponiveis,
            horarioInicial: horarioInicial,
            horarioFinal: horarioFinal
        }
    };

    // Requisição PATCH para atualizar o usuário
    const requisicaoUsuario = new XMLHttpRequest();
    requisicaoUsuario.open('PATCH', `${urlUsuario}/${id}`, true); // Usa PATCH em vez de PUT
    requisicaoUsuario.setRequestHeader("Content-Type", "application/json");
    requisicaoUsuario.onload = function () {
        if (requisicaoUsuario.status === 200) {
            // Requisição PATCH para atualizar o barbeiro após sucesso no usuário
            const requisicaoBarbeiro = new XMLHttpRequest();
            requisicaoBarbeiro.open('PATCH', `${urlBarbeiro}/${id}`, true);
            requisicaoBarbeiro.setRequestHeader("Content-Type", "application/json");
            requisicaoBarbeiro.onload = function () {
                if (requisicaoBarbeiro.status === 200) {
                    alert("Dados atualizados com sucesso!");
                    fecharModal(); // Fecha o modal após a edição
                    getdata(); // Recarrega a lista para refletir as atualizações
                } else {
                    alert("Erro ao atualizar dados do barbeiro.");
                    console.error("Erro:", requisicaoBarbeiro.responseText);
                }
            };
            requisicaoBarbeiro.onerror = function () {
                alert("Erro ao atualizar dados do barbeiro.");
            };
            requisicaoBarbeiro.send(JSON.stringify(barbeiroAtualizado));
        } else {
            alert("Erro ao atualizar dados do usuário.");
            console.error("Erro:", requisicaoUsuario.responseText);
        }
    };
    requisicaoUsuario.onerror = function () {
        alert("Erro ao atualizar dados do usuário.");
    };
    requisicaoUsuario.send(JSON.stringify(usuarioAtualizado));
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

