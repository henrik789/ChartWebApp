const fs = require('fs');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var covidArray = [];

function getAPI() {
    const Http = new XMLHttpRequest();
    const url = 'https://corona.lmao.ninja/v2/countries?yesterday&sort';
    Http.open("GET", url);
    Http.send();
    
    Http.onreadystatechange = (err) => {
      console.error(err);
      fs.writeFile('covidApi.json', Http.responseText, function (err) {
        if (err) return console.log(err);
      });
    }
    console.log('file loaded');
}

module.exports = { getAPI };


function sayHello() {
    console.log('Hello, scheduled task running');
}
sayHello();


