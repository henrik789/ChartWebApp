var countriesArray = [];
var europeArray, asiaArray, naArray, saArray, africaArray, aoArray = [];
var asiaCases, europeCases, naCases, saCases, africaCases, aoCases = 0;
var covidGlobal = [];
var covidArray = [];
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

// var flagName;
// var points = 0;
// const randomNumbers = [];
// var playerScore = document.getElementById('score-player');
// var btn1 = document.getElementById('btn1');
// var btn2 = document.getElementById('btn2');
// var btn3 = document.getElementById('btn3');
// var btn4 = document.getElementById('btn4');
// var land = document.getElementById('countryName');
var ctx = document.getElementById('bar-chart').getContext('2d');




function getAPI() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.map(obj => covidArray.push(obj));
            // console.log(covidArray[45].country, covidArray[45].continent);
        })
        .then((result) => {
            result = covidArray;
            drawChart(result);
        }).catch((err) => {
            console.error(err);
        });
    return covidArray;
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
}



function drawChart(result) {
    // console.log('calling');

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
            // maintainAspectRatio: false,
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
}

// function drawChart2() {
//     var myDoughnutChart = new Chart(ctx2, {
//         type: 'doughnut',
//         data: [2, 3, 5, 1, 4],
//         options: options
//     });
// }
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
}


getAPI()
