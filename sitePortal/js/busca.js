onload = () => {
    executaPesquisa();
}
var dbsalvar = JSON.parse(localStorage.getItem('dbPesquisa'));
var url = window.location.search.replace("?", "");
var valorPesquisaArray = url.split("=");
var valorPesquisa = valorPesquisaArray[1]
if (!valorPesquisa) {
    valorPesquisa = ""
}
var valorSemMais = valorPesquisa.split("+");
var valorFinal = "";
for (i = 0; i < valorSemMais.length; i++) {
    if (i == 0) {
        valorFinal = valorSemMais[i];
    }
    else {
        valorFinal += " " + valorSemMais[i];
    }
}
console.log(valorFinal);
txtPesquisa.value = valorFinal;

listaPesquisaSalva = () => {
    let texto = '';
    let divTela = document.getElementById('listaPesquisa');
    if (!dbsalvar) {
        dbsalvar = {

            "data": [{

            }]
        }
        texto = ` <div class="row itensSalvos">
        <div class="col-12">
            <a class="nav-link" href="#">Não há pesquisas salvas</a>
        </div>
    </div>`;
    }
    else {
        for (i = 1; i < dbsalvar.data.length; i++) {
            let dados = dbsalvar.data[i];
            texto = texto + `   
        <div class="row itensSalvos">
        <div class="col-12"> 
            <a class="nav-link" href="?txtPesquisa=${dados.texto}">${dados.nome}</a>
        </div>
       
    </div>     
        `;
        };
        divTela.innerHTML = texto;
    }

}
var query = '';


function exibeNoticias() {
    let divTela = document.getElementById('tela');
    let titulo = document.getElementById('titulo');
    let texto = '';
    titulo.innerHTML = query;

    // Montar texto HTML das noticias
    let dados = JSON.parse(this.responseText);
    for (i = 0; i < dados.articles.length; i++) {
        let noticia = dados.articles[i];
        let data = new Date(noticia.publishedAt);

        texto = texto + `       
            <div class="row box-news">
                 <div class="col-12 col-lg-4">
                     <img src="${noticia.urlToImage}"
                    alt="">
            </div>
            <div class="col-12 col-lg-8">
                <h4>${noticia.title}</h4>
                <h5>${data.toLocaleDateString()} - Fonte: ${noticia.source.name}</h5>
                <p>${noticia.content} <a href="${noticia.url}" target="_blanc">Leia Mais...</a>
                </p>
            </div>  
            </div> 
        `;
    };

    // Preencher a DIV com o texto HTML
    divTela.innerHTML = texto;
}


function executaPesquisa() {
    query = document.getElementById('txtPesquisa').value;
    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', `https://newsapi.org/v2/everything?q=${query}&apiKey=4d06854944e94e18997725ab852d67d7`);
    xhr.send();
}

busca.onsubmit = (evento) => {
    executaPesquisa()

}

salvaB = () => {
    salvaPesquisa.value = txtPesquisa.value;
}

btnSalvar.onclick = () => {
    let campoNome = salvaNome.value;
    let campoValor = salvaPesquisa.value;
    let pesquisaSalva = {
        "nome": campoNome,
        "texto": campoValor
    };
    dbsalvar.data.push(pesquisaSalva);
    localStorage.setItem('dbPesquisa', JSON.stringify(dbsalvar))
    listaPesquisaSalva();
}

apagar.onclick = () => {
    localStorage.removeItem('dbPesquisa');
    let divTela = document.getElementById('listaPesquisa');
    let texto = ` <div class="row itensSalvos">
    <div class="col-12">
        <a class="nav-link" href="#">Não há pesquisas salvas</a>
    </div>
</div>`;
    divTela.innerHTML=texto
    document.location.reload(true);
    alert('Lista apagada com sucesso');
}

listaPesquisaSalva();
document.getElementById('salvaB').addEventListener('click', salvaB);