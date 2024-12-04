// Definição das URLs
var urlUsuarios = 'http://localhost:3000/usuarios'; // Rota para usuários
var urlBarbeiro = 'http://localhost:3000/barbeiros'; // Rota para barbeiros
var urlAgendamento = 'http://localhost:3000/agendamento'; // Rota para agendamentos
var urlServicos = 'http://localhost:3000/servicos'; // Rota para serviços


document.getElementById('efetuar-login').addEventListener('click', function (event) {
  event.preventDefault();

  fazerLogin();
});

document.getElementById('salvar-cliente').addEventListener('click', function (event) {
  event.preventDefault();

  createUser();
});




function fazerLogin(){
  // Obtenha os valores dos campos de entrada
  const email = document.getElementById('exampleDropdownFormEmail1').value;
  const senha = document.getElementById('exampleDropdownFormPassword1').value;

  // Configuração do XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('GET', urlUsuarios, true); // Substitua pela URL correta do seu JSON Server

  xhr.onload = function () {
    if (xhr.status === 200) {
      const usuarios = JSON.parse(xhr.responseText);

      // Validação do email e senha
      const usuario = usuarios.find(user => user.email === email && user.senha === senha);

      if (usuario) {
         // Salvar o ID e tipo de usuário no localStorage
         localStorage.setItem('usuarioLogado', JSON.stringify({
          id: usuario.id,
          nome: usuario.nome,
          tipousuario: usuario.tipousuario
        }));
        // Redirecionamento com base no tipo de usuário
        switch (usuario.tipousuario) {
          case 'administrador':
            window.location.href = 'adm_barbeiro.html';
            // alert('Login realizado com sucesso!');
            break;
          case 'cliente':
            window.location.href = 'cliente_agendar.html';
            break;
          case 'barbeiro':
            window.location.href = 'barbeiro-agenda.html';
            break;
          default:
            alert('Tipo de usuário inválido!');
        }
      } else {
        alert('Email ou senha inválidos!');
      }
    } else {
      alert('Erro ao acessar os dados do servidor.');
      console.error('Erro:', xhr.statusText);
    }
  };

  xhr.onerror = function () {
    alert('Erro ao conectar-se ao servidor.');
  };

  // Envia a requisição
  xhr.send();
};


function createUser() {
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
      requisicao.open('GET', `${urlUsuarios}?email=${email}`, true); // Faz uma consulta para verificar o e-mail
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

      // Criar o objeto usuário
      const usuario = {
          nome: nome,
          email: email,
          senha: senha,
          telefone: telefone,
          dataNascimento: dataNascimento,
          tipousuario:"cliente"
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

                  
              } else {
                  console.error("Erro ao cadastrar usuário:", xhr1.responseText);
                  alert("Erro ao cadastrar usuário!");
              }
          }
      };

      xhr1.send(jsonData1);
  });
}