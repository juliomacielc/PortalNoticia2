
function exibeNoticias () {
    let tela = document.getElementById('top-news'); 
    let texto= '';
    let resposta = JSON.parse(this.responseText);

    for (i=0; i<dados.articles.lenght; i++){
        let artigo = dados.articles[i];
        let data= new Date(artigo.publishedAt);
        texto = texto + `
        <div class="row box-news">
            <div class="col-12 col-lg-4">
                <img src="${artigo.urlToImage}"alt="">
            </div>
            <div class="col-12 col-lg-8">
                <h4>${artigo.title}</h4>
                <h5>${data.toLocaleString ()} - Fonte: ${noticia.source.name}</h5>
                <p>${noticia.content}<a href="${noticia.url}">Leia Mais...</a>
                </p>
            </div>
         </div>
        
        `;
    };
    tela.innerHTML = texto;
}


    let xhr = new XMLHttpRequest ();;
    xhr.open ('GET', `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4d06854944e94e18997725ab852d67d7`);
    xhr.send ();
    xhr.onload = exibeNoticias;

