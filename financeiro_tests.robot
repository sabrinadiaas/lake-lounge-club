*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        http://localhost:3000
${BROWSER}    chrome

*** Test Cases ***
CT01 - Consultar Dados De Mensalidade Com ID Valido
    Open Browser    ${URL}    ${BROWSER}
    Click Button    xpath=//button[contains(text(),'5. Financeiro')]
    Wait Until Element Is Visible    id=idSocioFin    timeout=10s
    Input Text    id=idSocioFin    S101
    Click Button    id=btnConsultarFin
    Wait Until Element Is Visible    id=painelFinanceiro    timeout=10s
    Element Should Be Visible    id=painelFinanceiro
    Element Should Contain    id=finStatus    ADIMPLENTE
    Element Should Contain    id=finMensalidade    Paga
    Close Browser

CT02 - Clicar Em Gerar Boleto E Validar Acao Registrada
    Open Browser    ${URL}    ${BROWSER}
    Click Button    xpath=//button[contains(text(),'5. Financeiro')]
    Wait Until Element Is Visible    id=idSocioFin    timeout=10s
    Input Text    id=idSocioFin    S202
    Click Button    id=btnConsultarFin
    Wait Until Element Is Visible    id=painelFinanceiro    timeout=10s
    Element Should Be Visible    id=painelFinanceiro
    Element Should Contain    id=finStatus    INADIMPLENTE
    Click Button    xpath=//button[contains(text(),'Gerar Boleto')]
    Close Browser