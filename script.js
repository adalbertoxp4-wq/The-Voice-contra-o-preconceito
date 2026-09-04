// ======================================================
// JUNTOS CONTRA O BULLYING
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
        errada2: "Participar da agressão para tentar se enturmar.",
        errada3: "Fazer de conta que não viu o problema."
    },
    {
        assunto: "cyberbullying",
        correta: "Guardar as provas, não revidar e procurar ajuda.",
        errada1: "Responder com outra ofensa.",
        errada2: "Compartilhar a mensagem ofensiva com mais pessoas.",
        errada3: "Responder publicamente com outra provocação."
    },
    {
        assunto: "empatia",
        correta: "Ouvir a pessoa e tentar compreender o que ela está sentindo.",
        errada1: "Dizer que o sentimento dela não importa.",
        errada2: "Fazer piada com o problema.",
        errada3: "Mudar de assunto para evitar qualquer conversa."
    },
    {
        assunto: "exclusão",
        correta: "Convidar a pessoa para participar e tratá-la com respeito.",
        errada1: "Impedir que ela participe de propósito.",
        errada2: "Fazer comentários para deixá-la constrangida.",
        errada3: "Dizer que ela deve resolver tudo sozinha."
    },
    {
        assunto: "apelidos ofensivos",
        correta: "Parar de usar o apelido e respeitar o nome da pessoa.",
        errada1: "Continuar usando mesmo depois de ela pedir para parar.",
        errada2: "Criar um apelido ainda mais ofensivo.",
        errada3: "Pedir que outras pessoas continuem usando o apelido."
    },
    {
        assunto: "respeito",
        correta: "Tratar as pessoas com educação mesmo quando pensamos diferente.",
        errada1: "Humilhar quem possui uma opinião diferente.",
        errada2: "Usar diferenças pessoais para ofender.",
        errada3: "Evitar conversar com quem pensa diferente."
    },
    {
        assunto: "testemunha",
        correta: "Apoiar a vítima e comunicar o ocorrido a alguém responsável.",
        errada1: "Filmar a agressão para publicar nas redes.",
        errada2: "Incentivar os envolvidos a continuar brigando.",
        errada3: "Publicar o vídeo para conseguir mais visualizações."
    },
    {
        assunto: "preconceito",
        correta: "Questionar estereótipos e conhecer as pessoas sem julgamentos.",
        errada1: "Julgar alguém apenas pela aparência.",
        errada2: "Espalhar estereótipos como se fossem verdades.",
        errada3: "Tirar conclusões sobre alguém sem conhecê-lo."
    },
    {
        assunto: "diferenças",
        correta: "Valorizar as diferenças e tratar todos com dignidade.",
        errada1: "Afastar alguém por ser diferente.",
        errada2: "Usar uma característica da pessoa para ridicularizá-la.",
        errada3: "Afastar a pessoa das atividades do grupo."
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
        errada2: "Fazer comentários ofensivos sobre sua deficiência.",
        errada3: "Tomar decisões por ela sem perguntar."
    },
    {
        assunto: "acessibilidade",
        correta: "Garantir que pessoas diferentes possam participar com autonomia e segurança.",
        errada1: "Bloquear rampas e caminhos acessíveis.",
        errada2: "Retirar recursos de acessibilidade sem necessidade.",
        errada3: "Deixar obstáculos em caminhos adaptados."
    },
    {
        assunto: "capacitismo",
        correta: "Respeitar a autonomia e combater atitudes discriminatórias.",
        errada1: "Considerar uma pessoa incapaz apenas por ter deficiência.",
        errada2: "Fazer piadas sobre deficiência.",
        errada3: "Supor limites sem conversar com a pessoa."
    },
    {
        assunto: "autismo",
        correta: "Respeitar as necessidades, a comunicação e a individualidade da pessoa.",
        errada1: "Forçar a pessoa a agir exatamente como todos os outros.",
        errada2: "Fazer piadas sobre características do autismo.",
        errada3: "Ignorar formas diferentes de comunicação."
    },
    {
        assunto: "idosos",
        correta: "Respeitar a autonomia, ouvir e oferecer ajuda quando necessário.",
        errada1: "Tratar toda pessoa idosa como incapaz.",
        errada2: "Ignorar sua opinião.",
        errada3: "Decidir tudo por ele sem necessidade."
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
        { nivel: 1, nome: "Iniciante", texto: "Qual atitude ajuda a enfrentar ASSUNTO?" },
        { nivel: 2, nome: "Iniciante", texto: "Ao perceber uma situação de ASSUNTO, qual é a melhor reação?" },
        { nivel: 3, nome: "Intermediário", texto: "Qual comportamento demonstra respeito diante de ASSUNTO?" },
        { nivel: 4, nome: "Intermediário", texto: "Em uma situação de ASSUNTO, qual escolha tende a ajudar?" },
        { nivel: 5, nome: "Intermediário", texto: "Por que é importante agir corretamente diante de ASSUNTO?" },
        { nivel: 6, nome: "Difícil", texto: "Um estudante presencia ASSUNTO. Qual decisão é mais responsável?" },
        { nivel: 7, nome: "Difícil", texto: "Qual atitude pode reduzir os efeitos de ASSUNTO no ambiente escolar?" },
        { nivel: 8, nome: "Difícil", texto: "Diante de ASSUNTO, qual resposta evita agravar o conflito?" },
        { nivel: 9, nome: "Muito difícil", texto: "Considere uma situação de ASSUNTO. Qual alternativa apresenta a ação mais adequada?" },
        { nivel: 10, nome: "Muito difícil", texto: "Em um caso envolvendo ASSUNTO, qual análise melhor orienta uma atitude respeitosa?" },
        { nivel: 11, nome: "Muito difícil", texto: "Se uma pessoa sofre ASSUNTO repetidamente, qual medida deve ser priorizada?" },
        { nivel: 12, nome: "Desafio máximo", texto: "Imagine que você precise intervir em uma situação de ASSUNTO. Qual escolha é mais segura e ética?" },
        { nivel: 13, nome: "Desafio máximo", texto: "Uma turma enfrenta um problema relacionado a ASSUNTO. Qual ação tende a produzir uma solução mais justa?" },
        { nivel: 14, nome: "Desafio máximo", texto: "Analise uma situação de ASSUNTO em que diferentes pessoas discordam. Qual conduta demonstra maior responsabilidade?" },
        { nivel: 15, nome: "Desafio máximo", texto: "Em um cenário complexo envolvendo ASSUNTO, qual decisão melhor combina respeito, segurança e responsabilidade?" }
    ];

    const resultado = [];

    temas.forEach((tema, temaIndex) => {
        modelos.forEach((modelo, modeloIndex) => {
            let correta = tema.correta;

            // A resposta correta também varia de tamanho:
            // curta, média e longa, sem mudar seu sentido.
            if ((temaIndex + modeloIndex) % 3 === 0) {
                correta = encurtarRespostaCorreta(correta);
            } else if ((temaIndex + modeloIndex) % 3 === 1) {
                correta = tema.correta;
            } else {
                correta = alongarRespostaCorreta(tema.correta);
            }

            resultado.push({
                pergunta: modelo.texto.replace("ASSUNTO", tema.assunto),
                nivel: modelo.nivel,
                nomeNivel: modelo.nome,
                alternativas: [
                    [correta, obterPontuacaoPorNivel(modelo.nivel)],
                    [tema.errada1, 0],
                    [tema.errada2, 0],
                    [tema.errada3 || "Escolher uma atitude que não ajuda a resolver a situação.", 0]
                ]
            });
        });
    });

    resultado.sort((a, b) => a.nivel - b.nivel);

    resultado.forEach((questao, indice) => {
        questao.numeroDificuldade = indice + 1;
        questao.nivel = indice + 1;
        window.__numeroPerguntaAtual = indice + 1;
        window.__numeroPerguntaAtual = indice + 1;

        if (indice < 30) {
            questao.nomeNivel = "🟢 Iniciante";
        } else if (indice < 60) {
            questao.nomeNivel = "🟡 Intermediário";
        } else if (indice < 90) {
            questao.nomeNivel = "🟠 Difícil";
        } else if (indice < 120) {
            questao.nomeNivel = "🔴 Muito difícil";
        } else {
            questao.nomeNivel = "🟣 Desafio máximo";
        }

        const pontosProgressivos =
            indice < 30 ? 10 :
            indice < 60 ? 12 :
            indice < 90 ? 15 :
            indice < 120 ? 20 : 25;

        questao.alternativas = questao.alternativas.map(([texto, valor]) => [
            texto,
            valor > 0 ? pontosProgressivos : 0
        ]);

        window.__numeroPerguntaAtual = questao.numeroDificuldade || (perguntaAtual + 1);
        window.__numeroPerguntaAtual = questao.numeroDificuldade || (perguntaAtual + 1);
        questao.alternativas = equilibrarTamanhoAlternativas(questao.alternativas);
    });

    return resultado;
}

const perguntasBullying = gerarPerguntas(temasBullying);
const perguntasInclusao = gerarPerguntas(temasInclusao);


// ======================================================
// EMBARALHAR
// ======================================================

function encurtarRespostaCorreta(texto) {
    const partes = texto.split(/[,.!?;]/).map(p => p.trim()).filter(Boolean);
    return partes[0] || texto;
}

function alongarRespostaCorreta(texto) {
    if (texto.endsWith(".")) {
        return texto + " Essa atitude ajuda a proteger a dignidade da pessoa envolvida.";
    }
    return texto + ". Essa atitude ajuda a proteger a dignidade da pessoa envolvida.";
}

function equilibrarTamanhoAlternativas(alternativas) {
    /*
     * O tamanho da alternativa correta varia de propósito.
     * Em algumas perguntas ela é menor que TODAS as erradas.
     * Em outras, uma ou mais erradas são maiores que ela.
     * Em outras, ela fica no meio.
     * Assim, o jogador não consegue descobrir a resposta pelo tamanho.
     */

    const copia = alternativas.map(([texto, valor]) => [texto, valor]);
    const correta = copia.findIndex(([, valor]) => valor > 0);

    if (correta === -1) return copia;

    const erradas = copia
        .map(([texto, valor], i) => ({ texto, valor, i }))
        .filter(item => item.i !== correta)
        .sort((a, b) => a.texto.length - b.texto.length);

    const n = window.__numeroPerguntaAtual || 1;
    const padrao = (n - 1) % 6;

    const extras = [
        " para evitar que o problema continue.",
        " e procurar uma solução responsável.",
        " pensando nas consequências para todos.",
        " sem aumentar o conflito entre as pessoas.",
        " de forma respeitosa e segura.",
        " para melhorar a convivência na escola."
    ];

    // 0 e 3: correta MENOR que todas as erradas.
    if (padrao === 0 || padrao === 3) {
        let c = copia[correta][0]
            .replace(/,\s*(e|mas|porque)\b.*$/i, "")
            .replace(/\.\s*$/, "")
            .trim();

        if (c.length > 55) {
            c = c.split(/\s+/).slice(0, 8).join(" ");
        }

        copia[correta][0] = c.endsWith(".") ? c : c + ".";

        erradas.forEach((item, i) => {
            let t = item.texto.trim();
            while (t.length <= copia[correta][0].length + 10) {
                t += extras[i % extras.length];
            }
            copia[item.i][0] = t;
        });
    }

    // 1 e 4: uma errada menor e pelo menos duas maiores que a correta.
    else if (padrao === 1 || padrao === 4) {
        let c = copia[correta][0].trim();
        if (c.length > 95) {
            c = c.substring(0, 90).replace(/\s+\S*$/, "") + ".";
        }
        copia[correta][0] = c;

        // menor
        copia[erradas[0].i][0] =
            erradas[0].texto.split(/[,.!?]/)[0].trim() + ".";

        // maiores
        for (let i = 1; i < erradas.length; i++) {
            let t = erradas[i].texto;
            while (t.length <= c.length + (i === 1 ? 8 : 22)) {
                t += extras[(i + n) % extras.length];
            }
            copia[erradas[i].i][0] = t;
        }
    }

    // 2: correta fica entre uma errada menor e duas maiores.
    else if (padrao === 2) {
        const c = copia[correta][0].trim();
        copia[correta][0] = c;

        copia[erradas[0].i][0] =
            erradas[0].texto.split(/[,.!?]/)[0].trim() + ".";

        for (let i = 1; i < erradas.length; i++) {
            let t = erradas[i].texto;
            while (t.length <= c.length + 10) {
                t += extras[(i + n) % extras.length];
            }
            copia[erradas[i].i][0] = t;
        }
    }

    // 5: tamanhos misturados, sem padrão óbvio.
    else {
        const c = copia[correta][0].trim();
        copia[correta][0] = c;

        copia[erradas[0].i][0] =
            erradas[0].texto.split(/[,.!?]/)[0].trim() + ".";

        let t = erradas[1].texto;
        if (t.length < c.length + 5) t += extras[n % extras.length];
        copia[erradas[1].i][0] = t;

        t = erradas[2].texto;
        while (t.length <= c.length + 18) {
            t += extras[(n + 2) % extras.length];
        }
        copia[erradas[2].i][0] = t;
    }

    return copia;
}

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
        [...(tipo === "bullying"
            ? perguntasBullying
            : perguntasInclusao)];

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

    // Mostra o nível atual e deixa claro que a dificuldade aumenta.
    const numeroDesafio = pergunta.numeroDificuldade || (perguntaAtual + 1);

    document.getElementById("progressoTexto")
        .textContent =
        `Fase ${fase} — ${respondidas} de 10 respondidas — 🔥 ${pergunta.nomeNivel} — Desafio ${numeroDesafio}/150`;

    document.getElementById("pontuacao")
        .textContent =
        `⭐ Pontos: ${pontos}`;

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

    opcoes.forEach(([texto, valor], indice) => {

        const botao =
            document.createElement("button");

        botao.className =
            "alternativa";

        botao.textContent =
            `${String.fromCharCode(65 + indice)}) ${texto}`;

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

    // Salva também depois da resposta para não perder o progresso.
    salvarProgresso();

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

    localStorage.removeItem(chaveProgresso(jogoAtual));

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
// Cada jogo possui seu próprio progresso.
// ======================================================

function chaveProgresso(jogo) {
    return jogo === "bullying" ? "progressoBullying" : "progressoInclusao";
}

function salvarProgresso() {
    if (!jogoAtual || !perguntasDoJogo.length) return;

    const dados = {
        jogo: jogoAtual,
        pergunta: perguntaAtual,
        pontos: pontos,
        ordem: perguntasDoJogo
    };

    localStorage.setItem(chaveProgresso(jogoAtual), JSON.stringify(dados));
}

function salvarESair() {
    salvarProgresso();
    document.getElementById("jogo").classList.add("escondido");
    document.getElementById("inicio").classList.remove("escondido");
    verificarJogosSalvos();
}

function obterProgresso(jogo) {
    const salvo = localStorage.getItem(chaveProgresso(jogo));
    if (!salvo) return null;
    try { return JSON.parse(salvo); }
    catch (erro) {
        localStorage.removeItem(chaveProgresso(jogo));
        return null;
    }
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

    if (bullying) {
        const fase = Math.floor(bullying.pergunta / PERGUNTAS_POR_FASE) + 1;
        const pergunta = (bullying.pergunta % PERGUNTAS_POR_FASE) + 1;
        html += `
            <div class="jogo-salvo">
                <strong>🛡️ A Luta Contra o Bullying</strong>
                <span>Fase ${fase} de ${TOTAL_FASES} — Pergunta ${pergunta} de 10 — ${bullying.pontos} pontos</span>
                <button onclick="continuarJogo('bullying')">▶️ Continuar Bullying</button>
                <button class="botao-apagar" onclick="apagarProgresso('bullying')">🗑️ Apagar</button>
            </div>`;
    }

    if (inclusao) {
        const fase = Math.floor(inclusao.pergunta / PERGUNTAS_POR_FASE) + 1;
        const pergunta = (inclusao.pergunta % PERGUNTAS_POR_FASE) + 1;
        html += `
            <div class="jogo-salvo">
                <strong>♿ Respeito às Diferenças</strong>
                <span>Fase ${fase} de ${TOTAL_FASES} — Pergunta ${pergunta} de 10 — ${inclusao.pontos} pontos</span>
                <button onclick="continuarJogo('inclusao')">▶️ Continuar Inclusão</button>
                <button class="botao-apagar" onclick="apagarProgresso('inclusao')">🗑️ Apagar</button>
            </div>`;
    }

    area.innerHTML = html;
    area.classList.remove("escondido");
}

function continuarJogo(tipo) {
    const dados = obterProgresso(tipo);
    if (!dados) return;

    jogoAtual = dados.jogo;
    perguntaAtual = dados.pergunta;
    pontos = dados.pontos;
    perguntasDoJogo = dados.ordem || embaralhar(
        jogoAtual === "bullying" ? perguntasBullying : perguntasInclusao
    );

    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("rankingTela").classList.add("escondido");
    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("jogo").classList.remove("escondido");

    mostrarPergunta();
}

function apagarProgresso(tipo) {
    localStorage.removeItem(chaveProgresso(tipo));
    verificarJogosSalvos();
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
