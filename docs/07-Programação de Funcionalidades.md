# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.

O professor Rommel Carneiro apresenta alguns exemplos prontos para serem utilizados como referência:
- Login do sistema: [https://repl.it/@rommelpuc/LoginApp](https://repl.it/@rommelpuc/LoginApp) 
- Cadastro de Contatos: [https://repl.it/@rommelpuc/Cadastro-de-Contatos](https://repl.it/@rommelpuc/Cadastro-de-Contatos)


> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)

## Exemplo

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-001| O cliente deve ser capaz de realizar o cadastro no sistema | Murilo | cadastro_cliente.html |
|RF-002| O administrador da barbearia deve cadastrar os dados do estabelecimento | João | adm_unidade.html |
|RF-003| O administrador deve cadastrar os barbeiros | Bruno | adm_barbeiro.html |
|RF-004| O sistema deve autenticar o usuário de acordo com seu perfil. | Hugo | index.html |
|RF-005| Deve haver uma agenda dos dias e horários disponíveis na tela do cliente | Israel | cliente-agendar.html |
|RF-006| O cliente deve ser capaz de agendar um atendimento | Israel | cliente-agendar.html |
|RF-007| O sistema deve redirecionar cliente e barbeiro para telas diferentes | Hugo | index.html |
|RF-008| O barbeiro pode ser capaz de bloquear horários livres em sua agenda. | Katiuscia | barbeiro_agenda.html |
|RF-009| O Barbeiro deve ser capaz de finalizar um atendimento, para que seja possível iniciar o próximo atendimento | Katiuscia | barbeiro_agenda.html |
|RF-010| Deve haver uma visualização detalhada do atendimento, sendo acessível tanto por cliente quanto para o Barbeiro e Administrador | Bruno/ Israel | adm_agenda_atendimento.html / cliente-historico.html  |
|RF-011| O Barbeiro deve ser capaz de cancelar um agendamento ainda não confirmado | Katiuscia | barbeiro_agenda.html |
|RF-012| O cliente deve ser capaz de excluir um agendamento que foi cadastrado por ele, antes de um determinado prazo e antes da confirmação | Israel | cliente_agendar.html |
|RF-013| O barbeiro deve ser capaz de ver os agendamentos realizados pelos clientes, sendo possível visualizar se já foi confirmado ou não | Katiuscia | barbeiro_agenda.html |
|RF-014| Deve haver um histórico de atendimentos que já foram finalizados, podendo ser visualizado tanto por parte do barbeiro quanto por parte do cliente | João/ Murilo/ Israel | hist_atend.html / barbeiro_hist_atendimento. html / cliente-historico.html |
|RF-015| Apurar os serviços realizados pelo barbeiro | Bruno | adm_agenda_atendimento.html |
|RF-016| O administrador deve cadastrar os serviços | Katiuscia | adm_servico.html |

## Descrição das estruturas:

## Usuários
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id | Numero (Inteiro) | Identificador único da usuario | 1 |
| Nome | Texto | Nome do usuário | Barbeiro Administrador |
|Email|Texto|E-mail do usuário|adm@adm.com.br|
|Senha|Texto|Senha do usuário|adm@12345|
|Telefone|Texto|Telefone do usuário|31971448208|
|Tipo Usuário|Texto|Tipo de usuário|administrador|

## Barbeiro
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
|Id|Numero (Inteiro)|Identificador único da Barbeiro|1|
|Status do Barbeiro|Texto|Se o Barbeiro esta ativo ou não|ativo|
|Serviço|Texto|Serviços que o Barbeiro presta.|Corte de Cabelo, Corte Infantil, Barba c/ Navalha|
|Parâmetros Agenda - dias da semana |Texto|Dias da semana que o Barbeiro presta os serviços|Segunda, Terça, Quarta, Quinta, Sexta|
|Parâmetros Agenda - horário inicio |Texto|Horário que o Barbeiro inicia a prestação dos serviços | 08:00 |
|Parâmetros Agenda - horário fim |Texto|Horário que o Barbeiro finaliza a prestação dos serviços | 09:00 |

## Unidades
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
|Id|Numero (Inteiro)|Identificador único da Unidade|1|
|Nome|Texto|Nome do Unidade|Corte de Cabelo|UNIDADE BURITIS|
|Endereço|Texto|Endereço da Unidade|Av. Professor Mário Werneck 2501, Belo horizonte|
|Telefone|Texto|Telefone da Unidade| 3133112925|
|Email|Texto|Email da Unidade|unidadeburitis@barbearia.com|

## Serviços
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
|Id|Numero (Inteiro)|Identificador único do serviço|1|
|Nome|Texto|Nome do Serviço|Corte de Cabelo|
|Valor|Texto|Valor do Serviço|R$ 45,00|
|Tempo|Time|Tempo Total para realizar o Serviço|00:50|

## Agendamento
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
|Id|Numero (Inteiro)|Identificador único da Agenda|1|
|ID Barbeiro|NUMERICO|Identificador único do Barbeiro|1|
|ID CLIENTE|NUMERICO|Identificador único do Cliente|1|
|DATA|DATE|dia do agendamento |01/10/2024|
|HORARIO DE INICIO |TIME|horario inicio do agendamento|08:00|
|HORARIO DE FIM|TIME|horario fim do agendamento|08:45|
|ID SERVIÇO|NUMERICO|Identificador único do serviço|1|
|STATUS|TEXTO|Status do agendamento, se o horário da agenda esta Livre, Agendado, Confirnado|Agendado|
