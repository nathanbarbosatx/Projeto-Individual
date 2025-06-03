
var ax_menuitem = document.querySelectorAll('.item-menu')

function selecionar() {
  // removendo a classe ativo de um item que nao foi clicado
  ax_menuitem.forEach((item) =>
    item.classList.remove('ativo')
  )
  // add a classe ativo ao intem clicado
  this.classList.add('ativo')

}

// 'Escutar de eventos' ao ser clicado pelo usuario

ax_menuitem.forEach((item) =>
  item.addEventListener('click', selecionar)
)

// expandir o menu
var ax_btn = document.querySelector('#btn-exp')
var ax_menu = document.querySelector('.menu-lateral')

// add evento click assim que for clicado o 
ax_btn.addEventListener('click', function () {
  ax_menu.classList.toggle('expandir') // forma automazida ou seja se existir a class expandir remova e se nao existir adicione
})

// Mudando sessão

function mudarConteudo(secao) {
  const secoes = ["secao-inicio", "secao-painel", "secao-quiz"];


  for (var i = 0; i < secoes.length; i++) {
    console.log(secoes[i])
    var s = document.querySelector(`#${secoes[i]}`)
    s.style.display = "none";


  }
  if (secoes[2] == secao) {
    document.querySelector(`#${secao}`).style.display = "block";
  }

  else if (secoes[1] == secao) {
    document.querySelector(`#${secao}`).style.display = "block";
  }
  else {
    document.querySelector(`#${secao}`).style.display = "flex";

  }
}

// Grafíco



// const js_barras2 = document.getElementById('barras2');
// const js_barras1 = document.getElementById('barras1');

// new Chart(js_barras1, {
//     type: 'doughnut',
//     data: {
//       labels: ['🌟Transformador', '🚀Explorador', '💖Guardião', '🐾Protetor'],
//       datasets: [
//         {
//           label: 'Quantidade De Doadores',
//           data: [20,25,25,30],
//           borderWidth: 1
//         }]
//     },
//     options: {
//             plugins: {
//         title: {
//           display: true,
//           text: ''
//         }
//       }
//     }
//   });

//     new Chart(js_barras2, {
//     type: 'bar',
//     data: {
//       labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
//       datasets: [
//         {
//           label: 'Número de alertas',
//           data: [3, 2, 2, 2, 1, 0],
//           borderWidth: 1
//         }]
//     },
//     options: {
//       scales: {
//         x: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Meses'
//           },
//         },
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Número de Alertas'
//           },
//         }
//       },
//       plugins: {
//         title: {
//           display: true,
//           text: 'Número de Alertas dos Veículos no Primeiro Semestre de 2025'
//         }
//       }
//     }
//   // });


function obterDadosGrafico(fktipo) {

  alterarTitulo(fktipo)

  if (proximaAtualizacao != undefined) {
    clearTimeout(proximaAtualizacao);
  }

  fetch(`/medidas/ultimas/${fktipo}`, { cache: 'no-store' }).then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
        resposta.reverse();

        plotarGrafico(resposta, fktipo);

      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
  })
}


// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, fktipo) {

  console.log('iniciando plotagem do gráfico...');

  // Criando estrutura para plotar gráfico - labels
  let labels = [];

  // Criando estrutura para plotar gráfico - dados
  let dados = {
    labels: ['🌟Transformador', '🚀Explorador', '💖Guardião', '🐾Protetor'],
    datasets: [{
      label: '',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    },
    {
      label: '',
      data: [],
      fill: false,
      borderColor: 'rgb(199, 52, 52)',
      tension: 0.1
    }]
  };

  console.log('----------------------------------------------')
  console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
  console.log(resposta)

  // Inserindo valores recebidos em estrutura para plotar o gráfico
  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    dados.datasets[0].data.push(registro.qtdTipoDoador);
    dados.datasets[1].data.push(registro.tipo);
  }

  console.log('----------------------------------------------')
  console.log('O gráfico será plotado com os respectivos valores:')
  console.log('Labels:')
  console.log(labels)
  console.log('Dados:')
  console.log(dados.datasets)
  console.log('----------------------------------------------')

  // Criando estrutura para plotar gráfico - config
  const config = {
    type: 'pie',
    data: dados,
  };

  // Adicionando gráfico criado em div na tela
  let myChart = new Chart(
    document.getElementById(`myChartCanvas${fktipo}`),
    config
  );

  setTimeout(() => atualizarGrafico(fktipo, dados, myChart), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
/*function atualizarGrafico(idAquario, dados, myChart) {



    fetch(`/medidas/tempo-real/${idAquario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                obterdados(idAquario);
                // alertar(novoRegistro, idAquario);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
                avisoCaptura.innerHTML = ""


                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}*/




// Inicio quiz

// window.addEventListener('load', () => {
//   idusuario = sessionStorage.ID_USUARIO;
//   idresult = sessionStorage.ID_RESULT;

// });

var perguntas = [
  {
    pergunta: "1. Qual causa mais ressoa com você?",
    opcoes: {
      a: "Transformar comunidades por meio da educação e inovação.",
      b: "Promover o conhecimento e o desenvolvimento pessoal.",
      c: "Apoiar pessoas em situações de vulnerabilidade.",
      d: "Proteger e cuidar dos animais abandonados."
    }
  },
  {
    pergunta: "2. Como você prefere contribuir para uma causa?",
    opcoes: {
      a: "Participando de projetos sociais e comunitários.",
      b: "Compartilhando conhecimento e ensinando outros.",
      c: "Oferecendo apoio direto a quem precisa.",
      d: "Resgatando e cuidando de animais necessitados."
    }
  },
  {
    pergunta: "3. O que mais te motiva a ajudar?",
    opcoes: {
      a: "Ver a transformação positiva em comunidades.",
      b: "O crescimento e aprendizado contínuo.",
      c: "O alívio e conforto proporcionado às pessoas.",
      d: "O bem-estar e segurança dos animais."
    }
  },
  {
    pergunta: "4. Qual atividade você mais se identifica?",
    opcoes: {
      a: "Organizar campanhas para melhorar a vida nas favelas.",
      b: "Criar conteúdos educativos e informativos.",
      c: "Trabalhar em hospitais ou instituições de apoio.",
      d: "Voluntariar em abrigos de animais."
    }
  },
  {
    pergunta: "5. Como você reage diante de uma injustiça?",
    opcoes: {
      a: "Mobiliza-se para promover mudanças estruturais.",
      b: "Busca entender e educar sobre o problema.",
      c: "Oferece apoio direto às vítimas.",
      d: "Denuncia e protege os mais vulneráveis, especialmente animais."
    }
  },
  {
    pergunta: "6. Qual dessas frases mais te representa?",
    opcoes: {
      a: "A mudança começa com ação.",
      b: "Conhecimento é poder.",
      c: "Empatia é a chave para um mundo melhor.",
      d: "Cada vida importa, humana ou animal."
    }
  },
  {
    pergunta: "7. Em qual ambiente você se sente mais realizado?",
    opcoes: {
      a: "Em projetos de desenvolvimento comunitário.",
      b: "Em salas de aula ou workshops.",
      c: "Em centros de apoio ou hospitais.",
      d: "Em abrigos ou resgates de animais."
    }
  },
  {
    pergunta: "8. Qual é o seu maior objetivo ao ajudar?",
    opcoes: {
      a: "Transformar realidades e combater a pobreza.",
      b: "Disseminar conhecimento e promover o aprendizado.",
      c: "Proporcionar conforto e esperança às pessoas.",
      d: "Garantir a segurança e bem-estar dos animais."
    }
  }
];

var resultados = {
  a: {
    titulo: "🌟 Transformador Social",
    descricao: "Você acredita no poder da educação e inovação para mudar o mundo. É como a Gerando Falcões: transforma realidades com ação e coragem.",
    fkTipo: "1"
  },
  b: {
    titulo: "🚀 Explorador do Conhecimento",
    descricao: "Você é movido pelo saber e pela partilha. Assim como a Desbrava7, acredita que conhecimento empodera e inspira.",
    fkTipo: "2"
  },
  c: {
    titulo: "💖 Guardião da Vida",
    descricao: "Sua empatia é seu guia. Você acolhe, apoia e oferece presença, como a ACTC, cuidando de quem mais precisa.",
    fkTipo: "3"
  },
  d: {
    titulo: "🐾 Protetor dos Animais",
    descricao: "Você sente pelos que não têm voz. Como o Paraíso dos Focinhos, se dedica ao cuidado e à defesa dos animais com amor.",
    fkTipo: "4"
  }
};

// Mostrar perguntas diretamente no HTML
var htmlQuiz = "";

for (var i = 0; i < perguntas.length; i++) {
  htmlQuiz += "<br><b><p style=color:#f14b47>" + perguntas[i].pergunta + "</p></b>";

  for (var letra in perguntas[i].opcoes) {
    htmlQuiz += "<label><input type='radio' name='q" + i + "' value='" + letra + "'> " + perguntas[i].opcoes[letra] + "</label><br>";
  }
}
document.getElementById("quiz-box").innerHTML = htmlQuiz;

// ver o resultado do quiz
function verResultado() {
  var contagem = { a: 0, b: 0, c: 0, d: 0 };

  // esta vendo qual alternativa o usuario colocou na pergunta 'x' e adiciona +1 a contagem
  for (var i = 0; i < perguntas.length; i++) {
    var resposta = document.querySelector("input[name='q" + i + "']:checked");
    if (resposta) {
      contagem[resposta.value]++;
    }
  }

  var mais = "a";
  if (contagem.b > contagem[mais]) mais = "b";
  if (contagem.c > contagem[mais]) mais = "c";
  if (contagem.d > contagem[mais]) mais = "d";

  document.getElementById("result").style.display = "block";
  document.getElementById("result").innerHTML =
    "<h2>" + resultados[mais].titulo + "</h2><p>" + resultados[mais].descricao + "</p>";


    //Rota pra mandar o resultado do quiz para o BD
  fetch("/quiz/registrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fkusario: idusuario,
      fktipo: resultados[mais].fkTipo
    })
  })
    .then(function (res) {
      if (res.ok) {
        console.log("Resposta registrada com sucesso.");
      } else {
        console.log("Erro ao registrar.");
      }
    });
}