let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nome, preco, quantidadeId) {
  const quantidade = parseInt(document.getElementById(quantidadeId).value);
  if (isNaN(quantidade) || quantidade <= 0) {
    alert("Por favor, insira uma quantidade válida.");
    return;
  }

  // Verificar se o item já está no carrinho
  const itemExistente = carrinho.find((item) => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({ nome, preco, quantidade });
  }

  total += preco * quantidade;

  // Atualizar interface do carrinho
  atualizarCarrinho();

  // Abrir o carrinho automaticamente
  const carrinhoContainer = document.querySelector(".carrinho-container");
  if (!carrinhoContainer.classList.contains("carrinho-aberto")) {
    carrinhoContainer.classList.add("carrinho-aberto");
  }
}

function atualizarCarrinho() {
  const carrinhoLista = document.getElementById("carrinho-lista");
  const totalElemento = document.getElementById("total");

  // Limpar a lista atual
  carrinhoLista.innerHTML = "";

  // Adicionar os itens do carrinho à lista
  carrinho.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} (x${item.quantidade}) - R$ ${(
      item.preco * item.quantidade
    ).toFixed(2)}`;
    carrinhoLista.appendChild(li);
  });

  // Atualizar o total
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
  atualizarCarrinho(); // Atualiza a interface do carrinho
}

function escolherFormaPagamento(metodo) {
  if (metodo === "Dinheiro" || metodo === "Cartão") {
    alert("O garçom foi chamado para ir até sua mesa.");
  } else if (metodo === "PIX") {
    const valorTotal = total.toFixed(2);
    alert(`Valor total: R$ ${valorTotal}\nFaça o PIX para: (85) 98613-9769`);
  }

  // Reseta o carrinho após o pagamento
  resetarCarrinho();

  // Fecha o modal
  fecharModal();

  // atualizar página
  location.reload();
}
