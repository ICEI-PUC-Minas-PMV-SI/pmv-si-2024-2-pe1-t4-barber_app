# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.



**Caso de Teste** | **CT01 - Primeiro Acesso HomePage parte 1**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br>2) Navegue pela navbar, onde contém todas as sections com serviços e informações da barbearia<br>3) Clique no canto superior direito para preencher os dados no formulario e efetuar login<br> 
**Requisitos associados** | RF-007
**Resultado esperado** | Usuário conectado
**Dados de entrada** | Preenchimento de dados cadastrados no formulário de login
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Primeiro Acesso HomePage parte 2**
 :--------------: | ------------
**Procedimento**  | 1)  Clique no canto superior direito para preencher os dados no formulario e efetuar login<br>2) Clique no canto superior direito, após o login e efetue o logout<br> 
**Requisitos associados** | RF-007
**Resultado esperado** | Usuário desconectado
**Dados de entrada** | Pressionar o botão sair no modal
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Cadastrar Usuário Cliente
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://index.html](https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no ícone no canto superior direito. Após isso, abrirá uma tela de login. Clique em "Cadastre-se"  <br> 3) Preencha todos os campos do formulário. <br> 4) Clique no botão "salvar".
**Requisitos associados** | RF-001
**Resultado esperado** | Confirmação do cadastro do usuário no sistema.
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Cadastrar Unidade parte 1**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no icone de usuário <br> 2) Insira e-mail e senha administrador <br> 3) Clique no botão "entrar".
**Requisitos associados** | RF-002
**Resultado esperado** | Prosseguir para a parte 2 do cadastro
**Dados de entrada** | Inserção de dados válidos no formulário de login
**Resultado obtido** | Sucesso


**Caso de Teste** | **CT00 - Cadastrar Unidade parte 2**
 :--------------: | ------------
**Procedimento**  | 1) Após efetuar login clicar no botão "UNIDADES" na Navbar <br> 2)Clicar no botão "Cadastrar Novos" após a lista de unidades cadastradas <br> 3) Preencha todos os campos do formulário <br> 4) Clique no botão "Salvar".
**Requisitos associados** | RF-002
**Resultado esperado** | Unidade cadastrada
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso


**Caso de Teste** | **CT00 - Editar Unidade**
 :--------------: | ------------
**Procedimento**  | 1) Na lista de Unidades clicar no Botão "Editar" <br> 2) Dados da unidade serão carregados no formulário podendo ser alterados <br> 3) Clique no botão "Salvar".
**Requisitos associados** | RF-002
**Resultado esperado** | Dados da Unidade Editados
**Dados de entrada** | Inserção de dados válidos no formulário de edição
**Resultado obtido** | Sucesso


**Caso de Teste** | **CT00 - Cadastrar Usuário Barbeiro parte 1**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no icone de usuário com uma conta administrador <br> 2) Insira e-mail e senha <br> 3) Clique no botão "entrar".
**Requisitos associados** | RF-003
**Resultado esperado** | Prosseguir para a parte 2 do cadastro
**Dados de entrada** | Inserção de dados válidos no formulário de login
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Cadastrar Usuário Barbeiro parte 2**
 :--------------: | ------------
**Procedimento**  | 1) Após efetuar login clicar no botão "Cadastrar Novos" na lista de Barbeiros Cadastrados <br> 2) Preencha todos os campos do formulário <br> 3) Clique no botão "Salvar".
**Requisitos associados** | RF-003
**Resultado esperado** | Barbeiro e agenda cadastrados
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Editar Usuário Barbeiro**
 :--------------: | ------------
**Procedimento**  | 1) Na lista de Barbeiros Cadastrados clicar no Botão "Editar" <br> 2) Dados do cadastro serão carregados no formulário podendo ser alterados <br> 3) Clique no botão "Salvar".
**Requisitos associados** | RF-003
**Resultado esperado** | Dados do Barbeiro agenda atendimento Editados
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Cliente - Realizar agendamento**
 :--------------: | ------------
**Procedimento**  | 1) Acessar o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no icone de usuario e faça login ou crie uma conta <br> 3) Selecione o barbeiro, o serviço e a data e clique em Buscar. <br> 4) Na lista de horários disponíveis, selecione o desejado e clique em Incluir Atendimento.
**Requisitos associados** | RF-006 e RF-007
**Resultado esperado** | Realizar agendamento.
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Acesso Usuário Barbeiro**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no icone de usuário com uma conta barbeiro <br> 2) Insira e-mail e senha <br> 3) Clique no botão "entrar".
**Requisitos associados** | RF-008
**Resultado esperado** | Prosseguir para a agenda do barbeiro
**Dados de entrada** | Inserção de dados válidos no formulário de login
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Efetuar Bloqueio de Agenda do Barbeiro**
 :--------------: | ------------
**Procedimento**  | 1) Selecionar data e clicar no botão "Buscar" para carregar agenda do barbeiro. <br> 2) Clicar no checkbox do respectivo horário e em seguida clicar no botão "Bloquear Atendimento"na agenda do barbeiro.  
**Requisitos associados** | RF-008
**Resultado esperado** |Bloquear horários livres na agenda do barbeiro. 
**Dados de entrada** | Inserção e seleção de dados válidos
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Barbeiro Concluir Atendimento**
  :--------------: | ------------
**Procedimento**  | 1) Selecionar data e clicar no botão "Buscar" para carregar agenda do barbeiro. <br> 2) Clicar no checkbox do respectivo horário e em seguida clicar no botão "Concluir Atendimento"na agenda do barbeiro.  
**Requisitos associados** | RF-009
**Resultado esperado** | Concluir atendimento de horário na agenda do barbeiro. 
**Dados de entrada** | Inserção e seleção de dados válidos
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - O Administrador pode acompanhar a agenda dos barbeiros**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no icone de usuário com uma conta administrador <br> 2) Insira e-mail e senha <br> 3) Clique no botão "entrar".
**Requisitos associados** | RF-010
**Resultado esperado** | Prosseguir para a parte 2
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - O Administrador pode acompanhar a agenda dos barbeiros parte 02**
 :--------------: | ------------
**Procedimento**  | 1) Após efetuar login com acesso administrador clicar em "Atendimentos" na NavBar <br> 2) Preencha selecionar barbeiro e data <br> 3) Clique no botão "Buscar" <br>
**Requisitos associados** | RF-010
**Resultado esperado** | Acompanhar a agenda de atendimento de um barbeiro
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Efetuar Cancelamento de Bloqueio de Agendamento**
 :--------------: | ------------
**Procedimento**  | 1) Selecionar data e clicar no botão "Buscar" para carregar agenda do barbeiro. <br> 2) Clicar no checkbox do respectivo horário e em seguida clicar no botão "Cancelar Bloqueio/Agendamento"na agenda do barbeiro.  
**Requisitos associados** | RF-011
**Resultado esperado** |Cancelar horarios bloqueados pelo barbeiro. 
**Dados de entrada** | Inserção e seleção de dados válidos
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Cliente - Cancelar agendamento**
 :--------------: | ------------
**Procedimento**  | 1) Acessar o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no icone de usuario e faça login ou crie uma conta <br> 3) Selecione o barbeiro, o serviço e a data e clique em Buscar. <br> 4) Na lista de horários disponíveis, selecione o desejado e clique em Cancelar Atendimento.
**Requisitos associados** | RF-007 e RF-012
**Resultado esperado** | Realizar Cancelamento de um agendamento.
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Barbeiro Incluir Agendamento**
  :--------------: | ------------
**Procedimento**  | 1) Selecionar data e clicar no botão "Buscar" para carregar agenda do barbeiro. <br> 2) Clicar no checkbox do respectivo horário e em seguida clicar no botão "Incluir Atendimento"na agenda do barbeiro.  
**Requisitos associados** | RF-013
**Resultado esperado** | Incluir atendimento de horário na agenda do barbeiro. 
**Dados de entrada** | Inserção e seleção de dados válidos
**Resultado obtido** | Sucesso

Caso de Teste | CT00 - O Administrador pode acompanhar o histórico de atendimentos
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no icone de usuário com uma conta administrador <br> 2) Insira e-mail e senha administrador <br> 3) Clique no botão "entrar".
**Requisitos associados** | RF-014
**Resultado esperado** | Prosseguir para a parte 2
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso


Caso de Teste | CT00 - O Administrador pode acompanhar o histórico de atendimentos parte 02
 :--------------: | ------------
**Procedimento**  | 1) Após efetuar login, clicar em "Atendimentos" na NavBar <br> 2) Clicar no botão "Histórico de atendimentos <br> 3) Selecionar o barbeiro, inserir data inicial e final, selecionar opção "Concluídos" e "Não concluídos" <br> 4) Clique no botão "Buscar" <br>
**Requisitos associados** | RF-014
**Resultado esperado** | Histórico de atendimento
**Dados de entrada** | Inserção de dados válidos no formulário de pesquisa
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - O Barbeiro pode acompanhar o histórico de atendimentos parte 01
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no icone de usuário com uma Conta administrador <br> 3) Autentique o login do barbeiro  <br> 4) Clique no botão "entrar".
**Requisitos associados** | RF-014
**Resultado esperado** | Prosseguir para a próxima etapa
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - O Barbeiro pode acompanhar o histórico de atendimentos parte 02
 :--------------: | ------------
**Procedimento**  | 1) Após efetuar o login, o barbeiro deve clicar em "Atendimentos" na NavBar <br> 2) Clicar no botão "Histórico de atendimentos <br> 3) Selecionar data inicial e final e selecionar opção concluídos ou não concluídos <br> 4) Clicar no botão "buscar"
**Requisitos associados** | RF-014
**Resultado esperado** | Histórico de atendimento
**Dados de entrada** | Inserção de dados válidos no formulário de pesquisa
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Cliente - Consultar Histórico de Atendimentos**
 :--------------: | ------------
**Procedimento**  | 1) Acessar o endereço https://projeto-eixo-1-completo-teste-vercel.vercel.app/ <br> 2) Clique no icone de usuario e faça login ou crie uma conta <br> 3) Clicar em Meus atendimentos. <br> 4) Escolher o período desejado e o status dos atendimentos e clicar em Buscar.
**Requisitos associados** | RF-014
**Resultado esperado** | Consultar histórico de agendamentos.
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - HOMEPAGE USABILIDADE, LOGIN, LOGOUT *                                         |
|---|---|
|Requisito Associado | RF-001 - O acesso a Home Page permite o usuario visualizar todos os produtos e serviços prestados pela barbearia |
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/19EbQ2X4hNsfmieFvLKI69v687SPooEnX/view?usp=sharing | 

|*Caso de Teste*                                 |*CT01 - LOGIN USUÁRIO *                                         |
|---|---|
|Requisito Associado | RF-001 - Aplicação deve permitir o cadastro de usuário cliente. |
|Link do vídeo do teste realizado: | https://drive.google.com/drive/folders/1ejaZu4LSPQDPo03S5y8NaR0SpVRBCBLJ?hl=pt-br | 

|*Caso de Teste*                                 |*CT01 - Cadastrar unidades*                                         |
|---|---|
|Requisito Associado | RF-002 - A aplicação deve permitir incluir e editar cadastro de unidades|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1gir3MhZkC229srmIfSoEc-8ULAgJmwH6/view?usp=sharing|

|*Caso de Teste*                                 |*CT01 - Criar cadastro Barbeiro*                                         |
|---|---|
|Requisito Associado | RF-003 - A aplicação deve permitir cadastrar usuários Barbeiro e gerenciar seu cadastro e agenda de atendimento|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1FgbsHgho3eAxNwQjHGMztOIosiVuFDqJ/view?usp=sharing| 

|*Caso de Teste*                                 |*CT01 - Cliente - Realizar Agendamento*                                         |
|---|---|
|Requisito Associado | RF-006, RF-007  - A aplicação deve direcionar o usuário cliente e barbeiro para diferentes telas / O cliente deve ser capaz de realizar um agendamento|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/13uCUS8EPqp6a9ae6s0VQuOs0FSZWdBWd/view?usp=sharing| 

|*Caso de Teste*                                 |*CT01 - Gerênciamento de Agenda pelo Barbeiro*                                         |
|---|---|
|Requisito Associado | RF-008, RF-009, RF-011 e RF-013 - A aplicação deve permitir que o barbeiro realize o bloqueio de horários livres, incluir o agendamento pelo barbeiro, o cancelamento do bloqueio/agendamento barbeiro, bem como concluir os atendimentos realizados|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/12o0H4nqsSsQ3qr-ze1r6_ma7KE4bD9U8/view?usp=sharing| 

|*Caso de Teste*                                 |*CT02 - Acompanhamento da agenda de atendimento dos Barbeiros*           |
|---|---|
|Requisito Associado | RF-010 - A aplicação deve permitir que o usuário Administrador gerencie a agenda de atendimento dos barbeiros|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1xD8S_OlAa3hHLy7Agrt6-lZp5QjWqaWU/view?usp=sharing| 

|*Caso de Teste*                                 |*CT01 - Cliente - Cancelar Agendamento*                                         |
|---|---|
|Requisito Associado | RF-012  - A aplicação deve permitir que o cliente cancele o agendamento|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1Ljd43-7qasEt5UJlQ2zBA2IN0GCiftAl/view?usp=sharing| 

|*Caso de Teste*                                 |*CT02 - Acompanhamento do histórico de atendimento dos barbeiros pelo administrador*           |
|---|---|
|Requisito Associado | RF-014 - A aplicação deve permitir a consulta do histórico de atendimento dos barbeiros|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1SNHIkyaTBeeIfYMAoso39ieb2uLn4pc3/view?usp=drive_link| 

|*Caso de Teste*                                 |*CT02 - Acompanhamento do histórico de atendimento pelo barbeiro*           |
|---|---|
|Requisito Associado | RF-014 - A aplicação deve permitir que o barbeiro consulte o seu histórico de atendimentos. |
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1ZX4yYMfzq0MDqoffHnrcuE_TSZSQ69rg/view?usp=sharing | 

|*Caso de Teste*                                 |*CT01 - Cliente - Consultar Histórico*                                         |
|---|---|
|Requisito Associado | RF-012  - A aplicação deve permitir que o cliente consulte o histórico de agendamentos|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1qDHrIbUKmB_YorP-dvOx6djcqgFRjAB3/view?usp=sharing| 

|*Caso de Teste*                                 |*CT02 - SERVIÇOS CADASTRADOS*                                        |
|---|---|
|Requisito Associado | RF-016 - A aplicação permite com que o usuario da administração registre novos serviços da barbearia e edite |
|Link do vídeo do teste realizado: | https://drive.google.com/drive/folders/1HzX4D1Dx_9xXFrOXJLEkJ4Plg0BfD995?hl=pt-br | 


## Avaliação dos Testes de Software

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja efetuar um agendamento na barbearia. Efetue o cadastro do seu usuário e agende um horário. |
| 2             | Você é uma pessoa que deseja consultar seus atendimentos. Efetue no site a consultas dos seus atendimentos. |
| 3             | Você é o Administrador da Barbearia e deseja cadastrar um Barbeiro. Efetue o login com acesso de Administrador e cadastre um Barbeiro e sua agenda de atendimento. |
| 4             | Você é um Barbeiro e deseja gerencia sua agenda. Efetue em sua agenda de atendimento bloqueio de horário, o cancelamento de horario bloqueiado e também a conclusão de atendimento. |


## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja efetuar um agendamento na barbearia. Efetue o cadastro do seu usuário e agende um horário.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 75.15 segundos                  |
| 2       | SIM             | 4.75                 | 80.01 segundos                  |
| 3       | SIM             | 5                    | 65.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 4.91             | 73.41 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 41.72 segundos |


    Comentários dos usuários: O cadastro e o agendamento foram 
	muito simples de realizar. Gostei que o sistema exibe alertas 
	de confirmação, isso traz mais segurança durante o processo.


Cenário 2: Você é uma pessoa que deseja consultar seus atendimentos. Efetue no site a consultas dos seus atendimentos. 

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 29.22 segundos                          |
| 2       | SIM             | 4.7                  | 35.25 segundos                          |
| 3       | SIM             | 5                    | 27.47 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.9              | 30.64 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 16.12 segundos |


    Comentários dos usuários: A consulta foi rápida e eficiente. 
	A consulta ajuda a garantir que tudo esteja funcionando corretamente. 
	Achei muito organizado.

Cenário 3: Você é o Administrador da Barbearia e deseja cadastrar um Barbeiro. Efetue o login com acesso de Administrador e cadastre um Barbeiro e sua agenda de atendimento.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 75.28 segundos                  |
| 2       | SIM             | 4.85                 | 80.37 segundos                  |
| 3       | SIM             | 5                    | 77.45 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 4.95             | 77.70 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 56.83 segundos |


    Comentários dos usuários: O login e o cadastro do barbeiro foram 
	bem intuitivos. Os alertas de confirmação em cada etapa 
	foram muito úteis e deixam o processo mais confiável.


Cenário 4: Você é um Barbeiro e deseja gerencia sua agenda. Efetue em sua agenda de atendimento bloqueio de horário, o cancelamento de horario bloqueiado e também a conclusão de atendimento

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 4.9                  | 76.95 segundos                          |
| 2       | SIM             | 5                    | 69.35 segundos                          |
| 3       | SIM             | 5                    | 64.37 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.96             | 70.22 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 46.95 segundos |


    Comentários dos usuários: A gestão da agenda 
	funciona muito bem. Os alertas confirmando cada ação foram 
	um diferencial, garantindo clareza e controle sobre os atendimentos.
 


## Avaliação dos Testes de Usabilidade 

Com base nos resultados obtidos, foi possível verificar que a aplicação apresentou excelente desempenho em termos de taxa de sucesso, uma vez que todos os objetivos propostos foram concluídos com sucesso para todos os usuários. Além disso, a satisfação subjetiva dos participantes foi muito alta, com médias variando entre 4,9 e 5 em uma escala de 1 a 5, o que demonstra que a aplicação atendeu bem às expectativas dos usuários.

O sistema foi elogiado pela interface intuitiva e pela organização das funcionalidades, como o cadastro de usuários, agendamento de horários e gestão de agendas. A presença de alertas de confirmação em todas as operações realizadas foi destacada pelos usuários como um diferencial positivo, aumentando a confiança no uso do sistema e proporcionando uma experiência mais segura.

No que diz respeito ao tempo para conclusão das tarefas, observe-se uma discrepância significativa entre os usuários e o especialista. Enquanto o especialista concluiu as tarefas de forma mais ágil, os usuários, ainda que bem-sucedidos, levaram um tempo maior, o que é esperado devido ao maior conhecimento do especialista sobre a interface e as funcionalidades. Apesar disso, os tempos médios registrados pelos usuários estão dentro de uma margem considerada eficiente para o alvo público.

Em resumo, os resultados dos testes de usabilidade indicam que a aplicação atende aos requisitos de funcionalidade e facilidade de uso esperados, proporcionando uma experiência segura. A avaliação positiva reforça que o sistema está bem alinhado às necessidades dos usuários, demonstrando um desempenho consistente e confiável em todos os cenários testados.


