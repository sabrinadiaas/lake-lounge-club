// Endereço da API Local (O backend em Node.js precisa estar rodando)
const URL_API = "/api";

// Função para navegar entre as telas do menu lateral
function mudarAba(abaId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.getElementById(abaId).classList.add('active');
}

// Função para exibir alertas de erro ou sucesso nas telas
function mostrarMensagem(elementoId, texto, sucesso) {
    const el = document.getElementById(elementoId);
    el.innerHTML = texto;
    el.className = `mt-4 p-3 rounded text-center font-medium block ${sucesso ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`;
}

// ==========================================
// FUNÇÕES DAS TELAS (Consumindo a API)
// ==========================================

// TELA 1: LOGIN
async function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    try {
        const res = await fetch(`${URL_API}/login`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });
        const data = await res.json();
        mostrarMensagem('msgLogin', data.mensagem, res.ok);
    } catch (error) {
        mostrarMensagem('msgLogin', "Erro de conexão. A API (Node.js) está rodando?", false);
    }
}

// TELA 2: PORTARIA
async function validarPortaria() {
    const codigo = document.getElementById('codigoPortaria').value.toUpperCase();
    try {
        const res = await fetch(`${URL_API}/portaria/validar`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo })
        });
        const data = await res.json();
        mostrarMensagem('msgPortaria', data.mensagem + (data.nome ? ` (${data.nome})` : ""), res.ok);
    } catch (error) {
        mostrarMensagem('msgPortaria', "Erro de conexão. A API (Node.js) está rodando?", false);
    }
}

// TELA 3: CONVITES
async function gerarConvite() {
    const idSocio = document.getElementById('idSocioConvite').value.toUpperCase();
    const nomeConvidado = document.getElementById('nomeConvidado').value;
    const cpf = document.getElementById('cpfConvidado').value;
    try {
        const res = await fetch(`${URL_API}/convites`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idSocio, nomeConvidado, cpf })
        });
        const data = await res.json();
        mostrarMensagem('msgConvite', data.mensagem, res.ok);
    } catch (error) {
        mostrarMensagem('msgConvite', "Erro de conexão. A API (Node.js) está rodando?", false);
    }
}

// TELA 4: DEPENDENTES
async function cadastrarDependente() {
    const idSocio = document.getElementById('idSocioDep').value.toUpperCase();
    const nome = document.getElementById('nomeDep').value;
    const idade = document.getElementById('idadeDep').value;
    const comprovanteEstudo = document.getElementById('comprovanteDep').checked;
    try {
        const res = await fetch(`${URL_API}/dependentes`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idSocio, nome, idade: parseInt(idade), comprovanteEstudo })
        });
        const data = await res.json();
        mostrarMensagem('msgDep', data.mensagem, res.ok);
    } catch (error) {
        mostrarMensagem('msgDep', "Erro de conexão. A API (Node.js) está rodando?", false);
    }
}

// TELA 5: FINANCEIRO
async function consultarFinanceiro() {
    const idSocio = document.getElementById('idSocioFin').value.toUpperCase();
    const painel = document.getElementById('painelFinanceiro');
    const msg = document.getElementById('msgFin');
    
    try {
        const res = await fetch(`${URL_API}/financeiro/${idSocio}`);
        const data = await res.json();
        
        if (res.ok) {
            msg.classList.add('hidden');
            painel.classList.remove('hidden');
            document.getElementById('finNome').innerText = data.nome;
            
            const statusEl = document.getElementById('finStatus');
            statusEl.innerText = data.status;
            statusEl.className = data.status === "ADIMPLENTE" ? "font-bold text-green-600" : "font-bold text-red-600";
            
            const mensEl = document.getElementById('finMensalidade');
            mensEl.innerText = data.mensalidadeAtual;
            mensEl.className = data.mensalidadeAtual === "Paga" ? "font-bold text-lg text-green-600" : "font-bold text-lg text-red-600";
        } else {
            painel.classList.add('hidden');
            mostrarMensagem('msgFin', data.mensagem, false);
        }
    } catch (error) {
        painel.classList.add('hidden');
        mostrarMensagem('msgFin', "Erro de conexão. A API (Node.js) está rodando?", false);
    }
}