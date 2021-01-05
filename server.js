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
const newsUrl = 'https://newsapi.org/v2/top-headlines?language=en&q=covid&sortBy=publishedAt&apiKey=74ad68a7bbf849108f174e96279aa7af';
// const newsUrl = 'https://newsapi.org/v2/top-headlines?q=covid&apiKey=74ad68a7bbf849108f174e96279aa7af';

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

function getNews() {
  fetch(newsUrl)
      .then(data => {return data.json()})
      .then(response => {
          generate_table(response);
      }).catch((err) => {
          console.error(err);
      });           
}

module.exports = { newsArray };
// newsCall();