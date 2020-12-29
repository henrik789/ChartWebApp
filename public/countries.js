
var countriesArray = [];
var covidGlobal = [];
var covidArray = [];
var newsArray = [];


const url = 'https://disease.sh/v3/covid-19/continents';
const newsUrl = 'https://newsapi.org/v2/top-headlines?language=en&q=covid&sortBy=publishedAt&apiKey=74ad68a7bbf849108f174e96279aa7af';
const urlCountries = 'https://disease.sh/v3/covid-19/countries';



function getAPI() {
    fetch(urlCountries)
        .then(response => response.json())
        .then(data => {
            data.map(obj => covidArray.push(obj));
            generate_table(data);
        })
        .then((result) => {
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
        .then(data => { return data.json() })
        .then(response => {
            generate_table(response);
        }).catch((err) => {
            console.error(err);
        });
}


function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("countries");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function generate_table(e) {
    
    for (var j = 0; j < e.length; j++) {
        var table = document.getElementById('countries').insertRow(-1);
        var percent = (e[j].cases / e[j].population) * 100;
        var countryTitle = table.insertCell(0);
        var capital = table.insertCell(1);
        var casesP = table.insertCell(2);
        var deaths = table.insertCell(3);
        var tests = table.insertCell(4);
        var population = table.insertCell(5);
        countryTitle.innerHTML = (e[j].country);
        if (percent < 100){
            capital.innerHTML = (percent.toFixed(2) + '%');
        } else {
            capital.innerHTML = ('NA');
        }
        casesP.innerHTML = (e[j].cases);
        deaths.innerHTML = (e[j].deaths);
        tests.innerHTML = (e[j].tests);
        population.innerHTML = (e[j].population);
    }

};


function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("countries");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// function generate_table(e) {
//     var content = document.getElementById('container-flex');

//       for (var j = 0; j < e.length; j++) {

//         var card = document.createElement("div");
//         var countryTitle = document.createElement("p");
//         var casesP = document.createElement("p");
//         var img = document.createElement("img");
//         var populationP = document.createElement("p");
//         var countryTitleText = document.createTextNode('Country: ' + e[j].country);
//         var casesPText = document.createTextNode('Number of cases: ' + e[j].cases);
//         var testsP = document.createElement("p");
//         var testsPText = document.createTextNode('Number of tests: ' + e[j].tests);
//         var populationPText = document.createTextNode('Population: ' + e[j].population);
//         img.src = e[j].countryInfo.flag;
//         countryTitle.appendChild(countryTitleText);

//         casesP.appendChild(casesPText);
//         testsP.appendChild(testsPText);
//         populationP.appendChild(populationPText);
//         card.appendChild(img);
//         card.appendChild(countryTitle);
//         card.appendChild(casesP);
//         card.appendChild(testsP);
//         card.appendChild(populationP);

//         card.id = "country-container" + j;
//         card.classList.add("card-country");
//         img.classList.add("flag");
//         content.appendChild(card);
//       }

//   };

getAPI()

