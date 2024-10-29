let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco, quantidadeId) {
  const quantidade = parseInt(document.getElementById(quantidadeId).value);
  if (isNaN(quantidade) || quantidade <= 0) {
    alert("Por favor, insira uma quantidade válida.");
    return;
  }


  const itemExistente = carrinho.find((item) => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({ nome, preco, quantidade });
  }

  total += preco * quantidade;


  atualizarCarrinho();


  const carrinhoContainer = document.querySelector(".carrinho-container");
  if (!carrinhoContainer.classList.contains("carrinho-aberto")) {
    carrinhoContainer.classList.add("carrinho-aberto");
  }
}

function atualizarCarrinho() {
  const carrinhoLista = document.getElementById("carrinho-lista");
  const totalElemento = document.getElementById("total");


  carrinhoLista.innerHTML = "";


  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} (x${item.quantidade}) - R$ ${(
      item.preco * item.quantidade
    ).toFixed(2)}`;
    carrinhoLista.appendChild(li);
  });


  totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function toggleCarrinho() {
  const carrinhoContainer = document.querySelector(".carrinho-container");
  carrinhoContainer.classList.toggle("carrinho-aberto");
}

function mostrarModal() {
  if (total <= 0) {
    alert(
      `Carrinho vazio, por gentileza adicione itens para finalizar o pedido!`
    );
    return;
  }

  const modal = document.getElementById("modal-pagamento");
  modal.style.display = "flex";
}

function fecharModal() {
  const modal = document.getElementById("modal-pagamento");
  modal.style.display = "none";
}

function resetarCarrinho() {
  carrinho = [];
  total = 0;
  atualizarCarrinho();
}

function escolherFormaPagamento(metodo) {
  if (metodo === "Dinheiro" || metodo === "Cartão") {
    alert("O garçom foi chamado para ir até sua mesa.");
  } else if (metodo === "PIX") {
    const valorTotal = total.toFixed(2);
    alert(`Valor total: R$ ${valorTotal}\nFaça o PIX para: (85) 98613-9769`);
  }

  resetarCarrinho();

  fecharModal();

  location.reload();
}

  async function carregarMenu() {
    try {
      const response = await fetch('http://localhost:8080/food');
      const foods = await response.json();
      const menuContainer = document.getElementById('menu-container');
      menuContainer.innerHTML = ''; r

      foods.forEach(food => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';

        menuItem.innerHTML = `
          <img src="https://via.placeholder.com/120" alt="${food.nome}" />
          <h3>${food.nome}</h3>
          <p>R$ ${food.preco.toFixed(2)}</p>
          <div class="quantidade-container">
            <label for="quantidade-item-${food.id}">Quantidade:</label>
            <input type="number" value="1" min="1" id="quantidade-item-${food.id}" />
          </div>
          <button onclick="adicionarAoCarrinho('${food.nome}', ${food.preco}, 'quantidade-item-${food.id}')">
            Adicionar
          </button>
        `;

        menuContainer.appendChild(menuItem);
      });
    } catch (error) {
      console.error('Erro ao carregar o menu:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', carregarMenu);


