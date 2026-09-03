// ==========================================================
// JUNTOS CONTRA O BULLYING
// 2 jogos | 150 perguntas por jogo | 300 perguntas no total
// 4 alternativas | dificuldade progressiva | salvamento separado
// ==========================================================

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

// ----------------------------------------------------------
// BANCO NOVO — JOGO 1: BULLYING
// Cada tema gera 5 perguntas DIFERENTES.
// Portanto: 30 temas x 5 = 150 perguntas.
// ----------------------------------------------------------
const bancoBullying = [
    ["apelidos ofensivos", "um colega recebe um apelido que já pediu para não usar", "respeitar o pedido e usar o nome da pessoa", ["continuar porque os outros acham engraçado", "inventar outro apelido para substituir o primeiro", "dizer que ela precisa aprender a aceitar a brincadeira"]],
    ["cyberbullying", "uma mensagem humilhante é publicada em um grupo da escola", "não participar da exposição, guardar as evidências e procurar ajuda", ["compartilhar a publicação para mostrar aos amigos", "responder com uma ofensa ainda mais forte", "apagar tudo imediatamente sem contar a ninguém"]],
    ["exclusão", "um estudante está sendo deixado de fora de uma atividade sem motivo justo", "convidá-lo para participar e evitar uma exclusão intencional", ["aceitar a exclusão porque o grupo já decidiu", "fazer piada com a pessoa para que ela se afaste", "criar outra atividade apenas para manter a pessoa distante"]],
    ["humilhação pública", "um aluno é ridicularizado na frente da turma", "interromper a situação de forma segura e buscar um adulto responsável", ["rir para não chamar atenção para si", "filmar a cena e mandar para outros colegas", "pedir que a vítima responda com outra humilhação"]],
    ["boato", "um comentário sem confirmação começa a circular sobre um colega", "não espalhar o boato e incentivar a busca por informações confiáveis", ["repassar somente para amigos próximos", "acrescentar detalhes para a história parecer verdadeira", "publicar uma enquete perguntando quem acredita no boato"]],
    ["ameaça", "um estudante recebe ameaças repetidas de outro aluno", "levar a situação a um adulto de confiança e preservar as mensagens", ["combinar uma briga para resolver o conflito", "ameaçar de volta para mostrar coragem", "ignorar sempre, mesmo quando a ameaça aumenta"]],
    ["testemunha", "você presencia uma agressão verbal contra um colega", "apoiar a pessoa e comunicar o ocorrido a alguém responsável", ["ficar incentivando os envolvidos para ver até onde chega", "gravar para publicar nas redes sociais", "fingir que não viu para evitar qualquer responsabilidade"]],
    ["pressão do grupo", "seus amigos querem que você zoe um colega para entrar na brincadeira", "recusar a participação e mostrar que humilhar alguém não é necessário", ["aceitar para não parecer diferente dos amigos", "fazer uma piada leve primeiro e depois aumentar", "esperar todos começarem e apenas acompanhar"]],
    ["diferença física", "um colega é alvo de comentários por causa de sua aparência", "não transformar características físicas em motivo de humilhação", ["fazer comentários só quando a pessoa não estiver perto", "dizer que aparência é um assunto público", "comparar a pessoa com outras para descobrir quem é mais bonita"]],
    ["erro na sala", "um estudante erra uma resposta e alguns colegas começam a rir", "tratar o erro como parte do aprendizado e evitar constrangimento", ["imitar a resposta errada para divertir a turma", "lembrar do erro sempre que a pessoa falar", "pedir que o professor exponha quem errou para dar uma lição"]],
    ["jogos online", "um jogador é insultado repetidamente durante uma partida", "bloquear ou denunciar a agressão e não responder com o mesmo comportamento", ["ofender o outro jogador até ele sair", "publicar os dados pessoais dele como vingança", "chamar mais pessoas para atacar a conta"]],
    ["grupo de mensagens", "colegas criam um grupo para fazer piadas contra uma pessoa", "não participar e procurar ajuda se a situação estiver causando dano", ["entrar no grupo apenas para observar e salvar as piadas", "mandar as piadas para outro grupo", "pedir que a pessoa entre para se defender sozinha"]],
    ["fotografia sem consentimento", "uma foto constrangedora de um colega é compartilhada sem autorização", "não compartilhar a imagem e procurar ajuda para interromper a divulgação", ["mandar a imagem somente para uma pessoa de confiança", "editar a foto e publicar uma versão mais engraçada", "pedir mais fotos para comparar"]],
    ["comentário preconceituoso", "alguém faz uma fala ofensiva sobre uma característica de um colega", "questionar a fala com respeito e não normalizar a discriminação", ["rir para mostrar que não ficou incomodado", "repetir a frase quando a pessoa não estiver presente", "dizer que preconceito só existe quando há agressão física"]],
    ["isolamento", "um colega passa a ficar sozinho depois de sofrer provocações", "aproximar-se com respeito e comunicar a situação quando necessário", ["deixar a pessoa sozinha porque ela pode querer isso", "fazer perguntas sobre o problema na frente de todos", "dizer que o isolamento é consequência normal das brincadeiras"]],
    ["repetição de provocações", "as mesmas provocações acontecem com frequência contra uma pessoa", "reconhecer que a repetição torna a situação séria e buscar intervenção", ["considerar normal porque cada provocação é pequena", "esperar até a pessoa reagir com violência", "pedir que os colegas decidam se a vítima está exagerando"]],
    ["culpar a vítima", "alguém pergunta por que a vítima não reagiu ao bullying", "evitar culpabilizar a vítima e concentrar a atenção na agressão", ["dizer que ela deveria ter sido mais forte", "afirmar que o silêncio dela permitiu a situação", "sugerir que ela mude seu jeito para não ser provocada"]],
    ["denúncia", "um estudante quer contar à escola que está sofrendo bullying", "escutá-lo com respeito e orientá-lo a procurar um adulto responsável", ["convencê-lo a guardar segredo para evitar confusão", "exigir que ele confronte o agressor sozinho", "publicar o relato para pressionar a escola"]],
    ["conflito ou bullying", "dois estudantes discutem uma vez e apresentam opiniões diferentes", "avaliar o contexto antes de chamar qualquer conflito de bullying", ["afirmar que toda discussão é automaticamente bullying", "ignorar qualquer conflito porque nunca pode ser sério", "escolher um culpado apenas pela aparência"]],
    ["brincadeira consentida", "dois amigos fazem uma brincadeira que ambos consideram divertida", "respeitar os limites e interromper se alguém demonstrar desconforto", ["continuar mesmo quando um dos dois pede para parar", "dizer que amizade permite qualquer brincadeira", "registrar tudo para provar quem estava se divertindo"]],
    ["reação segura", "uma pessoa presencia bullying e teme se colocar em perigo", "procurar ajuda de um adulto sem se colocar em risco", ["entrar fisicamente na briga independentemente do risco", "enfrentar sozinho o agressor", "filmar de perto para ter uma prova"]],
    ["responsabilidade digital", "um colega pede para você repassar um meme humilhante", "pensar nas consequências e não colaborar com a exposição", ["repassar porque o meme já está circulando", "mandar apenas para pessoas que não conhecem a vítima", "alterar a legenda para deixá-la ainda mais ofensiva"]],
    ["empatia", "uma pessoa conta que determinada piada a machucou", "ouvir sem diminuir o sentimento e rever o comportamento", ["dizer que ela não sabe brincar", "explicar que a intenção era engraçada e encerrar o assunto", "pedir que ela prove diante do grupo que ficou triste"]],
    ["mediação", "um conflito entre colegas precisa de ajuda para ser resolvido", "permitir uma conversa orientada por alguém responsável e ouvir os envolvidos", ["fazer uma votação para decidir quem está certo", "resolver o caso por meio de exposição nas redes", "obrigar os envolvidos a pedir desculpas sem ouvir o que aconteceu"]],
    ["regras da escola", "a escola recebe uma denúncia de bullying", "investigar a situação, acolher os envolvidos e aplicar as medidas adequadas", ["punir imediatamente sem ouvir ninguém", "ignorar se não houver testemunhas", "resolver apenas com uma postagem nas redes sociais"]],
    ["impacto emocional", "uma pessoa passa a evitar a escola depois de sofrer agressões", "levar a mudança de comportamento a sério e buscar apoio", ["dizer que ela precisa simplesmente esquecer", "considerar a ausência uma forma de chamar atenção", "esperar até o comportamento desaparecer sozinho"]],
    ["respeito nas diferenças", "um grupo percebe que um colega tem hábitos diferentes dos demais", "conhecer a pessoa e respeitar suas diferenças", ["imitar os hábitos para provocar risadas", "afastar o colega para evitar estranheza", "dizer que ele deve mudar para se encaixar"]],
    ["liderança positiva", "um líder de turma percebe que alguns alunos estão sendo excluídos", "criar oportunidades de participação e incentivar o respeito", ["deixar o grupo resolver sem orientação", "expor publicamente quem está excluindo", "escolher apenas os alunos mais populares para participar"]],
    ["pedido de desculpas", "quem praticou uma ofensa percebe o dano que causou", "assumir a responsabilidade, pedir desculpas e mudar a conduta", ["pedir desculpas apenas se receber alguma vantagem", "culpar a vítima por não ter entendido a piada", "dizer que a intenção era boa e manter o comportamento"]],
    ["prevenção", "uma turma quer diminuir situações de bullying antes que elas aconteçam", "combinar regras de respeito, diálogo e formas seguras de pedir ajuda", ["esperar um caso grave para agir", "criar regras sem explicar por que elas existem", "deixar que somente os alunos populares decidam as regras"]]
];

// ----------------------------------------------------------
// BANCO NOVO — JOGO 2: RESPEITO ÀS DIFERENÇAS
// 30 temas x 5 = 150 perguntas.
// ----------------------------------------------------------
const bancoInclusao = [
    ["acessibilidade", "uma escola precisa organizar o espaço para estudantes com diferentes necessidades", "garantir acesso, segurança e autonomia para todos", ["criar caminhos separados sem necessidade", "retirar adaptações para deixar todos iguais", "deixar a acessibilidade somente para eventos especiais"]],
    ["cadeira de rodas", "você quer ajudar uma pessoa que usa cadeira de rodas", "perguntar primeiro se ela precisa de ajuda e como ajudar", ["empurrar a cadeira sem avisar", "segurar a cadeira para impedir que ela se mova", "usar a cadeira como apoio para objetos"]],
    ["autonomia", "uma pessoa com deficiência está realizando uma tarefa sozinha", "respeitar a autonomia e oferecer ajuda somente quando necessária", ["fazer a tarefa no lugar dela sem perguntar", "assumir que ela não conseguirá terminar", "chamar outras pessoas para observar"]],
    ["autismo", "um colega autista demonstra uma forma diferente de se comunicar", "respeitar sua comunicação e considerar suas necessidades individuais", ["forçar uma maneira única de comunicação", "fazer imitações para divertir a turma", "tratar toda pessoa autista como se tivesse as mesmas características"]],
    ["sensibilidade sensorial", "um estudante se incomoda muito com barulho intenso", "buscar uma forma razoável de reduzir o desconforto sem ridicularizá-lo", ["aumentar o barulho para ele se acostumar", "dizer que ele está exagerando", "expor a situação como motivo de piada"]],
    ["capacitismo", "alguém presume que uma pessoa não consegue fazer algo apenas por ter deficiência", "avaliar a capacidade da pessoa sem usar estereótipos", ["decidir por ela antes de perguntar", "oferecer somente tarefas simples sem necessidade", "usar a deficiência como explicação para qualquer dificuldade"]],
    ["linguagem", "um colega pergunta qual termo é mais respeitoso para falar sobre sua condição", "usar a forma que a própria pessoa prefere quando possível", ["escolher um termo ofensivo porque é comum", "inventar um apelido para evitar o assunto", "corrigir a pessoa sem perguntar sua preferência"]],
    ["rampa", "objetos estão bloqueando uma rampa de acesso", "liberar o caminho para que o recurso possa ser usado", ["deixar os objetos ali porque a rampa está vazia", "usar a rampa como depósito temporário", "pedir que a pessoa com deficiência procure outro caminho"]],
    ["pessoa surda", "você precisa conversar com uma pessoa surda que usa Libras", "buscar uma comunicação acessível, como Libras ou outro recurso adequado", ["falar mais alto como se isso resolvesse sempre", "ignorar a pessoa e falar somente com o acompanhante", "fingir que entendeu sem confirmar a informação"]],
    ["pessoa cega", "você encontra uma pessoa cega em um lugar desconhecido", "perguntar se ela deseja orientação e explicar o caminho de forma clara", ["puxá-la pelo braço sem avisar", "decidir para onde ela deve ir sem perguntar", "falar apenas com quem estiver acompanhando"]],
    ["idoso", "uma pessoa idosa pede orientação sobre uma atividade", "explicar com respeito e permitir que ela faça escolhas", ["falar com ela como se fosse uma criança", "decidir tudo por ela", "ignorar sua pergunta por achar que ela não entenderá"]],
    ["diferenças culturais", "um colega possui costumes culturais diferentes dos seus", "conhecer e respeitar os costumes sem transformar a diferença em piada", ["imitar o costume para provocar risadas", "dizer que apenas seu costume é normal", "evitar a pessoa para não precisar aprender"]],
    ["diversidade", "uma equipe tem pessoas com características e experiências diferentes", "valorizar a diversidade e criar espaço para diferentes perspectivas", ["escolher apenas pessoas parecidas para facilitar o grupo", "ignorar opiniões diferentes", "tratar diversidade como problema a ser eliminado"]],
    ["equidade", "duas pessoas precisam de recursos diferentes para participar de uma atividade", "oferecer o suporte necessário para que ambas tenham oportunidade de participar", ["negar o recurso porque todos devem receber exatamente a mesma coisa", "dar o recurso somente a quem pedir muitas vezes", "considerar injusto qualquer tipo de adaptação"]],
    ["adaptação escolar", "uma atividade não pode ser realizada por um aluno com uma necessidade específica", "adaptar a atividade preservando o objetivo de aprendizagem", ["retirar o aluno da atividade", "dar uma atividade sem relação apenas para ocupá-lo", "cancelar a participação dele para evitar mudanças"]],
    ["preconceito", "uma pessoa é julgada antes de ser conhecida por causa de uma característica", "questionar o julgamento e conhecer a pessoa individualmente", ["aceitar o estereótipo como verdade", "evitar conversar para não mudar a primeira impressão", "espalhar a opinião para saber se outros concordam"]],
    ["estereótipo", "um colega afirma que todo integrante de determinado grupo age da mesma maneira", "lembrar que indivíduos não podem ser definidos por generalizações", ["concordar para evitar discussão", "procurar exemplos que confirmem o estereótipo", "usar a generalização como regra para escolher amigos"]],
    ["participação", "um aluno com deficiência quer participar de um trabalho em grupo", "incluir o aluno e dividir as tarefas de acordo com suas possibilidades e interesses", ["deixá-lo apenas observando", "fazer toda a parte dele sem perguntar", "excluí-lo porque o trabalho será mais rápido"]],
    ["tecnologia assistiva", "um recurso tecnológico ajuda uma pessoa a realizar uma atividade", "reconhecer o recurso como ferramenta de autonomia e acessibilidade", ["retirar o recurso para testar se ela consegue sem ele", "proibir o uso porque os demais não têm o mesmo equipamento", "tratar o recurso como privilégio sem necessidade"]],
    ["respeito à aparência", "uma pessoa tem uma característica física que chama atenção", "evitar comentários invasivos e tratar a pessoa normalmente", ["fazer perguntas íntimas na frente de todos", "fotografar a característica sem autorização", "usar a aparência como apelido"]],
    ["ajuda sem invasão", "você percebe que alguém pode precisar de apoio", "perguntar antes de agir e respeitar a resposta", ["agir imediatamente sem consultar", "insistir até a pessoa aceitar", "pedir que outra pessoa decida por ela"]],
    ["amizade inclusiva", "um grupo quer escolher atividades que todos possam aproveitar", "considerar as necessidades dos participantes ao planejar a atividade", ["escolher primeiro e excluir quem não puder acompanhar", "pedir que somente a pessoa com deficiência resolva a adaptação", "cancelar a atividade para não precisar adaptar"]],
    ["comunicação acessível", "uma informação importante será apresentada para pessoas com necessidades diferentes", "usar recursos acessíveis adequados ao público", ["usar somente um formato mesmo quando ele cria barreiras", "dizer que quem não entender deve procurar sozinho", "retirar informações para deixar a apresentação menor"]],
    ["respeito aos limites", "uma pessoa demonstra que não quer contato físico", "respeitar o limite sem pressioná-la", ["insistir porque a intenção é amigável", "fazer contato físico de surpresa", "pedir que outros colegas convençam a pessoa"]],
    ["inclusão digital", "um conteúdo online não pode ser acessado por parte dos estudantes", "buscar formatos e recursos que ampliem a acessibilidade", ["manter o conteúdo inacessível porque a maioria consegue", "culpar os estudantes que não acessam", "retirar o conteúdo para não precisar adaptá-lo"]],
    ["participação em esportes", "um aluno precisa de uma adaptação para participar de um jogo", "adaptar as regras de maneira segura sem excluir o aluno", ["impedir sua participação para evitar diferença", "deixar o aluno apenas assistindo", "mudar o objetivo do jogo para que ninguém precise participar"]],
    ["respeito religioso", "um colega possui práticas religiosas diferentes", "respeitar sua escolha e evitar comentários ofensivos", ["fazer piadas sobre a prática", "pressionar a pessoa a abandonar seus costumes", "espalhar comentários sobre sua vida pessoal"]],
    ["gênero e respeito", "uma pessoa pede para ser tratada pelo nome pelo qual se identifica", "usar o nome e a forma de tratamento que a pessoa solicita", ["usar outro nome de propósito", "transformar o pedido em motivo de piada", "expor o pedido para que outros decidam se devem respeitar"]],
    ["acolhimento", "um estudante novo tem uma característica que o diferencia do grupo", "apresentá-lo, incluí-lo e dar espaço para que ele conheça os colegas", ["deixar que ele se adapte sozinho", "testá-lo com brincadeiras para saber se aguenta", "mantê-lo separado até entender os costumes do grupo"]],
    ["combate à discriminação", "uma regra ou costume acaba dificultando a participação de um grupo", "avaliar a barreira e buscar uma solução mais inclusiva", ["manter tudo igual porque sempre foi assim", "culpar o grupo afetado pela dificuldade", "ignorar o problema se não houver reclamações públicas"]]
];

// ----------------------------------------------------------
// 5 formatos de pergunta por tema.
// Isso cria perguntas novas sem repetir as questões antigas.
// ----------------------------------------------------------
const formatos = [
    (tema, situacao) => `Diante de ${situacao}, qual atitude demonstra melhor respeito e responsabilidade?`,
    (tema, situacao) => `Imagine que ${situacao}. Qual escolha seria mais adequada para preservar a dignidade das pessoas envolvidas?`,
    (tema, situacao) => `Em uma situação em que ${situacao}, qual comportamento ajuda a construir uma convivência mais segura?`,
    (tema, situacao) => `Se você estivesse presente quando ${situacao}, qual seria a decisão mais consciente?`,
    (tema, situacao) => `Ao perceber que ${situacao}, qual princípio deve orientar sua atitude?`
];

function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function pontosDoNivel(indice) {
    if (indice < 30) return 10;
    if (indice < 60) return 12;
    if (indice < 90) return 15;
    if (indice < 120) return 20;
    return 25;
}

function nomeDoNivel(indice) {
    if (indice < 30) return "🟢 Iniciante";
    if (indice < 60) return "🟡 Intermediário";
    if (indice < 90) return "🟠 Difícil";
    if (indice < 120) return "🔴 Muito difícil";
    return "🟣 Desafio máximo";
}

function gerarPerguntas(banco) {
    const perguntas = [];

    banco.forEach((item, indiceTema) => {
        const [tema, situacao, correta, erradas] = item;

        formatos.forEach((criarPergunta, indiceFormato) => {
            const indice = indiceTema * formatos.length + indiceFormato;
            perguntas.push({
                id: indice + 1,
                tema,
                pergunta: criarPergunta(tema, situacao),
                correta,
                erradas: [...erradas],
                nivel: nomeDoNivel(indice),
                pontos: pontosDoNivel(indice),
                numeroDificuldade: indice + 1
            });
        });
    });

    return perguntas;
}

const perguntasBullying = gerarPerguntas(bancoBullying);
const perguntasInclusao = gerarPerguntas(bancoInclusao);

// ----------------------------------------------------------
// SOM
// ----------------------------------------------------------
function tocarSom(frequencia, duracao = 0.1) {
    if (!somAtivo) return;
    try {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const oscilador = audioContext.createOscillator();
        const ganho = audioContext.createGain();
        oscilador.frequency.value = frequencia;
        oscilador.connect(ganho);
        ganho.connect(audioContext.destination);
        ganho.gain.setValueAtTime(0.08, audioContext.currentTime);
        ganho.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duracao);
        oscilador.start();
        oscilador.stop(audioContext.currentTime + duracao);
    } catch (_) {}
}

function alternarSom() {
    somAtivo = !somAtivo;
    const botao = document.querySelector(".botao-som");
    if (botao) botao.textContent = somAtivo ? "🔊 Som ativado" : "🔇 Som desativado";
    if (somAtivo) tocarSom(650);
}

// ----------------------------------------------------------
// JOGO
// ----------------------------------------------------------
function selecionarJogo(tipo) {
    jogoAtual = tipo;
    perguntaAtual = 0;
    pontos = 0;
    respostaDada = false;
    perguntasDoJogo = embaralhar(tipo === "bullying" ? perguntasBullying : perguntasInclusao);

    mostrarTela("jogo");
    tocarSom(700);
    mostrarPergunta();
}

function mostrarTela(tela) {
    ["inicio", "rankingTela", "jogo", "resultado"].forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.classList.toggle("escondido", id !== tela);
    });
}

function mostrarPergunta() {
    if (!perguntasDoJogo[perguntaAtual]) {
        mostrarResultado();
        return;
    }

    respostaDada = false;
    const pergunta = perguntasDoJogo[perguntaAtual];
    const fase = Math.floor(perguntaAtual / PERGUNTAS_POR_FASE) + 1;
    const perguntaNaFase = (perguntaAtual % PERGUNTAS_POR_FASE) + 1;
    const respondidas = perguntaAtual % PERGUNTAS_POR_FASE;

    document.getElementById("faseAtual").textContent = `🏁 Fase ${fase} de ${TOTAL_FASES}`;
    document.getElementById("numeroPergunta").textContent = `Pergunta ${perguntaNaFase} de ${PERGUNTAS_POR_FASE}`;
    document.getElementById("progressoTexto").textContent = `Fase ${fase} — ${respondidas} de 10 respondidas — ${pergunta.nivel} — Desafio ${pergunta.numeroDificuldade}/150`;
    document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
    document.getElementById("tituloJogo").textContent = jogoAtual === "bullying" ? "🛡️ A Luta Contra o Bullying" : "♿ Respeito às Diferenças";
    document.getElementById("numeroBola").textContent = perguntaNaFase;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    document.getElementById("feedback").textContent = "";
    document.getElementById("areaProxima").innerHTML = "";

    const alternativas = document.getElementById("alternativas");
    alternativas.innerHTML = "";

    // A ordem das alternativas muda em TODA pergunta.
    // A posição da correta é aleatória: A, B, C ou D.
    const opcoes = embaralhar([
        { texto: pergunta.correta, correta: true },
        ...pergunta.erradas.map(texto => ({ texto, correta: false }))
    ]);

    opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");
        botao.className = "alternativa";
        botao.textContent = `${String.fromCharCode(65 + indice)}) ${opcao.texto}`;
        botao.onclick = () => escolherResposta(botao, opcao.correta, pergunta.pontos);
        alternativas.appendChild(botao);
    });

    const progresso = ((perguntaAtual % PERGUNTAS_POR_FASE) / PERGUNTAS_POR_FASE) * 100;
    document.getElementById("progressoFase").style.width = `${progresso}%`;
}

function escolherResposta(botaoEscolhido, correta, valor) {
    if (respostaDada) return;
    respostaDada = true;

    document.querySelectorAll(".alternativa").forEach(botao => botao.disabled = true);

    if (correta) {
        pontos += valor;
        botaoEscolhido.style.borderColor = "#2e7d32";
        botaoEscolhido.style.background = "#e8f5e9";
        document.getElementById("feedback").textContent = `✅ Muito bem! +${valor} pontos de empatia.`;
        tocarSom(900);
    } else {
        botaoEscolhido.style.borderColor = "#c62828";
        botaoEscolhido.style.background = "#ffebee";
        document.getElementById("feedback").textContent = "❌ Essa não é a melhor escolha. Pense em respeito, empatia e inclusão.";
        tocarSom(220);
    }

    document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
    criarBotaoProxima();

    // Salva a PRÓXIMA pergunta, evitando repetir a pergunta já respondida.
    salvarProgresso(true);
}

function criarBotaoProxima() {
    const area = document.getElementById("areaProxima");
    area.innerHTML = "";
    const botao = document.createElement("button");
    const ultima = perguntaAtual === TOTAL_PERGUNTAS - 1;
    const fimFase = (perguntaAtual + 1) % PERGUNTAS_POR_FASE === 0;

    botao.textContent = ultima ? "🏆 Ver resultado" : fimFase ? "🚀 Ir para a próxima fase" : "➡️ Próxima pergunta";
    botao.onclick = proximaPergunta;
    area.appendChild(botao);
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual >= TOTAL_PERGUNTAS) {
        mostrarResultado();
        return;
    }

    if (perguntaAtual % PERGUNTAS_POR_FASE === 0) {
        mostrarMensagemFase();
    } else {
        mostrarPergunta();
    }
}

function mostrarMensagemFase() {
    const fase = Math.floor(perguntaAtual / PERGUNTAS_POR_FASE) + 1;
    document.getElementById("pergunta").textContent = `🎉 Você chegou à Fase ${fase}!`;
    document.getElementById("alternativas").innerHTML = `<p class="centralizado">A próxima fase terá perguntas mais difíceis. Prepare-se!</p>`;
    document.getElementById("feedback").textContent = "🔥 Continue! A dificuldade está aumentando.";
    document.getElementById("areaProxima").innerHTML = "";

    const botao = document.createElement("button");
    botao.textContent = `▶️ Começar Fase ${fase}`;
    botao.onclick = mostrarPergunta;
    document.getElementById("areaProxima").appendChild(botao);
    tocarSom(1100);
}

// ----------------------------------------------------------
// SALVAMENTO — CADA JOGO TEM SUA PRÓPRIA CHAVE
// ----------------------------------------------------------
function chaveProgresso(jogo) {
    return jogo === "bullying" ? "progressoBullying" : "progressoInclusao";
}

function salvarProgresso(avancar = false) {
    if (!jogoAtual || !perguntasDoJogo.length) return;

    const indiceSalvo = avancar ? perguntaAtual + 1 : perguntaAtual;
    if (indiceSalvo >= TOTAL_PERGUNTAS) return;

    localStorage.setItem(chaveProgresso(jogoAtual), JSON.stringify({
        jogo: jogoAtual,
        pergunta: indiceSalvo,
        pontos,
        ordem: perguntasDoJogo
    }));
}

function obterProgresso(jogo) {
    try {
        const salvo = localStorage.getItem(chaveProgresso(jogo));
        return salvo ? JSON.parse(salvo) : null;
    } catch (_) {
        localStorage.removeItem(chaveProgresso(jogo));
        return null;
    }
}

function salvarESair() {
    salvarProgresso(false);
    mostrarTela("inicio");
    verificarJogosSalvos();
}

function continuarJogo(tipo) {
    const dados = obterProgresso(tipo);
    if (!dados || !Array.isArray(dados.ordem)) return;

    jogoAtual = tipo;
    perguntaAtual = Math.min(Number(dados.pergunta) || 0, TOTAL_PERGUNTAS - 1);
    pontos = Number(dados.pontos) || 0;
    perguntasDoJogo = dados.ordem;
    respostaDada = false;

    mostrarTela("jogo");
    mostrarPergunta();
}

function apagarProgresso(tipo) {
    localStorage.removeItem(chaveProgresso(tipo));
    verificarJogosSalvos();
}

function verificarJogosSalvos() {
    const area = document.getElementById("continuarArea");
    if (!area) return;

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
        html += `<div class="jogo-salvo"><strong>🛡️ A Luta Contra o Bullying</strong><span>Fase ${fase} de ${TOTAL_FASES} — Pergunta ${pergunta} de 10 — ${bullying.pontos} pontos</span><button onclick="continuarJogo('bullying')">▶️ Continuar Bullying</button><button class="botao-apagar" onclick="apagarProgresso('bullying')">🗑️ Apagar</button></div>`;
    }

    if (inclusao) {
        const fase = Math.floor(inclusao.pergunta / PERGUNTAS_POR_FASE) + 1;
        const pergunta = (inclusao.pergunta % PERGUNTAS_POR_FASE) + 1;
        html += `<div class="jogo-salvo"><strong>♿ Respeito às Diferenças</strong><span>Fase ${fase} de ${TOTAL_FASES} — Pergunta ${pergunta} de 10 — ${inclusao.pontos} pontos</span><button onclick="continuarJogo('inclusao')">▶️ Continuar Inclusão</button><button class="botao-apagar" onclick="apagarProgresso('inclusao')">🗑️ Apagar</button></div>`;
    }

    area.innerHTML = html;
    area.classList.remove("escondido");
}

// ----------------------------------------------------------
// RESULTADO
// ----------------------------------------------------------
function calcularPontuacaoMaxima() {
    return perguntasDoJogo.reduce((total, pergunta) => total + pergunta.pontos, 0);
}

function mostrarResultado() {
    const maximo = calcularPontuacaoMaxima();
    const porcentagem = maximo ? Math.round((pontos / maximo) * 100) : 0;

    let medalha;
    let mensagem;
    if (porcentagem >= 90) {
        medalha = "🥇 OURO";
        mensagem = "Excelente! Você demonstrou muito conhecimento, respeito e empatia.";
    } else if (porcentagem >= 70) {
        medalha = "🥈 PRATA";
        mensagem = "Muito bom! Você mostrou uma ótima compreensão dos temas.";
    } else if (porcentagem >= 50) {
        medalha = "🥉 BRONZE";
        mensagem = "Bom trabalho! Continue aprendendo sobre respeito e inclusão.";
    } else {
        medalha = "📚 PARTICIPAÇÃO";
        mensagem = "Continue estudando. O importante é aprender e melhorar.";
    }

    document.getElementById("resultadoTitulo").textContent = jogoAtual === "bullying" ? "🛡️ A Luta Contra o Bullying" : "♿ Respeito às Diferenças";
    document.getElementById("pontuacaoFinal").textContent = `⭐ Pontuação: ${pontos}`;
    document.getElementById("porcentagemFinal").textContent = `📊 Aproveitamento: ${porcentagem}%`;
    document.getElementById("medalhaFinal").textContent = medalha;
    document.getElementById("mensagemFinal").textContent = mensagem;

    localStorage.removeItem(chaveProgresso(jogoAtual));
    salvarRanking(jogoAtual, pontos, porcentagem, medalha);
    mostrarTela("resultado");
    tocarSom(1200);
}

function jogarNovamente() {
    selecionarJogo(jogoAtual);
}

function voltarAoMenu() {
    mostrarTela("inicio");
    verificarJogosSalvos();
}

// ----------------------------------------------------------
// RANKING
// ----------------------------------------------------------
function salvarRanking(jogo, pontuacao, porcentagem, medalha) {
    const ranking = JSON.parse(localStorage.getItem("rankingJogo") || "[]");
    ranking.push({ jogo, pontos: pontuacao, porcentagem, medalha, data: new Date().toLocaleDateString("pt-BR") });
    ranking.sort((a, b) => b.pontos - a.pontos);
    localStorage.setItem("rankingJogo", JSON.stringify(ranking.slice(0, 10)));
}

function mostrarRanking() {
    mostrarTela("rankingTela");
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
        div.innerHTML = `<span class="ranking-posicao">${posicao}</span><span class="ranking-nome">${nome}<br><small>${item.data} — ${item.porcentagem}%</small></span><span class="ranking-pontos">${item.pontos} pts</span>`;
        lista.appendChild(div);
    });
}

function fecharRanking() {
    mostrarTela("inicio");
    verificarJogosSalvos();
}

// Corrige o erro antigo: a função correta agora é verificarJogosSalvos().
window.addEventListener("load", verificarJogosSalvos);
