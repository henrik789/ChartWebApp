const express = require('express')
const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const fs = require('fs');
const https = require("https");
const fetch = require('node-fetch');
const { dirname } = require('path');
const app = express();
const port = 3000
var newsArray = [];
var articles = '';
const newsUrl = 'https://newsapi.org/v2/top-headlines?q=covid&language=en&apiKey=74ad68a7bbf849108f174e96279aa7af';



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.get('/countries', (req, res) => {
  res.sendFile(__dirname + "contries.html")
})

app.get('/about', (req, res) => {
  res.sendFile(__dirname + "about.html")
})


app.get('/api', (req, res) => {
  res.sendFile(__dirname + "/articles.txt")
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

})


function getNews() {
  fetch(newsUrl)
    .then(response => response.json())
    .then(data => {
      writeArticles(data);
    })
    .then((result) => {
    }).catch((err) => {
      console.error(err);
    });

}


function writeArticles(articles) {
  fs.writeFileSync('./articles.txt', JSON.stringify(articles), () => {
    readArticles();
  });

}

function readArticles() {
  fs.readFile('./articles.txt', (err, data) => {
    if (err) {
      console.log(err);
    }
  });
}


getNews();
