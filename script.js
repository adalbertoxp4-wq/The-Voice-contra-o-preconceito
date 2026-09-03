// ======================================================
// JUNTOS CONTRA O BULLYING
// 2 jogos | 150 perguntas cada | 300 perguntas no total
// 4 alternativas por questão | dificuldade progressiva
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
// BANCO DE CONTEÚDO — NOVAS QUESTÕES
// Cada tema possui uma resposta correta e 3 alternativas erradas.
// As perguntas são criadas por 15 situações diferentes x 10 temas.
// ======================================================

const temasBullying = [
  {
    assunto: "bullying",
    correta: "Apoiar quem sofreu a agressão e procurar um adulto responsável.",
    erradas: [
      "Entrar na provocação para mostrar que você também é forte.",
      "Filmar a situação e publicar para chamar atenção.",
      "Dizer que a pessoa deve resolver tudo sozinha."
    ]
  },
  {
    assunto: "cyberbullying",
    correta: "Guardar evidências, evitar revidar e pedir ajuda a um adulto de confiança.",
    erradas: [
      "Criar outra conta para devolver as ofensas.",
      "Compartilhar a publicação ofensiva para conseguir mais visualizações.",
      "Apagar todas as provas imediatamente e fingir que nada aconteceu."
    ]
  },
  {
    assunto: "empatia",
    correta: "Ouvir a pessoa com atenção e tentar compreender como ela se sente.",
    erradas: [
      "Comparar o sofrimento dela com problemas de outras pessoas.",
      "Interromper a conversa para contar uma piada.",
      "Dizer que ela está exagerando sem ouvir sua experiência."
    ]
  },
  {
    assunto: "exclusão",
    correta: "Criar oportunidades para que a pessoa participe e seja tratada com respeito.",
    erradas: [
      "Deixar a pessoa de fora para evitar mudanças no grupo.",
      "Fazer comentários para que ela perceba que não é bem-vinda.",
      "Convidá-la somente quando ninguém mais estiver disponível."
    ]
  },
  {
    assunto: "apelidos ofensivos",
    correta: "Respeitar o nome e parar imediatamente quando a pessoa demonstra incômodo.",
    erradas: [
      "Continuar porque os colegas acham o apelido engraçado.",
      "Criar um apelido ainda mais constrangedor.",
      "Dizer que a pessoa precisa aprender a aceitar qualquer brincadeira."
    ]
  },
  {
    assunto: "respeito",
    correta: "Tratar os outros com dignidade mesmo quando existem opiniões diferentes.",
    erradas: [
      "Humilhar quem discorda para vencer a discussão.",
      "Usar características pessoais como argumento contra alguém.",
      "Evitar ouvir opiniões diferentes para nunca mudar de ideia."
    ]
  },
  {
    assunto: "testemunha",
    correta: "Ajudar com segurança, apoiar a vítima e comunicar o ocorrido a alguém responsável.",
    erradas: [
      "Incentivar a agressão para descobrir até onde ela vai.",
      "Publicar o vídeo da agressão como entretenimento.",
      "Fingir que não viu mesmo quando a situação continua."
    ]
  },
  {
    assunto: "preconceito",
    correta: "Questionar julgamentos baseados em estereótipos e conhecer as pessoas sem generalizações.",
    erradas: [
      "Aceitar estereótipos porque muitas pessoas repetem a mesma ideia.",
      "Julgar o caráter de alguém somente pela aparência.",
      "Espalhar uma generalização antes de verificar se ela é verdadeira."
    ]
  },
  {
    assunto: "diferenças",
    correta: "Valorizar as características individuais e garantir que todos sejam tratados com dignidade.",
    erradas: [
      "Afastar quem não corresponde ao padrão do grupo.",
      "Usar uma característica pessoal para conseguir risadas.",
      "Exigir que todos sejam iguais para evitar conflitos."
    ]
  },
  {
    assunto: "ambiente escolar",
    correta: "Combinar regras de convivência, incentivar diálogo e comunicar situações de agressão.",
    erradas: [
      "Esperar que os estudantes resolvam agressões graves sem apoio.",
      "Tratar toda denúncia como uma simples brincadeira.",
      "Criar regras apenas depois que um problema ficar muito grave."
    ]
  }
];

const temasInclusao = [
  {
    assunto: "deficiência",
    correta: "Respeitar a autonomia da pessoa e perguntar antes de oferecer ajuda.",
    erradas: [
      "Assumir que a pessoa não consegue fazer tarefas sozinha.",
      "Falar com o acompanhante em vez de falar diretamente com ela.",
      "Fazer comentários sobre sua deficiência para iniciar uma conversa."
    ]
  },
  {
    assunto: "acessibilidade",
    correta: "Garantir condições para que diferentes pessoas possam participar com segurança e autonomia.",
    erradas: [
      "Bloquear uma rampa porque o caminho parece mais rápido.",
      "Retirar um recurso acessível porque poucas pessoas o utilizam.",
      "Considerar acessibilidade importante apenas em lugares públicos."
    ]
  },
  {
    assunto: "capacitismo",
    correta: "Combater julgamentos que tratam pessoas com deficiência como inferiores ou incapazes.",
    erradas: [
      "Decidir os limites de alguém somente pela existência de uma deficiência.",
      "Usar deficiência como motivo para fazer piadas.",
      "Evitar incluir uma pessoa porque presume que ela não dará conta."
    ]
  },
  {
    assunto: "autismo",
    correta: "Respeitar necessidades, formas de comunicação e características individuais da pessoa autista.",
    erradas: [
      "Forçar a pessoa a esconder suas características para parecer igual aos demais.",
      "Fazer piadas sobre comportamentos relacionados ao autismo.",
      "Tratar todas as pessoas autistas como se tivessem exatamente as mesmas necessidades."
    ]
  },
  {
    assunto: "idosos",
    correta: "Respeitar sua autonomia, ouvir sua opinião e oferecer ajuda quando for necessária.",
    erradas: [
      "Assumir que toda pessoa idosa é incapaz de tomar decisões.",
      "Ignorar sua opinião porque ela é mais velha.",
      "Falar com ela de maneira infantilizada sem necessidade."
    ]
  },
  {
    assunto: "cadeira de rodas",
    correta: "Perguntar antes de tocar, empurrar ou movimentar a cadeira.",
    erradas: [
      "Empurrar a cadeira sem avisar para tentar ajudar rapidamente.",
      "Usar a cadeira como apoio para colocar objetos.",
      "Movimentar a cadeira para abrir espaço sem pedir autorização."
    ]
  },
  {
    assunto: "linguagem respeitosa",
    correta: "Escolher palavras que não diminuam, ridicularizem ou desrespeitem outras pessoas.",
    erradas: [
      "Usar termos ofensivos quando o grupo estiver acostumado com eles.",
      "Criar apelidos baseados em características pessoais.",
      "Repetir uma expressão preconceituosa porque parece uma brincadeira."
    ]
  },
  {
    assunto: "inclusão",
    correta: "Adaptar condições quando necessário para que todos possam participar de forma justa.",
    erradas: [
      "Excluir quem precisa de adaptação para facilitar a atividade.",
      "Oferecer participação somente para quem não precisa de apoio.",
      "Confundir inclusão com obrigar todos a fazerem tudo exatamente do mesmo jeito."
    ]
  },
  {
    assunto: "equidade",
    correta: "Considerar necessidades diferentes para oferecer oportunidades realmente justas.",
    erradas: [
      "Dar exatamente o mesmo recurso e ignorar necessidades específicas.",
      "Recusar adaptações porque elas parecem diferentes para cada pessoa.",
      "Considerar injusta qualquer ajuda adicional, mesmo quando necessária."
    ]
  },
  {
    assunto: "diversidade",
    correta: "Conviver com diferentes características, experiências e formas de pensar com respeito.",
    erradas: [
      "Exigir que todos sigam o mesmo padrão para pertencer ao grupo.",
      "Evitar pessoas que possuem costumes diferentes.",
      "Considerar uma característica diferente como sinal de inferioridade."
    ]
  }
];

// 15 situações diferentes para cada tema = 150 perguntas por jogo.
const modelos = [
  ["Você percebe uma situação envolvendo ASSUNTO durante uma atividade. Qual atitude é mais adequada?", "ação inicial"],
  ["Um colega pede sua opinião sobre ASSUNTO. Qual resposta demonstra maturidade?", "opinião"],
  ["Durante um trabalho em grupo, surge um problema relacionado a ASSUNTO. O que deve orientar sua decisão?", "grupo"],
  ["Você vê uma mensagem sobre ASSUNTO circulando entre estudantes. Qual é a melhor maneira de agir?", "mensagem"],
  ["Uma pessoa demonstra desconforto em uma situação de ASSUNTO. O que esse sinal indica?", "desconforto"],
  ["Em uma discussão sobre ASSUNTO, alguém afirma que 'todo mundo faz isso'. Como avaliar essa afirmação?", "pressão"],
  ["Uma situação de ASSUNTO parece pequena no começo, mas se repete várias vezes. Qual é o principal cuidado?", "repetição"],
  ["Você é responsável por uma atividade e precisa prevenir problemas relacionados a ASSUNTO. Qual medida é mais responsável?", "prevenção"],
  ["Duas pessoas discordam sobre um caso de ASSUNTO. Qual procedimento ajuda a resolver o conflito com justiça?", "conflito"],
  ["Uma publicação sobre ASSUNTO recebe muitas curtidas. Por que a quantidade de curtidas não determina se a atitude é correta?", "redes"],
  ["Um colega diz que uma atitude envolvendo ASSUNTO foi apenas uma brincadeira. O que deve ser analisado?", "brincadeira"],
  ["Ao ouvir um relato sobre ASSUNTO, qual comportamento evita aumentar o sofrimento da pessoa?", "relato"],
  ["Você percebe que uma regra pode afetar pessoas de maneiras diferentes em uma situação de ASSUNTO. O que deve ser considerado?", "regra"],
  ["Uma turma quer criar uma solução para um problema de ASSUNTO. Qual característica torna a solução mais inclusiva?", "solução"],
  ["Depois de uma situação de ASSUNTO, qual atitude ajuda a construir um ambiente melhor no futuro?", "aprendizado"]
];

function nivelDaPergunta(indice) {
  if (indice < 30) return { nome: "🟢 Iniciante", pontos: 10 };
  if (indice < 60) return { nome: "🟡 Fácil", pontos: 12 };
  if (indice < 90) return { nome: "🟠 Intermediário", pontos: 15 };
  if (indice < 120) return { nome: "🔴 Difícil", pontos: 20 };
  return { nome: "🟣 Desafio máximo", pontos: 25 };
}

function gerarPerguntas(temas) {
  const resultado = [];

  temas.forEach((tema, temaIndex) => {
    modelos.forEach((modelo, modeloIndex) => {
      const [texto] = modelo;
      const opcoes = [tema.correta, ...tema.erradas];

      // Em cada pergunta, a ordem é alterada.
      // A posição correta nunca é fixa e não depende do tamanho do texto.
      resultado.push({
        pergunta: texto.replace("ASSUNTO", tema.assunto),
        alternativasBase: opcoes,
        tema: tema.assunto,
        indiceOriginal: temaIndex * modelos.length + modeloIndex
      });
    });
  });

  // Dificuldade cresce exatamente a cada bloco de 30 perguntas.
  resultado.forEach((q, i) => {
    const nivel = nivelDaPergunta(i);
    q.numeroDificuldade = i + 1;
    q.nomeNivel = nivel.nome;
    q.pontos = nivel.pontos;
  });

  return resultado;
}

const perguntasBullying = gerarPerguntas(temasBullying);
const perguntasInclusao = gerarPerguntas(temasInclusao);

// ======================================================
// EMBARALHAMENTO
// ======================================================

function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Mantém as 4 alternativas diferentes e embaralhadas.
function prepararAlternativas(pergunta) {
  return embaralhar(pergunta.alternativasBase).map((texto) => ({
    texto,
    correta: texto === pergunta.alternativasBase[0]
  }));
}

// ======================================================
// SOM
// ======================================================

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
  } catch (erro) {
    console.log("Som indisponível.");
  }
}

function alternarSom() {
  somAtivo = !somAtivo;
  const botao = document.querySelector(".botao-som");
  if (botao) botao.textContent = somAtivo ? "🔊 Som ativado" : "🔇 Som desativado";
  if (somAtivo) tocarSom(650);
}

// ======================================================
// INICIAR / CONTINUAR
// ======================================================

function selecionarJogo(tipo) {
  jogoAtual = tipo;
  perguntaAtual = 0;
  pontos = 0;
  respostaDada = false;
  perguntasDoJogo = tipo === "bullying" ? [...perguntasBullying] : [...perguntasInclusao];

  // A ordem do banco é a mesma; as alternativas são embaralhadas a cada pergunta.
  document.getElementById("inicio").classList.add("escondido");
  document.getElementById("rankingTela").classList.add("escondido");
  document.getElementById("resultado").classList.add("escondido");
  document.getElementById("jogo").classList.remove("escondido");
  tocarSom(700);
  mostrarPergunta();
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
  document.getElementById("progressoTexto").textContent = `Fase ${fase} — ${respondidas} de 10 respondidas — ${pergunta.nomeNivel} — Desafio ${pergunta.numeroDificuldade}/${TOTAL_PERGUNTAS}`;
  document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
  document.getElementById("tituloJogo").textContent = jogoAtual === "bullying" ? "🛡️ A Luta Contra o Bullying" : "♿ Respeito às Diferenças";
  document.getElementById("numeroBola").textContent = perguntaNaFase;
  document.getElementById("pergunta").textContent = pergunta.pergunta;
  document.getElementById("feedback").textContent = "";
  document.getElementById("areaProxima").innerHTML = "";

  const alternativas = document.getElementById("alternativas");
  alternativas.innerHTML = "";
  const opcoes = prepararAlternativas(pergunta);

  opcoes.forEach((opcao, indice) => {
    const botao = document.createElement("button");
    botao.className = "alternativa";
    botao.textContent = `${String.fromCharCode(65 + indice)}) ${opcao.texto}`;
    botao.onclick = () => escolherResposta(botao, opcao.correta, pergunta.pontos, opcoes);
    alternativas.appendChild(botao);
  });

  const progresso = (respondidas / PERGUNTAS_POR_FASE) * 100;
  document.getElementById("progressoFase").style.width = `${progresso}%`;
}

function escolherResposta(botaoEscolhido, correta, valor, opcoes) {
  if (respostaDada) return;
  respostaDada = true;

  document.querySelectorAll(".alternativa").forEach(botao => {
    botao.disabled = true;
  });

  if (correta) {
    pontos += valor;
    botaoEscolhido.style.borderColor = "#2e7d32";
    botaoEscolhido.style.background = "#e8f5e9";
    document.getElementById("feedback").textContent = `✅ Correto! +${valor} pontos de empatia.`;
    tocarSom(900);
  } else {
    botaoEscolhido.style.borderColor = "#c62828";
    botaoEscolhido.style.background = "#ffebee";
    document.getElementById("feedback").textContent = "❌ Essa não é a melhor atitude. Pense em respeito, empatia e inclusão.";
    tocarSom(220);

    // Mostra qual era a correta, sem dar vantagem pelo tamanho da alternativa.
    const botoes = document.querySelectorAll(".alternativa");
    const indiceCorreto = opcoes.findIndex(opcao => opcao.correta);
    if (botoes[indiceCorreto]) {
      botoes[indiceCorreto].style.borderColor = "#2e7d32";
      botoes[indiceCorreto].style.background = "#e8f5e9";
    }
  }

  document.getElementById("pontuacao").textContent = `⭐ Pontos: ${pontos}`;
  salvarProgresso();
  criarBotaoProxima();
}

// ======================================================
// PRÓXIMA PERGUNTA
// ======================================================

function criarBotaoProxima() {
  const area = document.getElementById("areaProxima");
  area.innerHTML = "";
  const botao = document.createElement("button");
  const ultimaPergunta = perguntaAtual === TOTAL_PERGUNTAS - 1;
  const ultimaDaFase = (perguntaAtual + 1) % PERGUNTAS_POR_FASE === 0;

  botao.textContent = ultimaPergunta ? "🏆 Ver resultado" : ultimaDaFase ? "🚀 Ir para a próxima fase" : "➡️ Próxima pergunta";
  botao.onclick = proximaPergunta;
  area.appendChild(botao);
}

function proximaPergunta() {
  salvarProgresso();
  perguntaAtual++;

  if (perguntaAtual >= TOTAL_PERGUNTAS) {
    mostrarResultado();
    return;
  }

  const novaFase = perguntaAtual % PERGUNTAS_POR_FASE === 0;
  if (novaFase) {
    mostrarMensagemFase();
    tocarSom(1100);
  } else {
    mostrarPergunta();
  }
}

function mostrarMensagemFase() {
  const fase = Math.floor(perguntaAtual / PERGUNTAS_POR_FASE) + 1;
  document.getElementById("pergunta").textContent = `🎉 Você chegou à Fase ${fase}!`;
  document.getElementById("alternativas").innerHTML = `<p class="centralizado">Prepare-se. As próximas perguntas serão mais difíceis.</p>`;
  document.getElementById("feedback").textContent = "🔥 Continue! A dificuldade está aumentando.";
  document.getElementById("areaProxima").innerHTML = "";

  const botao = document.createElement("button");
  botao.textContent = `▶️ Começar Fase ${fase}`;
  botao.onclick = mostrarPergunta;
  document.getElementById("areaProxima").appendChild(botao);
}

// ======================================================
// RESULTADO
// ======================================================

function mostrarResultado() {
  // Pontuação máxima: 150 x 25 = 3750.
  const porcentagem = Math.round((pontos / (TOTAL_PERGUNTAS * 25)) * 100);
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
    mensagem = "Continue estudando. O importante é aprender, refletir e melhorar.";
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

// ======================================================
// RANKING
// ======================================================

function salvarRanking(jogo, pontos, porcentagem, medalha) {
  const ranking = JSON.parse(localStorage.getItem("rankingJogo") || "[]");
  ranking.push({ jogo, pontos, porcentagem, medalha, data: new Date().toLocaleDateString("pt-BR") });
  ranking.sort((a, b) => b.pontos - a.pontos);
  localStorage.setItem("rankingJogo", JSON.stringify(ranking.slice(0, 10)));
}

function mostrarRanking() {
  document.getElementById("inicio").classList.add("escondido");
  document.getElementById("rankingTela").classList.remove("escondido");

  const lista = document.getElementById("rankingLista");
  const ranking = JSON.parse(localStorage.getItem("rankingJogo") || "[]");

  if (ranking.length === 0) {
    lista.innerHTML = `<p class="centralizado">Ainda não existem pontuações. Jogue para aparecer no ranking!</p>`;
    return;
  }

  lista.innerHTML = "";
  ranking.forEach((item, indice) => {
    const div = document.createElement("div");
    div.className = "ranking-item";
    const medalhaPosicao = indice === 0 ? "🥇" : indice === 1 ? "🥈" : indice === 2 ? "🥉" : `${indice + 1}º`;
    const nome = item.jogo === "bullying" ? "🛡️ Bullying" : "♿ Inclusão";
    div.innerHTML = `<span class="ranking-posicao">${medalhaPosicao}</span><span class="ranking-nome">${nome}<br><small>${item.data}</small></span><span class="ranking-pontos">${item.pontos} pts</span>`;
    lista.appendChild(div);
  });
}

function fecharRanking() {
  document.getElementById("rankingTela").classList.add("escondido");
  document.getElementById("inicio").classList.remove("escondido");
  verificarJogosSalvos();
}

// ======================================================
// SALVAMENTO — CADA JOGO TEM SUA PRÓPRIA MEMÓRIA
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
    ordem: perguntasDoJogo.map(q => ({
      pergunta: q.pergunta,
      alternativasBase: q.alternativasBase,
      tema: q.tema,
      indiceOriginal: q.indiceOriginal,
      numeroDificuldade: q.numeroDificuldade,
      nomeNivel: q.nomeNivel,
      pontos: q.pontos
    }))
  };
  localStorage.setItem(chaveProgresso(jogoAtual), JSON.stringify(dados));
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

function continuarJogo(tipo) {
  const dados = obterProgresso(tipo);
  if (!dados) return;

  jogoAtual = dados.jogo;
  perguntaAtual = Number(dados.pergunta) || 0;
  pontos = Number(dados.pontos) || 0;
  perguntasDoJogo = (dados.ordem && dados.ordem.length === TOTAL_PERGUNTAS)
    ? dados.ordem
    : (jogoAtual === "bullying" ? [...perguntasBullying] : [...perguntasInclusao]);

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
  // Reinicia somente o jogo atual.
  localStorage.removeItem(chaveProgresso(jogoAtual));
  selecionarJogo(jogoAtual);
}

function voltarAoMenu() {
  document.getElementById("resultado").classList.add("escondido");
  document.getElementById("jogo").classList.add("escondido");
  document.getElementById("inicio").classList.remove("escondido");
  verificarJogosSalvos();
}

// Compatibilidade com versões anteriores do projeto.
function verificarJogoSalvo() {
  verificarJogosSalvos();
}

window.onload = verificarJogosSalvos;
