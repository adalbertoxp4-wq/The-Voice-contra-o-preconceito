/* =====================================================
   VARIÁVEIS DO JOGO
===================================================== */

let jogoAtual = "";

let perguntaAtual = 0;

let pontos = 0;

let respostaDada = false;


/* =====================================================
   BANCO DE PERGUNTAS - BULLYING
===================================================== */

const perguntasBullying = [

    {
        pergunta: "Você vê um colega sendo humilhado. O que fazer?",
        alternativas: [
            ["Rir junto", -5],
            ["Ignorar", 0],
            ["Ajudar e procurar um adulto", 10]
        ]
    },

    {
        pergunta: "Um colega recebe apelidos ofensivos todos os dias. O que fazer?",
        alternativas: [
            ["Continuar", -5],
            ["Fingir que não percebe", 0],
            ["Parar e respeitar", 10]
        ]
    },

    {
        pergunta: "Um aluno está sozinho no intervalo. O que você pode fazer?",
        alternativas: [
            ["Zombar", -5],
            ["Ignorar", 0],
            ["Conversar e incluí-lo", 10]
        ]
    },

    {
        pergunta: "Você recebe uma mensagem ofensiva sobre um colega.",
        alternativas: [
            ["Compartilhar", -5],
            ["Ignorar", 0],
            ["Não compartilhar e denunciar", 10]
        ]
    },

    {
        pergunta: "Um aluno novo está sendo excluído.",
        alternativas: [
            ["Excluir também", -5],
            ["Não fazer nada", 0],
            ["Convidá-lo para participar", 10]
        ]
    },

    {
        pergunta: "Você presencia uma agressão física.",
        alternativas: [
            ["Filmar", -5],
            ["Ir embora", 0],
            ["Procurar um adulto", 10]
        ]
    },

    {
        pergunta: "Um colega diz que sofre bullying.",
        alternativas: [
            ["Dizer que é frescura", -5],
            ["Mudar de assunto", 0],
            ["Ouvir e ajudar", 10]
        ]
    },

    {
        pergunta: "Publicaram uma foto constrangedora de um colega.",
        alternativas: [
            ["Curtir", -5],
            ["Ignorar", 0],
            ["Denunciar e não compartilhar", 10]
        ]
    },

    {
        pergunta: "Um grupo faz piadas sobre a aparência de alguém.",
        alternativas: [
            ["Participar", -5],
            ["Observar", 0],
            ["Pedir que parem", 10]
        ]
    },

    {
        pergunta: "Como demonstrar respeito?",
        alternativas: [
            ["Ofender", -5],
            ["Respeitar apenas amigos", 0],
            ["Tratar todos com respeito", 10]
        ]
    },

    {
        pergunta: "Um colega está triste após uma provocação.",
        alternativas: [
            ["Ignorar", -5],
            ["Esperar passar", 0],
            ["Oferecer apoio", 10]
        ]
    },

    {
        pergunta: "Bullying pode acontecer pela internet?",
        alternativas: [
            ["Não", -5],
            ["Raramente", 0],
            ["Sim, pode ser cyberbullying", 10]
        ]
    },

    {
        pergunta: "Um colega está sendo ameaçado.",
        alternativas: [
            ["Ameaçar também", -5],
            ["Ignorar", 0],
            ["Contar a um adulto", 10]
        ]
    },

    {
        pergunta: "O que é empatia?",
        alternativas: [
            ["Pensar só em si", -5],
            ["Ignorar sentimentos", -5],
            ["Compreender os sentimentos dos outros", 10]
        ]
    },

    {
        pergunta: "Por que devemos evitar apelidos ofensivos?",
        alternativas: [
            ["Podem machucar", 10],
            ["São sempre engraçados", -5],
            ["Não fazem diferença", -5]
        ]
    },

    {
        pergunta: "Um colega sofre piadas por causa da roupa.",
        alternativas: [
            ["Fazer mais piadas", -5],
            ["Ignorar", 0],
            ["Respeitar seu estilo", 10]
        ]
    },

    {
        pergunta: "Você escuta uma fofoca cruel.",
        alternativas: [
            ["Espalhar", -5],
            ["Ouvir", 0],
            ["Não espalhar", 10]
        ]
    },

    {
        pergunta: "O que ajuda a criar uma escola segura?",
        alternativas: [
            ["Respeito", 10],
            ["Brigas", -5],
            ["Ignorar problemas", 0]
        ]
    },

    {
        pergunta: "Um amigo pratica bullying.",
        alternativas: [
            ["Incentivar", -5],
            ["Fingir que não sabe", 0],
            ["Conversar com ele", 10]
        ]
    },

    {
        pergunta: "Um aluno é ridicularizado por suas notas.",
        alternativas: [
            ["Rir", -5],
            ["Fazer piada", -5],
            ["Apoiá-lo", 10]
        ]
    },

    {
        pergunta: "O que fazer diante de uma provocação?",
        alternativas: [
            ["Responder com agressão", -5],
            ["Aumentar a discussão", -5],
            ["Manter a calma", 10]
        ]
    },

    {
        pergunta: "Você percebe alguém sendo excluído.",
        alternativas: [
            ["Excluir também", -5],
            ["Ignorar", 0],
            ["Tentar incluir", 10]
        ]
    },

    {
        pergunta: "Uma pessoa começa a chorar depois de uma piada.",
        alternativas: [
            ["Rir", -5],
            ["Sair", 0],
            ["Oferecer apoio", 10]
        ]
    },

    {
        pergunta: "O que é cyberbullying?",
        alternativas: [
            ["Um jogo", -5],
            ["Uma brincadeira", 0],
            ["Bullying usando meios digitais", 10]
        ]
    },

    {
        pergunta: "Você vê uma ameaça na internet.",
        alternativas: [
            ["Compartilhar", -5],
            ["Ignorar", 0],
            ["Denunciar e procurar ajuda", 10]
        ]
    },

    {
        pergunta: "Um colega tem uma característica diferente.",
        alternativas: [
            ["Zombar", -5],
            ["Evitar", 0],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Como resolver um conflito?",
        alternativas: [
            ["Violência", -5],
            ["Gritando", -5],
            ["Conversando com respeito", 10]
        ]
    },

    {
        pergunta: "Um colega erra durante uma apresentação.",
        alternativas: [
            ["Rir", -5],
            ["Fazer piada", -5],
            ["Apoiar", 10]
        ]
    },

    {
        pergunta: "Você recebe um vídeo de uma briga.",
        alternativas: [
            ["Compartilhar", -5],
            ["Guardar para mostrar", -5],
            ["Não compartilhar e procurar ajuda", 10]
        ]
    },

    {
        pergunta: "Uma pessoa está sofrendo humilhações.",
        alternativas: [
            ["Participar", -5],
            ["Observar", 0],
            ["Apoiar e procurar ajuda", 10]
        ]
    },

    {
        pergunta: "Por que denunciar bullying?",
        alternativas: [
            ["Para chamar atenção", -5],
            ["Para criar problemas", -5],
            ["Para proteger a vítima", 10]
        ]
    },

    {
        pergunta: "Um colega é excluído de um grupo.",
        alternativas: [
            ["Excluir também", -5],
            ["Ignorar", 0],
            ["Convidá-lo", 10]
        ]
    },

    {
        pergunta: "Uma pessoa está sendo ridicularizada.",
        alternativas: [
            ["Rir", -5],
            ["Ficar olhando", 0],
            ["Não participar", 10]
        ]
    },

    {
        pergunta: "Como tratar alguém que pensa diferente?",
        alternativas: [
            ["Ofender", -5],
            ["Ignorar", 0],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Uma fofoca prejudica um colega.",
        alternativas: [
            ["Espalhar", -5],
            ["Ouvir", 0],
            ["Não espalhar", 10]
        ]
    },

    {
        pergunta: "Um aluno está com medo de ir à escola.",
        alternativas: [
            ["Zombar", -5],
            ["Ignorar", 0],
            ["Conversar e buscar ajuda", 10]
        ]
    },

    {
        pergunta: "O bullying pode afetar a autoestima?",
        alternativas: [
            ["Sim", 10],
            ["Nunca", -5],
            ["Somente adultos", -5]
        ]
    },

    {
        pergunta: "Você não sabe como ajudar uma vítima.",
        alternativas: [
            ["Ignorar", -5],
            ["Usar violência", -5],
            ["Procurar um adulto", 10]
        ]
    },

    {
        pergunta: "Uma pessoa está sendo provocada por sua voz.",
        alternativas: [
            ["Imitar", -5],
            ["Rir", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Qual atitude demonstra solidariedade?",
        alternativas: [
            ["Ajudar", 10],
            ["Ignorar", -5],
            ["Zombar", -5]
        ]
    },

    {
        pergunta: "Você vê comentários ofensivos em uma publicação.",
        alternativas: [
            ["Curtir", -5],
            ["Compartilhar", -5],
            ["Denunciar", 10]
        ]
    },

    {
        pergunta: "Um amigo pede para participar de uma provocação.",
        alternativas: [
            ["Participar", -5],
            ["Incentivar", -5],
            ["Recusar", 10]
        ]
    },

    {
        pergunta: "Por que conversar sobre bullying?",
        alternativas: [
            ["Para combater o problema", 10],
            ["Para fofocar", -5],
            ["Para culpar alguém", -5]
        ]
    },

    {
        pergunta: "Um colega é excluído de uma atividade.",
        alternativas: [
            ["Excluir mais", -5],
            ["Ignorar", 0],
            ["Incluí-lo", 10]
        ]
    },

    {
        pergunta: "Você presencia uma ameaça.",
        alternativas: [
            ["Ameaçar também", -5],
            ["Filmar", -5],
            ["Procurar ajuda", 10]
        ]
    },

    {
        pergunta: "Uma brincadeira deixa alguém desconfortável.",
        alternativas: [
            ["Continuar", -5],
            ["Rir", -5],
            ["Parar", 10]
        ]
    },

    {
        pergunta: "Como demonstrar amizade?",
        alternativas: [
            ["Apoiar", 10],
            ["Humilhar", -5],
            ["Espalhar segredos", -5]
        ]
    },

    {
        pergunta: "Uma pessoa pede para você parar.",
        alternativas: [
            ["Continuar", -5],
            ["Rir", -5],
            ["Parar e respeitar", 10]
        ]
    },

    {
        pergunta: "Um aluno é ridicularizado por seu cabelo.",
        alternativas: [
            ["Fazer piada", -5],
            ["Ignorar", 0],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Você vê bullying em um grupo de mensagens.",
        alternativas: [
            ["Compartilhar", -5],
            ["Curtir", -5],
            ["Denunciar", 10]
        ]
    },

    {
        pergunta: "Uma vítima pede ajuda.",
        alternativas: [
            ["Ignorar", -5],
            ["Dizer que é frescura", -5],
            ["Ouvir e ajudar", 10]
        ]
    },

    {
        pergunta: "Você vê um aluno sendo excluído.",
        alternativas: [
            ["Excluir também", -5],
            ["Ignorar", 0],
            ["Convidar para participar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa está sendo humilhada por suas notas.",
        alternativas: [
            ["Rir", -5],
            ["Ignorar", 0],
            ["Apoiar", 10]
        ]
    },

    {
        pergunta: "O que é respeito?",
        alternativas: [
            ["Tratar as pessoas com dignidade", 10],
            ["Humilhar", -5],
            ["Excluir", -5]
        ]
    },

    {
        pergunta: "Você percebe bullying no banheiro da escola.",
        alternativas: [
            ["Participar", -5],
            ["Ignorar", 0],
            ["Informar um adulto", 10]
        ]
    },

    {
        pergunta: "Um colega sofre comentários ofensivos.",
        alternativas: [
            ["Rir", -5],
            ["Observar", 0],
            ["Apoiar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa é chamada por um apelido que não gosta.",
        alternativas: [
            ["Continuar", -5],
            ["Usar às vezes", -5],
            ["Parar", 10]
        ]
    },

    {
        pergunta: "O que fazer com uma publicação humilhante?",
        alternativas: [
            ["Compartilhar", -5],
            ["Curtir", -5],
            ["Denunciar", 10]
        ]
    },

    {
        pergunta: "Você presencia exclusão em um trabalho.",
        alternativas: [
            ["Ajudar a excluir", -5],
            ["Ignorar", 0],
            ["Incluir o colega", 10]
        ]
    },

    {
        pergunta: "Uma pessoa está chorando após uma provocação.",
        alternativas: [
            ["Rir", -5],
            ["Ignorar", 0],
            ["Ajudar", 10]
        ]
    },

    {
        pergunta: "Como agir com uma opinião diferente?",
        alternativas: [
            ["Ofender", -5],
            ["Impedir a pessoa de falar", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Um colega sofre bullying diariamente.",
        alternativas: [
            ["Participar", -5],
            ["Ignorar", 0],
            ["Procurar ajuda", 10]
        ]
    },

    {
        pergunta: "O que fazer diante de uma agressão?",
        alternativas: [
            ["Ajudar na agressão", -5],
            ["Filmar", -5],
            ["Buscar ajuda", 10]
        ]
    },

    {
        pergunta: "Uma pessoa está sendo alvo de piadas.",
        alternativas: [
            ["Rir", -5],
            ["Ignorar", 0],
            ["Pedir respeito", 10]
        ]
    },

    {
        pergunta: "Como agir nas redes sociais?",
        alternativas: [
            ["Ofender", -5],
            ["Compartilhar ataques", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Você percebe que um colega está isolado.",
        alternativas: [
            ["Isolar mais", -5],
            ["Ignorar", 0],
            ["Conversar com ele", 10]
        ]
    },

    {
        pergunta: "Um aluno é alvo de comentários sobre sua família.",
        alternativas: [
            ["Fazer mais comentários", -5],
            ["Rir", -5],
            ["Respeitar sua privacidade", 10]
        ]
    },

    {
        pergunta: "O que fazer quando alguém pede ajuda?",
        alternativas: [
            ["Ignorar", -5],
            ["Rir", -5],
            ["Escutar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa sofre bullying por ser tímida.",
        alternativas: [
            ["Provocar", -5],
            ["Ignorar", 0],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Como prevenir o bullying?",
        alternativas: [
            ["Promovendo respeito", 10],
            ["Incentivando piadas ofensivas", -5],
            ["Ignorando problemas", -5]
        ]
    },

    {
        pergunta: "Você vê uma pessoa sendo humilhada online.",
        alternativas: [
            ["Curtir", -5],
            ["Compartilhar", -5],
            ["Denunciar", 10]
        ]
    },

    {
        pergunta: "Um colega sofre uma provocação durante a aula.",
        alternativas: [
            ["Rir", -5],
            ["Ignorar", 0],
            ["Ajudar e avisar o professor", 10]
        ]
    },

    {
        pergunta: "Qual atitude demonstra empatia?",
        alternativas: [
            ["Compreender o outro", 10],
            ["Julgar", -5],
            ["Humilhar", -5]
        ]
    },

    {
        pergunta: "Uma pessoa está sendo excluída de um grupo.",
        alternativas: [
            ["Ajudar a excluir", -5],
            ["Observar", 0],
            ["Convidá-la", 10]
        ]
    },

    {
        pergunta: "Você recebe um meme ofensivo sobre um colega.",
        alternativas: [
            ["Enviar para outros", -5],
            ["Curtir", -5],
            ["Não compartilhar", 10]
        ]
    },

    {
        pergunta: "Um amigo faz uma piada ofensiva.",
        alternativas: [
            ["Incentivar", -5],
            ["Rir", -5],
            ["Explicar que pode machucar", 10]
        ]
    },

    {
        pergunta: "O bullying deve ser levado a sério?",
        alternativas: [
            ["Sim", 10],
            ["Não", -5],
            ["Somente algumas vezes", 0]
        ]
    },

    {
        pergunta: "Uma pessoa sofre bullying por sua aparência.",
        alternativas: [
            ["Zombar", -5],
            ["Ignorar", 0],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Você percebe uma ameaça em um grupo.",
        alternativas: [
            ["Apoiar a ameaça", -5],
            ["Ignorar", 0],
            ["Avisar um adulto", 10]
        ]
    },

    {
        pergunta: "Como agir com alguém que possui dificuldade de aprendizagem?",
        alternativas: [
            ["Zombar", -5],
            ["Ignorar", 0],
            ["Ajudar e respeitar", 10]
        ]
    },

    {
        pergunta: "Um colega está sendo provocado no recreio.",
        alternativas: [
            ["Participar", -5],
            ["Observar", 0],
            ["Procurar ajuda", 10]
        ]
    },

    {
        pergunta: "O que fazer quando uma brincadeira machuca alguém?",
        alternativas: [
            ["Continuar", -5],
            ["Dizer que é brincadeira", -5],
            ["Parar", 10]
        ]
    },

    {
        pergunta: "Você percebe que uma pessoa está com medo.",
        alternativas: [
            ["Assustá-la mais", -5],
            ["Ignorar", 0],
            ["Perguntar se precisa de ajuda", 10]
        ]
    },

    {
        pergunta: "Como combater a exclusão?",
        alternativas: [
            ["Incluindo as pessoas", 10],
            ["Separando grupos", -5],
            ["Ignorando", -5]
        ]
    },

    {
        pergunta: "Um colega é ridicularizado por seu jeito de falar.",
        alternativas: [
            ["Imitar", -5],
            ["Rir", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Você percebe bullying em uma sala de aula.",
        alternativas: [
            ["Participar", -5],
            ["Ignorar", 0],
            ["Avisar o professor", 10]
        ]
    },

    {
        pergunta: "Como ajudar uma vítima de bullying?",
        alternativas: [
            ["Culpá-la", -5],
            ["Ignorar", -5],
            ["Ouvir e apoiar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa está sendo atacada nas redes sociais.",
        alternativas: [
            ["Compartilhar", -5],
            ["Curtir", -5],
            ["Denunciar", 10]
        ]
    },

    {
        pergunta: "Qual atitude contribui para uma convivência saudável?",
        alternativas: [
            ["Respeito", 10],
            ["Humilhação", -5],
            ["Exclusão", -5]
        ]
    },

    {
        pergunta: "Um colega pede que você não espalhe uma informação pessoal.",
        alternativas: [
            ["Espalhar", -5],
            ["Contar para amigos", -5],
            ["Respeitar sua privacidade", 10]
        ]
    },

    {
        pergunta: "Você vê alguém sendo humilhado por sua família.",
        alternativas: [
            ["Rir", -5],
            ["Ignorar", 0],
            ["Pedir respeito", 10]
        ]
    },

    {
        pergunta: "Como agir quando alguém é diferente?",
        alternativas: [
            ["Excluir", -5],
            ["Zombar", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Você percebe que um colega está sofrendo sozinho.",
        alternativas: [
            ["Ignorar", -5],
            ["Fazer piada", -5],
            ["Oferecer ajuda", 10]
        ]
    },

    {
        pergunta: "Qual é uma atitude contra o bullying?",
        alternativas: [
            ["Apoiar a vítima", 10],
            ["Incentivar o agressor", -5],
            ["Espalhar fofocas", -5]
        ]
    },

    {
        pergunta: "Como agir diante de uma discussão?",
        alternativas: [
            ["Usar violência", -5],
            ["Gritar", -5],
            ["Conversar com calma", 10]
        ]
    },

    {
        pergunta: "Você vê um comentário preconceituoso.",
        alternativas: [
            ["Curtir", -5],
            ["Compartilhar", -5],
            ["Não apoiar e denunciar", 10]
        ]
    },

    {
        pergunta: "O que fazer se o bullying continuar?",
        alternativas: [
            ["Ignorar para sempre", -5],
            ["Participar", -5],
            ["Procurar ajuda de adultos", 10]
        ]
    },

    {
        pergunta: "Qual é uma atitude de coragem?",
        alternativas: [
            ["Defender alguém com segurança", 10],
            ["Incentivar agressões", -5],
            ["Humilhar alguém", -5]
        ]
    },

    {
        pergunta: "Como tornar a escola mais acolhedora?",
        alternativas: [
            ["Incluindo todos", 10],
            ["Criando grupos fechados", -5],
            ["Excluindo pessoas", -5]
        ]
    },

    {
        pergunta: "Uma pessoa está sendo ridicularizada em público.",
        alternativas: [
            ["Rir", -5],
            ["Filmar", -5],
            ["Ajudar e procurar apoio", 10]
        ]
    }

];


/* =====================================================
   BANCO DE PERGUNTAS - INCLUSÃO
===================================================== */

const perguntasInclusao = [

    {
        pergunta: "Como devemos tratar uma pessoa com deficiência?",
        alternativas: [
            ["Com pena", -5],
            ["Ignorar", -5],
            ["Com respeito e igualdade", 10]
        ]
    },

    {
        pergunta: "Uma pessoa usa cadeira de rodas. Antes de ajudar, o que fazer?",
        alternativas: [
            ["Empurrar sem perguntar", -5],
            ["Ignorar", 0],
            ["Perguntar se precisa de ajuda", 10]
        ]
    },

    {
        pergunta: "O que significa inclusão?",
        alternativas: [
            ["Separar pessoas", -5],
            ["Ignorar diferenças", -5],
            ["Garantir participação de todos", 10]
        ]
    },

    {
        pergunta: "Como tratar uma pessoa autista?",
        alternativas: [
            ["Fazer piadas", -5],
            ["Ignorar", 0],
            ["Respeitar suas necessidades", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa precisa de ajuda. O que fazer?",
        alternativas: [
            ["Zombar", -5],
            ["Ignorar", 0],
            ["Oferecer ajuda com respeito", 10]
        ]
    },

    {
        pergunta: "O preconceito contra pessoas com deficiência é correto?",
        alternativas: [
            ["Sim", -5],
            ["Às vezes", -5],
            ["Não", 10]
        ]
    },

    {
        pergunta: "Uma pessoa tem deficiência visual. Como ajudar?",
        alternativas: [
            ["Puxá-la sem avisar", -5],
            ["Ignorar", 0],
            ["Perguntar se precisa de ajuda", 10]
        ]
    },

    {
        pergunta: "Uma pessoa surda participa de uma atividade.",
        alternativas: [
            ["Ignorar", -5],
            ["Falar mais alto", 0],
            ["Usar recursos acessíveis de comunicação", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista não gosta de muito barulho.",
        alternativas: [
            ["Aumentar o barulho", -5],
            ["Rir", -5],
            ["Respeitar seu espaço", 10]
        ]
    },

    {
        pergunta: "Como tratar uma pessoa idosa?",
        alternativas: [
            ["Com desprezo", -5],
            ["Como incapaz", -5],
            ["Com respeito e dignidade", 10]
        ]
    },

    {
        pergunta: "Para que serve uma rampa de acessibilidade?",
        alternativas: [
            ["Decoração", -5],
            ["Somente para bicicletas", -5],
            ["Facilitar o acesso", 10]
        ]
    },

    {
        pergunta: "O que é acessibilidade?",
        alternativas: [
            ["Criar barreiras", -5],
            ["Dificultar o acesso", -5],
            ["Facilitar acesso e participação", 10]
        ]
    },

    {
        pergunta: "Uma pessoa fala de maneira diferente.",
        alternativas: [
            ["Imitar", -5],
            ["Rir", -5],
            ["Ouvir e respeitar", 10]
        ]
    },

    {
        pergunta: "Alguém faz uma piada sobre uma deficiência.",
        alternativas: [
            ["Rir", -5],
            ["Ignorar", 0],
            ["Não participar e pedir respeito", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista evita contato físico.",
        alternativas: [
            ["Forçar abraço", -5],
            ["Brincar com isso", -5],
            ["Respeitar seu espaço", 10]
        ]
    },

    {
        pergunta: "Como falar sobre pessoas com deficiência?",
        alternativas: [
            ["Com termos ofensivos", -5],
            ["Com apelidos", -5],
            ["Com linguagem respeitosa", 10]
        ]
    },

    {
        pergunta: "Uma pessoa consegue realizar uma tarefa sozinha.",
        alternativas: [
            ["Fazer tudo por ela", -5],
            ["Dizer que não consegue", -5],
            ["Respeitar sua autonomia", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa quer participar de uma atividade.",
        alternativas: [
            ["Impedir", -5],
            ["Rir", -5],
            ["Respeitar sua participação", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista está concentrada.",
        alternativas: [
            ["Interromper", -5],
            ["Fazer barulho", -5],
            ["Respeitar sua concentração", 10]
        ]
    },

    {
        pergunta: "Uma vaga acessível deve ser usada por quem precisa dela.",
        alternativas: [
            ["Sim", 10],
            ["Qualquer pessoa pode ocupar", -5],
            ["Não importa", -5]
        ]
    },

    {
        pergunta: "Como combater o preconceito?",
        alternativas: [
            ["Excluindo", -5],
            ["Fazendo piadas", -5],
            ["Promovendo respeito e inclusão", 10]
        ]
    },

    {
        pergunta: "Uma escola deve ser acessível?",
        alternativas: [
            ["Não", -5],
            ["Somente algumas escolas", -5],
            ["Sim", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência participa de um trabalho.",
        alternativas: [
            ["Excluir", -5],
            ["Fazer tudo sem ela", -5],
            ["Incluir na atividade", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa conta uma história.",
        alternativas: [
            ["Interromper", -5],
            ["Ignorar", 0],
            ["Ouvir com respeito", 10]
        ]
    },

    {
        pergunta: "O autismo define completamente uma pessoa?",
        alternativas: [
            ["Sim", -5],
            ["Sempre", -5],
            ["Não. A pessoa é muito mais que sua condição", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência quer fazer algo sozinha.",
        alternativas: [
            ["Impedir", -5],
            ["Fazer por ela", -5],
            ["Respeitar sua autonomia", 10]
        ]
    },

    {
        pergunta: "O que é capacitismo?",
        alternativas: [
            ["Uma forma de esporte", -5],
            ["Uma forma de inclusão", -5],
            ["Preconceito contra pessoas com deficiência", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa usa bengala.",
        alternativas: [
            ["Zombar", -5],
            ["Imitar", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista apresenta comportamento diferente.",
        alternativas: [
            ["Zombar", -5],
            ["Filmar para rir", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Como agir diante de uma diferença?",
        alternativas: [
            ["Excluir", -5],
            ["Zombar", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência visual precisa atravessar a rua.",
        alternativas: [
            ["Puxar", -5],
            ["Ignorar", 0],
            ["Perguntar se precisa de ajuda", 10]
        ]
    },

    {
        pergunta: "Como podemos melhorar a inclusão na escola?",
        alternativas: [
            ["Criando barreiras", -5],
            ["Excluindo", -5],
            ["Garantindo acessibilidade", 10]
        ]
    },

    {
        pergunta: "Uma pessoa surda precisa acompanhar uma apresentação.",
        alternativas: [
            ["Ignorar", -5],
            ["Falar rapidamente", 0],
            ["Oferecer recursos de acessibilidade", 10]
        ]
    },

    {
        pergunta: "O que devemos fazer antes de ajudar uma pessoa com deficiência?",
        alternativas: [
            ["Agir sem perguntar", -5],
            ["Decidir por ela", -5],
            ["Perguntar se ela precisa de ajuda", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa está falando. Como agir?",
        alternativas: [
            ["Interromper", -5],
            ["Ignorar", -5],
            ["Ouvir", 10]
        ]
    },

    {
        pergunta: "Pessoas com deficiência podem praticar esportes?",
        alternativas: [
            ["Não", -5],
            ["Somente algumas", 0],
            ["Sim, com acessibilidade adequada", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista pode aprender?",
        alternativas: [
            ["Não", -5],
            ["Nunca", -5],
            ["Sim, cada pessoa aprende de maneiras diferentes", 10]
        ]
    },

    {
        pergunta: "Como combater o preconceito contra idosos?",
        alternativas: [
            ["Fazendo piadas", -5],
            ["Ignorando", -5],
            ["Respeitando sua experiência e dignidade", 10]
        ]
    },

    {
        pergunta: "O que significa respeitar a autonomia?",
        alternativas: [
            ["Decidir tudo pela pessoa", -5],
            ["Impedir escolhas", -5],
            ["Permitir que a pessoa faça suas escolhas", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência é escolhida para um grupo.",
        alternativas: [
            ["Excluir", -5],
            ["Dizer que não consegue", -5],
            ["Tratá-la como integrante do grupo", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista precisa de uma rotina.",
        alternativas: [
            ["Desrespeitar de propósito", -5],
            ["Fazer piada", -5],
            ["Respeitar suas necessidades", 10]
        ]
    },

    {
        pergunta: "O que é inclusão social?",
        alternativas: [
            ["Separação", -5],
            ["Exclusão", -5],
            ["Participação de todos na sociedade", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa quer aprender algo novo.",
        alternativas: [
            ["Dizer que é tarde", -5],
            ["Rir", -5],
            ["Incentivar", 10]
        ]
    },

    {
        pergunta: "Como devemos tratar diferenças físicas?",
        alternativas: [
            ["Com piadas", -5],
            ["Com preconceito", -5],
            ["Com respeito", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência precisa de acessibilidade.",
        alternativas: [
            ["Criar obstáculos", -5],
            ["Ignorar", -5],
            ["Garantir acesso", 10]
        ]
    },

    {
        pergunta: "Como agir diante de uma pessoa autista?",
        alternativas: [
            ["Julgar", -5],
            ["Zombar", -5],
            ["Respeitar sua individualidade", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa é excluída de uma conversa.",
        alternativas: [
            ["Excluir também", -5],
            ["Ignorar", 0],
            ["Incluí-la", 10]
        ]
    },

    {
        pergunta: "O preconceito pode machucar emocionalmente?",
        alternativas: [
            ["Sim", 10],
            ["Nunca", -5],
            ["Não importa", -5]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência está em uma fila.",
        alternativas: [
            ["Zombar", -5],
            ["Ignorar", 0],
            ["Respeitar seus direitos", 10]
        ]
    },

    {
        pergunta: "Como promover respeito?",
        alternativas: [
            ["Humilhar", -5],
            ["Excluir", -5],
            ["Valorizar as diferenças", 10]
        ]
    },

    {
        pergunta: "Uma pessoa usa aparelho auditivo.",
        alternativas: [
            ["Fazer piada", -5],
            ["Imitar", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa usa prótese.",
        alternativas: [
            ["Fazer perguntas invasivas", -5],
            ["Rir", -5],
            ["Respeitar sua privacidade", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência quer participar de uma brincadeira.",
        alternativas: [
            ["Impedir", -5],
            ["Ignorar", 0],
            ["Adaptar a brincadeira quando necessário", 10]
        ]
    },

    {
        pergunta: "Como devemos tratar idosos na escola?",
        alternativas: [
            ["Com desprezo", -5],
            ["Como incapazes", -5],
            ["Com respeito", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista está incomodada com um som.",
        alternativas: [
            ["Aumentar", -5],
            ["Rir", -5],
            ["Ajudar a encontrar um ambiente adequado", 10]
        ]
    },

    {
        pergunta: "O que é diversidade?",
        alternativas: [
            ["Todos serem iguais", -5],
            ["Separar pessoas", -5],
            ["Existência de diferentes características e formas de ser", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência é capaz de estudar?",
        alternativas: [
            ["Não", -5],
            ["Somente algumas", 0],
            ["Sim", 10]
        ]
    },

    {
        pergunta: "Como agir com uma pessoa que possui uma condição diferente?",
        alternativas: [
            ["Julgar", -5],
            ["Zombar", -5],
            ["Conhecer e respeitar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa precisa sentar.",
        alternativas: [
            ["Impedir", -5],
            ["Rir", -5],
            ["Oferecer um lugar quando apropriado", 10]
        ]
    },

    {
        pergunta: "Acessibilidade beneficia apenas pessoas com deficiência?",
        alternativas: [
            ["Sim", -5],
            ["Sempre", -5],
            ["Não, pode beneficiar muitas pessoas", 10]
        ]
    },

    {
        pergunta: "Como tratar uma pessoa que tem dificuldade de comunicação?",
        alternativas: [
            ["Rir", -5],
            ["Ignorar", -5],
            ["Ter paciência e respeitar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência participa de um projeto.",
        alternativas: [
            ["Excluir", -5],
            ["Fazer tudo sem ela", -5],
            ["Dar oportunidade de participação", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista gosta de determinada atividade.",
        alternativas: [
            ["Zombar", -5],
            ["Impedir", -5],
            ["Respeitar seus interesses", 10]
        ]
    },

    {
        pergunta: "Como combater o etarismo?",
        alternativas: [
            ["Fazer piadas com idosos", -5],
            ["Excluir idosos", -5],
            ["Combater estereótipos e respeitar todas as idades", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência fala sobre suas necessidades.",
        alternativas: [
            ["Ignorar", -5],
            ["Dizer que exagera", -5],
            ["Ouvir e respeitar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa quer usar tecnologia.",
        alternativas: [
            ["Dizer que não consegue", -5],
            ["Rir", -5],
            ["Ajudar se ela quiser", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista pode ter sensibilidades diferentes?",
        alternativas: [
            ["Sim", 10],
            ["Nunca", -5],
            ["Isso é impossível", -5]
        ]
    },

    {
        pergunta: "Como agir diante de uma cadeira de rodas?",
        alternativas: [
            ["Brincar com ela", -5],
            ["Mexer sem autorização", -5],
            ["Respeitar o equipamento da pessoa", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência visual possui autonomia?",
        alternativas: [
            ["Não", -5],
            ["Nunca", -5],
            ["Sim", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa pode aprender coisas novas?",
        alternativas: [
            ["Não", -5],
            ["Nunca", -5],
            ["Sim", 10]
        ]
    },

    {
        pergunta: "Qual atitude promove inclusão?",
        alternativas: [
            ["Criar barreiras", -5],
            ["Excluir", -5],
            ["Adaptar espaços e atividades", 10]
        ]
    },

    {
        pergunta: "Como agir quando alguém tem uma necessidade diferente?",
        alternativas: [
            ["Zombar", -5],
            ["Ignorar", 0],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa surda pode se comunicar?",
        alternativas: [
            ["Não", -5],
            ["Nunca", -5],
            ["Sim, de diferentes formas", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista merece respeito?",
        alternativas: [
            ["Sim", 10],
            ["Não", -5],
            ["Somente algumas vezes", -5]
        ]
    },

    {
        pergunta: "Uma pessoa idosa merece respeito?",
        alternativas: [
            ["Sim", 10],
            ["Não", -5],
            ["Somente quando concordamos", -5]
        ]
    },

    {
        pergunta: "Como agir em uma atividade inclusiva?",
        alternativas: [
            ["Excluir alguém", -5],
            ["Ignorar necessidades", -5],
            ["Garantir participação", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência sofre uma piada.",
        alternativas: [
            ["Rir", -5],
            ["Ignorar", 0],
            ["Defender o respeito", 10]
        ]
    },

    {
        pergunta: "O que devemos evitar ao conversar sobre deficiência?",
        alternativas: [
            ["Respeitar a pessoa", 10],
            ["Usar termos ofensivos", -5],
            ["Tratar a pessoa com dignidade", 0]
        ]
    },

    {
        pergunta: "Uma pessoa autista não quer conversar naquele momento.",
        alternativas: [
            ["Forçar", -5],
            ["Fazer piada", -5],
            ["Respeitar seu espaço", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa tem uma opinião diferente.",
        alternativas: [
            ["Ofender", -5],
            ["Ignorar", 0],
            ["Respeitar sua opinião", 10]
        ]
    },

    {
        pergunta: "O que fazer quando uma pessoa precisa de acessibilidade?",
        alternativas: [
            ["Criar obstáculos", -5],
            ["Ignorar", -5],
            ["Garantir acesso", 10]
        ]
    },

    {
        pergunta: "Como tratar diferenças de aparência?",
        alternativas: [
            ["Zombar", -5],
            ["Julgar", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa usa uma bengala.",
        alternativas: [
            ["Pegar sem autorização", -5],
            ["Fazer piada", -5],
            ["Respeitar", 10]
        ]
    },

    {
        pergunta: "Uma pessoa precisa de mais tempo para realizar uma tarefa.",
        alternativas: [
            ["Pressionar", -5],
            ["Rir", -5],
            ["Ter paciência", 10]
        ]
    },

    {
        pergunta: "Inclusão significa tratar todos exatamente da mesma forma?",
        alternativas: [
            ["Sempre", -5],
            ["Nunca devemos considerar necessidades", -5],
            ["Garantir oportunidades respeitando necessidades", 10]
        ]
    },

    {
        pergunta: "Como agir diante de alguém que possui dificuldade para caminhar?",
        alternativas: [
            ["Correr na frente para rir", -5],
            ["Ignorar", 0],
            ["Perguntar se precisa de ajuda", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência quer participar de um passeio.",
        alternativas: [
            ["Impedir", -5],
            ["Dizer que é impossível", -5],
            ["Buscar uma forma acessível de incluí-la", 10]
        ]
    },

    {
        pergunta: "Como podemos combater o preconceito?",
        alternativas: [
            ["Aprendendo e respeitando as diferenças", 10],
            ["Espalhando estereótipos", -5],
            ["Excluindo", -5]
        ]
    },

    {
        pergunta: "Uma pessoa idosa é chamada de incapaz.",
        alternativas: [
            ["Concordar", -5],
            ["Rir", -5],
            ["Evitar o estereótipo e respeitá-la", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista precisa de um ambiente tranquilo.",
        alternativas: [
            ["Fazer barulho de propósito", -5],
            ["Rir", -5],
            ["Respeitar a necessidade", 10]
        ]
    },

    {
        pergunta: "Uma pessoa com deficiência recebe uma oportunidade.",
        alternativas: [
            ["Dizer que não merece", -5],
            ["Impedir", -5],
            ["Apoiar sua oportunidade", 10]
        ]
    },

    {
        pergunta: "Qual é uma atitude inclusiva?",
        alternativas: [
            ["Ouvir as necessidades das pessoas", 10],
            ["Ignorar", -5],
            ["Excluir", -5]
        ]
    },

    {
        pergunta: "Uma pessoa usa linguagem de sinais.",
        alternativas: [
            ["Zombar", -5],
            ["Imitar para rir", -5],
            ["Respeitar sua forma de comunicação", 10]
        ]
    },

    {
        pergunta: "Como tratar uma pessoa com deficiência intelectual?",
        alternativas: [
            ["Infantilizar sempre", -5],
            ["Zombar", -5],
            ["Respeitar sua dignidade e autonomia", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa quer trabalhar ou estudar.",
        alternativas: [
            ["Dizer que não pode", -5],
            ["Rir", -5],
            ["Respeitar sua decisão", 10]
        ]
    },

    {
        pergunta: "O que devemos fazer com barreiras de acessibilidade?",
        alternativas: [
            ["Criar mais", -5],
            ["Ignorar", -5],
            ["Buscar eliminá-las", 10]
        ]
    },

    {
        pergunta: "Uma pessoa tem uma diferença que você não conhece.",
        alternativas: [
            ["Fazer piada", -5],
            ["Julgar", -5],
            ["Respeitar e aprender", 10]
        ]
    },

    {
        pergunta: "Uma pessoa autista reage de uma maneira inesperada.",
        alternativas: [
            ["Rir", -5],
            ["Filmar para compartilhar", -5],
            ["Manter o respeito", 10]
        ]
    },

    {
        pergunta: "Uma pessoa idosa precisa de orientação.",
        alternativas: [
            ["Zombar", -5],
            ["Ignorar", 0],
            ["Orientar com respeito", 10]
        ]
    },

    {
        pergunta: "O que representa a diversidade?",
        alternativas: [
            ["Pessoas diferentes convivendo", 10],
            ["Separação", -5],
            ["Preconceito", -5]
        ]
    }

];


/* =====================================================
   EMBARALHAR ALTERNATIVAS
===================================================== */

function embaralharAlternativas(lista) {

    const copia = [...lista];

    for (
        let i = copia.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            copia[i],
            copia[j]
        ] =
        [
            copia[j],
            copia[i]
        ];

    }

    return copia;
}


/* =====================================================
   PEGAR PERGUNTAS
===================================================== */

function pegarPerguntas() {

    if (jogoAtual === "bullying") {

        return perguntasBullying;

    }

    return perguntasInclusao;

}


/* =====================================================
   SELECIONAR JOGO
===================================================== */

function selecionarJogo(tipo) {

    jogoAtual = tipo;

    perguntaAtual = 0;

    pontos = 0;

    respostaDada = false;


    salvarProgresso();


    document
        .getElementById("inicio")
        .classList
        .add("escondido");


    document
        .getElementById("resultado")
        .classList
        .add("escondido");


    document
        .getElementById("jogo")
        .classList
        .remove("escondido");


    if (tipo === "bullying") {

        document
            .getElementById("tituloJogo")
            .innerText =
            "🛡️ A Luta Contra o Bullying";

    }

    else {

        document
            .getElementById("tituloJogo")
            .innerText =
            "♿ Respeito às Diferenças";

    }


    mostrarPergunta();

}


/* =====================================================
   MOSTRAR PERGUNTA
===================================================== */

function mostrarPergunta() {

    const perguntas =
        pegarPerguntas();

    const pergunta =
        perguntas[perguntaAtual];


    respostaDada = false;


    document
        .getElementById("numeroPergunta")
        .innerText =
        "Pergunta " +
        (perguntaAtual + 1) +
        " de " +
        perguntas.length;


    document
        .getElementById("pontuacao")
        .innerText =
        "Pontos: " +
        pontos;


    document
        .getElementById("pergunta")
        .innerText =
        pergunta.pergunta;


    document
        .getElementById("feedback")
        .innerText = "";


    document
        .getElementById("areaProxima")
        .innerHTML = "";


    const area =
        document.getElementById(
            "alternativas"
        );


    area.innerHTML = "";


    const alternativas =
        embaralharAlternativas(
            pergunta.alternativas
        );


    alternativas.forEach(
        function(opcao) {

            const botao =
                document.createElement(
                    "button"
                );


            botao.innerText =
                opcao[0];


            botao.classList.add(
                "alternativa"
            );


            botao.onclick =
                function() {

                    escolherResposta(
                        opcao[1]
                    );

                };


            area.appendChild(
                botao
            );

        }
    );


    const progresso =
        (
            perguntaAtual /
            perguntas.length
        ) * 100;


    document
        .getElementById("progresso")
        .style.width =
        progresso + "%";


    salvarProgresso();

}


/* =====================================================
   ESCOLHER RESPOSTA
===================================================== */

function escolherResposta(valor) {

    if (respostaDada) {

        return;

    }


    respostaDada = true;


    pontos += valor;


    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    botoes.forEach(
        function(botao) {

            botao.disabled = true;

        }
    );


    const feedback =
        document.getElementById(
            "feedback"
        );


    if (valor === 10) {

        feedback.innerText =
            "✅ Excelente! Você demonstrou respeito e empatia.";

    }

    else if (valor === 0) {

        feedback.innerText =
            "🤔 Essa atitude poderia ser melhor.";

    }

    else {

        feedback.innerText =
            "❌ Essa atitude pode contribuir para o problema.";

    }


    document
        .getElementById("pontuacao")
        .innerText =
        "Pontos: " +
        pontos;


    criarBotaoProxima();


    salvarProgresso();

}


/* =====================================================
   CRIAR BOTÃO PRÓXIMA
===================================================== */

function criarBotaoProxima() {

    const perguntas =
        pegarPerguntas();


    const botao =
        document.createElement(
            "button"
        );


    if (
        perguntaAtual ===
        perguntas.length - 1
    ) {

        botao.innerText =
            "🏆 Ver resultado";

    }

    else {

        botao.innerText =
            "➡️ Próxima pergunta";

    }


    botao.onclick =
        function() {

            proximaPergunta();

        };


    document
        .getElementById("areaProxima")
        .appendChild(botao);

}


/* =====================================================
   PRÓXIMA PERGUNTA
===================================================== */

function proximaPergunta() {

    const perguntas =
        pegarPerguntas();


    perguntaAtual++;


    if (
        perguntaAtual >=
        perguntas.length
    ) {

        mostrarResultado();

        return;

    }


    mostrarPergunta();

}


/* =====================================================
   MOSTRAR RESULTADO
===================================================== */

function mostrarResultado() {

    document
        .getElementById("jogo")
        .classList
        .add("escondido");


    document
        .getElementById("resultado")
        .classList
        .remove("escondido");


    if (jogoAtual === "bullying") {

        document
            .getElementById("resultadoTitulo")
            .innerText =
            "🛡️ A Luta Contra o Bullying";

    }

    else {

        document
            .getElementById("resultadoTitulo")
            .innerText =
            "♿ Respeito às Diferenças";

    }


    const perguntas =
        pegarPerguntas();


    const maximo =
        perguntas.length * 10;


    const porcentagem =
        Math.round(
            (
                pontos /
                maximo
            ) * 100
        );


    document
        .getElementById("pontuacaoFinal")
        .innerText =
        "Você fez " +
        pontos +
        " pontos!";


    document
        .getElementById("porcentagemFinal")
        .innerText =
        porcentagem +
        "% de aproveitamento";


    let mensagem;


    if (porcentagem >= 90) {

        mensagem =
            "🏆 Excelente! Você demonstrou muita empatia, respeito e solidariedade.";

    }

    else if (porcentagem >= 70) {

        mensagem =
            "👏 Muito bem! Você mostrou ótimas atitudes.";

    }

    else if (porcentagem >= 50) {

        mensagem =
            "👍 Bom trabalho! Continue aprendendo.";

    }

    else if (porcentagem >= 30) {

        mensagem =
            "🤔 Algumas escolhas poderiam ser melhores.";

    }

    else {

        mensagem =
            "⚠️ Reflita sobre suas escolhas e a importância do respeito.";

    }


    document
        .getElementById("mensagemFinal")
        .innerText =
        mensagem;


    localStorage.removeItem(
        "progressoJogo"
    );

}


/* =====================================================
   JOGAR NOVAMENTE
===================================================== */

function jogarNovamente() {

    perguntaAtual = 0;

    pontos = 0;

    respostaDada = false;


    document
        .getElementById("resultado")
        .classList
        .add("escondido");


    document
        .getElementById("jogo")
        .classList
        .remove("escondido");


    mostrarPergunta();

}


/* =====================================================
   VOLTAR AO MENU
===================================================== */

function voltarAoMenu() {

    perguntaAtual = 0;

    pontos = 0;

    jogoAtual = "";

    respostaDada = false;


    document
        .getElementById("resultado")
        .classList
        .add("escondido");


    document
        .getElementById("jogo")
        .classList
        .add("escondido");


    document
        .getElementById("inicio")
        .classList
        .remove("escondido");


    verificarJogoSalvo();

}


/* =====================================================
   SALVAR PROGRESSO
===================================================== */

function salvarProgresso() {

    if (jogoAtual === "") {

        return;

    }


    const dados = {

        jogo: jogoAtual,

        pergunta: perguntaAtual,

        pontos: pontos,

        respostaDada: respostaDada

    };


    localStorage.setItem(
        "progressoJogo",
        JSON.stringify(dados)
    );

}


/* =====================================================
   SALVAR E SAIR
===================================================== */

function salvarESair() {

    salvarProgresso();


    document
        .getElementById("jogo")
        .classList
        .add("escondido");


    document
        .getElementById("resultado")
        .classList
        .add("escondido");


    document
        .getElementById("inicio")
        .classList
        .remove("escondido");


    verificarJogoSalvo();

}


/* =====================================================
   VERIFICAR JOGO SALVO
===================================================== */

function verificarJogoSalvo() {

    const salvo =
        localStorage.getItem(
            "progressoJogo"
        );


    const area =
        document.getElementById(
            "continuarArea"
        );


    const texto =
        document.getElementById(
            "jogoSalvoTexto"
        );


    if (!salvo) {

        area.classList.add(
            "escondido"
        );

        return;

    }


    const dados =
        JSON.parse(salvo);


    let nomeJogo;


    if (dados.jogo === "bullying") {

        nomeJogo =
            "🛡️ A Luta Contra o Bullying";

    }

    else {

        nomeJogo =
            "♿ Respeito às Diferenças";

    }


    texto.innerText =
        nomeJogo +
        " — Pergunta " +
        (dados.pergunta + 1) +
        " de 100";


    area.classList.remove(
        "escondido"
    );

}


/* =====================================================
   CONTINUAR JOGO
===================================================== */

function continuarJogo() {

    const salvo =
        localStorage.getItem(
            "progressoJogo"
        );


    if (!salvo) {

        return;

    }


    const dados =
        JSON.parse(salvo);


    jogoAtual =
        dados.jogo;


    perguntaAtual =
        dados.pergunta;


    pontos =
        dados.pontos;


    respostaDada = false;


    document
        .getElementById("inicio")
        .classList
        .add("escondido");


    document
        .getElementById("resultado")
        .classList
        .add("escondido");


    document
        .getElementById("jogo")
        .classList
        .remove("escondido");


    if (jogoAtual === "bullying") {

        document
            .getElementById("tituloJogo")
            .innerText =
            "🛡️ A Luta Contra o Bullying";

    }

    else {

        document
            .getElementById("tituloJogo")
            .innerText =
            "♿ Respeito às Diferenças";

    }


    mostrarPergunta();

}


/* =====================================================
   APAGAR PROGRESSO
===================================================== */

function apagarProgresso() {

    const confirmar =
        confirm(
            "Tem certeza que deseja apagar o progresso salvo?"
        );


    if (!confirmar) {

        return;

    }


    localStorage.removeItem(
        "progressoJogo"
    );


    verificarJogoSalvo();

}


/* =====================================================
   INICIAR
===================================================== */

window.onload =
    function() {

        verificarJogoSalvo();

    };