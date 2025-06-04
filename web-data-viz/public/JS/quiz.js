
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
    obterDadosGrafico()
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



function obterDadosGrafico() {
  fetch(`/usuarios/dadosgrafico`, { cache: 'no-store' })
    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
    .then(resposta => {
      console.log(resposta)
      plotargrafico(resposta);
    })
    .catch(err => console.error('Erro teste:', err));
}




function plotargrafico(resposta) {


  vt_tipo = [];
  vt_qtd = [];

  for (let i = 0; i < resposta.length; i++) {
    vt_tipo.push(resposta[i].tipo);
    vt_qtd.push(resposta[i].qtdTipoDoador);
  }
  console.log(vt_tipo);
  console.log(vt_qtd);


  var maior = 0;
  var maiordoador = '';
  var menor = 99;
  var menordoador = '';
  var totaluser = 0;


  for (var i = 0; i < vt_qtd.length; i++) {

    totaluser += vt_qtd[i]
    if (vt_qtd[i] > maior) {
      maior = vt_qtd[i]
      maiordoador = vt_tipo[i]
    }
    if (vt_qtd[i] < menor) {
      menor = vt_qtd[i]
      menordoador = vt_tipo[i]
    }


  }

  for (var i = 0; i < vt_qtd.length; i++) {
    
    var resultado = vt_qtd[i]/totaluser*100
    vt_qtd[i] = resultado.toFixed(2)
    
  }

  kpiuser.innerHTML = totaluser;
  kpimaior.innerHTML = maiordoador;
  kpimenor.innerHTML = menordoador;




  const ctz = document.getElementById("barras1")
  const grafico = new Chart(ctz, {
    type: 'doughnut',
    data: {
      labels: vt_tipo,
      datasets: [{
        data: vt_qtd,
        backgroundColor: ['#f14b47', '#eb8bce', '#38b6ff','#00d929'],
        borderColor: '#00aeef',
        borderWidth: 10
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Porcentagem de Cada Tipo de Doador',
          color: '#ffffff',
          font: {
            size: 25,
            family: 'Arial',
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 10
          }
        },
        legend: {
          display: false,
          position: 'left',
          labels: {
            color: '#ffffff'
          }
        },
        datalabels: {
          color: '#fff',
          font: {
            weight: 'bold',
            size: 26
          },
          formatter: function (value, context) {
            return value + "%"
          }
        },

      },
      cutout: '60%'
    },
    plugins: [ChartDataLabels]
  });

}






// Inicio quiz

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
  const idusuario = sessionStorage.ID_USUARIO;
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