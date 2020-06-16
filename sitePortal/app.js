var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=4d06854944e94e18997725ab852d67d7';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log(response.json());
    })