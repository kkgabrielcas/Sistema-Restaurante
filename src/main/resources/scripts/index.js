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

function mostrarDetalhesPagamento(metodo) {
  const modalDetalhes = document.getElementById("modal-detalhes-pagamento");
  const detalhesContent = document.getElementById("detalhes-pagamento-content");

  // Define o conteúdo com base na forma de pagamento
  let conteudo = "";
  if (metodo === "Dinheiro") {
    conteudo = `
      <h3>Pagamento em Dinheiro</h3>
      <br>
      <p>O garçom será notificado para receber o pagamento na mesa.</p>
      <br>
      <button onclick="fecharModalDetalhes()">Fechar</button>
    `;
  } else if (metodo === "Cartão") {
    conteudo = `
      <h3>Pagamento com Cartão</h3>
      <br>
      <p>O garçom será notificado para levar a máquina de cartão à mesa.</p>
      <br>
      <button onclick="fecharModalDetalhes()">Fechar</button>
    `;
  } else if (metodo === "PIX") {
    conteudo = `
      <h3>Pagamento via PIX</h3>
      <br>
      <p>Valor total: R$ ${total.toFixed(2)}</p>
      <br>
      <p>Escaneie o QR Code abaixo para realizar o pagamento:</p>
      <img src="./src/main/resources/imagem/qrcode-pix.jpg" alt="QR Code PIX" style="width: 200px; height: 200px; margin: 10px auto;">
      <br>
      <button onclick="fecharModalDetalhes()">Fechar</button>
    `;
  }

  // Atualiza o conteúdo do modal e exibe
  detalhesContent.innerHTML = conteudo;
  modalDetalhes.style.display = "flex";
}

function fecharModalDetalhes() {
  // Fecha o modal de detalhes de pagamento
  const modalDetalhes = document.getElementById("modal-detalhes-pagamento");
  modalDetalhes.style.display = "none";

  const modalPrincipal = document.getElementById("modal-pagamento");
  modalPrincipal.style.display = "none";

  // Reseta o carrinho
  resetarCarrinho();

  // Atualiza a interface do carrinho
  atualizarCarrinho();
}
