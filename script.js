// ======================================================
// JUNTOS CONTRA O BULLYING
// 2 jogos | 150 perguntas por jogo | 4 alternativas
// Perguntas novas | dificuldade progressiva | salvamento separado
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

// ------------------------------------------------------
// Utilidades
// ------------------------------------------------------
function embaralhar(lista) {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function pontosDaPergunta(indice) {
    if (indice < 30) return 10;
    if (indice < 60) return 15;
    if (indice < 90) return 20;
    if (indice < 120) return 25;
    return 30;
}

function nivelDaPergunta(indice) {
    if (indice < 30) return "Iniciante";
    if (indice < 60) return "Fácil";
    if (indice < 90) return "Intermediário";
    if (indice < 120) return "Difícil";
    return "Muito difícil";
}

// ------------------------------------------------------
// BANCO NOVO — BULLYING
// 30 temas x 5 situações = 150 perguntas
// ------------------------------------------------------
const bancoBullying = [
    ["apelidos", "Um colega pede que você pare de usar um apelido que o incomoda. O que demonstra respeito?", "Parar de usar o apelido e chamá-lo pelo nome que prefere.", "Continuar porque os outros colegas acham engraçado.", "Criar outro apelido para substituir o primeiro.", "Dizer que ele precisa aprender a aceitar brincadeiras."],
    ["exclusão", "Durante um trabalho em grupo, um aluno está sendo deixado de fora de propósito. Qual atitude ajuda?", "Garantir que ele possa participar e dividir as tarefas de forma justa.", "Deixar que o grupo decida quem merece participar.", "Fingir que não percebeu para evitar discussão.", "Dizer que ele deve procurar outro grupo sozinho."],
    ["cyberbullying", "Você recebe uma mensagem ofensiva sobre um colega em um grupo. Qual é a atitude mais segura?", "Não espalhar a mensagem, guardar a evidência e procurar um responsável.", "Encaminhar a mensagem para outros grupos para mostrar o que aconteceu.", "Responder com uma ofensa ainda mais forte.", "Publicar o nome de quem enviou para expô-lo."],
    ["testemunha", "Você presencia uma humilhação na escola e percebe que a pessoa ficou abalada. O que pode fazer?", "Apoiar a pessoa e contar o ocorrido a um adulto responsável.", "Filmar a situação para ter conteúdo como prova e postar depois.", "Rir junto para não chamar atenção para si.", "Esperar que a vítima enfrente o agressor sozinha."],
    ["boato", "Um boato ofensivo sobre um estudante começa a circular. O que é mais responsável?", "Não repassar a história e buscar informação com pessoas responsáveis.", "Compartilhar apenas com amigos próximos.", "Perguntar a várias pessoas para descobrir detalhes pessoais.", "Publicar o boato com a frase 'não sei se é verdade'."],
    ["empatia", "Um colega demonstra tristeza depois de ser alvo de comentários. Qual reação mostra empatia?", "Ouvir sem debochar e perguntar como você pode ajudar.", "Dizer que ele está exagerando.", "Mudar de assunto para não precisar ouvir.", "Contar uma história parecida para competir com o problema dele."],
    ["diferenças", "Uma turma faz piadas sobre uma característica física de um aluno. Qual princípio deve orientar sua atitude?", "A característica de alguém não justifica humilhação ou discriminação.", "Piadas são aceitáveis quando muitas pessoas riem.", "A pessoa deve mudar para evitar comentários.", "Só é errado se houver agressão física."],
    ["respeito", "Duas pessoas discordam durante uma atividade. Como resolver a situação de forma respeitosa?", "Ouvir os dois lados e discutir as ideias sem atacar as pessoas.", "Escolher o lado de quem fala mais alto.", "Usar apelidos para mostrar quem está errado.", "Encerrar a conversa humilhando o colega."],
    ["ajuda", "Um estudante diz que está com medo de ir à escola por causa de provocações repetidas. O que fazer?", "Levar a situação a um adulto de confiança e oferecer apoio.", "Dizer para ele faltar até o problema desaparecer.", "Sugerir que ele reaja com a mesma agressividade.", "Guardar segredo mesmo que ele esteja em risco."],
    ["brincadeira", "Uma pessoa diz que uma brincadeira está machucando seus sentimentos. O que deve acontecer?", "A brincadeira deve parar e o desconforto deve ser respeitado.", "Continuar porque a intenção era apenas divertir.", "Perguntar aos espectadores se eles acharam engraçado.", "Dizer que quem se incomodou não sabe brincar."],
    ["rede social", "Antes de comentar uma publicação de um colega, qual cuidado ajuda a evitar conflitos?", "Pensar no impacto do comentário e manter uma linguagem respeitosa.", "Escrever rapidamente antes que outra pessoa comente.", "Usar ironia porque ela parece menos agressiva.", "Publicar algo provocativo para aumentar as interações."],
    ["grupo", "Em um grupo de mensagens, alguém começa a atacar repetidamente uma pessoa. O que um participante responsável pode fazer?", "Não participar dos ataques e procurar ajuda se a situação continuar.", "Curtir as mensagens para mostrar que concorda.", "Adicionar mais pessoas para aumentar a pressão.", "Responder com ataques contra o agressor."],
    ["autoridade", "Ao relatar um caso de bullying, por que é importante procurar um adulto responsável?", "Porque adultos podem ajudar a proteger os envolvidos e encaminhar a situação.", "Porque somente adultos podem decidir quem está certo em qualquer discussão.", "Porque conversar com colegas nunca ajuda em nenhuma situação.", "Porque a vítima não deve participar de nenhuma decisão."],
    ["segurança", "Se uma situação de bullying estiver ficando fisicamente perigosa, qual prioridade vem primeiro?", "Afastar-se do perigo e procurar ajuda imediatamente.", "Tentar vencer a briga para provar coragem.", "Filmar a situação antes de procurar ajuda.", "Pedir que os colegas formem uma torcida."],
    ["responsabilidade", "Por que quem presencia bullying também pode ter um papel importante?", "Porque pode evitar o incentivo à agressão e ajudar a vítima a buscar apoio.", "Porque a testemunha deve resolver tudo sozinha.", "Porque quem assiste sempre deve enfrentar fisicamente o agressor.", "Porque é responsabilidade da testemunha escolher um lado e atacar o outro."],
    ["privacidade", "Você recebe uma imagem constrangedora de um colega. O que fazer?", "Não compartilhar e procurar ajuda se a imagem estiver sendo usada para humilhar.", "Enviar para poucos amigos de confiança.", "Publicar sem marcar a pessoa.", "Guardar para usar contra ela no futuro."],
    ["humilhação", "Uma pessoa é ridicularizada diante da turma. Qual atitude ajuda a reduzir o dano?", "Evitar participar da humilhação e oferecer apoio de maneira respeitosa.", "Rir para não parecer diferente dos demais.", "Perguntar detalhes na frente de todos.", "Dizer que a pessoa precisa aprender a lidar com críticas."],
    ["repetição", "Por que provocações repetidas merecem atenção mesmo quando não deixam marcas físicas?", "Porque agressões emocionais e sociais também podem causar sofrimento e prejudicar a convivência.", "Porque toda conversa difícil é automaticamente bullying.", "Porque qualquer brincadeira entre amigos deve ser proibida.", "Porque somente agressões físicas podem ser avaliadas por adultos."],
    ["comunicação", "Qual é uma boa forma de falar com alguém que foi alvo de uma agressão?", "Falar em particular, ouvir e oferecer apoio sem culpabilizar a pessoa.", "Perguntar na frente da turma o que aconteceu.", "Exigir que ela conte todos os detalhes imediatamente.", "Dizer que ela deveria ter reagido de outra maneira."],
    ["prevenção", "Qual ação pode contribuir para prevenir bullying em uma escola?", "Criar regras claras, incentivar o respeito e facilitar canais seguros de ajuda.", "Evitar falar sobre o tema para não chamar atenção.", "Punir todos os estudantes quando ocorrer qualquer conflito.", "Deixar cada turma resolver casos graves por conta própria."],
    ["conflito", "Uma discussão isolada acontece entre dois colegas. Qual é uma diferença importante em relação ao bullying?", "É preciso observar contexto, repetição, relações de poder e impactos antes de concluir o que ocorreu.", "Toda discussão entre duas pessoas é bullying.", "Bullying só existe quando há agressão física.", "Se duas pessoas discutiram, nenhuma delas pode pedir ajuda."],
    ["poder", "Por que a diferença de poder pode ser relevante em situações de bullying?", "Porque pode dificultar que a pessoa alvo consiga se defender ou interromper a situação.", "Porque a pessoa com mais amigos sempre está certa.", "Porque quem tem mais força física nunca precisa de orientação.", "Porque toda diferença entre colegas significa que existe bullying."],
    ["adulto", "Um estudante pede para você não contar a ninguém que está sofrendo agressões, mas parece estar em perigo. O que fazer?", "Buscar um adulto responsável para proteger o estudante, mesmo que a situação exija cuidado ao preservar sua privacidade.", "Prometer segredo em qualquer circunstância.", "Publicar o caso para conseguir ajuda rapidamente.", "Mandar o estudante resolver sozinho."],
    ["culpa", "Qual frase é mais adequada para alguém que sofreu bullying?", "A responsabilidade pela agressão não é da vítima; ela merece apoio e proteção.", "Você deveria ter evitado chamar atenção.", "Se você ficou triste, talvez tenha entendido errado.", "É melhor mudar seu jeito para não ser alvo novamente."],
    ["denúncia", "Ao comunicar um caso, quais informações podem ajudar um adulto a entender a situação?", "O que aconteceu, quando ocorreu, quem estava envolvido e quais evidências existem.", "Somente a opinião de quem contou primeiro.", "Comentários exagerados para fazer o caso parecer maior.", "O máximo possível de informações pessoais da vítima."],
    ["digital", "Qual atitude reduz a chance de uma publicação ofensiva ganhar alcance?", "Não compartilhar, não incentivar interações ofensivas e usar os recursos de denúncia da plataforma.", "Comentar para discutir com o agressor publicamente.", "Compartilhar em outro perfil para pedir opiniões.", "Responder com outra publicação ofensiva."],
    ["amizade", "Um amigo começa a praticar humilhações contra outro aluno. Como agir com responsabilidade?", "Conversar sobre o comportamento, não apoiar a agressão e buscar ajuda quando necessário.", "Defender o amigo em qualquer situação.", "Rir junto para preservar a amizade.", "Esconder o comportamento para evitar problemas."],
    ["influência", "Por que a reação dos espectadores pode influenciar uma situação de bullying?", "A aprovação ou o silêncio do grupo pode reforçar o comportamento de quem agride.", "Porque espectadores sempre são os responsáveis pelo bullying.", "Porque qualquer pessoa que assista precisa confrontar fisicamente o agressor.", "Porque somente quem assiste consegue resolver a situação."],
    ["restauração", "Depois de um caso de bullying, por que a escola pode precisar acompanhar os envolvidos por algum tempo?", "Porque reconstruir segurança e convivência pode exigir acompanhamento e ações contínuas.", "Porque o problema sempre desaparece depois de uma conversa.", "Porque a vítima deve explicar o caso repetidamente.", "Porque a escola deve expor publicamente todos os envolvidos."],
    ["cultura", "Qual ambiente escolar favorece a prevenção de bullying?", "Um ambiente com respeito, participação, regras claras e canais seguros para pedir ajuda.", "Um ambiente em que conflitos são escondidos para preservar a imagem da escola.", "Um ambiente em que alunos mais populares definem as regras sociais.", "Um ambiente em que pedir ajuda é visto como fraqueza."]
];

// ------------------------------------------------------
// BANCO NOVO — INCLUSÃO E RESPEITO ÀS DIFERENÇAS
// 30 temas x 5 situações = 150 perguntas
// ------------------------------------------------------
const bancoInclusao = [
    ["deficiência", "Uma pessoa com deficiência participa de uma atividade. Qual postura é mais adequada?", "Tratá-la com respeito, sem presumir suas limitações e oferecendo ajuda quando necessário.", "Fazer tudo por ela sem perguntar.", "Evitar convidá-la para atividades difíceis.", "Falar com outra pessoa em vez de falar diretamente com ela."],
    ["acessibilidade", "Uma escola quer tornar seus espaços mais inclusivos. Qual medida é adequada?", "Garantir acesso aos espaços e recursos necessários para diferentes necessidades.", "Criar uma única entrada acessível e bloquear as demais rotas.", "Esperar que cada aluno resolva sozinho suas dificuldades de acesso.", "Retirar adaptações quando poucas pessoas as utilizarem."],
    ["capacitismo", "Qual atitude pode revelar capacitismo?", "Julgar que alguém é incapaz apenas por ter uma deficiência.", "Perguntar qual apoio a pessoa prefere.", "Respeitar o ritmo e a autonomia de cada pessoa.", "Adaptar uma atividade quando houver necessidade."],
    ["autismo", "Um colega autista demonstra uma forma diferente de se comunicar. O que é importante?", "Respeitar sua forma de comunicação e suas necessidades individuais.", "Obrigá-lo a se comunicar exatamente como os demais.", "Imitar seus comportamentos para fazer a turma rir.", "Supor que ele não entende nada sem conversar com ele."],
    ["cadeira de rodas", "Você precisa passar perto de uma pessoa que usa cadeira de rodas. Qual atitude é correta?", "Respeitar o espaço da cadeira e nunca movimentá-la sem autorização.", "Segurar a cadeira para ajudar sem perguntar.", "Usar a cadeira como apoio para objetos.", "Empurrar a cadeira para abrir caminho."],
    ["surdez", "Ao conversar com uma pessoa surda, qual atitude é mais respeitosa?", "Perguntar qual forma de comunicação ela prefere e facilitar a comunicação.", "Falar muito alto como se isso resolvesse qualquer dificuldade.", "Falar apenas com o acompanhante.", "Evitar conversar para não cometer erros."],
    ["cegueira", "Uma pessoa cega precisa encontrar uma sala. Como oferecer ajuda?", "Perguntar se ela quer ajuda e seguir a orientação que ela indicar.", "Puxá-la pelo braço sem avisar.", "Empurrá-la até a sala mais próxima.", "Decidir por ela o caminho sem perguntar."],
    ["idosos", "Uma pessoa idosa participa de uma decisão. Qual postura demonstra respeito?", "Ouvir sua opinião e respeitar sua autonomia.", "Decidir tudo por ela automaticamente.", "Ignorar sua opinião por causa da idade.", "Falar com ela como se fosse uma criança."],
    ["equidade", "O que significa agir com equidade em uma atividade escolar?", "Oferecer os apoios necessários para que diferentes pessoas tenham oportunidades justas.", "Dar exatamente o mesmo apoio em qualquer situação.", "Dar vantagens sem considerar nenhuma necessidade.", "Excluir quem precisa de adaptação."],
    ["diversidade", "Por que a diversidade pode ser positiva em uma turma?", "Porque diferentes experiências e perspectivas podem ampliar a aprendizagem e a convivência.", "Porque todos precisam pensar da mesma maneira.", "Porque diferenças devem ser usadas para separar grupos.", "Porque uma turma diversa não precisa de regras de respeito."],
    ["linguagem", "Ao falar sobre uma pessoa com deficiência, qual cuidado é importante?", "Usar uma linguagem respeitosa e seguir a forma como a própria pessoa prefere ser identificada.", "Usar apelidos relacionados à deficiência.", "Falar sobre a pessoa como se ela não estivesse presente.", "Escolher termos ofensivos porque parecem engraçados."],
    ["participação", "Um estudante precisa de uma adaptação para participar de uma atividade. O que a turma deve fazer?", "Buscar uma forma de adaptação que mantenha sua participação e aprendizagem.", "Excluir o estudante da atividade.", "Fazer a atividade por ele.", "Dizer que adaptações são privilégios injustos."],
    ["barreiras", "O que pode ser uma barreira à inclusão?", "Uma regra, espaço ou atitude que dificulta desnecessariamente a participação de alguém.", "Uma adaptação que aumenta a autonomia.", "Um recurso de acessibilidade.", "Uma conversa para descobrir necessidades."],
    ["autonomia", "Por que é importante respeitar a autonomia de pessoas com deficiência?", "Porque a pessoa deve participar das decisões sobre sua própria vida sempre que possível.", "Porque pedir ajuda é sempre errado.", "Porque ninguém deve oferecer ajuda em nenhuma situação.", "Porque autonomia significa nunca precisar de apoio."],
    ["estereótipo", "Qual problema existe em presumir que todas as pessoas de um mesmo grupo são iguais?", "Isso ignora diferenças individuais e pode alimentar preconceitos.", "Isso facilita conhecer cada pessoa melhor.", "Isso garante que ninguém seja discriminado.", "Isso elimina a necessidade de ouvir as pessoas."],
    ["preconceito", "Uma pessoa é julgada negativamente antes de ser conhecida. O que isso exemplifica?", "Um julgamento baseado em preconceito, que deve ser questionado.", "Uma avaliação sempre objetiva.", "Uma forma necessária de proteção.", "Uma regra de convivência obrigatória."],
    ["racismo", "Qual atitude contribui para enfrentar o racismo no ambiente escolar?", "Questionar discriminações, respeitar diferentes identidades e buscar ajuda diante de situações racistas.", "Ignorar comentários racistas para evitar conflitos.", "Repetir estereótipos quando ninguém parece se importar.", "Dizer que o problema só existe quando há agressão física."],
    ["xenofobia", "Um estudante sofre comentários por ser de outro país. Qual resposta é adequada?", "Rejeitar a discriminação e valorizar o respeito à origem e à cultura da pessoa.", "Pedir que ele esconda sua origem.", "Fazer piadas para ajudá-lo a se adaptar.", "Dizer que ele deve aceitar os comentários."],
    ["intolerância", "Como agir diante de uma diferença cultural que você não conhece?", "Perguntar, aprender e respeitar sem transformar a diferença em motivo de humilhação.", "Julgar a prática imediatamente.", "Espalhar informações sem verificar.", "Exigir que a pessoa abandone seus costumes."],
    ["religião", "Uma turma possui pessoas com diferentes crenças. Qual atitude favorece a convivência?", "Respeitar a liberdade de crença e evitar ataques ou imposições.", "Obrigar todos a seguir a mesma crença.", "Usar a crença de alguém como motivo de piada.", "Impedir que colegas expressem qualquer diferença cultural."],
    ["gênero", "Como combater estereótipos de gênero em atividades escolares?", "Permitir que todos participem de acordo com seus interesses e capacidades, sem limitar oportunidades por estereótipos.", "Separar atividades apenas com base em ideias tradicionais.", "Dizer que algumas tarefas pertencem naturalmente a um gênero.", "Ridicularizar quem escolhe algo considerado diferente."],
    ["aparência", "Um aluno recebe comentários sobre seu corpo. Qual atitude é mais respeitosa?", "Não fazer comentários humilhantes e tratar a pessoa com dignidade.", "Afirmar que comentários sobre aparência são sempre inofensivos.", "Sugerir mudanças no corpo sem que a pessoa peça.", "Fazer comparações com outros alunos."],
    ["condição social", "Um estudante é excluído por usar materiais mais simples. O que isso demonstra?", "Uma forma de discriminação baseada em condição socioeconômica.", "Uma regra necessária de convivência.", "Uma diferença que justifica exclusão.", "Uma brincadeira sem impacto."],
    ["fala", "Uma pessoa possui um sotaque diferente. Como reagir?", "Ouvir normalmente e evitar imitar o sotaque para ridicularizá-la.", "Imitar o sotaque para divertir a turma.", "Pedir que ela fale como os demais.", "Corrigir sua identidade cultural em público."],
    ["aprendizagem", "Um aluno aprende em um ritmo diferente. Qual prática é inclusiva?", "Usar estratégias que permitam sua participação e acompanhar seu desenvolvimento.", "Compará-lo constantemente com os colegas.", "Retirá-lo das atividades mais importantes.", "Concluir que ele não pode aprender."],
    ["acessibilidade digital", "Qual exemplo melhora a acessibilidade de um conteúdo digital?", "Usar recursos como texto alternativo, legendas e estrutura que facilite diferentes formas de acesso.", "Publicar imagens importantes sem descrição.", "Usar apenas áudio em conteúdos essenciais.", "Impedir ajustes de tamanho de texto."],
    ["comunicação", "Por que perguntar como uma pessoa prefere receber ajuda é importante?", "Porque evita presumir suas necessidades e respeita sua autonomia.", "Porque pessoas com deficiência nunca sabem do que precisam.", "Porque toda ajuda deve ser recusada.", "Porque só familiares podem oferecer ajuda."],
    ["amizade", "Um amigo revela que sofreu discriminação. Qual resposta é mais acolhedora?", "Ouvir, demonstrar respeito e incentivar a busca de apoio adequado.", "Dizer que ele precisa esquecer rapidamente.", "Perguntar se ele fez algo para provocar a situação.", "Contar a história para outras pessoas sem autorização."],
    ["escola", "Qual ação da escola favorece uma cultura de inclusão?", "Formar estudantes e profissionais, adaptar práticas e criar canais para enfrentar discriminação.", "Tratar todos exatamente da mesma forma sem considerar barreiras.", "Evitar discutir diferenças para não gerar desconforto.", "Deixar problemas de discriminação apenas entre os estudantes."],
    ["respeito", "Qual é a melhor regra geral para conviver com diferenças?", "Reconhecer a dignidade de cada pessoa, ouvir suas necessidades e evitar discriminação.", "Esperar que todos se adaptem ao mesmo padrão.", "Evitar pessoas que parecem diferentes.", "Usar diferenças como motivo para escolher quem merece participar."]
];

// ------------------------------------------------------
// Cada tema recebe 5 perguntas realmente diferentes.
// As alternativas também são embaralhadas a cada partida,
// então a correta não fica sempre na menor alternativa.
// ------------------------------------------------------
const modelosPergunta = [
    (base) => base[1],
    (base) => `Em uma situação relacionada a ${base[0]}, qual escolha apresenta a atitude mais adequada?`,
    (base) => `Imagine que isso aconteça na sua turma envolvendo ${base[0]}. Qual decisão demonstra respeito?`,
    (base) => `Se você perceber uma situação de ${base[0]}, qual ação deve ser priorizada?`,
    (base) => `Qual princípio deve orientar sua reação diante de um caso de ${base[0]}?`
];

function criarBanco(banco) {
    const perguntas = [];

    banco.forEach((base, temaIndex) => {
        for (let variacao = 0; variacao < 5; variacao++) {
            let texto;
            if (variacao === 0) {
                texto = base[1];
            } else {
                texto = modelosPergunta[variacao](base);
                texto += `\n\nSituação para analisar: ${base[1].replace(/^[^?]*\?\s*/, "")}`;
            }

            const alternativas = [
                { texto: base[2], correta: true },
                { texto: base[3], correta: false },
                { texto: base[4], correta: false },
                { texto: base[5], correta: false }
            ];

            perguntas.push({
                id: `${temaIndex + 1}-${variacao + 1}`,
                tema: base[0],
                pergunta: texto,
                alternativas,
                nivel: nivelDaPergunta(perguntas.length),
                pontos: pontosDaPergunta(perguntas.length)
            });
        }
    });

    return perguntas;
}

const perguntasBullying = criarBanco(bancoBullying);
const perguntasInclusao = criarBanco(bancoInclusao);

// Verificação automática: evita banco quebrado.
function validarBanco(perguntas, nome) {
    if (perguntas.length !== TOTAL_PERGUNTAS) {
        console.error(`${nome}: esperado ${TOTAL_PERGUNTAS}, encontrado ${perguntas.length}.`);
    }

    const ids = new Set();
    perguntas.forEach((p) => {
        if (ids.has(p.id)) console.error(`ID repetido em ${nome}: ${p.id}`);
        ids.add(p.id);

        if (p.alternativas.length !== 4) {
            console.error(`Pergunta ${p.id} não possui 4 alternativas.`);
        }

        const textos = p.alternativas.map(a => a.texto.trim().toLowerCase());
        if (new Set(textos).size !== 4) {
            console.error(`Alternativas repetidas na pergunta ${p.id}.`);
        }
    });
}

validarBanco(perguntasBullying, "Bullying");
validarBanco(perguntasInclusao, "Inclusão");

// ------------------------------------------------------
// SOM
// ------------------------------------------------------
function tocarSom(frequencia = 700) {
    if (!somAtivo) return;
    try {
        audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
        const oscilador = audioContext.createOscillator();
        const ganho = audioContext.createGain();
        oscilador.frequency.value = frequencia;
        ganho.gain.value = 0.04;
        oscilador.connect(ganho);
        ganho.connect(audioContext.destination);
        oscilador.start();
        oscilador.stop(audioContext.currentTime + 0.12);
    } catch (e) {}
}

function alternarSom() {
    somAtivo = !somAtivo;
    const botao = document.querySelector(".botao-som");
    if (botao) botao.textContent = somAtivo ? "🔊 Som ativado" : "🔇 Som desativado";
    if (somAtivo) tocarSom();
}

// ------------------------------------------------------
// INÍCIO / SELEÇÃO
// ------------------------------------------------------
function selecionarJogo(tipo) {
    jogoAtual = tipo;
    perguntaAtual = 0;
    pontos = 0;
    respostaDada = false;

    const banco = tipo === "bullying" ? perguntasBullying : perguntasInclusao;
    perguntasDoJogo = embaralhar(banco);

    // Começar de novo remove somente o progresso deste jogo.
    localStorage.removeItem(chaveProgresso(tipo));

    abrirJogo();
    mostrarPergunta();
}

function abrirJogo() {
    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("rankingTela").classList.add("escondido");
    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("jogo").classList.remove("escondido");
}

// ------------------------------------------------------
// PERGUNTAS
// ------------------------------------------------------
function mostrarPergunta() {
    if (perguntaAtual >= TOTAL_PERGUNTAS) {
        mostrarResultado();
        return;
    }

    respostaDada = false;
    const pergunta = perguntasDoJogo[perguntaAtual];
    const fase = Math.floor(perguntaAtual / PERGUNTAS_POR_FASE) + 1;
    const numeroNaFase = (perguntaAtual % PERGUNTAS_POR_FASE) + 1;

    document.getElementById("faseAtual").textContent = `🏁 Fase ${fase} de ${TOTAL_FASES}`;
    document.getElementById("numeroPergunta").textContent = `Pergunta ${numeroNaFase} de ${PERGUNTAS_POR_FASE}`;
    document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
    document.getElementById("progressoFase").style.width = `${(numeroNaFase / PERGUNTAS_POR_FASE) * 100}%`;
    document.getElementById("progressoTexto").textContent = `Fase ${fase} — ${numeroNaFase - 1} de 10 respondidas`;
    document.getElementById("numeroBola").textContent = perguntaAtual + 1;
    document.getElementById("tituloJogo").textContent = jogoAtual === "bullying" ? "🛡️ A Luta Contra o Bullying" : "♿ Respeito às Diferenças";
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    document.getElementById("feedback").textContent = `🎯 Nível: ${pergunta.nivel} | Vale ${pergunta.pontos} pontos`;
    document.getElementById("areaProxima").innerHTML = "";

    const alternativas = embaralhar(pergunta.alternativas);
    const container = document.getElementById("alternativas");
    container.innerHTML = "";

    const letras = ["A", "B", "C", "D"];

    alternativas.forEach((alt, index) => {
        const botao = document.createElement("button");
        botao.className = "alternativa";
        botao.innerHTML = `<strong>${letras[index]})</strong> ${alt.texto}`;
        botao.onclick = () => responder(botao, alt.correta, pergunta.pontos);
        container.appendChild(botao);
    });
}

function responder(botaoClicado, correta, valor) {
    if (respostaDada) return;
    respostaDada = true;

    document.querySelectorAll(".alternativa").forEach(botao => {
        botao.disabled = true;
        if (botao === botaoClicado && correta) botao.classList.add("correta");
        if (botao === botaoClicado && !correta) botao.classList.add("errada");
    });

    if (correta) {
        pontos += valor;
        document.getElementById("feedback").textContent = `✅ Muito bem! +${valor} pontos de empatia.`;
        tocarSom(1000);
    } else {
        document.getElementById("feedback").textContent = "❌ Não foi dessa vez. Reflita sobre a situação e continue.";
        tocarSom(300);
    }

    document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
    document.getElementById("progressoTexto").textContent = `Fase ${Math.floor(perguntaAtual / 10) + 1} — ${(perguntaAtual % 10) + 1} de 10 respondidas`;
    criarBotaoProxima();
    salvarProgresso();
}

function criarBotaoProxima() {
    const area = document.getElementById("areaProxima");
    area.innerHTML = "";
    const botao = document.createElement("button");
    botao.textContent = perguntaAtual === TOTAL_PERGUNTAS - 1 ? "🏆 Ver resultado" : "➡️ Próxima pergunta";
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
    mostrarPergunta();
}

// ------------------------------------------------------
// RESULTADO
// ------------------------------------------------------
function pontuacaoMaxima() {
    let total = 0;
    for (let i = 0; i < TOTAL_PERGUNTAS; i++) total += pontosDaPergunta(i);
    return total;
}

function mostrarResultado() {
    const maximo = pontuacaoMaxima();
    const porcentagem = Math.round((pontos / maximo) * 100);

    let medalha;
    let mensagem;

    if (porcentagem >= 90) {
        medalha = "🥇 OURO";
        mensagem = "Excelente! Você demonstrou muito conhecimento, respeito e empatia.";
    } else if (porcentagem >= 70) {
        medalha = "🥈 PRATA";
        mensagem = "Muito bom! Você mostrou uma ótima compreensão do tema.";
    } else if (porcentagem >= 50) {
        medalha = "🥉 BRONZE";
        mensagem = "Bom trabalho! Continue aprendendo sobre respeito e inclusão.";
    } else {
        medalha = "📚 PARTICIPAÇÃO";
        mensagem = "Continue aprendendo. Cada pergunta é uma oportunidade para melhorar.";
    }

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

// ------------------------------------------------------
// RANKING
// ------------------------------------------------------
function salvarRanking(jogo, pontosObtidos, porcentagem, medalha) {
    const ranking = JSON.parse(localStorage.getItem("rankingJogo") || "[]");
    ranking.push({ jogo, pontos: pontosObtidos, porcentagem, medalha, data: new Date().toLocaleDateString("pt-BR") });
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
        div.innerHTML = `<span class="ranking-posicao">${posicao}</span><span class="ranking-nome">${nome}<br><small>${item.data} — ${item.porcentagem}%</small></span><span class="ranking-pontos">${item.pontos} pts</span>`;
        lista.appendChild(div);
    });
}

function fecharRanking() {
    document.getElementById("rankingTela").classList.add("escondido");
    document.getElementById("inicio").classList.remove("escondido");
    verificarJogosSalvos();
}

// ------------------------------------------------------
// SALVAMENTO SEPARADO
// ------------------------------------------------------
function chaveProgresso(jogo) {
    return jogo === "bullying" ? "progressoBullying" : "progressoInclusao";
}

function salvarProgresso() {
    if (!jogoAtual || !perguntasDoJogo.length) return;
    localStorage.setItem(chaveProgresso(jogoAtual), JSON.stringify({
        jogo: jogoAtual,
        pergunta: perguntaAtual,
        pontos,
        ordem: perguntasDoJogo
    }));
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
    try {
        return JSON.parse(salvo);
    } catch (erro) {
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
        const fase = Math.min(Math.floor(bullying.pergunta / 10) + 1, TOTAL_FASES);
        const pergunta = Math.min((bullying.pergunta % 10) + 1, 10);
        html += `<div class="jogo-salvo"><strong>🛡️ A Luta Contra o Bullying</strong><span>Fase ${fase} de ${TOTAL_FASES} — Pergunta ${pergunta} de 10 — ${bullying.pontos} pontos</span><button onclick="continuarJogo('bullying')">▶️ Continuar Bullying</button><button class="botao-apagar" onclick="apagarProgresso('bullying')">🗑️ Apagar</button></div>`;
    }

    if (inclusao) {
        const fase = Math.min(Math.floor(inclusao.pergunta / 10) + 1, TOTAL_FASES);
        const pergunta = Math.min((inclusao.pergunta % 10) + 1, 10);
        html += `<div class="jogo-salvo"><strong>♿ Respeito às Diferenças</strong><span>Fase ${fase} de ${TOTAL_FASES} — Pergunta ${pergunta} de 10 — ${inclusao.pontos} pontos</span><button onclick="continuarJogo('inclusao')">▶️ Continuar Inclusão</button><button class="botao-apagar" onclick="apagarProgresso('inclusao')">🗑️ Apagar</button></div>`;
    }

    area.innerHTML = html;
    area.classList.remove("escondido");
}

function continuarJogo(tipo) {
    const dados = obterProgresso(tipo);
    if (!dados || !Array.isArray(dados.ordem) || !dados.ordem.length) return;

    jogoAtual = dados.jogo;
    perguntaAtual = Number(dados.pergunta) || 0;
    pontos = Number(dados.pontos) || 0;
    perguntasDoJogo = dados.ordem;
    abrirJogo();
    mostrarPergunta();
}

function apagarProgresso(tipo) {
    localStorage.removeItem(chaveProgresso(tipo));
    verificarJogosSalvos();
}

// ------------------------------------------------------
// BOTÕES FINAIS
// ------------------------------------------------------
function jogarNovamente() {
    selecionarJogo(jogoAtual);
}

function voltarAoMenu() {
    document.getElementById("resultado").classList.add("escondido");
    document.getElementById("jogo").classList.add("escondido");
    document.getElementById("inicio").classList.remove("escondido");
    verificarJogosSalvos();
}

function verificarJogoSalvo() {
    verificarJogosSalvos();
}

window.onload = verificarJogoSalvo;
