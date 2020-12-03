const express = require('express')
const request = require("request");
const bodyParser = require("body-parser");
// const covidJson = require('covidApi.json'); 
const https = require("https");
const app = express();
const port = 3000
// const call = require("./refreshAPI");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)

//   var output = call.getAPI();
//   console.log(covidJson, "hej hopp");
})

