onload = () =>{

    txtPesquisa.value = localStorage.getItem('txtPesquisa');
    executaPesquisa();
}

function exibeNoticias() {
    let divTela = document.getElementById('tela');

    let texto = '';

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


function executaPesquisa () {
    let query = document.getElementById('txtPesquisa').value;
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibeNoticias;
    xhr.open ('GET', `https://newsapi.org/v2/everything?q=${query}&apiKey=4d06854944e94e18997725ab852d67d7`);
    xhr.send ();
}

busca.onsubmit = (evento) =>{
    console.log ({pesquisa : txtPesquisa.value})
    window.localStorage.setItem('txtPesquisa', txtPesquisa.value)
    executaPesquisa()
 }