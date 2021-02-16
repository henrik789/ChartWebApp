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
// const newsUrl = 'https://newsapi.org/v2/everything?sources=bbc-news&domains=nytimes.com&q=covid&apiKey=74ad68a7bbf849108f174e96279aa7af';
var articles = '';
const newsUrl = 'https://newsapi.org/v2/top-headlines?q=covid&language=en&apiKey=74ad68a7bbf849108f174e96279aa7af';

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
  fs.writeFileSync('./articles.txt', JSON.stringify(articles), () => {
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


//''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''



// //DB
// const uri = 'mongodb+srv://henrik:landsort2@cluster0.o93u2.mongodb.net/countriesDB'
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('MongoDB Connected…');
//   })
//   .catch(err => console.log(err))

// //Get the default connection
// var db = mongoose.connection;
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));





// var countriesArray = [];
// var covidGlobal = [];
// var covidArray = [];
// var newsArray = [];


// const url = 'https://disease.sh/v3/covid-19/continents';

// const urlCountries = 'https://restcountries.eu/rest/v2/all';



// function getAPI() {
//   fetch(urlCountries)
//     .then(response => response.json())
//     .then(data => {
//       data.map(obj => covidArray.push(obj));
//       generate_table(data);
//     })
//     .then((result) => {
//     }).catch((err) => {
//       console.error(err);
//     });
//   return countriesArray;
// }


// function generate_table(e) {

//   //Define a schema
//   var Schema = mongoose.Schema;
//   var SomeModelSchema = new Schema({
//     name: String,
//     capital: String,
//     population: Number,
//     region: String,
//     area: Number,
//     flag: String
//   });

//   const CountryModel = mongoose.model('CountryModel', SomeModelSchema);

//   for (var j = 0; j < e.length; j++) {

//     var country = new CountryModel(
//       {
//         name: e[j].name,
//         capital: e[j].capital,
//         population: e[j].population,
//         region: e[j].region,
//         area: e[j].area,
//         flag: e[j].flag
//       });
//     country.save()
//       .then(() => 
//       console.log('hej')
//       ).catch((err) => {
//         console.error(err);
//       });
//   }
//   CountryModel.find(function (err, cou) {
//     if(err) return console.error(err);
//     console.log(cou);
//   })

// };




// getAPI()

