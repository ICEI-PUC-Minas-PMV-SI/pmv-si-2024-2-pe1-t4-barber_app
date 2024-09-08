# Especificações do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Documentação de Contexto.md"> Documentação de Contexto</a></span>

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar as especificações do projeto.

## Personas

Clientes

João tem 20 anos é um jovem estudante da Geração Z que valoriza a eficiência e a rapidez nas interações digitais. Ele corta o cabelo a cada duas semanas ou pelo menos todo mês, como os adolescentes de sua idade e prefere serviços que ofereçam agilidade. Impaciente, ele desiste dos serviços quando não recebe respostas imediatas e/ou encontra dificuldades para agendar os serviços de seu barbeiro, pois está acostumado com a velocidade . Para ele, o agendamento online é essencial, permitindo que ele escolha horários rapidamente e receba confirmações instantâneas. busca agendar cortes de cabelo de maneira rápida e fácil, sem precisar esperar respostas ou fazer ligações. Fica frustrações quanto ao tempo de espera para respostas, e a falta de integração digital no agendamento de serviços.

Carlos tem 37 anos, é executivo de uma empresa tendo uma carreira exigente, o que deixa seu tempo extremamente limitado. Manter uma aparência impecável é importante para sua profissão, mas ele enfrenta dificuldades para encontrar horários convenientes para ir ao barbeiro. Ele valoriza serviços que lhe permitam otimizar seu tempo, como agendamentos online que se encaixam facilmente em sua agenda apertada. Sempre procura manter uma aparência profissional sem comprometer seu tempo de trabalho. Fica frustrado quando tem dificuldade em encontrar horários disponíveis, ou perda de tempo com processos de agendamento.

Barbeiros

Lucas tem 28 anos é um jovem barbeiro que recentemente abriu sua própria barbearia. Ele está no início de sua jornada como microempreendedor e busca maneiras de atrair mais clientes e administrar seu negócio com eficiência. Embora tenha habilidades técnicas sólidas, Lucas ainda está se familiarizando com as ferramentas digitais que podem ajudar na gestão de sua barbearia. Tem como objetivos crescer seu negócio, atrair novos clientes, e facilitar a gestão do atendimento. Fica frustrado quando encontra ao gerenciar agendamentos manualmente.

Pedro tem 38 anos, é um barbeiro experiente que possui uma barbearia há alguns anos. Ele ainda não conseguiu expandir seu negócio como gostaria e enfrenta desafios para aumentar sua base de clientes. Pedro reconhece a importância da tecnologia na expansão de seu negócio, mas ainda depende de métodos tradicionais para gerenciar agendamentos e interagir com seus clientes. Seus objetivos são expandir seu negócio, automatizar processos e aumentar sua eficiência operacional. Fica frustrado em realizar a gestão manual de agendamentos.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Barbeiro  | Preciso acompanhar minha agenda de atendimentos           |Para que o barbeiro possa verificar com recorrência os horários para atendimento.             |
|Barbeiro       | Preciso bloquear horários em minha agenda            | Para que o barbeiro consiga bloquerar sua agenda quando necessário. |
|Barbeiro  |Preciso que seja enviado uma notificação solicitando confirmação para o cliente           | Para que o barbeiro possa acompanhar quais horário estão de fato confirmados ou não.             |
|Barbeiro       |Preciso cancelar um agendamento não confirmado               | Para que o barbeiro consiga cancelar um atendimento não confirmado. |
|Barbearia  | Preciso realizar o cadastro dos barbeiros        | Para poder cadastrar os profissionais que prestão serviço na barbearia.              |
|Barbearia       | Preciso cadastrar serviços disponíveis na barbearia                 | Para poder gerenciar e atualizar os serviços disponiveis aos clientes. |
|Barbearia | Preciso acompanhar os agendas dos profisssionais           | Para poder acompanhar o desempenho de cada profissional e a dinamica de atendimento da barberia como um todo.               |
|Cliente       | Preciso consultar os horários disponíveis nas agendas                | Para que o cliente tenha a liberdade de escolher o melhor dia e horário |
|Cliente  | Preciso consultar meu histórico de atendimentos           | Para que o cliente consiga consultar seu último atendimento e se programar para um novo agendamento               |
|Cliente       | Preciso consultar meu horário de agendamento                 | Pare que o cliente acompanhe com certa recorrência o horário agendado |
|Cliente  | Preciso ser notificado às vésperas do dia/ horário agendado          | Para que o cliente possa confirmar o agendamento e não esquecer de comparacer a barbearia              |
|Cliente       | Preciso agendar serviço na barbearia                 | Para que o cliente consiga efetuar agendamento no dia de preferencia conforme os horários disponiveis |




> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O cliente deve ser capaz de realizar o cadastro no sistema.   | ALTA |
|RF-002| O administrador da barbearia deve cadastrar os dados do estabelecimento.   | ALTA |
|RF-003| O administrador deve cadastrar os barbeiros. | ALTA |
|RF-004| O sistema deve autenticar o usuário de acordo com seu perfil | ALTA | 
|RF-005| Deve haver uma agenda dos dias e horários disponíveis na tela do cliente   | ALTA |
|RF-006| O cliente deve ser capaz de agendar um atendimento | MÉDIA | 
|RF-007| O sistema deve redirecionar cliente e barbeiro para telas diferentes   | MÉDIA |
|RF-008| O barbeiro pode ser capaz de bloquear horários livres em sua agenda. | MÉDIA | 
|RF-009| O Barbeiro deve ser capaz de finalizar um atendimento, para que seja possível iniciar o próximo atendimento  | MÉDIA |
|RF-010| Deve haver uma visualização detalhada do atendimento, sendo acessível tanto por cliente quanto para o Barbeiro   | MÉDIA |
|RF-011| O Barbeiro deve ser capaz de cancelar um agendamento ainda não confirmado | MÉDIA | 
|RF-012| O cliente deve ser capaz de excluir um agendamento que foi cadastrado por ele, antes de um determinado prazo e antes da confirmação   | BAIXA |
|RF-013| O barbeiro deve ser capaz de ver os agendamentos realizados pelos clientes, sendo possível visualizar se já foi confirmado ou não. | BAIXA | 
|RF-014| Deve haver um histórico de atendimentos que já foram finalizados, podendo ser visualizado tanto por parte do barbeiro quanto por parte do cliente.   | BAIXA |
|RF-015| Apurar os serviços realizados pelo barbeiro   | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Será utilizado JSON-server | ALTA | 
|RNF-002| A interface do sistema deve ser elaborada de forma amigável e convidativa, utilizando uma estética atraente de elementos visuais, promovendo um design limpo, descomplicado, que facilite a navegação e priorize sempre a funcionalidade do sistema. |  ALTA | 
|RNF-003| Deve ser gerado um id único para cada usuário cadastrado | ALTA | 
|RNF-004| As senhas dos usuários devem ser criptografadas em crypto | ALTA | 
|RNF-005| O tempo para acesso da plataforma não deve superar 3 segundos | MEDIA | 
|RNF-006| O sistema deve ser responsivo, atendendo tanto a dispositivos móveis quanto a telas maiores | BAIXA | 


Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
