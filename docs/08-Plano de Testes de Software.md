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


**Caso de Teste** | **CT01 - Criar conta parte 1**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço www.teste.com.br <br> 2) Clique em criar conta <br> 2) Preencha todos os campos do formulário <br> 3) Clique no botão "Continuar".
**Requisitos associados** | RF-001
**Resultado esperado** | Prosseguir para a parte 2 do cadastro
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Criar conta parte 2**
 :--------------: | ------------
**Procedimento**  | 1) Preencha todos os campos do formulário <br> 2) Clique no botão "Criar conta" <br> 
**Requisitos associados** | RF-001
**Resultado esperado** | Usuário cadastrado
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Primeiro Acesso HomePage parte 1**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://index.html <br>2) Navegue pela navbar, onde contém todas as sections com serviços e informações da barbearia<br>3) Clique no canto superior direito para preencher os dados no formulario e efetuar login<br> 
**Requisitos associados** | RF-001
**Resultado esperado** | Usuário conectado
**Dados de entrada** | Preenchimento de dados cadastrados no formulário de login
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 - Primeiro Acesso HomePage parte 2**
 :--------------: | ------------
**Procedimento**  | 1)  Clique no canto superior direito para preencher os dados no formulario e efetuar login<br>2) Clique no canto superior direito, após o login e efetue o logout<br> 
**Requisitos associados** | RF-001
**Resultado esperado** | Usuário desconectado
**Dados de entrada** | Pressionar o botão sair no modal
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Cadastrar Usuário Barbeiro parte 1**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://index.html <br> 2) Clique no icone de usuário com uma conta administrador <br> 2) Insira e-mail e senha <br> 3) Clique no botão "entrar".
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

**Caso de Teste** | **CT00 - Acesso Usuário Barbeiro**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o endereço https://index.html <br> 2) Clique no icone de usuário com uma conta barbeiro <br> 2) Insira e-mail e senha <br> 3) Clique no botão "entrar".
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

**Caso de Teste** | **CT00 - Efetuar Cancelamento de Bloqueio de Agendamento**
 :--------------: | ------------
**Procedimento**  | 1) Selecionar data e clicar no botão "Buscar" para carregar agenda do barbeiro. <br> 2) Clicar no checkbox do respectivo horário e em seguida clicar no botão "Cancelar Bloqueio/Agendamento"na agenda do barbeiro.  
**Requisitos associados** | RF-011
**Resultado esperado** |Cancelar horarios bloqueados pelo barbeiro. 
**Dados de entrada** | Inserção e seleção de dados válidos
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Barbeiro Incluir Agendamento**
  :--------------: | ------------
**Procedimento**  | 1) Selecionar data e clicar no botão "Buscar" para carregar agenda do barbeiro. <br> 2) Clicar no checkbox do respectivo horário e em seguida clicar no botão "Incluir Atendimento"na agenda do barbeiro.  
**Requisitos associados** | RF-013
**Resultado esperado** | Incluir atendimento de horário na agenda do barbeiro. 
**Dados de entrada** | Inserção e seleção de dados válidos
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT00 - Barbeiro Concluir Atendimento**
  :--------------: | ------------
**Procedimento**  | 1) Selecionar data e clicar no botão "Buscar" para carregar agenda do barbeiro. <br> 2) Clicar no checkbox do respectivo horário e em seguida clicar no botão "Concluir Atendimento"na agenda do barbeiro.  
**Requisitos associados** | RF-009
**Resultado esperado** | Concluir atendimento de horário na agenda do barbeiro. 
**Dados de entrada** | Inserção e seleção de dados válidos
**Resultado obtido** | Sucesso

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01 - HOMEPAGE USABILIDADE, LOGIN, LOGOUT *                                         |
|---|---|
|Requisito Associado | RF-001 - O acesso a Home Page permite o usuario visualizar todos os produtos e serviços prestados pela barbearia |
|Link do vídeo do teste realizado: | https://drive.google.com/drive/folders/1ejaZu4LSPQDPo03S5y8NaR0SpVRBCBLJ?hl=pt-br | 

|*Caso de Teste*                                 |*CT02 - SERVIÇOS CADASTRADOS*                                        |
|---|---|
|Requisito Associado | RF-001 - A aplicação permite com que o usuario da administração registre novos serviços da barbearia e edite |
|Link do vídeo do teste realizado: | https://drive.google.com/drive/folders/1HzX4D1Dx_9xXFrOXJLEkJ4Plg0BfD995?hl=pt-br | 

|*Caso de Teste*                                |*CT02 - Criar conta parte 1*                                       |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/v/s!AhD2JqpOUvJChapQ8CPXL-TI_A7iVg?e=spD3Ar | 

|*Caso de Teste*                                 |*CT02 - Criar conta parte 1*                                        |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/v/s!AhD2JqpOUvJChapQ8CPXL-TI_A7iVg?e=spD3Ar | 

|*Caso de Teste*                                 |*CT02 - Criar conta parte 1*                                        |
|---|---|
|Requisito Associado | RF-001 - A aplicação deve permitir que os usuários criem uma conta e gerenciem seu cadastro|
|Link do vídeo do teste realizado: | https://1drv.ms/v/s!AhD2JqpOUvJChapQ8CPXL-TI_A7iVg?e=spD3Ar | 

|*Caso de Teste*                                 |*CT01 - Criar cadastro Barbeiro*                                         |
|---|---|
|Requisito Associado | RF-003 - A aplicação deve permitir cadastrar usuários Barbeiro e gerenciar seu cadastro e agenda de atendimento|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1FgbsHgho3eAxNwQjHGMztOIosiVuFDqJ/view?usp=sharing| 

|*Caso de Teste*                                 |*CT02 - Acompanhamento da agenda de atendimento dos Barbeiros*           |
|---|---|
|Requisito Associado | RF-010 - A aplicação deve permitir que o usuário Administrador gerencie a agenda de atendimento dos barbeiros|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/1xD8S_OlAa3hHLy7Agrt6-lZp5QjWqaWU/view?usp=sharing| 

|*Caso de Teste*                                 |*CT01 - Gerênciamento de Agenda pelo Barbeiro*                                         |
|---|---|
|Requisito Associado | RF-008, RF-009, RF-011 e RF-013 - A aplicação deve permitir que o barbeiro realize o bloqueio de horários livres, incluir o agendamento pelo barbeiro, o cancelamento do bloqueio/agendamento barbeiro, bem como concluir os atendimentos realizados|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/12o0H4nqsSsQ3qr-ze1r6_ma7KE4bD9U8/view?usp=sharing| 


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
| 1             | Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando. |
| 2             | Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço. |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 28.02 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |


    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.


Cenário 2: Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante (por exemplo, 113 segundos — média usuários — contra 25 segundos — especialista — no cenário três), e ainda os comentários feitos por alguns usuários, entendemos haver oportunidades de melhoria na usabilidade da aplicação.


