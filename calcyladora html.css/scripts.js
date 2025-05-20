// scripts.js

// Função para adicionar um item ao carrinho
function addToCart(bookTitle, bookPrice) {
  // Recupera o carrinho atual ou cria um novo caso não exista
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Verifica se o item já existe no carrinho
  const existingBookIndex = cart.findIndex(item => item.title === bookTitle);

  if (existingBookIndex !== -1) {
    // Se já estiver no carrinho, incrementa a quantidade
    cart[existingBookIndex].quantity += 1;
  } else {
    // Caso contrário, adiciona o item ao carrinho
    cart.push({
      title: bookTitle,
      price: bookPrice,
      quantity: 1
    });
  }

  // Atualiza o carrinho no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Exibe um alerta para o usuário
  alert(`${bookTitle} foi adicionado ao carrinho!`);
  updateCartDisplay();
}

// Função para exibir os itens no carrinho
function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalContainer = document.getElementById('cart-total');
  
  // Limpa os itens do carrinho atual
  cartItemsContainer.innerHTML = '';

  // Exibe os itens no carrinho
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    cartTotalContainer.innerHTML = '';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <p>${item.title} (x${item.quantity}) - R$ ${item.price * item.quantity}</p>
        <button onclick="removeFromCart('${item.title}')">Remover</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });

    // Exibe o total do carrinho
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalContainer.innerHTML = `<p>Total: R$ ${total.toFixed(2)}</p>`;
  }
}

// Função para remover um item do carrinho
function removeFromCart(bookTitle) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Filtra o item do carrinho
  cart = cart.filter(item => item.title !== bookTitle);

  // Atualiza o carrinho no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Atualiza a exibição do carrinho
  updateCartDisplay();
}

// Atualiza o carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('cart-items')) {
    updateCartDisplay();
  }
});

// Função para limpar o carrinho
function clearCart() {
  localStorage.removeItem('cart');
  updateCartDisplay();
}
