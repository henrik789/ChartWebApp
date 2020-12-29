
var countriesArray = [];
var europeArray, asiaArray, naArray, saArray, africaArray, aoArray = [];
var asiaCases, europeCases, naCases, saCases, africaCases, aoCases = 0;
var covidGlobal = [];
var covidArray = [];
var newsArray = [];

var backgroundColor = ['rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)'];
var borderColor = ['rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)'
];
const url = 'https://disease.sh/v3/covid-19/continents';
const newsUrl = 'http://newsapi.org/v2/top-headlines?language=en&q=covid&sortBy=publishedAt&apiKey=74ad68a7bbf849108f174e96279aa7af';
const urlCountries = 'https://disease.sh/v3/covid-19/countries';

var ctx = document.getElementById('bar-chart').getContext('2d');




function getAPI() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.map(obj => covidArray.push(obj));
            // console.log(covidArray, covidArray[45].continent);
        })
        .then((result) => {
            result = covidArray;
            drawChart(result);
        }).catch((err) => {
            console.error(err);
        });
    return countriesArray;
}

function getCountries() {
    fetch(urlCountries)
        .then(response => response.json())
        .then(data => {
            data.map(obj => countriesArray.push(obj));
        })
        .then((result) => {
            result = countriesArray;
            console.log(result[89].country);
        }).catch((err) => {
            console.error(err);
        });
    return covidArray;
}

function getNews() {
    fetch(newsUrl)
        .then(data => {return data.json()})
        .then(response => {
            generate_table(response);
        }).catch((err) => {
            console.error(err);
        });           
}

function sortAPI(result) {
    console.log(result);
    for (var i in result) {
        if (result[i].continent === 'North America') {
            naArray.push(result[i]);
        } else if (result[i].continent === 'Asia') {
            asiaArray.push(result[i]);
        } else if (result[i].continent === 'Europe') {
            europeArray.push(result[i]);
        } else if (result[i].continent === 'South America') {
            saArray.push(result[i]);
        } else if (result[i].continent === 'Africa') {
            africaArray.push(result[i]);
        } else if (result[i].continent === 'Australia/Oceania') {
            aoArray.push(result[i]);
        } else {
            return
        }
    }
    for (var i in europeArray) {
        europeCases += europeArray[i].cases;
        console.log(europeArray[i].country, europeCases);
    }
    covidGlobal.push()
    drawChart(naArray, asiaArray, europeArray, saArray, africaArray, aoArray);
    console.log(newsArray);
}



function drawChart(result) {
    var chartColor = "#000000";
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        chartColor = "#FFFFFF"
    }
    // console.log('calling');
    Chart.defaults.global.defaultFontColor = chartColor;
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [result[0].continent, result[1].continent, result[2].continent, result[3].continent, result[4].continent, result[5].continent],
            datasets: [{
                label: 'Cases of Covid',
                data: [result[0].cases, result[1].cases, result[2].cases, result[3].cases, result[4].cases, result[5].cases],
                backgroundColor: ["#F44336", "#2196F3", "#9C27B0", "#FFEB3B", "#E91E63", "#009688"],
                borderColor: ["#F44336", "#2196F3", "#9C27B0", "#FFEB3B", "#E91E63", "#009688"],
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
    console.log(result[2].country, "hejsan");
    drawChart2(result);
    getNews();
}


function drawChart2(result) {
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
            labels: ["North America",  "Asia", "South America", "Europe",  "Africa", "Australia/Oceania"],
            datasets: [
                {
                    label: "Population (millions)",
                    backgroundColor: ["#F44336", "#2196F3", "#9C27B0", "#FFEB3B", "#E91E63", "#009688"],
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

// function drawContent2(result) {
//     document.getElementById('content-2-h4').textContent = 'Country: ' + result[43].country;
//     document.getElementById('cases-content-2').textContent = 'Cases: ' + result[43].cases;
//     document.getElementById('tests-continent-2').textContent = 'Tests: ' + result[43].tests;
//     document.getElementById('population-continent-2').textContent = 'Population: ' + result[43].population;
//     document.getElementById('deaths-continent-2').textContent = 'Deaths: ' + result[43].deaths;
//     document.getElementById('content-2-img').src = 'https://disease.sh/assets/img/flags/co.png';
    
//     console.log(result[43].country, result[43].flag);
// }
// function drawContent3() {
    
// }
// function drawContent4() {
    
// }

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
    console.log(e);
  };

getAPI()

