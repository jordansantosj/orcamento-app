//abstração de uma despesa
class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia 
        this.tipo = tipo 
        this.descricao = descricao
        this.valor = valor 
    }
}

//principal função responsavel por cadastrar as despesas
function cadastrarDespesa(){
    //recuperação dos elementos da página de cadastro
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //instância do objeto "despesa"
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value, 
        descricao.value, 
        valor.value
    )

    console.log(despesa)
}