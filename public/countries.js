
var countriesArray = [];
var covidGlobal = [];
var covidArray = [];
var newsArray = [];

const url = 'https://disease.sh/v3/covid-19/continents';
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
        if (percent < 100) {
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

getAPI()

