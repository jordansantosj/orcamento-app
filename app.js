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

    //verificar se todos os campos estão preenchidos
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

    //método responsável por recuperar registros de despesas e retornar na função "carregaListaDespesas"
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
           //atribuir o id atual a variável i
           despesa.id = i
            //atribuir objetos "despesa" a o array "despesas"
           despesas.push(despesa)
       }
       //retornar valor para a função "carregaListaDespesas"
       return despesas
    }

    //método responsável pela pesquisa de dados em localStorage 
    pesquisar(despesa){
        //variável que recebe o return do método "recuperarTodosRegistros" do objeto "bd"
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        //filtro de registros do array "despesasFiltradas" que recebe todos os registros do localStorage
        //ano
        if(despesa.ano != ''){
            
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }
        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        //valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        //retornar as despesas filtradas a função "pesquisarDespesa"
        return despesasFiltradas
    }

    //método responsável por remover item do localStorage
    remover(id){
        localStorage.removeItem(id)
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
        //limpar formulário de preenchimento após sucesso na gravação
        ano.value = ''
        mes.value = ''
        dia.value = '' 
        tipo.value = '' 
        descricao.value = '' 
        valor.value = '' 
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
function carregaListaDespesas(despesas = Array(), filtro = false){
    //testar se não foi passado nenhum dado para a pesquisa e exibir todos os registros
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }
    //inserir lista de despesas dentro do html
    let listaDespesas = document.getElementById('listaDespesas')
    //limpar conteudo não filtrado do tbody
    listaDespesas.innerHTML = ''
    //percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d){
        //criando linha (tr)
        let linha = listaDespesas.insertRow()
        //criando colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        //ajustar o tipo
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break

        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        //criar botão de exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class = "fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            //recuperar apenas o id do item
            let id = this.id.replace('id_despesa_', '')
            //remover a despesa
            bd.remover(id)
            //atualizar a página
            window.location.reload()
        }
        linha.insertCell(4).append(btn)

        console.log(d)
    })
}

//função responsável por realizar a pesquisa de despesas na página "consulta.html"
function pesquisarDespesa(){
    //valores passados para o objeto "despesa" da função
    let ano = document.getElementById('ano').value     
    let mes = document.getElementById('mes').value       
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value
    //criação de nova despesa que será tomada como base para a pesquisa
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)

}


