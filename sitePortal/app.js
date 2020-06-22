var id = '';
var firstGlobo=true;
var firstr7=true;
var firstUol=true;
var firsttec = true;
function exibeNoticias() {
    let divTela = document.getElementById(id);
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


window.onload = () =>{
    let xhr = new XMLHttpRequest();
    xhr.onload = exibeNoticias;
    xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=br&apiKey=4d06854944e94e18997725ab852d67d7`);
    xhr.send();
    id = 'tela';
}

 
function globo() {
    if (firstGlobo) {
        let xhr = new XMLHttpRequest();
        id = 'telaGlobo';
        xhr.onload = exibeNoticias;
        xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=globo&apiKey=4d06854944e94e18997725ab852d67d7`);
        xhr.send();
        firstGlobo = false;
    }
}
function uol() {
    if (firstUol) {
        let xhr = new XMLHttpRequest();
        id = 'telaUol';
        xhr.onload = exibeNoticias;
        xhr.open('GET', `https://newsapi.org/v2/everything?domains=uol.com.br&apiKey=4d06854944e94e18997725ab852d67d7`);
        xhr.send();
        firstUol = false;
    }
}
function r7() {
    if (firstr7) {
        let xhr = new XMLHttpRequest();
        id = 'telaR7';
        xhr.onload = exibeNoticias;
        xhr.open('GET', `https://newsapi.org/v2/everything?domains=r7.com&apiKey=4d06854944e94e18997725ab852d67d7`);
        xhr.send();
        firstr7 = false;
    }
}
function tecmundo() {
    if (firsttec) {
        let xhr = new XMLHttpRequest();
        id = 'telaTec';
        xhr.onload = exibeNoticias;
        xhr.open('GET', `https://newsapi.org/v2/everything?domains=tecmundo.com.br&apiKey=4d06854944e94e18997725ab852d67d7`);
        xhr.send();
        firsttec = false;
    }
}




document.getElementById('v-pills-profile-tab').addEventListener('click', globo);
document.getElementById('v-pills-messages-tab').addEventListener('click', uol);
document.getElementById('v-pills-settings-tab').addEventListener('click', r7);
document.getElementById('v-pills-settings-tec').addEventListener('click', tecmundo);


const API_KEY = '4d06854944e94e18997725ab852d67d7';

busca.onsubmit = (evento) =>{
   console.log ({pesquisa : txtPesquisa.value})
   window.sessionStorage.setItem('txtPesquisa', txtPesquisa.value)
}