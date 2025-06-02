
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

ax_menuitem.forEach((item)=>
    item.addEventListener('click',selecionar)
)

// expandir o menu
var ax_btn = document.querySelector('#btn-exp')
var ax_menu = document.querySelector('.menu-lateral')

// add evento click assim que for clicado o 
ax_btn.addEventListener('click', function(){
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



const js_barras2 = document.getElementById('barras2');
const js_barras1 = document.getElementById('barras1');

new Chart(js_barras1, {
    type: 'bar',
    data: {
      labels: ['🌟 Transformador Social', '🚀 Explorador do Conhecimento', '💖 Guardião da Vida', '🐾 Protetor dos Animais'],
      datasets: [
        {
          label: 'Número de Alertas',
          data: [2, 0, 0, 0],
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Veículos'
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Número de Alertas'
          },
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Os 4 Veículos que Mais Emitiram Alertas Nesta Semana'
        }
      }
    }
  });

    new Chart(js_barras2, {
    type: 'bar',
    data: {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
      datasets: [
        {
          label: 'Número de alertas',
          data: [3, 2, 2, 2, 1, 0],
          borderWidth: 1
        }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Meses'
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Número de Alertas'
          },
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Número de Alertas dos Veículos no Primeiro Semestre de 2025'
        }
      }
    }
  });





    // Inicio quiz
    const quizData = [
      {
        question: "1. Qual causa mais ressoa com você?",
        options: {
          a: "Transformar comunidades por meio da educação e inovação.",
          b: "Promover o conhecimento e o desenvolvimento pessoal.",
          c: "Apoiar pessoas em situações de vulnerabilidade.",
          d: "Proteger e cuidar dos animais abandonados."
        }
      },
      {
        question: "2. Como você prefere contribuir para uma causa?",
        options: {
          a: "Participando de projetos sociais e comunitários.",
          b: "Compartilhando conhecimento e ensinando outros.",
          c: "Oferecendo apoio direto a quem precisa.",
          d: "Resgatando e cuidando de animais necessitados."
        }
      },
      {
        question: "3. O que mais te motiva a ajudar?",
        options: {
          a: "Ver a transformação positiva em comunidades.",
          b: "O crescimento e aprendizado contínuo.",
          c: "O alívio e conforto proporcionado às pessoas.",
          d: "O bem-estar e segurança dos animais."
        }
      },
      {
        question: "4. Qual atividade você mais se identifica?",
        options: {
          a: "Organizar campanhas para melhorar a vida nas favelas.",
          b: "Criar conteúdos educativos e informativos.",
          c: "Trabalhar em hospitais ou instituições de apoio.",
          d: "Voluntariar em abrigos de animais."
        }
      },
      {
        question: "5. Como você reage diante de uma injustiça?",
        options: {
          a: "Mobiliza-se para promover mudanças estruturais.",
          b: "Busca entender e educar sobre o problema.",
          c: "Oferece apoio direto às vítimas.",
          d: "Denuncia e protege os mais vulneráveis, especialmente animais."
        }
      },
      {
        question: "6. Qual dessas frases mais te representa?",
        options: {
          a: "A mudança começa com ação.",
          b: "Conhecimento é poder.",
          c: "Empatia é a chave para um mundo melhor.",
          d: "Cada vida importa, humana ou animal."
        }
      },
      {
        question: "7. Em qual ambiente você se sente mais realizado?",
        options: {
          a: "Em projetos de desenvolvimento comunitário.",
          b: "Em salas de aula ou workshops.",
          c: "Em centros de apoio ou hospitais.",
          d: "Em abrigos ou resgates de animais."
        }
      },
      {
        question: "8. Qual é o seu maior objetivo ao ajudar?",
        options: {
          a: "Transformar realidades e combater a pobreza.",
          b: "Disseminar conhecimento e promover o aprendizado.",
          c: "Proporcionar conforto e esperança às pessoas.",
          d: "Garantir a segurança e bem-estar dos animais."
        }
      }
    ];

    const results = {
      a: {
        title: "🌟 Transformador Social",
        description: "Você acredita no poder da educação e inovação para mudar o mundo. É como a Gerando Falcões: transforma realidades com ação e coragem."
      },
      b: {
        title: "🚀 Explorador do Conhecimento",
        description: "Você é movido pelo saber e pela partilha. Assim como a Desbrava7, acredita que conhecimento empodera e inspira."
      },
      c: {
        title: "💖 Guardião da Vida",
        description: "Sua empatia é seu guia. Você acolhe, apoia e oferece presença, como a ACTC, cuidando de quem mais precisa."
      },
      d: {
        title: "🐾 Protetor dos Animais",
        description: "Você sente pelos que não têm voz. Como o Paraíso dos Focinhos, se dedica ao cuidado e à defesa dos animais com amor."
      }
    };

    const form = document.getElementById("quizForm");
    const resultDiv = document.getElementById("result");

    quizData.forEach((q, index) => {
      const div = document.createElement("div");
      div.className = "question";
      div.innerHTML = `<p><strong>${q.question}</strong></p>`;

      const optionsDiv = document.createElement("div");
      optionsDiv.className = "options";

      for (const key in q.options) {
        const id = `q${index}_${key}`;
        optionsDiv.innerHTML += `
          <label>
            <input type="radio" name="q${index}" value="${key}" required> ${q.options[key]}
          </label>
        `;
      }

      div.appendChild(optionsDiv);
      form.appendChild(div);
    });

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Ver meu tipo de doador";
    submitBtn.type = "submit";
    form.appendChild(submitBtn);

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const formData = new FormData(form);
      const counts = { a: 0, b: 0, c: 0, d: 0 };

      for (let pair of formData.entries()) {
        counts[pair[1]]++;
      }

      let highest = 'a';
      for (const key in counts) {
        if (counts[key] > counts[highest]) highest = key;
      }

      resultDiv.style.display = "block";
      resultDiv.innerHTML = `
        <h2>${results[highest].title}</h2>
        <p>${results[highest].description}</p>
      `;

      window.scrollTo({ top: resultDiv.offsetTop, behavior: "smooth" });
    });