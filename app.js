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

    validarDados(){
        for(let i in this){
            if (this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
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

    //método responsável por recuperar registros de despesas e retornar na página "consulta.html"
    recuperarTodosRegistros(){
        //Array de despesas
        let despesas = Array()
        //recuperar todas as despesas cadastradas em localStorage
       let id = localStorage.getItem('id')
       for(let i = 1; i <= id; i++){
           //recuperar a despesa 
           let despesa = JSON.parse(localStorage.getItem(i))
           //pular indices que foram removidos
           if(despesa === null){
               continue
           }
            //atribuir objetos "despesa" a o array "despesas"
           despesas.push(despesa)
       }
       //retornar valor para a função "carregaListaDespesas"
       return despesas
    }
}
//instância do objeto bd no escopo global
let bd = new Bd()

//função responsavel por cadastrar as despesas
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
    
    if(despesa.validarDados()){
        //chamada do método de bd gravarDespesa passando o objeto "despesa" como parametro
        bd.gravarDespesa(despesa)
        //formatação do modal de sucesso
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso.'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success' 
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso.'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
        //dialog de sucesso
        $('#modalRegistraDespesa').modal('show')
    }else{
        //formatação do modal de erro
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro.'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger' 
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente.'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        //dialor de erro
        $('#modalRegistraDespesa').modal('show')
    }
   
}

//função responsável por mostrar a lista de despesas já cadastradas
function carregaListaDespesas(){
    //variável que recebe o return do método "recuperarTodosRegistros" do objeto "bd"
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    console.log(despesas)
}


