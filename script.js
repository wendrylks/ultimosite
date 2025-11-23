// ============================================
// MENU MOBILE - TOGGLE
// ============================================
const botaoMenu = document.getElementById('botao-menu');
const menuMobile = document.getElementById('menu-mobile');
const iconeMenu = document.getElementById('icone-menu');

botaoMenu.addEventListener('click', () => {
  const estaAberto = menuMobile.classList.contains('menu-mobile-aberto');
  
  if (estaAberto) {
    menuMobile.classList.remove('menu-mobile-aberto');
    menuMobile.classList.add('menu-mobile-fechado');
    iconeMenu.textContent = '☰';
    botaoMenu.setAttribute('aria-expanded', 'false');
  } else {
    menuMobile.classList.remove('menu-mobile-fechado');
    menuMobile.classList.add('menu-mobile-aberto');
    iconeMenu.textContent = '✕';
    botaoMenu.setAttribute('aria-expanded', 'true');
  }
});

// Fechar menu ao clicar em um link
const linksMenu = menuMobile.querySelectorAll('a');
linksMenu.forEach(link => {
  link.addEventListener('click', () => {
    menuMobile.classList.remove('menu-mobile-aberto');
    menuMobile.classList.add('menu-mobile-fechado');
    iconeMenu.textContent = '☰';
    botaoMenu.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// FORMULÁRIO DE FEEDBACK
// ============================================
const formFeedback = document.getElementById('form-feedback');
const mensagemErro = document.getElementById('mensagem-erro');
const mensagemSucesso = document.getElementById('mensagem-sucesso');

formFeedback.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nome = document.getElementById('nome').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  
  // Validação
  if (mensagem.length < 10) {
    mensagemErro.classList.remove('hidden');
    mensagemSucesso.classList.add('hidden');
    return;
  }
  
  // Salvar no localStorage
  const mensagens = JSON.parse(localStorage.getItem('mensagens') || '[]');
  const novaMensagem = {
    id: Date.now(),
    nome: nome || 'Anônimo',
    mensagem: mensagem,
    data: new Date().toLocaleString('pt-BR')
  };
  
  mensagens.push(novaMensagem);
  localStorage.setItem('mensagens', JSON.stringify(mensagens));
  
  // Feedback visual
  mensagemErro.classList.add('hidden');
  mensagemSucesso.classList.remove('hidden');
  
  // Limpar formulário
  formFeedback.reset();
  
  // Esconder mensagem de sucesso após 3 segundos
  setTimeout(() => {
    mensagemSucesso.classList.add('hidden');
  }, 3000);
});

// ============================================
// ÁREA ADMINISTRATIVA - LOGIN
// ============================================
const SENHA_ADMIN = 'admin2025'; // Senha padrão (pode ser alterada)

const formLogin = document.getElementById('form-login');
const erroLogin = document.getElementById('erro-login');
const adminLogin = document.getElementById('admin-login');
const adminPainel = document.getElementById('admin-painel');
const btnSair = document.getElementById('btn-sair');

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const senhaDigitada = document.getElementById('senha-admin').value;
  
  if (senhaDigitada === SENHA_ADMIN) {
    adminLogin.classList.add('hidden');
    adminPainel.classList.remove('hidden');
    carregarMensagens();
    erroLogin.classList.add('hidden');
  } else {
    erroLogin.classList.remove('hidden');
  }
  
  formLogin.reset();
});

btnSair.addEventListener('click', () => {
  adminPainel.classList.add('hidden');
  adminLogin.classList.remove('hidden');
});

// ============================================
// CARREGAR E EXIBIR MENSAGENS
// ============================================
function carregarMensagens() {
  const mensagens = JSON.parse(localStorage.getItem('mensagens') || '[]');
  const listaMensagens = document.getElementById('lista-mensagens');
  const totalMensagens = document.getElementById('total-mensagens');
  
  totalMensagens.textContent = mensagens.length;
  
  if (mensagens.length === 0) {
    listaMensagens.innerHTML = `
      <div class="card-bg border card-border rounded-xl p-6 text-center secondary-text">
        <p class="text-sm">Nenhuma mensagem recebida ainda.</p>
      </div>
    `;
    return;
  }
  
  // Ordenar mensagens (mais recentes primeiro)
  mensagens.sort((a, b) => b.id - a.id);
  
  listaMensagens.innerHTML = mensagens.map(msg => `
    <article class="card-bg border card-border rounded-xl p-5">
      <header class="flex items-start justify-between mb-3">
        <div>
          <h3 class="text-base font-semibold main-text">${msg.nome}</h3>
          <p class="text-xs secondary-text">${msg.data}</p>
        </div>
        <button 
          onclick="excluirMensagem(${msg.id})"
          class="text-xs px-3 py-1 rounded-full border theme-border hover:border-red-400 hover:text-red-400 transition-colors main-text"
          aria-label="Excluir mensagem de ${msg.nome}"
        >
          Excluir
        </button>
      </header>
      <p class="text-sm secondary-text leading-relaxed">${msg.mensagem}</p>
    </article>
  `).join('');
}

// ============================================
// EXCLUIR MENSAGEM
// ============================================
function excluirMensagem(id) {
  let mensagens = JSON.parse(localStorage.getItem('mensagens') || '[]');
  mensagens = mensagens.filter(msg => msg.id !== id);
  localStorage.setItem('mensagens', JSON.stringify(mensagens));
  carregarMensagens();
}

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});