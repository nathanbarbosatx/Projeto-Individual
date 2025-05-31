
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