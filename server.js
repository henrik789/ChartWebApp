const express = require('express')
const request = require("request");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('74ad68a7bbf849108f174e96279aa7af');
const bodyParser = require("body-parser");
// const covidJson = require('covidApi.json'); 
const https = require("https");
const { dirname } = require('path');
const app = express();
const port = 3000
var newsArray = [];


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get('/countries', (req, res) => {
  res.sendFile(__dirname + "contries.html")
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

  //   var output = call.getAPI();
  //   console.log(covidJson, "hej hopp");
})

// newsapi key: 74ad68a7bbf849108f174e96279aa7af  
function newsCall() {
  newsapi.v2.topHeadlines({
    // sources: 'bbc-news',
    q: 'covid',
    // category: 'business',
    language: 'en',
    // country: ''
  }).then(response => {
    newsArray = response;
    // console.log(response);
  }).catch((err) => {
    console.error(err);
  });
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
  // });s
}

module.exports = { newsArray };
// newsCall();