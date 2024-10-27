var url1 = 'http://localhost:3000/usuarios'; // Rota para usuarios
var url2 = 'http://localhost:3000/barbeiros'; // Rota para barbeiros

document.addEventListener('DOMContentLoaded', function() {
    getdata(); // Chama a função assim que o DOM estiver carregado
});

document.getElementById('salvar-barbeiro').addEventListener('click', function(event) {
    event.preventDefault();

    createItem();
});




// Função para consultar os itens
function getdata() {
    var requisicao = new XMLHttpRequest();
    requisicao.open('GET', url2, true);
    requisicao.onload = function() {
        if (requisicao.status == 200) {
            var dados = JSON.parse(requisicao.responseText);
            var saida = '';
            for (var i = 0; i < dados.length; i++) {
                saida += `<tr>  
                    <td>${dados[i].nome} </td>
                    <td>${dados[i].servico } </td>
                    <td>${dados[i].statusBarbeiro} </td>
                    <td><button class="editar">Editar</button></td>
                </tr>`;
            }
            document.getElementById('listar-barbeiros-cadastrados').innerHTML = saida;
        }
    };
    requisicao.send();


            // <tr>
            //   <td>BARBEIRO 01 </td>
            //   <td>Corte de Cabelo, Corte Infantil, Barba c/ Navalha</td>
            //   <td>Ativo</td>
            //   <td><button class="editar">Editar</button></td>
            // </tr>

    
}

// Função para criar um item

function createItem() {

     // Capturar os dados dos campos do formulário
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const confirmarEmail = document.getElementById("confirmarEmail").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const telefone = document.getElementById("telefone").value;

    // Verificação simples de senha e email

    if (email !== confirmarEmail){
        alert("Os e-mails não coincidem!");
        return;
    }
    if (senha !== confirmarSenha){
        alert("As senhas não coincidem!");
        return;
    }

    // Capturar os serviços selecionados

    const servicoSelect = document.getElementById("servico-cad-barbeiro");
    const servicos = [];
    for(let i = 0; i < servicoSelect.options.length; i++ ){
        if(servicoSelect.options[i].selected){
            servicos.push(servicoSelect.options[i].value);
        }
    }

    // Capturar os dias da semana selecionados
    const diasDisponiveis =[];
    const diasSemana = ["domingo","segunda","terça","quarta","quinta","sexta","sabado"];
    diasSemana.forEach(function(dia){
        const checkbox = document.getElementById(dia);
        if(checkbox && checkbox.checked){
            diasDisponiveis.push(dia.charAt(0).toUpperCase() + dia.slice(1));
        }
    })


// Capturar os horários disponíveis
// const horariosDisponiveis = [];
// const horariosCheckboxes = document.querySelectorAll("#horarios-disponiveis input[type='checkbox']");
// horariosCheckboxes.forEach(checkbox => {
//   if (checkbox.checked) {
//     const horarioLabel = checkbox.nextElementSibling.textContent.trim(); // Pega o horário do label
//     horariosDisponiveis.push(horarioLabel);
//   }
// });

const horarioInicial = document.getElementById("horarioinicial").value;
const horarioFinal = document.getElementById("horariofinal").value;

// Criar o objeto barbeiro
// var ultimoid = 0 



// var requisicao = new XMLHttpRequest();
//     requisicao.open('GET', url1, true);
//     requisicao.onload = function() {
//         if (requisicao.status == 200) {
//             var dados1 = JSON.parse(requisicao.responseText);
//             const id = dados1.length + 1;};}

const usuario = {
    // id: id,
    nome: nome,
    email: email,
    senha: senha,
    telefone: telefone,
    tipousuario: "barbeiro"
  };

// Conversão para JSON
const jsonData1 = JSON.stringify(usuario);  
//Inserindo usuario

// Criar e configurar o XMLHttpRequest para usuario

const xhr1 = new XMLHttpRequest();
xhr1.open("POST", "http://localhost:3000/usuarios", true);
xhr1.setRequestHeader("Content-Type", "application/json");



// Função de callback para quando a requisição for completada para barbeiro
xhr1.onreadystatechange = function () {
  if (xhr1.readyState === 4) {
    if (xhr1.status === 201) {
      alert("Barbeiro cadastrado com sucesso!");
      console.log("Resposta do servidor:", xhr1.responseText);
      const idGerado = resposta.id; // Captura o ID gerado
      console.log("Resposta do servidor:${}", xhr1.responseText);
    } else {
      console.error("Erro ao cadastrar barbeiro:", xhr1.responseText);
      alert("Erro ao cadastrar barbeiro!");
    }
  }
};

// Enviar os dados
xhr1.send(jsonData1);



const barbeiro = {
  id: idGerado,  
  servico: servicos,
  tipousuario: "barbeiro",
  statusBarbeiro: "true",
  parametrosAgenda: {
    diasDisponiveis: diasDisponiveis,
    horarioInicial: horarioInicial,
    horarioFinal: horarioFinal

  }
};

// Conversão para JSON
// const jsonData1 = JSON.stringify(usuario);
const jsonData2 = JSON.stringify(barbeiro);




// Criar e configurar o XMLHttpRequest para barbeiro
const xhr2 = new XMLHttpRequest();
xhr2.open("POST", "http://localhost:3000/barbeiros", true);
xhr2.setRequestHeader("Content-Type", "application/json");

// Função de callback para quando a requisição de barbeiro for completada

xhr2.onreadystatechange = function () {
    if (xhr2.readyState === 4) {
      if (xhr2.status === 201) {
        alert("Barbeiro cadastrado com sucesso!");
        console.log("Resposta do servidor:", xhr2.responseText);
      } else {
        console.error("Erro ao cadastrar barbeiro:", xhr2.responseText);
        alert("Erro ao cadastrar barbeiro!");
      }
    }
  };
  

// Enviar os dados
xhr2.send(jsonData2);


}
//


    ////





// {  var requisicao = new XMLHttpRequest();
//     requisicao.open('POST', url, true);
//     requisicao.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
//     var novoBarbeiro = {
//         name: "Novo Barbeiro",
//         email: "novo@barbeiro.com"
//     };
    
//     requisicao.onload = function() {
//         if (requisicao.status == 201) {
//             alert('Barbeiro criado com sucesso!');
//             getdata(); // Atualiza a lista de barbeiros
//         }
//     };
    
//     requisicao.send(JSON.stringify(novoBarbeiro));
// }

// Função para atualizar um item
function updateItem() {
    var id = prompt("Informe o ID do barbeiro que deseja atualizar:");
    var requisicao = new XMLHttpRequest();
    requisicao.open('PUT', `${url}/${id}`, true);
    requisicao.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    
    var barbeiroAtualizado = {
        name: "Barbeiro Atualizado",
        email: "atualizado@barbeiro.com"
    };
    
    requisicao.onload = function() {
        if (requisicao.status == 200) {
            alert('Barbeiro atualizado com sucesso!');
            getdata(); // Atualiza a lista de barbeiros
        }
    };
    
    requisicao.send(JSON.stringify(barbeiroAtualizado));
}

// Função para deletar um item
function deleteItem() {
    var id = prompt("Informe o ID do barbeiro que deseja deletar:");
    var requisicao = new XMLHttpRequest();
    requisicao.open('DELETE', `${url}/${id}`, true);
    
    requisicao.onload = function() {
        if (requisicao.status == 200) {
            alert('Barbeiro deletado com sucesso!');
            getdata(); // Atualiza a lista de barbeiros
        }
    };
    
    requisicao.send();
}
