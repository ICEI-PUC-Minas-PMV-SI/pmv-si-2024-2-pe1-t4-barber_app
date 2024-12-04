var url1 = 'http://localhost:3000/unidades'; //Rota unidades
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

document.addEventListener('DOMContentLoaded', function () {
    getdata();
});

document.getElementById('salvar-unidade').addEventListener('click', function (event) {
    event.preventDefault();

    createItem();
});

document.getElementById('edit-salvar-unidade').addEventListener('click', function (event) {
    event.preventDefault();

    salvarEdicao();
});


function getdata() {
    var requisicao = new XMLHttpRequest();
    requisicao.open('GET', url1, true);
    requisicao.onload = function () {
        if (requisicao.status == 200) {
            var dados = JSON.parse(requisicao.responseText);
            var saida = '';
            for (var i = 0; i < dados.length; i++) {
                saida += `<tr>
                    <td>${dados[i].nome} </td>
                    <td>${dados[i].endereco } </td>
                    <td>${dados[i].telefone} </td>
                    <td class="email">${dados[i].email} </td>
                    <td><button id="btn-cad-Unidade" type="button" class="btn-editar-Unidade" data-bs-toggle="modal"
          data-bs-target="#cadastro-edicao-modal" onclick="editarUnidade('${dados[i].id}')"style="background-color: #c79655;">
          Editar
        </button></td>
                </tr>`;
            }
            document.getElementById('lista-unidades-cadastradas').innerHTML = saida;
        }
    };
    requisicao.send();
}

/* <td><button class="editar">Editar</button></td> */

// Função para criar um item

function createItem() {

    // Capturar os dados dos campos do formulário
    const nome = document.getElementById("unidade").value;
    const endereco = document.getElementById("endereco").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
 

    const unidade = {
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        email: email,
    };

    // Conversão para JSON
    const jsonData1 = JSON.stringify(unidade);
    //Inserindo usuario

    // Criar e configurar o XMLHttpRequest para usuario

    const xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "http://localhost:3000/unidades", true);
    xhr1.setRequestHeader("Content-Type", "application/json");


    // Função de callback para quando a requisição for completada para barbeiro
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            if (xhr1.status === 201) {
                alert("Unidade cadastrada com sucesso!");
                console.log("Resposta do servidor:", xhr1.responseText);
                console.log("Resposta do servidor:${}", xhr1.responseText);
            } else {
                console.error("Erro ao cadastrar barbeiro:", xhr1.responseText);
                alert("Erro ao cadastrar barbeiro!");
            }
        }
    };
    // Enviar os dados
    xhr1.send(jsonData1);
}

function editarUnidade(id) {
    
            document.getElementById("edit-idd").value = id;
            var requisicaoUnidade = new XMLHttpRequest();
            requisicaoUnidade.open('GET', `${url1}/${id}`, true);
            requisicaoUnidade.onload = function () {
                if (requisicaoUnidade.status === 200) {
                    var unidade = JSON.parse(requisicaoUnidade.responseText);


                    // Armazena o ID no campo oculto para usá-lo na função salvarEdicao
                    document.getElementById("edit-idd").value = unidade.id;

                    // Preenche os campos do modal

                    document.getElementById("edit-unidade").value = unidade.nome;
                    document.getElementById("edit-endereco").value = unidade.endereco;
                    document.getElementById("edit-telefone").value = unidade.telefone;
                    document.getElementById("edit-email").value = unidade.email;

                    // abrirModal(); // Exibe o modal de edição
                }
            };
            requisicaoUnidade.send();
}


function salvarEdicao() {
    console.log("Função salvarEdicao chamada");

    const id = document.getElementById("edit-idd").value; // Certifique-se de que o ID seja uma string

    console.log("ID recuperado:", `${id}`);
    console.log(id);

    if (!id) {
        console.error("ID não definido para salvar edição");
        return;
    }
    const nome = document.getElementById("edit-unidade").value;
    const endereco = document.getElementById("edit-endereco").value;
    const telefone = document.getElementById("edit-telefone").value;
    const email = document.getElementById("edit-email").value;

    // Objeto com os dados do usuário atualizado
    const unidadeAtualizado = {
        id: id,
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        email: email,
    };
            // Requisição PATCH para atualizar o barbeiro após sucesso no usuário
            const requisicaoUnidade = new XMLHttpRequest();
            requisicaoUnidade.open('PATCH', `${url1}/${id}`, true);
            requisicaoUnidade.setRequestHeader("Content-Type", "application/json");
            requisicaoUnidade.onload = function () {
                if (requisicaoUnidade.status === 200) {
                    alert("Dados atualizados com sucesso!");
                    fecharModal(); // Fecha o modal após a edição
                    getdata(); // Recarrega a lista para refletir as atualizações
                } else {
                    alert("Erro ao atualizar dados do barbeiro.");
                    console.error("Erro:", requisicaoUnidade.responseText);
                }
            };
            requisicaoUnidade.onerror = function () {
                alert("Erro ao atualizar dados do barbeiro.");
            };
            requisicaoUnidade.send(JSON.stringify(unidadeAtualizado));
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


