// ======================================================
// JUNTOS CONTRA O PRECONCEITO
// 2 jogos | 150 perguntas cada | 15 fases | 10 por fase
// SEM VIDAS E SEM CRONÔMETRO
// ======================================================

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


// ======================================================
// BANCO DE TEMAS
// 10 temas x 15 variações = 150 perguntas por jogo
// ======================================================

const temasBullying = [
    {
        assunto: "bullying",
        correta: "Apoiar a vítima e procurar ajuda de um adulto de confiança.",
        errada1: "Ignorar a situação e deixar a agressão continuar.",
        errada2: "Participar da agressão para tentar se enturmar."
    },
    {
        assunto: "cyberbullying",
        correta: "Guardar as provas, não revidar e procurar ajuda.",
        errada1: "Responder com outra ofensa.",
        errada2: "Compartilhar a mensagem ofensiva com mais pessoas."
    },
    {
        assunto: "empatia",
        correta: "Ouvir a pessoa e tentar compreender o que ela está sentindo.",
        errada1: "Dizer que o sentimento dela não importa.",
        errada2: "Fazer piada com o problema."
    },
    {
        assunto: "exclusão",
        correta: "Convidar a pessoa para participar e tratá-la com respeito.",
        errada1: "Impedir que ela participe de propósito.",
        errada2: "Fazer comentários para deixá-la constrangida."
    },
    {
        assunto: "apelidos ofensivos",
        correta: "Parar de usar o apelido e respeitar o nome da pessoa.",
        errada1: "Continuar usando mesmo depois de ela pedir para parar.",
        errada2: "Criar um apelido ainda mais ofensivo."
    },
    {
        assunto: "respeito",
        correta: "Tratar as pessoas com educação mesmo quando pensamos diferente.",
        errada1: "Humilhar quem possui uma opinião diferente.",
        errada2: "Usar diferenças pessoais para ofender."
    },
    {
        assunto: "testemunha",
        correta: "Apoiar a vítima e comunicar o ocorrido a alguém responsável.",
        errada1: "Filmar a agressão para publicar nas redes.",
        errada2: "Incentivar os envolvidos a continuar brigando."
    },
    {
        assunto: "preconceito",
        correta: "Questionar estereótipos e conhecer as pessoas sem julgamentos.",
        errada1: "Julgar alguém apenas pela aparência.",
        errada2: "Espalhar estereótipos como se fossem verdades."
    },
    {
        assunto: "diferenças",
        correta: "Valorizar as diferenças e tratar todos com dignidade.",
        errada1: "Afastar alguém por ser diferente.",
        errada2: "Usar uma característica da pessoa para ridicularizá-la."
    },
    {
        assunto: "escola",
        correta: "Promover diálogo, respeito e comunicar situações de agressão.",
        errada1: "Esconder agressões para evitar problemas.",
        errada2: "Dizer que bullying é apenas brincadeira."
    }
];

const temasInclusao = [
    {
        assunto: "deficiência",
        correta: "Tratar a pessoa com respeito e perguntar se ela precisa de ajuda.",
        errada1: "Decidir por ela sem perguntar o que deseja.",
        errada2: "Fazer comentários ofensivos sobre sua deficiência."
    },
    {
        assunto: "acessibilidade",
        correta: "Garantir que pessoas diferentes possam participar com autonomia e segurança.",
        errada1: "Bloquear rampas e caminhos acessíveis.",
        errada2: "Retirar recursos de acessibilidade sem necessidade."
    },
    {
        assunto: "capacitismo",
        correta: "Respeitar a autonomia e combater atitudes discriminatórias.",
        errada1: "Considerar uma pessoa incapaz apenas por ter deficiência.",
        errada2: "Fazer piadas sobre deficiência."
    },
    {
        assunto: "autismo",
        correta: "Respeitar as necessidades, a comunicação e a individualidade da pessoa.",
        errada1: "Forçar a pessoa a agir exatamente como todos os outros.",
        errada2: "Fazer piadas sobre características do autismo."
    },
    {
        assunto: "idosos",
        correta: "Respeitar a autonomia, ouvir e oferecer ajuda quando necessário.",
        errada1: "Tratar toda pessoa idosa como incapaz.",
        errada2: "Ignorar sua opinião."
    },
    {
        assunto: "cadeira de rodas",
        correta: "Não tocar ou movimentar a cadeira sem autorização.",
        errada1: "Empurrar a cadeira sem perguntar.",
        errada2: "Usar a cadeira como apoio ou brincadeira."
    },
    {
        assunto: "linguagem respeitosa",
        correta: "Usar palavras respeitosas e evitar termos ofensivos.",
        errada1: "Usar apelidos humilhantes.",
        errada2: "Fazer piadas com características pessoais."
    },
    {
        assunto: "inclusão",
        correta: "Criar condições para que todos possam participar.",
        errada1: "Excluir quem precisa de adaptação.",
        errada2: "Impedir a participação de alguém por causa de uma diferença."
    },
    {
        assunto: "equidade",
        correta: "Oferecer os recursos necessários para que todos tenham oportunidades justas.",
        errada1: "Dar exatamente o mesmo recurso sem considerar necessidades.",
        errada2: "Recusar adaptações necessárias."
    },
    {
        assunto: "diversidade",
        correta: "Conhecer, ouvir e respeitar pessoas com diferentes características.",
        errada1: "Julgar alguém antes de conhecê-lo.",
        errada2: "Afastar pessoas que não se encaixam em um padrão."
    }
];


// ======================================================
// CRIA 150 PERGUNTAS
// ======================================================

const modelos = [
    "Qual atitude é mais adequada quando o assunto é ASSUNTO?",
    "Qual comportamento demonstra respeito em uma situação de ASSUNTO?",
    "O que devemos fazer para agir corretamente diante de ASSUNTO?",
    "Qual escolha ajuda a combater problemas relacionados a ASSUNTO?",
    "Como uma pessoa pode demonstrar empatia nesse caso de ASSUNTO?",
    "Qual atitude contribui para uma convivência saudável em relação a ASSUNTO?",
    "O que deve ser valorizado quando falamos sobre ASSUNTO?",
    "Qual comportamento evita uma situação de discriminação relacionada a ASSUNTO?",
    "Como agir de maneira responsável diante de ASSUNTO?",
    "Qual decisão demonstra cidadania quando enfrentamos ASSUNTO?",
    "O que pode ajudar uma pessoa envolvida em uma situação de ASSUNTO?",
    "Qual atitude promove respeito e segurança em relação a ASSUNTO?",
    "Como podemos melhorar a convivência quando existe uma situação de ASSUNTO?",
    "Qual comportamento mostra que valorizamos a dignidade das pessoas em relação a ASSUNTO?",
    "Qual é a melhor escolha diante de uma situação envolvendo ASSUNTO?"
];

function gerarPerguntas(temas) {

    const resultado = [];

    temas.forEach(tema => {

        modelos.forEach(modelo => {

            resultado.push({
                pergunta: modelo.replace("ASSUNTO", tema.assunto),
                alternativas: [
                    [tema.correta, 10],
                    [tema.errada1, 0],
                    [tema.errada2, 0]
                ]
            });

        });

    });

    return resultado;
}

const perguntasBullying = gerarPerguntas(temasBullying);
const perguntasInclusao = gerarPerguntas(temasInclusao);


// ======================================================
// EMBARALHAR
// ======================================================

function embaralhar(array) {

    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [copia[i], copia[j]] =
        [copia[j], copia[i]];
    }

    return copia;
}


// ======================================================
// SOM
// ======================================================

function tocarSom(frequencia, duracao = 0.1) {

    if (!somAtivo) return;

    try {

        if (!audioContext) {

            audioContext =
                new (window.AudioContext ||
                    window.webkitAudioContext)();

        }

        const oscilador =
            audioContext.createOscillator();

        const ganho =
            audioContext.createGain();

        oscilador.frequency.value =
            frequencia;

        oscilador.connect(ganho);
        ganho.connect(audioContext.destination);

        ganho.gain.setValueAtTime(
            0.08,
            audioContext.currentTime
        );

        ganho.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + duracao
        );

        oscilador.start();

        oscilador.stop(
            audioContext.currentTime + duracao
        );

    } catch (erro) {
        console.log("Som indisponível.");
    }
}

function alternarSom() {

    somAtivo = !somAtivo;

    const botao =
        document.querySelector(".botao-som");

    botao.textContent =
        somAtivo
            ? "🔊 Som ativado"
            : "🔇 Som desativado";

    if (somAtivo) {
        tocarSom(650);
    }
}


// ======================================================
// INICIAR JOGO
// ======================================================

function selecionarJogo(tipo) {

    jogoAtual = tipo;

    perguntaAtual = 0;

    pontos = 0;

    respostaDada = false;

    perguntasDoJogo =
        embaralhar(
            tipo === "bullying"
                ? perguntasBullying
                : perguntasInclusao
        );

    document.getElementById("inicio")
        .classList.add("escondido");

    document.getElementById("rankingTela")
        .classList.add("escondido");

    document.getElementById("resultado")
        .classList.add("escondido");

    document.getElementById("jogo")
        .classList.remove("escondido");

    tocarSom(700);

    mostrarPergunta();
}


// ======================================================
// MOSTRAR PERGUNTA
// ======================================================

function mostrarPergunta() {

    respostaDada = false;

    const pergunta =
        perguntasDoJogo[perguntaAtual];

    const fase =
        Math.floor(
            perguntaAtual / PERGUNTAS_POR_FASE
        ) + 1;

    const perguntaNaFase =
        (perguntaAtual %
            PERGUNTAS_POR_FASE) + 1;

    const respondidas =
        perguntaAtual % PERGUNTAS_POR_FASE;

    document.getElementById("faseAtual")
        .textContent =
        `🏁 Fase ${fase} de ${TOTAL_FASES}`;

    document.getElementById("numeroPergunta")
        .textContent =
        `Pergunta ${perguntaNaFase} de ${PERGUNTAS_POR_FASE}`;

    document.getElementById("pontuacao")
        .textContent =
        `⭐ Pontos: ${pontos}`;

    document.getElementById("progressoTexto")
        .textContent =
        `Fase ${fase} — ${respondidas} de 10 respondidas`;

    document.getElementById("tituloJogo")
        .textContent =
        jogoAtual === "bullying"
            ? "🛡️ A Luta Contra o Bullying"
            : "♿ Respeito às Diferenças";

    document.getElementById("numeroBola")
        .textContent =
        perguntaNaFase;

    document.getElementById("pergunta")
        .textContent =
        pergunta.pergunta;

    document.getElementById("feedback")
        .textContent = "";

    document.getElementById("areaProxima")
        .innerHTML = "";

    const alternativas =
        document.getElementById("alternativas");

    alternativas.innerHTML = "";

    const opcoes =
        embaralhar(pergunta.alternativas);

    opcoes.forEach(([texto, valor]) => {

        const botao =
            document.createElement("button");

        botao.className =
            "alternativa";

        botao.textContent =
            texto;

        botao.onclick =
            () => escolherResposta(botao, valor);

        alternativas.appendChild(botao);

    });

    const progresso =
        (respondidas / PERGUNTAS_POR_FASE) * 100;

    document.getElementById("progressoFase")
        .style.width =
        `${progresso}%`;
}


// ======================================================
// RESPONDER
// ======================================================

function escolherResposta(botaoEscolhido, valor) {

    if (respostaDada) return;

    respostaDada = true;

    document.querySelectorAll(".alternativa")
        .forEach(botao => {
            botao.disabled = true;
        });

    if (valor > 0) {

        pontos += valor;

        botaoEscolhido.style.borderColor =
            "#2e7d32";

        botaoEscolhido.style.background =
            "#e8f5e9";

        document.getElementById("feedback")
            .textContent =
            "✅ Muito bem! Essa atitude demonstra respeito.";

        tocarSom(900);

    } else {

        botaoEscolhido.style.borderColor =
            "#c62828";

        document.getElementById("feedback")
            .textContent =
            "❌ Essa não é a melhor atitude. Pense em respeito e empatia.";

        tocarSom(220);
    }

    document.getElementById("pontuacao")
        .textContent =
        `⭐ Pontos: ${pontos}`;

    criarBotaoProxima();
}


// ======================================================
// PRÓXIMA
// ======================================================

function criarBotaoProxima() {

    const area =
        document.getElementById("areaProxima");

    area.innerHTML = "";

    const botao =
        document.createElement("button");

    const ultimaPergunta =
        perguntaAtual === TOTAL_PERGUNTAS - 1;

    const ultimaDaFase =
        (perguntaAtual + 1) %
            PERGUNTAS_POR_FASE === 0;

    if (ultimaPergunta) {

        botao.textContent =
            "🏆 Ver resultado";

    } else if (ultimaDaFase) {

        botao.textContent =
            "🚀 Ir para a próxima fase";

    } else {

        botao.textContent =
            "➡️ Próxima pergunta";
    }

    botao.onclick =
        proximaPergunta;

    area.appendChild(botao);
}

function proximaPergunta() {

    salvarProgresso();

    perguntaAtual++;

    if (perguntaAtual >= TOTAL_PERGUNTAS) {

        mostrarResultado();

        return;
    }

    const novaFase =
        perguntaAtual % PERGUNTAS_POR_FASE === 0;

    if (novaFase) {

        mostrarMensagemFase();

        tocarSom(1100);

    } else {

        mostrarPergunta();
    }
}

function mostrarMensagemFase() {

    const fase =
        Math.floor(
            perguntaAtual / PERGUNTAS_POR_FASE
        ) + 1;

    document.getElementById("pergunta")
        .textContent =
        `🎉 Você chegou à Fase ${fase}!`;

    document.getElementById("alternativas")
        .innerHTML =
        `<p class="centralizado">
            Prepare-se para mais 10 perguntas.
        </p>`;

    document.getElementById("feedback")
        .textContent =
        "🔥 Continue! Você está avançando.";

    document.getElementById("areaProxima")
        .innerHTML = "";

    const botao =
        document.createElement("button");

    botao.textContent =
        `▶️ Começar Fase ${fase}`;

    botao.onclick =
        mostrarPergunta;

    document.getElementById("areaProxima")
        .appendChild(botao);
}


// ======================================================
// RESULTADO E MEDALHAS
// ======================================================

function mostrarResultado() {

    const porcentagem =
        Math.round(
            (pontos /
                (TOTAL_PERGUNTAS * 10)) * 100
        );

    let medalha;
    let mensagem;

    if (porcentagem >= 90) {

        medalha = "🥇 OURO";

        mensagem =
            "Excelente! Você demonstrou muito conhecimento, respeito e empatia.";

    } else if (porcentagem >= 70) {

        medalha = "🥈 PRATA";

        mensagem =
            "Muito bom! Você mostrou uma ótima compreensão do tema.";

    } else if (porcentagem >= 50) {

        medalha = "🥉 BRONZE";

        mensagem =
            "Bom trabalho! Continue aprendendo sobre respeito e inclusão.";

    } else {

        medalha = "📚 PARTICIPAÇÃO";

        mensagem =
            "Continue estudando. O importante é aprender e melhorar.";

    }

    document.getElementById("jogo")
        .classList.add("escondido");

    document.getElementById("resultado")
        .classList.remove("escondido");

    document.getElementById("resultadoTitulo")
        .textContent =
        jogoAtual === "bullying"
            ? "🛡️ A Luta Contra o Bullying"
            : "♿ Respeito às Diferenças";

    document.getElementById("pontuacaoFinal")
        .textContent =
        `⭐ Pontuação: ${pontos}`;

    document.getElementById("porcentagemFinal")
        .textContent =
        `📊 Aproveitamento: ${porcentagem}%`;

    document.getElementById("medalhaFinal")
        .textContent =
        medalha;

    document.getElementById("mensagemFinal")
        .textContent =
        mensagem;

    salvarRanking(
        jogoAtual,
        pontos,
        porcentagem,
        medalha
    );

    localStorage.removeItem("progressoJogo");

    tocarSom(1200);
}


// ======================================================
// RANKING
// ======================================================

function salvarRanking(jogo, pontos, porcentagem, medalha) {

    const ranking =
        JSON.parse(
            localStorage.getItem("rankingJogo") || "[]"
        );

    ranking.push({
        jogo,
        pontos,
        porcentagem,
        medalha,
        data: new Date().toLocaleDateString("pt-BR")
    });

    ranking.sort(
        (a, b) => b.pontos - a.pontos
    );

    localStorage.setItem(
        "rankingJogo",
        JSON.stringify(ranking.slice(0, 10))
    );
}

function mostrarRanking() {

    document.getElementById("inicio")
        .classList.add("escondido");

    document.getElementById("rankingTela")
        .classList.remove("escondido");

    const lista =
        document.getElementById("rankingLista");

    const ranking =
        JSON.parse(
            localStorage.getItem("rankingJogo") || "[]"
        );

    if (ranking.length === 0) {

        lista.innerHTML =
            `<p class="centralizado">
                Ainda não existem pontuações.
                Jogue para aparecer no ranking!
            </p>`;

        return;
    }

    lista.innerHTML = "";

    ranking.forEach((item, indice) => {

        const div =
            document.createElement("div");

        div.className =
            "ranking-item";

        const medalhaPosicao =
            indice === 0 ? "🥇" :
            indice === 1 ? "🥈" :
            indice === 2 ? "🥉" :
            `${indice + 1}º`;

        const nome =
            item.jogo === "bullying"
                ? "🛡️ Bullying"
                : "♿ Inclusão";

        div.innerHTML = `
            <span class="ranking-posicao">
                ${medalhaPosicao}
            </span>

            <span class="ranking-nome">
                ${nome}<br>
                <small>${item.data}</small>
            </span>

            <span class="ranking-pontos">
                ${item.pontos} pts
            </span>
        `;

        lista.appendChild(div);
    });
}

function fecharRanking() {

    document.getElementById("rankingTela")
        .classList.add("escondido");

    document.getElementById("inicio")
        .classList.remove("escondido");
}


// ======================================================
// SALVAR / CONTINUAR
// ======================================================

function salvarProgresso() {

    const dados = {
        jogo: jogoAtual,
        pergunta: perguntaAtual,
        pontos: pontos,
        ordem: perguntasDoJogo
    };

    localStorage.setItem(
        "progressoJogo",
        JSON.stringify(dados)
    );
}

function salvarESair() {

    salvarProgresso();

    document.getElementById("jogo")
        .classList.add("escondido");

    document.getElementById("inicio")
        .classList.remove("escondido");

    verificarJogoSalvo();
}

function verificarJogoSalvo() {

    const salvo =
        localStorage.getItem("progressoJogo");

    const area =
        document.getElementById("continuarArea");

    if (!salvo) {

        area.classList.add("escondido");

        return;
    }

    const dados =
        JSON.parse(salvo);

    const nome =
        dados.jogo === "bullying"
            ? "A Luta Contra o Bullying"
            : "Respeito às Diferenças";

    const fase =
        Math.floor(
            dados.pergunta / PERGUNTAS_POR_FASE
        ) + 1;

    const pergunta =
        (dados.pergunta %
            PERGUNTAS_POR_FASE) + 1;

    document.getElementById("jogoSalvoTexto")
        .textContent =
        `${nome} — Fase ${fase}, pergunta ${pergunta}. Pontos: ${dados.pontos}.`;

    area.classList.remove("escondido");
}

function continuarJogo() {

    const salvo =
        localStorage.getItem("progressoJogo");

    if (!salvo) return;

    const dados =
        JSON.parse(salvo);

    jogoAtual = dados.jogo;

    perguntaAtual = dados.pergunta;

    pontos = dados.pontos;

    perguntasDoJogo =
        dados.ordem ||
        embaralhar(
            jogoAtual === "bullying"
                ? perguntasBullying
                : perguntasInclusao
        );

    document.getElementById("inicio")
        .classList.add("escondido");

    document.getElementById("rankingTela")
        .classList.add("escondido");

    document.getElementById("resultado")
        .classList.add("escondido");

    document.getElementById("jogo")
        .classList.remove("escondido");

    mostrarPergunta();
}

function apagarProgresso() {

    localStorage.removeItem("progressoJogo");

    document.getElementById("continuarArea")
        .classList.add("escondido");
}


// ======================================================
// BOTÕES FINAIS
// ======================================================

function jogarNovamente() {

    selecionarJogo(jogoAtual);
}

function voltarAoMenu() {

    document.getElementById("resultado")
        .classList.add("escondido");

    document.getElementById("jogo")
        .classList.add("escondido");

    document.getElementById("inicio")
        .classList.remove("escondido");

    verificarJogoSalvo();
}


// ======================================================
// INICIAR
// ======================================================

window.onload =
    verificarJogoSalvo;
