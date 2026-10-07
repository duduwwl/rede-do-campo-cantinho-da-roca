const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const products = [
  ['agro-01','agricola','Sementes de milho híbrido','Agrícola · sementes','Para uma safra uniforme e vigorosa.',89.90,0,0],
  ['agro-02','agricola','Sementes de hortaliças','Agrícola · sementes','Variedade para a horta da sua propriedade.',24.90,1,0],
  ['agro-03','agricola','Nutrição foliar Do Campo','Agrícola · fertilizantes','Vigor para a lavoura em cada aplicação.',68.50,2,0],
  ['agro-04','agricola','Fertilizante organomineral','Agrícola · fertilizantes','Solo bem cuidado produz mais.',112.00,3,0],
  ['agro-05','agricola','Sementes de milho safrinha','Agrícola · sementes','Escolha técnica para plantar com confiança.',94.90,4,0],
  ['agro-06','agricola','Pulverizador manual 5L','Agrícola · equipamentos','Precisão e praticidade no manejo.',79.90,0,5],
  ['pec-01','pecuaria','Suplemento mineral 25kg','Pecuária · suplementação','Nutrição equilibrada para o rebanho.',119.90,1,2],
  ['pec-02','pecuaria','Sal mineral proteinado','Pecuária · suplementação','Energia para cada fase da criação.',138.00,2,2],
  ['pec-03','pecuaria','Antibiótico veterinário','Pecuária · medicamentos','Cuidado veterinário para o dia a dia.',46.90,3,1],
  ['pec-04','pecuaria','Seringa veterinária 20ml','Pecuária · manejo','Manejo seguro e eficiente.',18.50,4,1],
  ['pec-05','pecuaria','Ração Aliment para bovinos','Pecuária · alimentação','Desempenho para o rebanho e a produção.',82.90,0,2],
  ['pec-06','pecuaria','Balde para ordenha 20L','Pecuária · ordenha','Resistência para a rotina da fazenda.',69.90,1,3],
  ['pet-01','pet','Defenza antiparasitário','Pet · antiparasitário','Proteção prática para cães e gatos.',74.90,2,1],
  ['pet-02','pet','Campet ração premium','Pet · alimentação','Receitas pensadas para uma vida mais feliz.',129.90,3,3],
  ['pet-03','pet','Ração para gatos adultos','Pet · alimentação','Sabor e cuidado na medida certa.',96.90,4,3],
  ['pet-04','pet','Comedouro inox','Pet · acessórios','Mais higiene para cada refeição.',39.90,0,3],
  ['pet-05','pet','Coleira ajustável','Pet · acessórios','Conforto e segurança nos passeios.',29.90,1,3],
  ['pet-06','pet','Brinquedo mordedor','Pet · acessórios','Diversão para gastar energia.',22.90,2,3],
  ['pesca-01','pesca','Vara de pesca telescópica','Pesca · equipamentos','Seu próximo momento bom começa aqui.',84.90,3,4],
  ['pesca-02','pesca','Molinete médio','Pesca · equipamentos','Leveza para lançar mais longe.',119.90,4,4],
  ['pesca-03','pesca','Linha multifilamento','Pesca · acessórios','Resistência para cada fisgada.',39.90,0,4],
  ['pesca-04','pesca','Caixa de iscas','Pesca · acessórios','Tudo organizado para a pescaria.',54.90,1,4],
  ['pesca-05','pesca','Kit boias e anzóis','Pesca · acessórios','Um kit prático para começar.',27.50,2,4],
  ['ferramentas-01','ferramentas','Carrinho de mão reforçado','Ferramentas · jardim','Apoio para o trabalho pesado.',249.90,3,5],
  ['ferramentas-02','ferramentas','Pá de jardinagem','Ferramentas · jardim','Cabo confortável e lâmina resistente.',59.90,4,5],
  ['ferramentas-03','ferramentas','Tesoura de poda','Ferramentas · jardim','Cortes precisos para cuidar das plantas.',42.90,0,5],
  ['ferramentas-04','ferramentas','Kit ferramentas 32 peças','Ferramentas · oficina','O essencial para a oficina rural.',159.90,1,5],
  ['piscina-01','piscina','Cloro granulado 1kg','Piscina · tratamento','Água limpa para aproveitar o verão.',32.90,2,5],
  ['piscina-02','piscina','Kit teste de piscina','Piscina · tratamento','Controle simples de pH e cloro.',39.90,3,5],
  ['piscina-03','piscina','Peneira para piscina','Piscina · limpeza','Limpeza rápida e prática.',49.90,4,5]
].map(([id, category, name, label, description, price, x, y]) => ({ id, category, name, label, description, price, x, y }));

const requestedFilter = new URLSearchParams(window.location.search).get('categoria');
const state = { filter: products.some((product) => product.category === requestedFilter) ? requestedFilter : 'all', query: '', bag: [] };

const menuToggle = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
menuToggle?.addEventListener('click', () => { const open = mobileNav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
$$('.mobile-nav a').forEach((link) => link.addEventListener('click', () => mobileNav.classList.remove('open')));

const productCard = (product) => `<article class="product-card" data-category="${product.category}" data-name="${product.name.toLowerCase()} ${product.description.toLowerCase()}"><div class="product-image catalog-photo" style="--photo-x:${product.x * 25}%;--photo-y:${product.y * 20}%" role="img" aria-label="Foto ilustrativa de ${product.name}"><span class="product-badge">${product.label.split(' · ')[0]}</span><span class="image-caption">foto ilustrativa</span></div><div class="product-info"><span class="product-category">${product.label}</span><h3>${product.name}</h3><p>${product.description}</p><div class="product-buy"><strong>${money.format(product.price)}</strong><button class="add-quote" data-id="${product.id}">Adicionar <span>+</span></button></div></div></article>`;
const renderProducts = () => { const grid = $('#product-grid'); if (!grid) return; const filtered = products.filter((product) => (state.filter === 'all' || product.category === state.filter) && (!state.query || `${product.name} ${product.description}`.toLowerCase().includes(state.query.toLowerCase()))); grid.innerHTML = filtered.map(productCard).join(''); $('#empty-state').hidden = filtered.length !== 0; };
$$('.product-tabs button').forEach((button) => button.addEventListener('click', () => { $$('.product-tabs button').forEach((item) => item.classList.remove('active')); button.classList.add('active'); state.filter = button.dataset.filter; renderProducts(); }));
$('#product-search')?.addEventListener('input', (event) => { state.query = event.target.value.trim(); renderProducts(); });

const toast = $('#toast'); let toastTimer;
const showToast = (message) => { toast.textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2300); };
const quoteDrawer = $('#quote-drawer'); const drawerBody = $('#drawer-body');
const openDrawer = () => { quoteDrawer.classList.add('open'); quoteDrawer.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
const closeDrawer = () => { quoteDrawer.classList.remove('open'); quoteDrawer.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
const getBagCount = () => state.bag.reduce((sum, item) => sum + item.qty, 0);
const getSubtotal = () => state.bag.reduce((sum, item) => sum + item.price * item.qty, 0);
const changeQty = (id, amount) => { const item = state.bag.find((entry) => entry.id === id); if (!item) return; item.qty += amount; if (item.qty <= 0) state.bag = state.bag.filter((entry) => entry.id !== id); renderBag(); };
const renderBag = () => {
  $('#quote-count').textContent = getBagCount(); $('#drawer-total').textContent = money.format(getSubtotal());
  if (!state.bag.length) { drawerBody.innerHTML = '<div class="drawer-empty"><span>✳</span><h3>Comece a comprar</h3><p>Adicione produtos do catálogo para montar seu pedido.</p><a href="./produtos.html" id="drawer-browse">Ver catálogo</a></div>'; $('#open-checkout').hidden = true; $('#drawer-browse')?.addEventListener('click', closeDrawer); return; }
  drawerBody.innerHTML = state.bag.map((item) => `<div class="quote-item"><div><strong>${item.name}</strong><small>${money.format(item.price)} cada</small></div><div class="item-controls"><button data-minus="${item.id}" aria-label="Diminuir quantidade">−</button><b>${item.qty}</b><button data-plus="${item.id}" aria-label="Aumentar quantidade">+</button><button class="remove-item" data-remove="${item.id}" aria-label="Remover ${item.name}">×</button></div></div>`).join('');
  $('#open-checkout').hidden = false;
  drawerBody.querySelectorAll('[data-plus]').forEach((button) => button.addEventListener('click', () => changeQty(button.dataset.plus, 1)));
  drawerBody.querySelectorAll('[data-minus]').forEach((button) => button.addEventListener('click', () => changeQty(button.dataset.minus, -1)));
  drawerBody.querySelectorAll('[data-remove]').forEach((button) => button.addEventListener('click', () => { state.bag = state.bag.filter((item) => item.id !== button.dataset.remove); renderBag(); }));
};
const addToBag = (id) => { const product = products.find((item) => item.id === id); const existing = state.bag.find((item) => item.id === id); if (existing) existing.qty += 1; else state.bag.push({ ...product, qty: 1 }); renderBag(); showToast(`${product.name} adicionado à sacola.`); };
$('#product-grid')?.addEventListener('click', (event) => { const button = event.target.closest('[data-id]'); if (button) addToBag(button.dataset.id); });
$('#open-quote')?.addEventListener('click', openDrawer); $('#close-quote')?.addEventListener('click', closeDrawer); $('#drawer-backdrop')?.addEventListener('click', closeDrawer);

const checkoutModal = $('#checkout-modal'); const checkoutForm = $('#checkout-form');
const openCheckout = () => { if (!state.bag.length) return; closeDrawer(); checkoutModal.classList.add('open'); checkoutModal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; renderCheckout(); };
const closeCheckout = () => { checkoutModal.classList.remove('open'); checkoutModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
const renderCheckout = () => { $('#checkout-items-count').textContent = `${getBagCount()} ${getBagCount() === 1 ? 'item' : 'itens'}`; $('#checkout-items').innerHTML = state.bag.map((item) => `<div class="summary-item"><span>${item.qty}× ${item.name}</span><strong>${money.format(item.price * item.qty)}</strong></div>`).join(''); $('#checkout-subtotal').textContent = money.format(getSubtotal()); const pickup = checkoutForm.querySelector('input[name="fulfillment"]:checked')?.value === 'Retirada na loja'; $('#checkout-delivery').textContent = pickup ? 'Grátis' : 'A combinar'; $('#checkout-total').textContent = money.format(getSubtotal()); document.querySelector('.delivery-fields').hidden = pickup; };
$('#open-checkout')?.addEventListener('click', openCheckout); $('#close-checkout')?.addEventListener('click', closeCheckout); $('#checkout-backdrop')?.addEventListener('click', closeCheckout);
$('#success-close')?.addEventListener('click', () => { $('#checkout-success').hidden = true; checkoutForm.hidden = false; closeCheckout(); });
$$('input[name="fulfillment"]').forEach((input) => input.addEventListener('change', renderCheckout));
$$('input[name="payment"]').forEach((input) => input.addEventListener('change', () => { const card = input.value.includes('Cartão'); $('#card-fields').classList.toggle('visible', card); $('#pix-note').hidden = card; $$('#card-fields input').forEach((field) => { field.required = card; }); }));
checkoutForm?.addEventListener('submit', (event) => { event.preventDefault(); if (!checkoutForm.reportValidity()) return; checkoutForm.hidden = true; $('#checkout-success').hidden = false; });

$('.announcement-close')?.addEventListener('click', (event) => event.currentTarget.parentElement.remove());
$$('.product-tabs button').forEach((button) => button.classList.toggle('active', button.dataset.filter === state.filter));
renderProducts(); renderBag();

