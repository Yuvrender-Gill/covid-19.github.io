
function getAggrData(Url)
{ 
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", Url, false ); // false for synchronous request
    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
    
    return JSON.parse(xmlHttp.responseText);
}
var covid_total_current = getAggrData('https://raw.githubusercontent.com/amcharts/covid-charts/master/data/json/total.json');

var topDiv = document.getElementById("total-stats");

var row = document.createElement("div");
row.className = "row";
var div1 = document.createElement("div"); div1.className = "col-sm text-center";
var div2 = document.createElement("div"); div2.className = "col-sm text-center";
var div3 = document.createElement("div"); div3.className = "col-sm text-center";
var div4 = document.createElement("div"); div4.className = "col-sm text-center";
div1.innerHTML = '<h6 style = "color: #f7f7f7">Confirmed' + "</h6>  <h7 style = 'color: #0275d8'>" + covid_total_current["confirmed"] + "</h7>"; 
row.appendChild(div1);
div2.innerHTML = '<h6 style = "color: #d9534f">Deaths'  + "</h6>  <h7 style = 'color: #0275d8'>" +  covid_total_current["deaths"] + "</h7>"; 
row.appendChild(div2);
div3.innerHTML = '<h6 style = "color: #5cb85c">Recovered' + "</h6>  <h7 style = 'color: #0275d8'>" + covid_total_current["recovered"] + "</h7>"; 
row.appendChild(div3);
div4.innerHTML = '<h6 style = "color: #f0ad4e">Active'  + "</h6>  <h7 style = 'color: #0275d8'>" + (covid_total_current["confirmed"] 
- covid_total_current["deaths"] - covid_total_current["recovered"]) + "</h7>"; 
row.appendChild(div4);
topDiv.appendChild(row);
