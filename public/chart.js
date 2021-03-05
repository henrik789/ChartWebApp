
var countriesArray = [];
var continentsArray = [];
var newsArray = [];
var ctx = document.getElementById('bar-chart').getContext('2d');
var bgColors = ['rgb(183,28,28, 0.7)', 'rgb(26,35,126, 0.7)', 'rgb(0,77,64, 0.7)', 'rgb(245,127,23, 0.7)', 'rgb(1,87,155, 0.7)', 'rgb(136,14,79, 0.7)'];
const url = 'https://disease.sh/v3/covid-19/continents';
const urlCountries = 'https://disease.sh/v3/covid-19/countries';


function getAPI() {
    fetch('/api')
        .then(response => response.json())
        .then(data => {
            data.articles.map(obj => newsArray.push(obj));
            getCovidAPI();
            drawContent2();
        })
        .catch((err) => {
            console.error(err);
        });
    return newsArray;
}

function getCovidAPI() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.map(obj => continentsArray.push(obj));
        })
        .then((result) => {
            result = continentsArray;
            drawChart(result);
        }).catch((err) => {
            console.error(err);
        });
    return continentsArray;
}

function getCountries() {
    fetch(urlCountries)
        .then(response => response.json())
        .then(data => {
            data.map(obj => countriesArray.push(obj));
        })
        .then((result) => {
            result = countriesArray;
            drawHeadline();
        }).catch((err) => {
            console.error(err);
        });
    return countriesArray;
}

function drawChart(result) {
    var chartColor = "#000000";

    Chart.defaults.global.defaultFontColor = chartColor;
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [result[0].continent, result[1].continent, result[2].continent, result[3].continent, result[4].continent, result[5].continent],
            datasets: [{
                label: 'Cases of Covid',
                data: [result[0].cases, result[1].cases, result[2].cases, result[3].cases, result[4].cases, result[5].cases],
                backgroundColor: bgColors,
                borderColor: bgColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cases of Covid-19 by Continent'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    drawChart2(result);
}


function drawChart2(result) {
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
            labels: ["North America",  "Asia", "South America", "Europe",  "Africa", "Australia/Oceania"],
            datasets: [
                {
                    label: "Population (millions)",
                    backgroundColor: bgColors,
                    data: [result[0].testsPerOneMillion, result[1].testsPerOneMillion, result[2].testsPerOneMillion, result[3].testsPerOneMillion, result[4].testsPerOneMillion, result[5].testsPerOneMillion]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Covid-19 tests per one million'
            }
        }
    });
    getCountries()
}

function drawContent2(result) {
    
    document.getElementById('title-1').textContent =  newsArray[1].title;
    document.getElementById('paragraph-1').textContent = newsArray[1].description;
    
    document.getElementById('link-1').href = newsArray[1].url;
    document.getElementById('img-1').src = newsArray[1].urlToImage || 'https://source.unsplash.com/800x800/?covid" alt="Covid news image"';
    drawContent3();
    
}
function drawContent3() {
    document.getElementById('title-2').textContent =  newsArray[2].title;
    document.getElementById('paragraph-2').textContent = newsArray[2].description;
    
    document.getElementById('link-2').href = newsArray[2].url;
    document.getElementById('img-2').src = newsArray[2].urlToImage || 'https://source.unsplash.com/800x800/?covid" alt="Covid news image"';
    drawContent4();
}
function drawContent4() {
    document.getElementById('title-3').textContent =  newsArray[3].title;
    document.getElementById('paragraph-3').textContent = newsArray[3].description;
    
    document.getElementById('link-3').href = newsArray[3].url;
    document.getElementById('img-3').src = newsArray[3].urlToImage || 'https://source.unsplash.com/800x800/?covid" alt="Covid news image"';
}

function drawHeadline() {
    options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: false,
      };
      var date = new Date(continentsArray[1].updated);
    var totalPopulation = 0;
    var totalCases = 0;
    for(i = 0; i < countriesArray.length; i++) {
        totalPopulation += countriesArray[i].population; 
        
    }

    for(i = 0; i < countriesArray.length; i++) {
        totalCases += countriesArray[i].cases;
    
    }
    var updated = new Intl.DateTimeFormat('en-US', options).format(date)
    document.getElementById('headline').textContent = 'Currently, the number of people infected with Covid-19 worldwide is ' + toCommas(totalCases) + '. The worst affected country is USA, which has ' + toCommas(countriesArray[208].cases) + ' cases.' + ' Last updated: ' + updated;
    console.log(toCommas(totalPopulation), totalCases);
    showSlides();
}

  // Using Regular expression
  function toCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


function generate_table(e) {
    var content = document.getElementById('content');

      for (var j = 0; j < 5; j++) {
        var row = document.createElement("div");
        var resp = " ";
        resp = e.articles[j].title;
        var cell = document.createElement("p");
        var para = document.createElement("p");
        var img = document.createElement("img");
        var cellText = document.createTextNode(resp);
        var paraText = document.createTextNode(e.articles[j].description);
        img.src = e.articles[j].urlToImage;
        var btnLink = document.createElement("a");
        btnLink.href = e.articles[j].url;
        btnLink.textContent = "Full story";

        row.appendChild(img);
        cell.appendChild(cellText);
        row.appendChild(cell);
        para.appendChild(paraText);
        row.appendChild(para);
        btnLink.classList.add("card-btn");
        row.appendChild(btnLink);
        
        cell.classList.add("title");
        row.id = "article" + j;
        row.classList.add("card");
        content.appendChild(row);
      }
    console.log(e + 'hejsan');
  };

function showSlides() {
    var container =  document.getElementById("scroll-container");
    for (i = 0; i < 6; i++) {
        var cell = document.createElement("div");
        var header = document.createElement("p");
        var paragraph = document.createElement("p");

        var headerText = document.createTextNode(continentsArray[i].continent);
        var paraText = document.createTextNode('Population: ' + toCommas(continentsArray[i].population) + '\n Recovered: ' + toCommas(continentsArray[i].recovered) + '\n Deaths: ' + toCommas(continentsArray[i].deaths) + '\n Tests per one million: ' +toCommas(continentsArray[i].testsPerOneMillion));

        cell.classList.add("card", "scroll-item", "white-text");
        header.appendChild(headerText);
        header.id = "paragraphHead";
        paragraph.appendChild(paraText);

        cell.appendChild(header);
        cell.appendChild(paragraph);

        cell.style.backgroundColor = bgColors[i];
        container.appendChild(cell);
    }
    console.log("colors", continentsArray[2].cases);
}

getAPI()
