// ============================================================
// JUNTOS CONTRA O BULLYING
// 2 jogos | 150 perguntas cada | 300 perguntas no total
// 4 alternativas | dificuldade progressiva | salvamento separado
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

// ------------------------------------------------------------
// Utilidades
// ------------------------------------------------------------
function embaralhar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

function escolherTresUnicas(lista, inicio) {
    const resultado = [];
    for (let i = 0; resultado.length < 3 && i < lista.length * 2; i++) {
        const item = lista[(inicio + i) % lista.length];
        if (!resultado.includes(item)) resultado.push(item);
    }
    return resultado;
}

const niveis = [
    { nome: "🟢 Iniciante", pontos: 10 },
    { nome: "🟡 Fácil", pontos: 12 },
    { nome: "🟠 Intermediário", pontos: 15 },
    { nome: "🔴 Difícil", pontos: 20 },
    { nome: "🟣 Desafio máximo", pontos: 25 }
];

// ============================================================
// BANCO 1 — A LUTA CONTRA O BULLYING
// 30 temas x 5 perguntas = 150 perguntas NOVAS
// ============================================================

const bancoBullying = [
    {
        tema: "um colega sendo alvo de apelidos ofensivos",
        correta: "Interromper a normalização da ofensa, apoiar o colega e procurar um adulto responsável.",
        erradas: [
            "Rir junto para mostrar que você faz parte do grupo.",
            "Dizer que ele precisa aceitar porque apelidos fazem parte da escola.",
            "Inventar outro apelido para equilibrar a brincadeira.",
            "Esperar a situação ficar mais grave antes de agir.",
            "Gravar a reação do colega e enviar para outros estudantes.",
            "Pedir que a pessoa ofendida não conte nada para evitar confusão."
        ]
    },
    {
        tema: "uma postagem humilhante sobre um estudante",
        correta: "Não compartilhar, preservar as evidências e comunicar a situação a alguém de confiança.",
        erradas: [
            "Compartilhar a postagem para mostrar aos amigos o que aconteceu.",
            "Responder com outra publicação ainda mais agressiva.",
            "Comentar usando emojis de risada para não chamar atenção.",
            "Apagar tudo imediatamente sem guardar nenhuma evidência.",
            "Criar uma enquete para descobrir quem concorda com a humilhação.",
            "Marcar mais colegas para que todos saibam do caso."
        ]
    },
    {
        tema: "um aluno sendo deixado de fora repetidamente de atividades",
        correta: "Criar oportunidades reais de participação e investigar por que a exclusão está acontecendo.",
        erradas: [
            "Aceitar a exclusão porque o grupo já está formado.",
            "Dizer que a pessoa deve procurar outro grupo sozinha.",
            "Convidá-la apenas quando não houver outra opção.",
            "Fazer piada sobre ela estar sempre sozinha.",
            "Ignorar porque ninguém encostou fisicamente nela.",
            "Usar a exclusão como forma de ensinar uma lição."
        ]
    },
    {
        tema: "uma brincadeira que deixa sempre a mesma pessoa constrangida",
        correta: "Perceber o desconforto, parar a brincadeira e respeitar o limite da pessoa.",
        erradas: [
            "Continuar enquanto a maioria estiver se divertindo.",
            "Dizer que só é brincadeira se a pessoa não reclamar.",
            "Pedir que ela aprenda a não levar as coisas a sério.",
            "Aumentar a intensidade da brincadeira para testar o limite.",
            "Perguntar aos outros se podem continuar sem consultar a pessoa.",
            "Transformar a reação dela em motivo para uma nova piada."
        ]
    },
    {
        tema: "um conflito entre colegas que está começando a virar perseguição",
        correta: "Buscar ajuda antes que o conflito se transforme em agressões repetidas ou intimidação.",
        erradas: [
            "Incentivar os colegas a escolher um lado e atacar o outro.",
            "Resolver tudo por meio de uma discussão pública.",
            "Espalhar a história para conseguir apoio contra uma pessoa.",
            "Aguardar até alguém se machucar para procurar ajuda.",
            "Criar uma competição para decidir quem está certo.",
            "Filmar a discussão e publicar para receber opiniões."
        ]
    },
    {
        tema: "um estudante recebendo mensagens agressivas à noite",
        correta: "Bloquear quando necessário, guardar as mensagens e buscar apoio de um adulto de confiança.",
        erradas: [
            "Responder imediatamente com ameaças equivalentes.",
            "Criar uma conta falsa para atacar o agressor.",
            "Publicar o número da pessoa para que outros respondam.",
            "Apagar as mensagens e fingir que nada aconteceu.",
            "Aceitar todas as provocações para tentar acabar com elas.",
            "Enviar as mensagens para vários grupos apenas por curiosidade."
        ]
    },
    {
        tema: "um grupo fazendo piadas sobre a aparência de uma colega",
        correta: "Não participar da humilhação e reforçar que aparência não justifica desrespeito.",
        erradas: [
            "Escolher uma característica diferente para fazer outra piada.",
            "Rir sem comentar para não parecer contrário ao grupo.",
            "Perguntar se a colega tem senso de humor antes de continuar.",
            "Dizer que críticas sobre aparência ajudam a pessoa a melhorar.",
            "Publicar uma foto dela para aumentar a brincadeira.",
            "Pedir que façam as piadas somente quando ela não estiver presente."
        ]
    },
    {
        tema: "um estudante sendo provocado por sua forma de falar",
        correta: "Respeitar a maneira de falar e evitar transformar sotaque ou voz em motivo de humilhação.",
        erradas: [
            "Imitar a fala para deixar o ambiente mais engraçado.",
            "Corrigir a pessoa publicamente sempre que ela falar.",
            "Dizer que ela deve mudar para ser aceita.",
            "Criar um apelido baseado no sotaque.",
            "Gravar a fala e compartilhar com colegas.",
            "Pedir que a pessoa fale menos para não chamar atenção."
        ]
    },
    {
        tema: "um colega sendo alvo de rumores",
        correta: "Não espalhar a informação sem confirmação e procurar orientação se o rumor estiver causando dano.",
        erradas: [
            "Repassar o rumor somente para pessoas de confiança.",
            "Adicionar detalhes para deixar a história mais interessante.",
            "Perguntar a várias pessoas até descobrir quem começou.",
            "Publicar uma enquete para saber se o rumor é verdadeiro.",
            "Tratar o rumor como verdade porque muitas pessoas comentaram.",
            "Usar o rumor para convencer outros colegas a se afastarem."
        ]
    },
    {
        tema: "uma vítima dizendo que tem medo de ir para a escola",
        correta: "Levar o relato a sério, oferecer apoio e procurar imediatamente um adulto responsável.",
        erradas: [
            "Dizer que ela precisa ser mais forte e enfrentar sozinha.",
            "Mandá-la ignorar os colegas por alguns dias.",
            "Contar a história para toda a turma para pedir opiniões.",
            "Dizer que faltar à escola resolverá o problema definitivamente.",
            "Prometer vingança contra quem a intimidou.",
            "Pedir que ela volte ao local sem qualquer acompanhamento."
        ]
    },
    {
        tema: "uma testemunha vendo uma agressão no corredor",
        correta: "Priorizar a segurança, não incentivar a agressão e chamar um adulto responsável.",
        erradas: [
            "Entrar na confusão sem avaliar a segurança de ninguém.",
            "Filmar a agressão para usar como entretenimento.",
            "Gritar para que os envolvidos continuem.",
            "Chamar outros estudantes para assistir.",
            "Publicar o vídeo depois para denunciar a situação.",
            "Ignorar completamente porque não foi diretamente atingida."
        ]
    },
    {
        tema: "um aluno novo sendo constantemente ignorado",
        correta: "Apresentá-lo aos colegas, incluí-lo nas atividades e evitar que o isolamento vire rotina.",
        erradas: [
            "Esperar que ele faça todos os contatos sozinho.",
            "Convidá-lo apenas para tarefas que ninguém quer fazer.",
            "Dizer que ele deve se adaptar sem receber ajuda.",
            "Fazer perguntas pessoais na frente de toda a turma.",
            "Usar a falta de amigos como motivo de brincadeira.",
            "Manter a separação para não alterar os grupos existentes."
        ]
    },
    {
        tema: "um colega sendo provocado por sua condição financeira",
        correta: "Evitar comentários sobre dinheiro e tratar todos com dignidade, independentemente da condição econômica.",
        erradas: [
            "Perguntar publicamente quanto a família ganha.",
            "Fazer piadas sobre roupas ou objetos usados.",
            "Excluir a pessoa de atividades por não poder pagar.",
            "Usar comparações de preço para decidir quem merece respeito.",
            "Pedir que ela esconda seus objetos para não virar alvo.",
            "Considerar a situação financeira uma justificativa para apelidos."
        ]
    },
    {
        tema: "um colega sendo ridicularizado por seu peso",
        correta: "Interromper a humilhação e tratar o corpo da pessoa com respeito, sem comentários ofensivos.",
        erradas: [
            "Dizer que a piada ajuda a pessoa a emagrecer.",
            "Comparar o corpo dela com o de outros estudantes.",
            "Sugerir dietas na frente de todo mundo.",
            "Usar um apelido ligado ao peso.",
            "Fotografar a pessoa para mostrar aos amigos.",
            "Dizer que ela deve ignorar porque é apenas humor."
        ]
    },
    {
        tema: "uma pessoa sendo discriminada por sua religião",
        correta: "Respeitar a liberdade de crença e não transformar a religião de alguém em motivo de ataque.",
        erradas: [
            "Fazer piadas com símbolos religiosos.",
            "Dizer que somente uma crença merece respeito.",
            "Pressionar a pessoa a esconder sua religião.",
            "Usar estereótipos para explicar como ela é.",
            "Excluir a pessoa de atividades por causa da crença.",
            "Questionar a fé dela de maneira humilhante diante da turma."
        ]
    },
    {
        tema: "uma pessoa sendo atacada por causa de sua origem regional",
        correta: "Valorizar a diversidade regional e não usar sotaque, origem ou costumes para humilhar.",
        erradas: [
            "Imitar o sotaque para conseguir risadas.",
            "Dizer que uma região é inferior às outras.",
            "Criar apelidos baseados no lugar onde a pessoa nasceu.",
            "Evitar a pessoa porque seus costumes são diferentes.",
            "Tratar estereótipos regionais como fatos sobre todos.",
            "Pedir que ela esconda sua origem para evitar comentários."
        ]
    },
    {
        tema: "um grupo planejando excluir alguém de um grupo de mensagens",
        correta: "Avaliar se a exclusão é uma forma de perseguição e evitar usar o grupo para humilhar a pessoa.",
        erradas: [
            "Criar outro grupo secreto para falar mal dela.",
            "Excluir a pessoa e comemorar a decisão.",
            "Adicionar mais pessoas para fortalecer a exclusão.",
            "Inventar uma justificativa para parecer que ninguém teve culpa.",
            "Publicar capturas de tela para ridicularizá-la.",
            "Dizer que a exclusão digital nunca pode ser prejudicial."
        ]
    },
    {
        tema: "um colega sendo provocado por tirar notas altas",
        correta: "Respeitar o desempenho do colega e evitar transformar sucesso acadêmico em motivo de hostilidade.",
        erradas: [
            "Chamá-lo de nomes para diminuir seu desempenho.",
            "Esconder materiais dele para prejudicar suas notas.",
            "Espalhar que ele só consegue boas notas porque recebe ajuda.",
            "Pedir que ele erre de propósito para não se destacar.",
            "Excluir o colega dos trabalhos por ser considerado competitivo.",
            "Fazer piadas sempre que ele receber uma nota alta."
        ]
    },
    {
        tema: "uma pessoa sendo humilhada por cometer um erro em público",
        correta: "Evitar a exposição, tratar o erro com respeito e ajudar a pessoa a corrigir o que aconteceu.",
        erradas: [
            "Repetir o erro para que todos riam novamente.",
            "Publicar a falha como meme.",
            "Dizer que o erro prova que a pessoa é incapaz.",
            "Usar o erro para criar um apelido permanente.",
            "Lembrar o erro em toda conversa futura.",
            "Impedir que a pessoa participe novamente para evitar novos erros."
        ]
    },
    {
        tema: "um estudante recebendo comentários ofensivos em uma rede social",
        correta: "Evitar o confronto agressivo, registrar os comentários e utilizar as ferramentas de denúncia e bloqueio.",
        erradas: [
            "Criar uma campanha de ataques contra o autor.",
            "Compartilhar o perfil do agressor para receber ameaças.",
            "Responder a cada comentário com uma ofensa.",
            "Publicar dados pessoais do agressor.",
            "Criar contas falsas para continuar a discussão.",
            "Dizer que ataques virtuais não têm consequências."
        ]
    },
    {
        tema: "uma pessoa dizendo que não quer participar de uma brincadeira",
        correta: "Respeitar a recusa sem pressionar, ridicularizar ou insistir.",
        erradas: [
            "Continuar insistindo até ela aceitar.",
            "Chamá-la de antissocial por recusar.",
            "Fazer a brincadeira escondido para surpreendê-la.",
            "Dizer que recusar prova falta de coragem.",
            "Convencer outras pessoas a pressioná-la.",
            "Transformar a recusa em motivo para um apelido."
        ]
    },
    {
        tema: "um colega contando que sofre bullying há semanas",
        correta: "Escutar sem culpá-lo e ajudá-lo a chegar a pessoas responsáveis que possam intervir.",
        erradas: [
            "Dizer que ele deveria ter contado antes e encerrar a conversa.",
            "Prometer resolver o caso sozinho usando violência.",
            "Contar o relato para colegas que não precisam saber.",
            "Pedir que ele confronte o grupo sem apoio.",
            "Questionar se ele fez algo para merecer as agressões.",
            "Dizer que o problema vai desaparecer se ele ignorar."
        ]
    },
    {
        tema: "uma turma tentando criar regras de convivência",
        correta: "Construir regras claras, respeitosas e aplicáveis a todos, ouvindo diferentes necessidades.",
        erradas: [
            "Criar regras diferentes para proteger apenas os alunos populares.",
            "Permitir ofensas quando a maioria estiver brincando.",
            "Punir sem investigar o que aconteceu.",
            "Fazer regras apenas contra quem costuma reclamar.",
            "Evitar qualquer regra para que cada um faça o que quiser.",
            "Usar apelidos como parte oficial das regras de humor."
        ]
    },
    {
        tema: "um aluno com medo de denunciar uma agressão",
        correta: "Oferecer apoio e ajudar a encontrar um canal seguro para comunicar o problema.",
        erradas: [
            "Exigir que ele conte tudo na frente da turma.",
            "Dizer que denunciar é demonstrar fraqueza.",
            "Prometer segredo absoluto mesmo quando há risco à segurança.",
            "Mandá-lo enfrentar sozinho quem o ameaça.",
            "Contar a história para amigos antes de procurar ajuda.",
            "Ignorar o medo porque a denúncia é responsabilidade exclusiva da vítima."
        ]
    },
    {
        tema: "um estudante sendo alvo de montagem com sua foto",
        correta: "Não divulgar a montagem, guardar evidências e buscar ajuda para interromper a exposição.",
        erradas: [
            "Compartilhar a montagem apenas com amigos próximos.",
            "Criar uma montagem semelhante contra outra pessoa.",
            "Comentar para aumentar o alcance da publicação.",
            "Marcar a vítima para que ela veja a brincadeira.",
            "Dizer que uma imagem editada nunca pode causar dano.",
            "Salvar a imagem somente para usar como piada no futuro."
        ]
    },
    {
        tema: "um colega sendo perseguido durante o recreio",
        correta: "Afastar-se de uma situação insegura, buscar um adulto e oferecer apoio à pessoa perseguida.",
        erradas: [
            "Correr junto para transformar a perseguição em brincadeira.",
            "Esconder a vítima para que ninguém precise intervir.",
            "Ficar assistindo para descobrir como a situação termina.",
            "Gritar provocações para aumentar a confusão.",
            "Filmar para provar que o recreio estava movimentado.",
            "Dizer que perseguição é normal entre adolescentes."
        ]
    },
    {
        tema: "um grupo usando uma característica pessoal para escolher quem será o próximo alvo",
        correta: "Recusar a dinâmica e deixar claro que características pessoais não devem ser usadas para humilhar.",
        erradas: [
            "Escolher alguém diferente para evitar que você seja alvo.",
            "Aceitar porque é apenas um jogo entre amigos.",
            "Fazer uma lista dos estudantes mais fáceis de provocar.",
            "Permitir a brincadeira desde que ninguém grave.",
            "Escolher o alvo por votação para parecer democrático.",
            "Continuar até a pessoa reclamar claramente."
        ]
    },
    {
        tema: "um estudante sendo pressionado a ofender outra pessoa",
        correta: "Recusar a pressão e não participar de uma agressão, mesmo que o grupo insista.",
        erradas: [
            "Ofender primeiro para evitar ser excluído.",
            "Aceitar porque a ordem veio de alguém popular.",
            "Participar apenas uma vez para manter amizades.",
            "Fazer uma ofensa menor para parecer menos agressivo.",
            "Pedir que outra pessoa faça a agressão no seu lugar.",
            "Acreditar que a pressão do grupo elimina sua responsabilidade."
        ]
    },
    {
        tema: "um colega sendo chamado por um nome que ele já pediu para não usar",
        correta: "Respeitar o nome pelo qual a pessoa quer ser chamada e corrigir o comportamento dos colegas quando necessário.",
        erradas: [
            "Continuar usando porque o apelido é antigo.",
            "Dizer que ele precisa aceitar o nome escolhido pelos outros.",
            "Criar uma versão ainda mais engraçada do apelido.",
            "Usar o nome apenas quando houver professores por perto.",
            "Perguntar à turma se vale a pena respeitar o pedido.",
            "Transformar a preferência da pessoa em motivo de provocação."
        ]
    },
    {
        tema: "uma situação em que o agressor diz que era apenas uma brincadeira",
        correta: "Avaliar o impacto da conduta, ouvir a pessoa afetada e interromper o comportamento prejudicial.",
        erradas: [
            "Encerrar o assunto automaticamente porque houve intenção de brincar.",
            "Considerar que qualquer coisa vira aceitável se alguém rir.",
            "Dizer que quem se ofendeu é sempre responsável pelo problema.",
            "Continuar a brincadeira para testar se a pessoa reclama novamente.",
            "Perguntar apenas aos espectadores se eles acharam engraçado.",
            "Ignorar a repetição da conduta porque não houve agressão física."
        ]
    },
    {
        tema: "uma escola querendo reduzir casos de bullying",
        correta: "Combinar prevenção, educação para o respeito, canais de denúncia e acompanhamento dos casos.",
        erradas: [
            "Agir somente quando um caso aparece nas redes sociais.",
            "Punir sem ouvir ninguém para acelerar o processo.",
            "Evitar falar sobre bullying para não dar publicidade ao tema.",
            "Deixar a responsabilidade exclusivamente com as vítimas.",
            "Criar uma única palestra e considerar o problema resolvido.",
            "Tratar todos os conflitos como bullying sem analisar o contexto."
        ]
    }
];

// ============================================================
// BANCO 2 — RESPEITO ÀS DIFERENÇAS
// 30 temas x 5 perguntas = 150 perguntas NOVAS
// ============================================================

const bancoInclusao = [
    {
        tema: "uma pessoa usando cadeira de rodas",
        correta: "Perguntar antes de ajudar e respeitar a autonomia da pessoa.",
        erradas: [
            "Empurrar a cadeira sem avisar para ganhar tempo.",
            "Apoiar objetos na cadeira porque ela é resistente.",
            "Falar com o acompanhante em vez de falar com a pessoa.",
            "Decidir sozinho o caminho que ela deve seguir.",
            "Segurar a cadeira sempre que houver uma subida, sem perguntar.",
            "Tratar a cadeira como se fosse um objeto coletivo."
        ]
    },
    {
        tema: "um colega autista que precisa de uma rotina previsível",
        correta: "Respeitar a necessidade de previsibilidade e combinar mudanças com clareza quando possível.",
        erradas: [
            "Mudar tudo de propósito para testar a reação.",
            "Dizer que a pessoa precisa simplesmente se acostumar.",
            "Fazer barulho para chamar atenção quando ela estiver desconfortável.",
            "Impedir que ela peça informações sobre mudanças.",
            "Usar uma crise como motivo para piadas.",
            "Decidir que toda pessoa autista reage da mesma forma."
        ]
    },
    {
        tema: "uma pessoa com deficiência visual chegando a um lugar desconhecido",
        correta: "Oferecer ajuda, explicar o ambiente e seguir a orientação da própria pessoa.",
        erradas: [
            "Puxá-la pelo braço sem avisar.",
            "Falar apenas com quem estiver acompanhando.",
            "Mover os objetos sem informar onde foram colocados.",
            "Assumir que ela não consegue fazer escolhas.",
            "Gritar instruções de longe sem perguntar se precisa de ajuda.",
            "Decidir o caminho por ela sem explicar nada."
        ]
    },
    {
        tema: "um estudante com deficiência auditiva participando de uma atividade",
        correta: "Garantir comunicação acessível e perguntar qual recurso facilita a participação.",
        erradas: [
            "Falar cada vez mais alto como única solução.",
            "Deixar a pessoa fora da atividade para evitar atrasos.",
            "Falar de costas enquanto escreve no quadro.",
            "Esperar que ela descubra sozinha o que foi explicado.",
            "Fazer piada quando ela não entender uma instrução.",
            "Dizer que acessibilidade é responsabilidade apenas da família."
        ]
    },
    {
        tema: "uma escola que precisa melhorar sua acessibilidade",
        correta: "Identificar barreiras e implementar adaptações que permitam participação com segurança e autonomia.",
        erradas: [
            "Esperar uma reclamação formal antes de considerar qualquer barreira.",
            "Criar acesso somente para visitantes.",
            "Bloquear uma rampa quando o espaço estiver cheio.",
            "Considerar uma adaptação desnecessária porque poucas pessoas a usam.",
            "Retirar sinalizações para deixar o ambiente mais simples.",
            "Oferecer ajuda individual como substituto de todas as adaptações."
        ]
    },
    {
        tema: "um colega com dificuldade para acompanhar uma tarefa",
        correta: "Perguntar qual apoio é necessário e adaptar a atividade sem diminuir a dignidade da pessoa.",
        erradas: [
            "Fazer toda a tarefa no lugar dela sem perguntar.",
            "Excluir a pessoa da atividade para evitar dificuldades.",
            "Entregar respostas prontas sempre.",
            "Falar que ela nunca conseguirá acompanhar a turma.",
            "Comparar publicamente o desempenho dela com o dos outros.",
            "Reduzir expectativas automaticamente sem conhecer suas capacidades."
        ]
    },
    {
        tema: "um estudante com síndrome de Down participando de um trabalho",
        correta: "Incluir o estudante nas decisões e adaptar o apoio conforme suas necessidades reais.",
        erradas: [
            "Decidir tudo por ele sem perguntar sua opinião.",
            "Deixá-lo apenas em tarefas consideradas fáceis.",
            "Falar com ele como se fosse uma criança pequena.",
            "Retirá-lo do grupo para acelerar o trabalho.",
            "Supor que ele não entende as escolhas do grupo.",
            "Usar a síndrome como justificativa para não oferecer desafios."
        ]
    },
    {
        tema: "uma pessoa idosa querendo participar de uma atividade escolar",
        correta: "Respeitar sua participação e oferecer suporte somente quando necessário ou solicitado.",
        erradas: [
            "Impedir a participação porque ela é mais velha.",
            "Decidir que ela não entende tecnologia sem perguntar.",
            "Falar devagar e em tom infantil automaticamente.",
            "Assumir que precisa de ajuda em todas as etapas.",
            "Fazer piadas sobre idade para quebrar o gelo.",
            "Deixá-la de fora para que os mais jovens façam tudo."
        ]
    },
    {
        tema: "uma pessoa com mobilidade reduzida usando um caminho acessível",
        correta: "Manter o caminho livre e respeitar a função dos recursos de acessibilidade.",
        erradas: [
            "Usar a rampa como local para deixar mochilas.",
            "Estacionar objetos no caminho por poucos minutos.",
            "Bloquear a passagem quando houver espaço ao lado.",
            "Retirar placas de acessibilidade por estética.",
            "Dizer que a pessoa pode pedir ajuda se encontrar uma barreira.",
            "Considerar a rota acessível opcional quando houver pressa."
        ]
    },
    {
        tema: "um colega com sensibilidade a sons muito intensos",
        correta: "Considerar formas de reduzir estímulos e respeitar quando a pessoa precisar se afastar.",
        erradas: [
            "Aumentar o barulho para verificar se ela se acostuma.",
            "Dizer que desconforto com som é frescura.",
            "Forçar a permanência em um ambiente insuportável.",
            "Usar a reação da pessoa como entretenimento.",
            "Impedir que ela comunique o desconforto.",
            "Criar sons inesperados para chamar sua atenção."
        ]
    },
    {
        tema: "uma pessoa sendo chamada por um termo capacitista",
        correta: "Evitar o termo ofensivo e usar uma linguagem respeitosa e adequada ao contexto.",
        erradas: [
            "Continuar porque a expressão é comum entre os colegas.",
            "Dizer que a intenção de ofender não importa, então pode continuar.",
            "Usar o termo apenas como apelido carinhoso sem perguntar.",
            "Criar uma versão mais engraçada do insulto.",
            "Dizer que linguagem não interfere na inclusão.",
            "Perguntar ao grupo qual insulto parece menos ofensivo."
        ]
    },
    {
        tema: "um colega com autismo preferindo uma forma específica de comunicação",
        correta: "Respeitar a forma de comunicação que funciona para a pessoa e buscar acessibilidade.",
        erradas: [
            "Obrigá-lo a se comunicar exatamente como a maioria.",
            "Ignorar sua comunicação porque ela é diferente.",
            "Fazer piada com o modo como ele se expressa.",
            "Falar por ele sem necessidade.",
            "Decidir que uma única forma de comunicação serve para todos.",
            "Evitar conversar com ele para não precisar adaptar a comunicação."
        ]
    },
    {
        tema: "uma pessoa com deficiência querendo tomar sua própria decisão",
        correta: "Respeitar sua autonomia e oferecer informações ou apoio sem assumir o controle.",
        erradas: [
            "Decidir no lugar dela para facilitar o processo.",
            "Perguntar primeiro ao acompanhante em todas as situações.",
            "Dizer que deficiência impede decisões independentes.",
            "Escolher a opção que parece melhor sem consultar.",
            "Impedir que ela recuse uma ajuda oferecida.",
            "Tratar autonomia como algo que só pessoas sem deficiência possuem."
        ]
    },
    {
        tema: "uma atividade em grupo que não considera diferentes necessidades",
        correta: "Planejar adaptações para que as pessoas possam participar de maneira justa.",
        erradas: [
            "Manter a mesma atividade mesmo quando uma barreira é conhecida.",
            "Excluir quem precisa de adaptação para simplificar o trabalho.",
            "Dar a mesma tarefa sem considerar acessibilidade.",
            "Esperar que cada pessoa resolva sozinha qualquer barreira.",
            "Oferecer participação apenas como espectador.",
            "Considerar adaptações um privilégio injusto."
        ]
    },
    {
        tema: "uma pessoa sendo tratada como incapaz por causa da deficiência",
        correta: "Combater o capacitismo e avaliar as capacidades reais da pessoa, não estereótipos.",
        erradas: [
            "Reduzir todas as expectativas automaticamente.",
            "Impedir que ela tente atividades novas.",
            "Falar por ela sempre que houver uma dificuldade.",
            "Dizer que a deficiência define tudo sobre sua personalidade.",
            "Escolher apenas tarefas simples sem consultar.",
            "Afirmar que proteção significa impedir qualquer autonomia."
        ]
    },
    {
        tema: "um estudante usando aparelho de mobilidade durante uma aula",
        correta: "Respeitar o equipamento e nunca mexer nele sem autorização.",
        erradas: [
            "Tocar no equipamento para ver como funciona.",
            "Usá-lo como apoio para alcançar algo.",
            "Mover o equipamento para abrir espaço sem avisar.",
            "Fazer perguntas invasivas sobre o corpo da pessoa.",
            "Brincar com o equipamento quando ninguém estiver olhando.",
            "Decidir que equipamentos de mobilidade podem ser compartilhados."
        ]
    },
    {
        tema: "uma pessoa com deficiência participando de uma conversa",
        correta: "Falar diretamente com ela, ouvir sua resposta e evitar pressupor suas capacidades.",
        erradas: [
            "Falar somente com seu acompanhante.",
            "Usar tom infantil automaticamente.",
            "Responder por ela sem que tenha pedido.",
            "Supor que não compreenderá assuntos complexos.",
            "Evitar perguntas para não constrangê-la.",
            "Mudar de assunto sempre que sua deficiência for mencionada."
        ]
    },
    {
        tema: "uma equipe querendo criar uma escola mais inclusiva",
        correta: "Ouvir as pessoas afetadas, identificar barreiras e acompanhar se as soluções funcionam.",
        erradas: [
            "Criar soluções sem consultar ninguém que enfrente as barreiras.",
            "Fazer apenas uma campanha visual e não mudar práticas.",
            "Considerar inclusão resolvida depois de uma única palestra.",
            "Escolher adaptações apenas pela aparência.",
            "Priorizar somente mudanças que não alterem nenhuma rotina.",
            "Medir inclusão apenas pelo número de cartazes existentes."
        ]
    },
    {
        tema: "uma pessoa com deficiência recebendo ajuda que não pediu",
        correta: "Perguntar se ela precisa de ajuda e aceitar sua resposta, inclusive quando disser não.",
        erradas: [
            "Continuar ajudando mesmo depois de ela recusar.",
            "Dizer que ela não sabe o que é melhor para si.",
            "Chamar outras pessoas para insistirem.",
            "Ficar ofendido porque a ajuda foi recusada.",
            "Tomar a decisão por ela para evitar riscos imaginados.",
            "Considerar qualquer recusa como ingratidão."
        ]
    },
    {
        tema: "um colega sendo excluído por precisar de uma adaptação",
        correta: "Tratar a adaptação como recurso de equidade e garantir que o colega participe do grupo.",
        erradas: [
            "Dizer que a adaptação dá vantagem injusta.",
            "Retirar a pessoa da atividade para manter igualdade aparente.",
            "Proibir adaptações para todos receberem exatamente o mesmo tratamento.",
            "Fazer comentários sobre o recurso usado.",
            "Exigir que a pessoa dispense o recurso para participar.",
            "Comparar publicamente a adaptação com um privilégio."
        ]
    },
    {
        tema: "um estudante com dificuldade de leitura recebendo uma prova",
        correta: "Usar recursos ou adaptações previstos para garantir acesso ao conteúdo e avaliação justa.",
        erradas: [
            "Dizer que qualquer adaptação facilita demais a prova.",
            "Entregar a prova sem considerar uma necessidade já conhecida.",
            "Dar respostas sem que isso seja parte da adaptação.",
            "Excluir o estudante da avaliação.",
            "Fazer a prova no lugar dele.",
            "Diminuir a importância da avaliação porque ele precisa de apoio."
        ]
    },
    {
        tema: "uma pessoa sendo julgada por sua aparência física",
        correta: "Evitar estereótipos e avaliar a pessoa por suas atitudes e individualidade.",
        erradas: [
            "Presumir personalidade pela aparência.",
            "Fazer piadas para testar sua reação.",
            "Escolher amigos apenas pelo padrão visual do grupo.",
            "Usar aparência como critério para competência.",
            "Espalhar comentários sobre o corpo da pessoa.",
            "Dizer que aparência determina o valor de alguém."
        ]
    },
    {
        tema: "uma pessoa com deficiência sendo superprotegida",
        correta: "Oferecer segurança sem retirar oportunidades de escolha, participação e autonomia.",
        erradas: [
            "Impedir qualquer atividade que pareça desafiadora.",
            "Fazer tudo pela pessoa mesmo quando ela quer participar.",
            "Escolher seus caminhos sem consultar.",
            "Evitar que ela assuma responsabilidades.",
            "Dizer que autonomia é perigosa para pessoas com deficiência.",
            "Usar proteção como justificativa para exclusão."
        ]
    },
    {
        tema: "um grupo discutindo a diferença entre igualdade e equidade",
        correta: "Compreender que equidade considera necessidades diferentes para ampliar oportunidades justas.",
        erradas: [
            "Afirmar que justiça significa sempre entregar exatamente o mesmo recurso.",
            "Dizer que equidade permite favorecer qualquer pessoa sem critério.",
            "Considerar adaptações incompatíveis com igualdade de direitos.",
            "Afirmar que necessidades diferentes devem ser ignoradas.",
            "Tratar equidade como uma forma de excluir quem não precisa de apoio.",
            "Dizer que todos devem enfrentar exatamente as mesmas barreiras."
        ]
    },
    {
        tema: "uma pessoa sendo excluída por ter uma característica considerada diferente",
        correta: "Questionar a exclusão e criar condições para que a diferença não vire barreira à participação.",
        erradas: [
            "Afastar a pessoa para evitar que o grupo mude.",
            "Dizer que diferenças devem ficar fora de espaços coletivos.",
            "Pedir que ela esconda sua característica para ser aceita.",
            "Usar estereótipos para justificar a separação.",
            "Permitir participação somente em atividades isoladas.",
            "Considerar a exclusão natural quando a maioria é diferente."
        ]
    },
    {
        tema: "uma escola usando linguagem sobre inclusão em seus projetos",
        correta: "Combinar linguagem respeitosa com ações concretas que reduzam barreiras e discriminação.",
        erradas: [
            "Usar palavras bonitas sem mudar nenhuma prática.",
            "Considerar inclusão apenas uma campanha de publicidade.",
            "Evitar ouvir estudantes para preservar a imagem da escola.",
            "Tratar acessibilidade como decoração.",
            "Fazer um evento e encerrar todas as ações depois dele.",
            "Medir inclusão apenas pela quantidade de publicações."
        ]
    },
    {
        tema: "uma pessoa sendo interrompida porque precisa de mais tempo para responder",
        correta: "Dar tempo para a pessoa concluir sua comunicação sem tratá-la como menos capaz.",
        erradas: [
            "Completar todas as frases por ela.",
            "Mudar de assunto porque a resposta demorou.",
            "Fazer piada sobre sua velocidade de fala.",
            "Responder por ela sem perguntar.",
            "Dizer que pessoas rápidas devem falar por todos.",
            "Evitar conversar com ela para economizar tempo."
        ]
    },
    {
        tema: "um estudante defendendo a inclusão de um colega",
        correta: "Apoiar o colega sem falar por ele desnecessariamente e buscar soluções junto com as pessoas envolvidas.",
        erradas: [
            "Tomar todas as decisões pelo colega.",
            "Transformar a situação em uma disputa pública.",
            "Expor detalhes pessoais para provar que ele precisa de apoio.",
            "Impedir que o próprio colega dê sua opinião.",
            "Usar sua história como conteúdo para redes sociais sem autorização.",
            "Decidir que defender alguém exige falar no lugar dessa pessoa."
        ]
    },
    {
        tema: "uma turma recebendo um colega com uma necessidade diferente",
        correta: "Promover acolhimento, respeito e ajustes necessários sem transformar a pessoa em objeto de curiosidade.",
        erradas: [
            "Fazer muitas perguntas pessoais na frente de todos.",
            "Tratar a pessoa como mascote da turma.",
            "Decidir que ela precisa de ajuda em tudo.",
            "Evitar incluí-la até descobrir toda sua história.",
            "Criar apelidos relacionados à sua necessidade.",
            "Exigir que ela conte detalhes pessoais para ser aceita."
        ]
    },
    {
        tema: "uma pessoa sendo julgada por precisar de tecnologia assistiva",
        correta: "Reconhecer a tecnologia como recurso de acessibilidade e respeitar seu uso.",
        erradas: [
            "Dizer que usar tecnologia é uma vantagem indevida.",
            "Pedir para testar o equipamento sem autorização.",
            "Fazer piada com o dispositivo.",
            "Esconder o equipamento para brincar.",
            "Exigir que a pessoa faça tudo sem o recurso.",
            "Considerar o equipamento um privilégio dispensável."
        ]
    },
    {
        tema: "uma situação em que uma adaptação parece diferente do tratamento dado aos demais",
        correta: "Avaliar se a diferença de tratamento é necessária para garantir participação e oportunidades justas.",
        erradas: [
            "Concluir que qualquer diferença é injusta.",
            "Retirar a adaptação para deixar tudo visualmente igual.",
            "Comparar apenas o recurso recebido, sem olhar as barreiras enfrentadas.",
            "Impedir adaptações para evitar reclamações.",
            "Considerar equidade uma forma de privilégio automático.",
            "Decidir que justiça exige que todos enfrentem as mesmas dificuldades."
        ]
    },
    {
        tema: "um projeto escolar sobre diversidade e respeito",
        correta: "Apresentar diferentes perspectivas com respeito e evitar estereótipos ou generalizações.",
        erradas: [
            "Representar grupos inteiros por um único estereótipo.",
            "Escolher apenas opiniões que confirmem ideias preconcebidas.",
            "Fazer humor com características pessoais para chamar atenção.",
            "Falar sobre diversidade sem ouvir pessoas diferentes.",
            "Tratar diferenças como curiosidades exóticas.",
            "Usar exemplos ofensivos para tornar o trabalho mais impactante."
        ]
    },
    {
        tema: "uma pessoa sendo excluída por não se encaixar no padrão do grupo",
        correta: "Questionar o padrão e ampliar a participação sem exigir que a pessoa abandone sua identidade.",
        erradas: [
            "Pressionar a pessoa a mudar para ser aceita.",
            "Manter o padrão porque a maioria prefere assim.",
            "Criar regras que eliminem diferenças visíveis.",
            "Dizer que pertencimento depende de parecer com os demais.",
            "Afastar quem não acompanha o padrão.",
            "Tratar diversidade como problema de adaptação individual."
        ]
    }
];

// ============================================================
// GERAÇÃO DAS 300 PERGUNTAS
// Cada tema gera 5 perguntas realmente diferentes.
// As alternativas erradas mudam conforme o nível.
// A alternativa correta é embaralhada em todas as questões.
// ============================================================

const modelosPergunta = [
    "Qual é a melhor atitude diante de {tema}?",
    "Você presencia {tema}. Qual decisão demonstra respeito e responsabilidade?",
    "Por que a resposta correta é importante quando ocorre {tema}?",
    "Analise a situação de {tema}. Qual opção evita agravar o problema?",
    "Em uma situação mais complexa envolvendo {tema}, qual princípio deve orientar sua atitude?"
];

function gerarBanco(banco) {
    const perguntas = [];

    for (let nivel = 0; nivel < 5; nivel++) {
        banco.forEach((item, indiceTema) => {
            const perguntaTexto = modelosPergunta[nivel].replace("{tema}", item.tema);
            const inicio = (nivel * 2 + indiceTema) % item.erradas.length;
            const erradas = escolherTresUnicas(item.erradas, inicio);

            const alternativas = [
                { texto: item.correta, correta: true },
                ...erradas.map(texto => ({ texto, correta: false }))
            ];

            perguntas.push({
                pergunta: perguntaTexto,
                alternativas: embaralhar(alternativas),
                nivel: nivel + 1,
                nomeNivel: niveis[nivel].nome,
                pontos: niveis[nivel].pontos
            });
        });
    }

    // Segurança: remove qualquer duplicação exata de pergunta.
    const vistos = new Set();
    const semDuplicatas = perguntas.filter(q => {
        const chave = q.pergunta.trim().toLowerCase();
        if (vistos.has(chave)) return false;
        vistos.add(chave);
        return true;
    });

    if (semDuplicatas.length !== TOTAL_PERGUNTAS) {
        console.warn("Banco com quantidade diferente do esperado:", semDuplicatas.length);
    }

    return semDuplicatas;
}

const perguntasBullying = gerarBanco(bancoBullying);
const perguntasInclusao = gerarBanco(bancoInclusao);

// ============================================================
// SOM
// ============================================================
function tocarSom(frequencia, duracao = 0.1) {
    if (!somAtivo) return;
    try {
        audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
        const oscilador = audioContext.createOscillator();
        const ganho = audioContext.createGain();
        oscilador.frequency.value = frequencia;
        ganho.gain.setValueAtTime(0.04, audioContext.currentTime);
        ganho.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duracao);
        oscilador.connect(ganho);
        ganho.connect(audioContext.destination);
        oscilador.start();
        oscilador.stop(audioContext.currentTime + duracao);
    } catch (_) {}
}

function alternarSom() {
    somAtivo = !somAtivo;
    const botao = document.querySelector(".botao-som");
    if (botao) botao.textContent = somAtivo ? "🔊 Som ativado" : "🔇 Som desativado";
    if (somAtivo) tocarSom(700);
}

// ============================================================
// INICIAR / CONTINUAR JOGO
// ============================================================
function selecionarJogo(tipo) {
    jogoAtual = tipo;
    perguntaAtual = 0;
    pontos = 0;
    respostaDada = false;

    const banco = tipo === "bullying" ? perguntasBullying : perguntasInclusao;
    perguntasDoJogo = embaralhar(banco);

    // A ordem embaralhada seria ruim para a progressão da dificuldade.
    // Reorganizamos por dificuldade e embaralhamos apenas dentro de cada nível.
    perguntasDoJogo = [];
    for (let nivel = 1; nivel <= 5; nivel++) {
        const bloco = banco.filter(q => q.nivel === nivel);
        perguntasDoJogo.push(...embaralhar(bloco));
    }

    mostrarTela("jogo");
    mostrarPergunta();
}

function mostrarTela(tela) {
    ["inicio", "rankingTela", "jogo", "resultado"].forEach(id => {
        document.getElementById(id)?.classList.add("escondido");
    });
    document.getElementById(tela)?.classList.remove("escondido");
}

function mostrarPergunta() {
    if (perguntaAtual >= TOTAL_PERGUNTAS) {
        mostrarResultado();
        return;
    }

    respostaDada = false;
    const questao = perguntasDoJogo[perguntaAtual];
    const fase = Math.floor(perguntaAtual / PERGUNTAS_POR_FASE) + 1;
    const numeroNaFase = (perguntaAtual % PERGUNTAS_POR_FASE) + 1;

    document.getElementById("faseAtual").textContent = `🏁 Fase ${fase} de ${TOTAL_FASES}`;
    document.getElementById("numeroPergunta").textContent = `Pergunta ${numeroNaFase} de 10`;
    document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
    document.getElementById("numeroBola").textContent = perguntaAtual + 1;
    document.getElementById("pergunta").textContent = questao.pergunta;
    document.getElementById("tituloJogo").textContent = jogoAtual === "bullying" ? "🛡️ A Luta Contra o Bullying" : "♿ Respeito às Diferenças";
    document.getElementById("feedback").textContent = `Nível: ${questao.nomeNivel} • Vale ${questao.pontos} pontos`;
    document.getElementById("areaProxima").innerHTML = "";

    const progresso = ((numeroNaFase - 1) / PERGUNTAS_POR_FASE) * 100;
    document.getElementById("progressoFase").style.width = `${progresso}%`;
    document.getElementById("progressoTexto").textContent = `Fase ${fase} — ${numeroNaFase - 1} de 10 respondidas`;

    const area = document.getElementById("alternativas");
    area.innerHTML = "";

    questao.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");
        botao.className = "alternativa";
        botao.type = "button";
        botao.textContent = `${String.fromCharCode(65 + indice)}) ${alternativa.texto}`;
        botao.onclick = () => escolherResposta(botao, alternativa.correta, questao.pontos);
        area.appendChild(botao);
    });
}

function escolherResposta(botaoEscolhido, correta, valor) {
    if (respostaDada) return;
    respostaDada = true;

    const botoes = document.querySelectorAll("#alternativas .alternativa");
    botoes.forEach(botao => botao.disabled = true);

    if (correta) {
        pontos += valor;
        botaoEscolhido.classList.add("correta");
        document.getElementById("feedback").textContent = `✅ Muito bem! +${valor} pontos de empatia.`;
        tocarSom(900);
    } else {
        botaoEscolhido.classList.add("errada");
        document.getElementById("feedback").textContent = "❌ Não é essa. A resposta correta está destacada.";
        botoes.forEach(botao => {
            const letra = botao.textContent.charAt(0);
            const indice = letra.charCodeAt(0) - 65;
            const alt = perguntasDoJogo[perguntaAtual].alternativas[indice];
            if (alt?.correta) botao.classList.add("correta");
        });
        tocarSom(220);
    }

    document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
    const numeroNaFase = (perguntaAtual % PERGUNTAS_POR_FASE) + 1;
    document.getElementById("progressoTexto").textContent = `Fase ${Math.floor(perguntaAtual / 10) + 1} — ${numeroNaFase} de 10 respondidas`;
    document.getElementById("progressoFase").style.width = `${(numeroNaFase / 10) * 100}%`;

    criarBotaoProxima();
    salvarProgresso();
}

function criarBotaoProxima() {
    const area = document.getElementById("areaProxima");
    area.innerHTML = "";
    const botao = document.createElement("button");

    if (perguntaAtual === TOTAL_PERGUNTAS - 1) {
        botao.textContent = "🏆 Ver resultado";
    } else if ((perguntaAtual + 1) % PERGUNTAS_POR_FASE === 0) {
        botao.textContent = "🚀 Ir para a próxima fase";
    } else {
        botao.textContent = "➡️ Próxima pergunta";
    }

    botao.onclick = proximaPergunta;
    area.appendChild(botao);
}

function proximaPergunta() {
    perguntaAtual++;
    salvarProgresso();

    if (perguntaAtual >= TOTAL_PERGUNTAS) {
        mostrarResultado();
        return;
    }

    if (perguntaAtual % PERGUNTAS_POR_FASE === 0) {
        mostrarMensagemFase();
        tocarSom(1100);
    } else {
        mostrarPergunta();
    }
}

function mostrarMensagemFase() {
    const fase = Math.floor(perguntaAtual / PERGUNTAS_POR_FASE) + 1;
    document.getElementById("pergunta").textContent = `🎉 Você chegou à Fase ${fase}!`;
    document.getElementById("alternativas").innerHTML = `<p class="centralizado">Prepare-se: as perguntas ficam mais difíceis conforme você avança.</p>`;
    document.getElementById("feedback").textContent = `🔥 Agora começa a ${niveis[Math.min(4, Math.floor(perguntaAtual / 30))].nome.replace(/^[^ ]+ /, "")}!`;
    document.getElementById("areaProxima").innerHTML = "";

    const botao = document.createElement("button");
    botao.textContent = `▶️ Começar Fase ${fase}`;
    botao.onclick = mostrarPergunta;
    document.getElementById("areaProxima").appendChild(botao);
}

// ============================================================
// RESULTADO / RANKING
// ============================================================
function obterPontuacaoMaxima() {
    return 30 * 10 + 30 * 12 + 30 * 15 + 30 * 20 + 30 * 25;
}

function mostrarResultado() {
    const maximo = obterPontuacaoMaxima();
    const porcentagem = Math.round((pontos / maximo) * 100);
    let medalha, mensagem;

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
        mensagem = "Continue praticando. O importante é aprender e melhorar.";
    }

    mostrarTela("resultado");
    document.getElementById("resultadoTitulo").textContent = jogoAtual === "bullying" ? "🛡️ A Luta Contra o Bullying" : "♿ Respeito às Diferenças";
    document.getElementById("pontuacaoFinal").textContent = `⭐ Pontuação: ${pontos} de ${maximo}`;
    document.getElementById("porcentagemFinal").textContent = `📊 Aproveitamento: ${porcentagem}%`;
    document.getElementById("medalhaFinal").textContent = medalha;
    document.getElementById("mensagemFinal").textContent = mensagem;

    salvarRanking(jogoAtual, pontos, porcentagem, medalha);
    localStorage.removeItem(chaveProgresso(jogoAtual));
    tocarSom(1200);
}

function salvarRanking(jogo, pontosObtidos, porcentagem, medalha) {
    const ranking = JSON.parse(localStorage.getItem("rankingJogo") || "[]");
    ranking.push({ jogo, pontos: pontosObtidos, porcentagem, medalha, data: new Date().toLocaleDateString("pt-BR") });
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
        div.innerHTML = `<span class="ranking-posicao">${posicao}</span><span class="ranking-nome">${nome}<br><small>${item.data}</small></span><span class="ranking-pontos">${item.pontos} pts</span>`;
        lista.appendChild(div);
    });
}

function fecharRanking() {
    mostrarTela("inicio");
    verificarJogosSalvos();
}

// ============================================================
// SALVAMENTO SEPARADO DOS DOIS JOGOS
// ============================================================
function chaveProgresso(jogo) {
    return jogo === "bullying" ? "progressoBullying" : "progressoInclusao";
}

function salvarProgresso() {
    if (!jogoAtual || !perguntasDoJogo.length) return;

    const dados = {
        versao: 2,
        jogo: jogoAtual,
        pergunta: perguntaAtual,
        pontos,
        ordem: perguntasDoJogo
    };

    localStorage.setItem(chaveProgresso(jogoAtual), JSON.stringify(dados));
}

function salvarESair() {
    salvarProgresso();
    mostrarTela("inicio");
    verificarJogosSalvos();
}

function obterProgresso(jogo) {
    const salvo = localStorage.getItem(chaveProgresso(jogo));
    if (!salvo) return null;
    try {
        const dados = JSON.parse(salvo);
        if (dados.versao !== 2 || !Array.isArray(dados.ordem) || dados.ordem.length !== TOTAL_PERGUNTAS) return null;
        return dados;
    } catch (_) {
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
        const fase = Math.min(TOTAL_FASES, Math.floor(bullying.pergunta / 10) + 1);
        const pergunta = Math.min(10, (bullying.pergunta % 10) + 1);
        html += `<div class="jogo-salvo"><strong>🛡️ A Luta Contra o Bullying</strong><span>Fase ${fase} de ${TOTAL_FASES} — Pergunta ${pergunta} de 10 — ${bullying.pontos} pontos</span><button onclick="continuarJogo('bullying')">▶️ Continuar Bullying</button><button class="botao-apagar" onclick="apagarProgresso('bullying')">🗑️ Apagar</button></div>`;
    }

    if (inclusao) {
        const fase = Math.min(TOTAL_FASES, Math.floor(inclusao.pergunta / 10) + 1);
        const pergunta = Math.min(10, (inclusao.pergunta % 10) + 1);
        html += `<div class="jogo-salvo"><strong>♿ Respeito às Diferenças</strong><span>Fase ${fase} de ${TOTAL_FASES} — Pergunta ${pergunta} de 10 — ${inclusao.pontos} pontos</span><button onclick="continuarJogo('inclusao')">▶️ Continuar Inclusão</button><button class="botao-apagar" onclick="apagarProgresso('inclusao')">🗑️ Apagar</button></div>`;
    }

    area.innerHTML = html;
    area.classList.remove("escondido");
}

function continuarJogo(tipo) {
    const dados = obterProgresso(tipo);
    if (!dados) return;

    jogoAtual = dados.jogo;
    perguntaAtual = Math.min(Math.max(0, dados.pergunta), TOTAL_PERGUNTAS - 1);
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

function jogarNovamente() {
    // Apaga somente o jogo terminado; o outro jogo permanece salvo.
    localStorage.removeItem(chaveProgresso(jogoAtual));
    selecionarJogo(jogoAtual);
}

function voltarAoMenu() {
    mostrarTela("inicio");
    verificarJogosSalvos();
}

// Mantém compatibilidade com versões anteriores do HTML.
function verificarJogoSalvo() {
    verificarJogosSalvos();
}

window.addEventListener("load", verificarJogosSalvos);
