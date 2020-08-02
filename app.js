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

//abstração de um banco de dados para lidar com o localStorage da aplicação
class Bd{
    constructor(){
        //criação de um id retornando o índice "0"
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }
    //método responsável pela criação de itens dinâmicos
    getProximoId(){
      //recuperando o id atual
      let proximoId = localStorage.getItem('id')
      //retornando o proximoId ao método gravarDespesa
      return parseInt(proximoId) + 1
    }

    //método responsável pela gravação no localStorage
    gravarDespesa(d){
        let id = this.getProximoId() //valor do return do método getProximoId 
        localStorage.setItem(id, JSON.stringify(d)) //inclusão do registro da despesa
        localStorage.setItem('id', id) //alteração no valor da chave id
    }
}
//instância do objeto bd
let bd = new Bd()

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
    
    //chamada do método de bd gravarDespesa passando o objeto "despesa" como parametro
    bd.gravarDespesa(despesa)
}


