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
    {
        nivel: 1,
        nome: "Iniciante",
        pontos: 10,
        texto: "Em uma situação de ASSUNTO, qual atitude é mais respeitosa?",
        errada1: "Fingir que não percebeu o problema e seguir normalmente.",
        errada2: "Fazer uma brincadeira para tentar deixar a situação mais leve."
    },
    {
        nivel: 1,
        nome: "Iniciante",
        pontos: 10,
        texto: "Uma pessoa está passando por uma situação de ASSUNTO. O que ajuda mais?",
        errada1: "Esperar que ela resolva tudo sozinha, mesmo pedindo ajuda.",
        errada2: "Comentar o caso com outras pessoas antes de procurar ajuda."
    },
    {
        nivel: 1,
        nome: "Iniciante",
        pontos: 10,
        texto: "Qual escolha demonstra respeito quando falamos sobre ASSUNTO?",
        errada1: "Evitar a pessoa para não se envolver com o problema.",
        errada2: "Usar a situação para ganhar atenção entre os colegas."
    },
    {
        nivel: 2,
        nome: "Fácil",
        pontos: 10,
        texto: "Você presencia uma situação de ASSUNTO e percebe que a pessoa ficou constrangida. Qual é a melhor reação?",
        errada1: "Perguntar em público detalhes da situação para entender melhor.",
        errada2: "Esperar que outras pessoas tomem uma atitude primeiro."
    },
    {
        nivel: 2,
        nome: "Fácil",
        pontos: 10,
        texto: "Qual comportamento contribui para prevenir uma situação de ASSUNTO antes que ela se agrave?",
        errada1: "Tratar comentários ofensivos como algo normal entre colegas.",
        errada2: "Intervir apenas quando o problema já tiver causado consequências."
    },
    {
        nivel: 2,
        nome: "Fácil",
        pontos: 10,
        texto: "Um colega pede sua ajuda diante de ASSUNTO. Qual resposta é mais adequada?",
        errada1: "Dizer que o problema não é seu e que ele deve resolver sozinho.",
        errada2: "Oferecer ajuda sem ouvir o que a pessoa realmente precisa."
    },
    {
        nivel: 3,
        nome: "Intermediário",
        pontos: 15,
        texto: "Em um grupo, alguém sugere uma atitude relacionada a ASSUNTO que pode prejudicar outra pessoa. O que você deve considerar antes de concordar?",
        errada1: "Se a maioria do grupo concorda, mesmo que alguém seja prejudicado.",
        errada2: "Se a situação pode render uma boa piada ou receber muitas curtidas."
    },
    {
        nivel: 3,
        nome: "Intermediário",
        pontos: 15,
        texto: "Uma situação de ASSUNTO parece uma brincadeira para alguns, mas incomoda repetidamente uma pessoa. Qual análise é mais adequada?",
        errada1: "Se algumas pessoas estão rindo, então não existe problema.",
        errada2: "Se não houve agressão física, a situação nunca pode ser grave."
    },
    {
        nivel: 3,
        nome: "Intermediário",
        pontos: 15,
        texto: "Ao tentar resolver um caso de ASSUNTO, por que é importante ouvir a pessoa afetada?",
        errada1: "Porque a versão dela deve ser aceita automaticamente sem verificar mais nada.",
        errada2: "Porque ouvir a pessoa permite decidir por ela o que deve acontecer."
    },
    {
        nivel: 3,
        nome: "Intermediário",
        pontos: 15,
        texto: "Qual situação exige mais cuidado ao lidar com ASSUNTO?",
        errada1: "Uma situação em que ninguém demonstrou desconforto, então não é preciso conversar.",
        errada2: "Uma situação em que o grupo decidiu resolver o problema expondo a pessoa publicamente."
    },
    {
        nivel: 4,
        nome: "Difícil",
        pontos: 20,
        texto: "Considere este caso: uma pessoa pratica ASSUNTO contra outra, mas afirma que era apenas uma brincadeira. Qual critério é mais importante para avaliar a situação?",
        errada1: "A intenção de quem praticou a ação, independentemente do efeito causado.",
        errada2: "A opinião da maioria dos espectadores sobre se a brincadeira foi engraçada."
    },
    {
        nivel: 4,
        nome: "Difícil",
        pontos: 20,
        texto: "Uma escola quer enfrentar ASSUNTO de forma preventiva. Qual medida tende a ser mais eficaz?",
        errada1: "Criar regras apenas depois que um caso grave acontecer.",
        errada2: "Punir todos os envolvidos da mesma maneira sem investigar o contexto."
    },
    {
        nivel: 4,
        nome: "Difícil",
        pontos: 20,
        texto: "Em um conflito envolvendo ASSUNTO, qual atitude evita transformar a vítima em responsável pelo problema?",
        errada1: "Perguntar por que ela não reagiu ou não se defendeu antes.",
        errada2: "Orientá-la a ignorar tudo para impedir que o caso ganhe importância."
    },
    {
        nivel: 5,
        nome: "Muito difícil",
        pontos: 25,
        texto: "Analise: uma atitude relacionada a ASSUNTO não contém uma ofensa explícita, mas cria uma desvantagem repetida para determinada pessoa. Qual princípio deve orientar a avaliação?",
        errada1: "Só existe discriminação quando alguém declara claramente uma intenção de discriminar.",
        errada2: "Uma prática é aceitável se sempre foi utilizada pela maioria das pessoas."
    },
    {
        nivel: 5,
        nome: "Muito difícil",
        pontos: 25,
        texto: "Em uma situação complexa de ASSUNTO, duas pessoas apresentam versões diferentes. Qual procedimento é mais responsável?",
        errada1: "Escolher imediatamente o lado de quem tem mais amigos ou influência no grupo.",
        errada2: "Publicar as duas versões para que os colegas decidam quem está certo."
    },
    {
        nivel: 6,
        nome: "Desafio máximo",
        pontos: 30,
        texto: "Uma ação relacionada a ASSUNTO parece neutra, mas seus efeitos atingem muito mais um determinado grupo. Qual conceito ajuda a perceber esse problema?",
        errada1: "Se a regra é igual para todos no papel, seus efeitos necessariamente também são iguais.",
        errada2: "Apenas atitudes feitas com intenção explícita podem produzir desigualdade."
    }
];

function obterPontuacaoPorNivel(nivel) {
    if (nivel <= 2) return 10;
    if (nivel === 3) return 15;
    if (nivel === 4) return 20;
    if (nivel === 5) return 25;
    return 30;
}

function gerarPerguntas(temas) {

    const resultado = [];

    // Cada tema recebe as 15 dificuldades.
    // Depois ordenamos pelo nível para a dificuldade crescer ao longo do jogo.
    temas.forEach(tema => {
        modelos.forEach(modelo => {

            resultado.push({
                pergunta: modelo.texto.replace("ASSUNTO", tema.assunto),
                nivel: modelo.nivel,
                nomeNivel: modelo.nome,
                alternativas: [
                    [tema.correta, obterPontuacaoPorNivel(modelo.nivel)],
                    [modelo.errada1, 0],
                    [modelo.errada2, 0]
                ]
            });

        });
    });

    resultado.sort((a, b) => a.nivel - b.nivel);

    // A dificuldade agora é progressiva ao longo das 150 perguntas.
    // O conteúdo sobe de nível e os pontos aumentam conforme o jogador avança.
    resultado.forEach((questao, indice) => {
        questao.numeroDificuldade = indice + 1;

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

        // Mantém a pontuação da resposta correta.
        questao.alternativas = questao.alternativas.map(([texto, valor]) => [
            texto,
            valor > 0 ? pontosProgressivos : 0
        ]);

        // IMPORTANTE: a alternativa correta não pode ser identificada pelo tamanho.
        // Se ela ficar sendo a maior, aumentamos uma alternativa errada com uma
        // continuação natural. Assim, o jogador precisa realmente analisar a questão.
        questao.alternativas = equilibrarTamanhoAlternativas(questao.alternativas);
    });

    return resultado;
}

const perguntasBullying = gerarPerguntas(temasBullying);
const perguntasInclusao = gerarPerguntas(temasInclusao);


// ======================================================
// EMBARALHAR
// ======================================================

function equilibrarTamanhoAlternativas(alternativas) {

    const opcoes = alternativas.map(([texto, valor]) => ({ texto, valor }));
    const correta = opcoes.find(opcao => opcao.valor > 0);
    const erradas = opcoes.filter(opcao => opcao.valor === 0);

    if (!correta || erradas.length === 0) return alternativas;

    const maiorErrada = erradas.reduce((maior, atual) =>
        atual.texto.length > maior.texto.length ? atual : maior
    );

    // Não deixamos a resposta correta ser sempre a maior alternativa.
    if (correta.texto.length >= maiorErrada.texto.length) {
        const complementos = [
            " mesmo quando a situação parece uma simples brincadeira.",
            " porque essa atitude pode afetar a outra pessoa e piorar o problema.",
            " mesmo que outras pessoas do grupo digam que não há nada de errado.",
            " considerando também as consequências para quem está sendo afetado.",
            " especialmente quando isso acontece repetidamente ou diante de outras pessoas."
        ];

        const complemento = complementos[
            Math.floor(Math.random() * complementos.length)
        ];

        maiorErrada.texto += complemento;
    }

    return opcoes.map(opcao => [opcao.texto, opcao.valor]);
}


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
