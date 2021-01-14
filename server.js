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
const newsUrl = 'https://newsapi.org/v2/everything?sources=bbc-news&q=covid&apiKey=74ad68a7bbf849108f174e96279aa7af';
var articles = '';
// const newsUrl = 'https://newsapi.org/v2/top-headlines?q=covid&apiKey=74ad68a7bbf849108f174e96279aa7af';

// const dbURL = 'mongodb+srv://covid-data-user:vIxnfEK9WXgiyJw8@node-tut.do54s.mongodb.net/node-tut?retryWrites=true&w=majority';
// mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((result) => console.log('connected to db'))
//   .catch((err) => console.log(err));

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

  //   console.log(covidJson, "hej hopp");
})


function getNews() {
  fetch(newsUrl)
      .then(response => response.json())
      .then(data => {
          // console.log(data);
          // data.map(obj => newsArray.push(obj));
          writeArticles(data);
      })
      .then((result) => {
      }).catch((err) => {
          console.error(err);
      });
  // return newsArray;
}


function writeArticles(articles) {
  // console.log(articles.articles[6].title);
  fs.writeFileSync('./articles.txt', JSON.stringify(articles),() => {
    // console.log('Articles:' +  articles);
    readArticles();
  });

}

function readArticles() {
  fs.readFile('./articles.txt', (err, data) => {
    if (err) {
      console.log(err);
    }
    // console.log(data.toString());
  });
}


getNews();


// module.exports = { newsArray };
// newsCall();

// user: covid-data-user
// mongodb: vIxnfEK9WXgiyJw8
// mongodb+srv://covid-data-user:<password>@node-tut.do54s.mongodb.net/<dbname>?retryWrites=true&w=majority


