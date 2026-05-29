const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Banco de Dados Simulado
const db = {
    socios: [
        { id: "S101", nome: "Carlos Silva", email: "carlos@email.com", senha: "123", status: "ADIMPLENTE", convitesMes: 3 },
        { id: "S202", nome: "Marcos Souza", email: "marcos@email.com", senha: "123", status: "INADIMPLENTE", convitesMes: 0 }
    ],
    dependentes: [],
    convites: []
};

// ---------------------------------------------------------
// ENDPOINTS PARA O POSTMAN
// ---------------------------------------------------------

// Integrante 2: Login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    if (!email || !email.includes('@')) return res.status(400).json({ mensagem: "Email inválido" });
    if (!senha || senha.length < 3) return res.status(400).json({ mensagem: "Senha inválida" });
    
    const socio = db.socios.find(s => s.email === email && s.senha === senha);
    if (!socio) return res.status(401).json({ mensagem: "Credenciais incorretas" });
    
    res.status(200).json({ mensagem: "Login realizado com sucesso", idSocio: socio.id });
});

// Integrante 1: Portaria (Validar Acesso)
app.post('/api/portaria/validar', (req, res) => {
    const { codigo } = req.body;
    if (!codigo) return res.status(400).json({ mensagem: "Código é obrigatório" });

    const socio = db.socios.find(s => s.id === codigo);
    if (!socio) return res.status(404).json({ mensagem: "Código não encontrado" });

    if (socio.status === "INADIMPLENTE") return res.status(403).json({ mensagem: "Acesso bloqueado: Mensalidade em atraso" });
    
    res.status(200).json({ mensagem: "Acesso liberado", nome: socio.nome });
});

// Integrante 3: Gerar Convite
app.post('/api/convites', (req, res) => {
    const { idSocio, nomeConvidado, cpf } = req.body;
    if (!idSocio || !nomeConvidado || !cpf) return res.status(400).json({ mensagem: "Dados incompletos" });

    const socio = db.socios.find(s => s.id === idSocio);
    if (!socio) return res.status(404).json({ mensagem: "Sócio não encontrado" });
    if (socio.status === "INADIMPLENTE") return res.status(403).json({ mensagem: "Sócio inadimplente não pode gerar convites" });
    if (socio.convitesMes >= 4) return res.status(403).json({ mensagem: "Limite máximo de 4 convites mensais atingido" });

    socio.convitesMes += 1;
    res.status(201).json({ mensagem: "Convite gerado com sucesso", convitesRestantes: 4 - socio.convitesMes });
});

// Integrante 4: Cadastrar Dependente
app.post('/api/dependentes', (req, res) => {
    const { idSocio, nome, idade } = req.body;
    if (!idSocio || !nome || !idade) return res.status(400).json({ mensagem: "Dados incompletos" });

    if (idade >= 25) return res.status(400).json({ mensagem: "Idade máxima permitida excedida (24 anos)" });
    if (idade >= 21 && idade <= 24 && !req.body.comprovanteEstudo) {
        return res.status(400).json({ mensagem: "Comprovante de ensino superior obrigatório para maiores de 21 anos" });
    }

    res.status(201).json({ mensagem: "Dependente cadastrado com sucesso" });
});

// Integrante 5: Consulta Financeira
app.get('/api/financeiro/:idSocio', (req, res) => {
    const socio = db.socios.find(s => s.id === req.params.idSocio);
    if (!socio) return res.status(404).json({ mensagem: "Sócio não encontrado" });

    res.status(200).json({ 
        nome: socio.nome, 
        status: socio.status,
        mensalidadeAtual: socio.status === "ADIMPLENTE" ? "Paga" : "Vencida"
    });
});

// Iniciar o Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 API do Lake Lounge Club rodando em http://localhost:${PORT}`);
    console.log(`Pronto para receber testes do Postman!`);
});