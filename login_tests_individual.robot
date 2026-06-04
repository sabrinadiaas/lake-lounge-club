*** Settings ***
Documentation     Script Individual de Testes de Interface (UI) para a Tela de Login do Lake Lounge Club.
Library           SeleniumLibrary
Suite Teardown    Close All Browsers

*** Variables ***
${URL}            http://localhost:3000    # Ajuste para a URL local do seu sistema
${BROWSER}        chrome
${EMAIL_VALIDO}   carlos@email.com
${SENHA_VALIDA}   123
${VELOCIDADE}     0.5s                       

*** Test Cases ***
CTUI01 - Login bem-sucedido
    Dado que o usuário está na página de login do Lake Lounge Club
    Quando ele preenche o e-mail "carlos@email.com" e a senha "123"
    E clica no botão para entrar
    Então o sistema deve exibir um mensagem Login realizado com sucesso


*** Keywords ***
Dado que o usuário está na página de login do Lake Lounge Club
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${VELOCIDADE}   
    Wait Until Element Is Visible    id=btnEntrar    50s

Quando ele preenche o e-mail "${email}" e a senha "${senha}"
    Input Text     xpath=//input[@type='email' or @name='email']    ${email}
    Input Text     xpath=//input[@type='password' or @name='senha']    ${senha}

E clica no botão para entrar
    Wait Until Element Is Enabled    id=btnEntrar    20s
    Click Element    id=btnEntrar

Então o sistema deve exibir um mensagem Login realizado com sucesso
    Wait Until Page Contains    Login realizado com sucesso    20s
