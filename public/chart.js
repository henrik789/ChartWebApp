var countriesArray = [];
var covidArray = [];
var flagName;
var points = 0;
const randomNumbers = [];
var playerScore = document.getElementById('score-player');
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var btn4 = document.getElementById('btn4');
var land = document.getElementById('countryName');
var ctx = document.getElementById('myChart').getContext('2d');

function getAPI() {
    const url = 'https://corona.lmao.ninja/v2/countries?yesterday&sort';

    let p = document.querySelector('p');
    fetch(url)
        .then(blob => blob.json())
        .then(data => {
            data.map(obj => covidArray.push(obj) );
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

async function drawChart(result) {
    console.log('calling');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [result[65].country, result[75].country, result[85].country, result[58].country, result[59].country, result[60].country],
            datasets: [{
                label: 'Cases of Covid',
                data: [result[65].cases, result[75].cases, result[85].cases, result[58].cases, result[59].cases, result[60].cases],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
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
}

// drawChart();

getAPI()
