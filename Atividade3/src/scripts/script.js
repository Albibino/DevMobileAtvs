const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));

const drawer = $('#mobile-drawer');
const overlay = $('[data-overlay]');
const openBtn = $('[data-open-drawer]');
const closeBtns = $$('[data-close-drawer]');

function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  overlay.classList.add('show');
  openBtn.setAttribute('aria-expanded', 'true');
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('show');
  openBtn.setAttribute('aria-expanded', 'false');
}

openBtn?.addEventListener('click', openDrawer);
overlay?.addEventListener('click', closeDrawer);
closeBtns.forEach(btn => btn.addEventListener('click', closeDrawer));

const produtos = [
  { id: 1, nome: 'Abriu chamado?', preco: 12.90, img: 'images/abriuchamado.png' },
  { id: 2, nome: 'Agora eu saquei!', preco: 9.90,  img: 'images/agoraeusaquei.png' },
  { id: 3, nome: 'Coffe into Code', preco: 10.90, img: 'images/coffeintocode.png' },
  { id: 4, nome: 'Floppy', preco: 8.90,  img: 'images/floppybuthappy.png' },
  { id: 5, nome: 'GoHorse', preco: 11.90, img: 'images/gohorse.png' },
  { id: 6, nome: 'Processo perfeito', preco: 7.90,  img: 'images/gohorseprocess.png' },
  { id: 7, nome: 'Reinicou ja?', preco: 11.90, img: 'images/jareiniciouai.png' },
  { id: 8, nome: 'Tchan', preco: 7.90,  img: 'images/tchan.png' },
  { id: 9, nome: 'Vibe Coding', preco: 7.90,  img: 'images/vibecoding.png' },
  { id: 10, nome: 'Vibe Coding 2', preco: 7.90,  img: 'images/vibecoding2.png' },
  { id: 11, nome: 'Problem Solver', preco: 7.90,  img: 'images/problemsolver.png' },
];

const grid = document.getElementById('produtos');
const cartCount = $('[data-cart-count]');
let count = 0;

function renderProdutos() {
  grid.innerHTML = produtos.map(p => `
    <article class="product-card" role="listitem">
      <img src="${p.img}" width="600" height="400" alt="${p.nome}">
      <div class="product-meta">
        <div>
          <strong>${p.nome}</strong><br>
          <span class="price">R$ ${p.preco.toFixed(2)}</span>
        </div>
        <button class="btn primary" data-add="${p.id}">Adicionar</button>
      </div>
    </article>
  `).join('');
  $$('#produtos [data-add]').forEach(btn => btn.addEventListener('click', () => {
    count += 1; cartCount.textContent = count;
  }));
}
renderProdutos();

$('#year').textContent = new Date().getFullYear();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./serviceworker.js')
      .then(reg => console.log('SW registrado', reg.scope))
      .catch(err => console.warn('Falha ao registrar SW', err));
  });
}