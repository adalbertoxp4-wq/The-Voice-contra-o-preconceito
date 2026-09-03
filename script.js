// ============================================================
// JUNTOS CONTRA O BULLYING
// 2 jogos | 150 perguntas por jogo | 300 no total
// Dificuldade progressiva | progresso separado por jogo
// ============================================================

const TOTAL_PERGUNTAS = 150;
const PERGUNTAS_POR_FASE = 10;
const TOTAL_FASES = 15;

let jogoAtual = "";
let perguntasDoJogo = [];
let perguntaAtual = 0;
let pontos = 0;
let respostaDada = false;
let somAtivo = true;
let audioContext = null;

const niveis = [
    { nome: "🟢 Iniciante", pontos: 10 },
    { nome: "🟡 Básico", pontos: 10 },
    { nome: "🟠 Intermediário", pontos: 15 },
    { nome: "🔴 Difícil", pontos: 20 },
    { nome: "🟣 Muito difícil", pontos: 25 },
    { nome: "🔥 Desafio máximo", pontos: 30 }
];

// Cada jogo possui 10 temas x 15 situações diferentes = 150 perguntas.
const temasBullying = [
    ["bullying", "uma colega está sendo humilhada repetidamente por causa de sua aparência"],
    ["cyberbullying", "um estudante recebe mensagens ofensivas em um grupo da turma"],
    ["apelidos ofensivos", "um colega pede várias vezes para que parem de chamá-lo por um apelido"],
    ["exclusão", "uma pessoa é deixada de fora de uma atividade de propósito"],
    ["testemunha", "você presencia colegas ridicularizando outro estudante"],
    ["empatia", "um colega demonstra estar abalado depois de sofrer uma agressão verbal"],
    ["respeito", "duas pessoas discordam sobre uma opinião e a discussão começa a ficar agressiva"],
    ["preconceito", "um estudante é julgado antes mesmo de ser conhecido"],
    ["segurança digital", "uma imagem constrangedora de um colega começa a circular pela internet"],
    ["convivência escolar", "a turma precisa criar maneiras de tornar o ambiente mais acolhedor"]
];

const temasInclusao = [
    ["deficiência", "uma pessoa com deficiência participa de uma atividade da escola"],
    ["acessibilidade", "a escola precisa garantir acesso seguro aos seus diferentes espaços"],
    ["capacitismo", "um colega presume que uma pessoa com deficiência não consegue realizar uma tarefa"],
    ["autismo", "um estudante autista precisa de respeito às suas necessidades e à sua forma de comunicação"],
    ["cadeira de rodas", "uma pessoa utiliza cadeira de rodas para se locomover pela escola"],
    ["comunicação", "um colega utiliza uma forma diferente de comunicação para participar da aula"],
    ["idosos", "uma pessoa idosa participa de uma atividade junto com pessoas mais jovens"],
    ["equidade", "uma atividade precisa de adaptações para que todos tenham condições de participar"],
    ["diversidade", "uma turma reúne pessoas com características, experiências e modos de pensar diferentes"],
    ["inclusão", "um grupo precisa decidir como garantir a participação de todos em uma atividade"]
];

// 15 estruturas diferentes. O assunto/situação muda em cada tema,
// portanto as 150 perguntas de cada jogo não são cópias da mesma questão.
const modelos = [
    (s) => `Qual é a atitude mais adequada diante de ${s}?`,
    (s) => `Você percebe ${s}. Qual deve ser sua primeira preocupação?`,
    (s) => `Se você estiver envolvido em ${s}, qual escolha demonstra respeito?`,
    (s) => `Um colega pede ajuda porque ${s}. Qual resposta é mais responsável?`,
    (s) => `Ao observar ${s}, qual comportamento ajuda a evitar que o problema aumente?`,
    (s) => `Por que é importante levar a sério uma situação em que ${s}?`,
    (s) => `Qual alternativa apresenta uma forma de agir com empatia quando ${s}?`,
    (s) => `Em uma escola, qual medida pode contribuir para enfrentar uma situação em que ${s}?`,
    (s) => `Se outras pessoas estiverem incentivando ${s}, como você deve agir?`,
    (s) => `Qual análise é mais justa quando ${s}?`,
    (s) => `Em uma conversa sobre ${s}, qual princípio deve orientar sua decisão?`,
    (s) => `Imagine que ninguém sabe como resolver ${s}. Qual é a atitude mais segura?`,
    (s) => `Uma pessoa diz que ${s} é apenas uma brincadeira. O que deve ser considerado?`,
    (s) => `Qual atitude pode transformar uma situação em que ${s} em uma oportunidade de respeito?`,
    (s) => `Em uma situação mais complexa envolvendo ${s}, qual escolha melhor protege a dignidade das pessoas?`
];

const respostasPorTemaBullying = {
    "bullying": [
        "Apoiar a pessoa, interromper a participação na agressão e procurar um adulto de confiança.",
        "Fingir que não viu para evitar qualquer envolvimento.",
        "Rir junto para não se tornar o próximo alvo."
    ],
    "cyberbullying": [
        "Guardar evidências, evitar revidar e buscar ajuda de um adulto ou responsável.",
        "Responder com uma ofensa ainda mais forte.",
        "Compartilhar a mensagem ofensiva para aumentar a exposição."
    ],
    "apelidos ofensivos": [
        "Parar quando a pessoa demonstra incômodo e respeitar como ela deseja ser chamada.",
        "Continuar porque outros colegas também usam o apelido.",
        "Criar um apelido mais constrangedor para fazer graça."
    ],
    "exclusão": [
        "Incluir a pessoa e verificar se existem formas de garantir sua participação.",
        "Dizer que ela não faz parte do grupo e deve procurar outro lugar.",
        "Convidá-la somente se isso não atrapalhar os planos dos demais."
    ],
    "testemunha": [
        "Apoiar quem sofreu a agressão e comunicar o ocorrido a alguém responsável.",
        "Filmar tudo para publicar depois nas redes sociais.",
        "Incentivar a discussão para descobrir quem consegue humilhar mais."
    ],
    "empatia": [
        "Ouvir sem ridicularizar, acolher e perguntar de que forma a pessoa precisa de apoio.",
        "Dizer que existem problemas muito maiores e que ela deveria esquecer o assunto.",
        "Fazer uma piada para tentar mudar o clima rapidamente."
    ],
    "respeito": [
        "Discordar sem atacar a pessoa e ouvir argumentos diferentes dos seus.",
        "Interromper a pessoa para mostrar que sua opinião é superior.",
        "Usar características pessoais para tentar vencer a discussão."
    ],
    "preconceito": [
        "Questionar julgamentos automáticos e conhecer a pessoa antes de tirar conclusões.",
        "Aceitar estereótipos porque são repetidos por muitas pessoas.",
        "Evitar contato com quem parece diferente para não ter problemas."
    ],
    "segurança digital": [
        "Não redistribuir a imagem, preservar informações úteis e procurar ajuda responsável.",
        "Salvar a imagem e enviá-la para amigos de confiança como curiosidade.",
        "Publicar comentários para descobrir como outras pessoas reagirão."
    ],
    "convivência escolar": [
        "Criar regras de respeito, canais de apoio e formas de participação para a turma.",
        "Esperar que os conflitos desapareçam sem conversar sobre eles.",
        "Punir toda a turma sem analisar as situações individualmente."
    ]
};

const respostasPorTemaInclusao = {
    "deficiência": [
        "Perguntar se a pessoa precisa de ajuda e respeitar sua autonomia e suas escolhas.",
        "Fazer tudo por ela sem perguntar, mesmo quando ela consegue realizar a tarefa sozinha.",
        "Fazer comentários sobre sua deficiência para chamar a atenção dos colegas."
    ],
    "acessibilidade": [
        "Garantir recursos e caminhos que permitam participação com autonomia e segurança.",
        "Deixar os recursos acessíveis bloqueados quando não houver fiscalização.",
        "Oferecer acesso apenas quando a pessoa reclamar do problema."
    ],
    "capacitismo": [
        "Evitar pressupor incapacidade e avaliar a pessoa pelo que ela realmente consegue fazer.",
        "Decidir antecipadamente que ela não será capaz de realizar a atividade.",
        "Usar a deficiência como motivo para fazer piadas durante a tarefa."
    ],
    "autismo": [
        "Respeitar necessidades individuais, comunicação, limites e diferentes formas de interação.",
        "Forçar a pessoa a esconder comportamentos apenas para parecer igual aos demais.",
        "Tratar todas as pessoas autistas como se tivessem exatamente as mesmas necessidades."
    ],
    "cadeira de rodas": [
        "Perguntar antes de ajudar e nunca mover a cadeira sem autorização.",
        "Empurrar a cadeira imediatamente porque parece ser mais rápido.",
        "Usar a cadeira como apoio para mochila ou brincadeira."
    ],
    "comunicação": [
        "Dar tempo, utilizar recursos adequados e respeitar a forma de comunicação da pessoa.",
        "Completar todas as frases pela pessoa para acelerar a conversa.",
        "Ignorar sua participação porque sua comunicação é diferente."
    ],
    "idosos": [
        "Respeitar sua autonomia, ouvir suas decisões e oferecer ajuda quando for desejada.",
        "Assumir que toda pessoa idosa precisa que alguém decida por ela.",
        "Ignorar sua opinião porque pessoas mais jovens sabem mais sobre tudo."
    ],
    "equidade": [
        "Oferecer os apoios necessários para que as pessoas tenham oportunidades realmente justas.",
        "Dar exatamente o mesmo recurso mesmo quando as necessidades são diferentes.",
        "Recusar adaptações para garantir que ninguém receba qualquer apoio adicional."
    ],
    "diversidade": [
        "Valorizar diferenças, ouvir experiências e evitar julgamentos baseados em estereótipos.",
        "Exigir que todos se comportem da mesma maneira para evitar diferenças.",
        "Afastar quem não combina com os padrões predominantes do grupo."
    ],
    "inclusão": [
        "Planejar a atividade considerando diferentes necessidades e garantindo participação real.",
        "Convidar todos, mas ignorar qualquer adaptação necessária para participar.",
        "Separar as pessoas que precisam de apoio para facilitar o trabalho dos demais."
    ]
};

function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function nivelDaPergunta(indice) {
    if (indice < 25) return niveis[0];
    if (indice < 50) return niveis[1];
    if (indice < 80) return niveis[2];
    if (indice < 110) return niveis[3];
    if (indice < 135) return niveis[4];
    return niveis[5];
}

function gerarPerguntas(temas, respostas) {
    const resultado = [];
    temas.forEach(([tema, situacao], temaIndex) => {
        modelos.forEach((modelo, modeloIndex) => {
            const nivel = nivelDaPergunta(temaIndex * 15 + modeloIndex);
            const base = respostas[tema];
            resultado.push({
                id: `${temaIndex + 1}-${modeloIndex + 1}`,
                assunto: tema,
                pergunta: modelo(situacao),
                nivel: nivel.nome,
                pontos: nivel.pontos,
                alternativas: embaralhar([
                    { texto: base[0], correta: true },
                    { texto: base[1], correta: false },
                    { texto: base[2], correta: false }
                ])
            });
        });
    });
    return resultado;
}

const perguntasBullying = gerarPerguntas(temasBullying, respostasPorTemaBullying);
const perguntasInclusao = gerarPerguntas(temasInclusao, respostasPorTemaInclusao);

// Garante que a alternativa correta não fique sempre na mesma posição.
function embaralharAlternativasSemPadrão(alternativas) {
    let nova = embaralhar(alternativas);
    const correta = nova.findIndex(a => a.correta);
    const anterior = window._ultimaPosicaoCorreta;
    if (anterior !== undefined && correta === anterior) {
        const alvo = (correta + 1 + Math.floor(Math.random() * 2)) % 3;
        [nova[correta], nova[alvo]] = [nova[alvo], nova[correta]];
    }
    window._ultimaPosicaoCorreta = nova.findIndex(a => a.correta);
    return nova;
}

// ============================================================
// SOM
// ============================================================
function tocarSom(frequencia, duracao = 0.1) {
    if (!somAtivo) return;
    try {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscilador = audioContext.createOscillator();
        const ganho = audioContext.createGain();
        oscilador.frequency.value = frequencia;
        oscilador.connect(ganho);
        ganho.connect(audioContext.destination);
        ganho.gain.setValueAtTime(0.08, audioContext.currentTime);
        ganho.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duracao);
        oscilador.start();
        oscilador.stop(audioContext.currentTime + duracao);
    } catch (erro) {}
}

function alternarSom() {
    somAtivo = !somAtivo;
    const botao = document.querySelector(".botao-som");
    if (botao) botao.textContent = somAtivo ? "🔊 Som ativado" : "🔇 Som desativado";
    if (somAtivo) tocarSom(650);
}

// ============================================================
// JOGO
// ============================================================
function selecionarJogo(tipo) {
    jogoAtual = tipo;
    perguntaAtual = 0;
    pontos = 0;
    respostaDada = false;
    window._ultimaPosicaoCorreta = undefined;
    perguntasDoJogo = tipo === "bullying" ? embaralhar(perguntasBullying) : embaralhar(perguntasInclusao);
    abrirTelaJogo();
    salvarProgresso();
    tocarSom(700);
    mostrarPergunta();
}

function abrirTelaJogo() {
    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("rankingTela").classList.add("escondido");
    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("jogo").classList.remove("escondido");
}

function mostrarPergunta() {
    respostaDada = false;
    const pergunta = perguntasDoJogo[perguntaAtual];
    if (!pergunta) return;

    const fase = Math.floor(perguntaAtual / PERGUNTAS_POR_FASE) + 1;
    const perguntaNaFase = (perguntaAtual % PERGUNTAS_POR_FASE) + 1;
    const respondidas = perguntaAtual % PERGUNTAS_POR_FASE;

    document.getElementById("faseAtual").textContent = `🏁 Fase ${fase} de ${TOTAL_FASES}`;
    document.getElementById("numeroPergunta").textContent = `Pergunta ${perguntaNaFase} de ${PERGUNTAS_POR_FASE}`;
    document.getElementById("progressoTexto").textContent = `Fase ${fase} — ${respondidas} de 10 respondidas — ${pergunta.nivel} — Questão ${perguntaAtual + 1}/150`;
    document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
    document.getElementById("tituloJogo").textContent = jogoAtual === "bullying" ? "🛡️ A Luta Contra o Bullying" : "♿ Respeito às Diferenças";
    document.getElementById("numeroBola").textContent = perguntaNaFase;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    document.getElementById("feedback").textContent = "";
    document.getElementById("areaProxima").innerHTML = "";

    const alternativas = document.getElementById("alternativas");
    alternativas.innerHTML = "";

    embaralharAlternativasSemPadrão(pergunta.alternativas).forEach((opcao, indice) => {
        const botao = document.createElement("button");
        botao.className = "alternativa";
        botao.textContent = `${String.fromCharCode(65 + indice)}) ${opcao.texto}`;
        botao.onclick = () => escolherResposta(botao, opcao.correta, pergunta.pontos);
        alternativas.appendChild(botao);
    });

    document.getElementById("progressoFase").style.width = `${(respondidas / PERGUNTAS_POR_FASE) * 100}%`;
}

function escolherResposta(botaoEscolhido, correta, valor) {
    if (respostaDada) return;
    respostaDada = true;
    document.querySelectorAll(".alternativa").forEach(botao => botao.disabled = true);

    if (correta) {
        pontos += valor;
        botaoEscolhido.classList.add("resposta-certa");
        document.getElementById("feedback").textContent = `✅ Correto! +${valor} pontos. Você demonstrou respeito e empatia.`;
        tocarSom(900);
    } else {
        botaoEscolhido.classList.add("resposta-errada");
        document.getElementById("feedback").textContent = "❌ Essa não é a melhor escolha. Pense em respeito, segurança e empatia.";
        tocarSom(220);
    }
    document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
    salvarProgresso();
    criarBotaoProxima();
}

function criarBotaoProxima() {
    const area = document.getElementById("areaProxima");
    area.innerHTML = "";
    const botao = document.createElement("button");
    botao.textContent = perguntaAtual === TOTAL_PERGUNTAS - 1 ? "🏆 Ver resultado" : ((perguntaAtual + 1) % PERGUNTAS_POR_FASE === 0 ? "🚀 Próxima fase" : "➡️ Próxima pergunta");
    botao.onclick = proximaPergunta;
    area.appendChild(botao);
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual >= TOTAL_PERGUNTAS) {
        mostrarResultado();
        return;
    }
    salvarProgresso();
    if (perguntaAtual % PERGUNTAS_POR_FASE === 0) mostrarMensagemFase();
    else mostrarPergunta();
}

function mostrarMensagemFase() {
    const fase = Math.floor(perguntaAtual / PERGUNTAS_POR_FASE) + 1;
    document.getElementById("pergunta").textContent = `🎉 Você chegou à Fase ${fase}!`;
    document.getElementById("alternativas").innerHTML = `<p class="centralizado">A dificuldade aumentou. Prepare-se para as próximas perguntas!</p>`;
    document.getElementById("feedback").textContent = "🔥 Continue!";
    const botao = document.createElement("button");
    botao.textContent = `▶️ Começar Fase ${fase}`;
    botao.onclick = mostrarPergunta;
    document.getElementById("areaProxima").innerHTML = "";
    document.getElementById("areaProxima").appendChild(botao);
    tocarSom(1100);
}

// ============================================================
// RESULTADO / RANKING
// ============================================================
function mostrarResultado() {
    const pontosMaximos = perguntasDoJogo.reduce((soma, p) => soma + p.pontos, 0);
    const porcentagem = Math.round((pontos / pontosMaximos) * 100);
    const medalha = porcentagem >= 90 ? "🥇 OURO" : porcentagem >= 70 ? "🥈 PRATA" : porcentagem >= 50 ? "🥉 BRONZE" : "📚 PARTICIPAÇÃO";
    const mensagem = porcentagem >= 90 ? "Excelente! Você mostrou muito conhecimento, respeito e empatia." : porcentagem >= 70 ? "Muito bom! Você teve um ótimo desempenho." : porcentagem >= 50 ? "Bom trabalho! Continue aprendendo e praticando o respeito." : "Continue estudando. Cada pergunta é uma oportunidade para aprender.";

    document.getElementById("jogo").classList.add("escondido");
    document.getElementById("resultado").classList.remove("escondido");
    document.getElementById("resultadoTitulo").textContent = jogoAtual === "bullying" ? "🛡️ A Luta Contra o Bullying" : "♿ Respeito às Diferenças";
    document.getElementById("pontuacaoFinal").textContent = `⭐ Pontuação: ${pontos}`;
    document.getElementById("porcentagemFinal").textContent = `📊 Aproveitamento: ${porcentagem}%`;
    document.getElementById("medalhaFinal").textContent = medalha;
    document.getElementById("mensagemFinal").textContent = mensagem;
    salvarRanking(jogoAtual, pontos, porcentagem, medalha);
    localStorage.removeItem(chaveProgresso(jogoAtual));
    tocarSom(1200);
}

function salvarRanking(jogo, pontosValor, porcentagem, medalha) {
    const ranking = JSON.parse(localStorage.getItem("rankingJogo") || "[]");
    ranking.push({ jogo, pontos: pontosValor, porcentagem, medalha, data: new Date().toLocaleDateString("pt-BR") });
    ranking.sort((a, b) => b.pontos - a.pontos);
    localStorage.setItem("rankingJogo", JSON.stringify(ranking.slice(0, 10)));
}

function mostrarRanking() {
    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("rankingTela").classList.remove("escondido");
    const lista = document.getElementById("rankingLista");
    const ranking = JSON.parse(localStorage.getItem("rankingJogo") || "[]");
    if (!ranking.length) {
        lista.innerHTML = `<p class="centralizado">Ainda não existem pontuações. Jogue para aparecer no ranking!</p>`;
        return;
    }
    lista.innerHTML = "";
    ranking.forEach((item, indice) => {
        const div = document.createElement("div");
        div.className = "ranking-item";
        const posicao = indice === 0 ? "🥇" : indice === 1 ? "🥈" : indice === 2 ? "🥉" : `${indice + 1}º`;
        const nome = item.jogo === "bullying" ? "🛡️ Bullying" : "♿ Inclusão";
        div.innerHTML = `<span class="ranking-posicao">${posicao}</span><span class="ranking-nome">${nome}<br><small>${item.data}</small></span><span class="ranking-pontos">${item.pontos} pts</span>`;
        lista.appendChild(div);
    });
}

function fecharRanking() {
    document.getElementById("rankingTela").classList.add("escondido");
    document.getElementById("inicio").classList.remove("escondido");
    verificarJogosSalvos();
}

// ============================================================
// SALVAMENTO: UM PROGRESSO PARA CADA JOGO
// ============================================================
function chaveProgresso(jogo) {
    return jogo === "bullying" ? "progressoBullying" : "progressoInclusao";
}

function salvarProgresso() {
    if (!jogoAtual || !perguntasDoJogo.length) return;
    localStorage.setItem(chaveProgresso(jogoAtual), JSON.stringify({ jogo: jogoAtual, pergunta: perguntaAtual, pontos, ordem: perguntasDoJogo }));
}

function obterProgresso(jogo) {
    try {
        const salvo = localStorage.getItem(chaveProgresso(jogo));
        return salvo ? JSON.parse(salvo) : null;
    } catch (erro) {
        localStorage.removeItem(chaveProgresso(jogo));
        return null;
    }
}

function salvarESair() {
    salvarProgresso();
    document.getElementById("jogo").classList.add("escondido");
    document.getElementById("inicio").classList.remove("escondido");
    verificarJogosSalvos();
}

function verificarJogosSalvos() {
    const area = document.getElementById("continuarArea");
    const bullying = obterProgresso("bullying");
    const inclusao = obterProgresso("inclusao");
    if (!bullying && !inclusao) {
        area.classList.add("escondido");
        area.innerHTML = "";
        return;
    }
    let html = `<h3>💾 Jogos salvos</h3>`;
    if (bullying) html += criarCardSalvo("bullying", bullying);
    if (inclusao) html += criarCardSalvo("inclusao", inclusao);
    area.innerHTML = html;
    area.classList.remove("escondido");
}

function criarCardSalvo(tipo, dados) {
    const fase = Math.min(TOTAL_FASES, Math.floor(dados.pergunta / PERGUNTAS_POR_FASE) + 1);
    const pergunta = Math.min(PERGUNTAS_POR_FASE, (dados.pergunta % PERGUNTAS_POR_FASE) + 1);
    const nome = tipo === "bullying" ? "🛡️ A Luta Contra o Bullying" : "♿ Respeito às Diferenças";
    return `<div class="jogo-salvo"><strong>${nome}</strong><span>Fase ${fase} de ${TOTAL_FASES} — Pergunta ${pergunta} de 10 — ${dados.pontos} pontos</span><button onclick="continuarJogo('${tipo}')">▶️ Continuar</button><button class="botao-apagar" onclick="apagarProgresso('${tipo}')">🗑️ Apagar</button></div>`;
}

function continuarJogo(tipo) {
    const dados = obterProgresso(tipo);
    if (!dados) return;
    jogoAtual = tipo;
    perguntaAtual = Math.min(dados.pergunta || 0, TOTAL_PERGUNTAS - 1);
    pontos = dados.pontos || 0;
    perguntasDoJogo = Array.isArray(dados.ordem) && dados.ordem.length === TOTAL_PERGUNTAS ? dados.ordem : (tipo === "bullying" ? embaralhar(perguntasBullying) : embaralhar(perguntasInclusao));
    window._ultimaPosicaoCorreta = undefined;
    abrirTelaJogo();
    mostrarPergunta();
}

function apagarProgresso(tipo) {
    localStorage.removeItem(chaveProgresso(tipo));
    verificarJogosSalvos();
}

function jogarNovamente() {
    localStorage.removeItem(chaveProgresso(jogoAtual));
    selecionarJogo(jogoAtual);
}

function voltarAoMenu() {
    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("jogo").classList.add("escondido");
    document.getElementById("inicio").classList.remove("escondido");
    verificarJogosSalvos();
}

window.addEventListener("load", verificarJogosSalvos);
