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

CTUI02 - Clicar em entrar com ambos os campos vazios
    Dado que o usuário está na página de login do Lake Lounge Club
    Quando ele deixa os campos de e-mail e senha em branco
    E clica no botão para entrar
    Então o sistema deve exibir uma mensagem Email inválido

CTUI03 - Clicar em entrar preenchendo apenas o e-mail
    Dado que o usuário está na página de login do Lake Lounge Club
    Quando ele preenche apenas o e-mail "carlos@email.com" e deixa a senha em branco
    E clica no botão para entrar
    Então o sistema deve exibir uma mensagem Senha inválida

CTUI04 - Clicar em entrar preenchendo apenas a senha
    Dado que o usuário está na página de login do Lake Lounge Club
    Quando ele deixa o e-mail em branco e preenche apenas a senha "123"
    E clica no botão para entrar
    Então o sistema deve exibir uma mensagem Email inválido

*** Keywords ***
Dado que o usuário está na página de login do Lake Lounge Club
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${VELOCIDADE}
    Wait Until Element Is Visible    id=btnEntrar    20s

Quando ele deixa os campos de e-mail e senha em branco
    Input Text     xpath=//input[@type='email' or @name='email']    ${EMPTY}
    Input Text     xpath=//input[@type='password' or @name='senha']    ${EMPTY}

Quando ele preenche apenas o e-mail "${email}" e deixa a senha em branco
    Input Text     xpath=//input[@type='email' or @name='email']    ${email}
    Input Text     xpath=//input[@type='password' or @name='senha']    ${EMPTY}

Quando ele deixa o e-mail em branco e preenche apenas a senha "${senha}"
    Input Text     xpath=//input[@type='email' or @name='email']    ${EMPTY}
    Input Text     xpath=//input[@type='password' or @name='senha']    ${senha}

E clica no botão para entrar
    Wait Until Element Is Enabled    id=btnEntrar    20s
    Click Element    id=btnEntrar

Então o sistema deve exibir uma mensagem Email inválido
    Wait Until Page Contains    Email inválido    20s

Então o sistema deve exibir uma mensagem Senha inválida
    Wait Until Page Contains    Senha inválida    20s
