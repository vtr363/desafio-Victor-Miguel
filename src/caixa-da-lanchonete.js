class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        // Verifica se o carrinho não está vazio
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Busca os itens no cardápio
        let carrinho = [];
        const nomesDosItensNoCarrinho = itens.map(item => item.split(',')[0]);
        console.log('itens do carrinho: '+nomesDosItensNoCarrinho)

        for (let item of itens){
            
            let [nome, quant] = item.split(',');
            let quantidade = parseInt(quant);

            // verifica se a quantidade do produto é maior que zero
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            // verifica se p produto existe no cardapio
            let itemDoCardapio = cardapio.find(item => item.codigo === nome)
            if (!itemDoCardapio) {
                return "Item inválido!";
            }

            // verifica se existem itens extras sem item principal
            
            console.log(" descricao: "+itemDoCardapio.descricao.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[() ]+/).splice(1))
            if (itemDoCardapio.descricao.includes("extra") && !nomesDosItensNoCarrinho.includes(itemDoCardapio.descricao.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(/[() ]+/)[3])){
                return "Item extra não pode ser pedido sem o principal";
            }

            carrinho.push({
                ...itemDoCardapio,
                quantidade: quantidade
            });
            
        };

        // Verifica se a forma de pagamento é valida
        if (!formasDePagamento.hasOwnProperty(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        // calcula o valor de compra
        let valorDaCompra = carrinho.reduce((soma, item) => soma += (item.valor*item.quantidade), 0)
        valorDaCompra += valorDaCompra*formasDePagamento[metodoDePagamento]

        //console.log(valorDaCompra)
        return `R$ ${valorDaCompra.toFixed(2).replace('.', ',')}`;
    }

    
}

const formasDePagamento = {dinheiro: -0.05, debito: 0, credito: 0.03}

const cardapio = [
    { codigo: 'cafe', descricao: 'Café', valor: 3.0 },
    { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.5 },
    { codigo: 'suco', descricao: 'Suco Natural', valor: 6.2 },
    { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.5 },
    { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.0 },
    { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
    { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.5 },
    { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.5 }
  ];


export { CaixaDaLanchonete };
