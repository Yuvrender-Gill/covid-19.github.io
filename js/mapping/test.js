Url_confirmed = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
Url_deaths = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
Url_recovered = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'


function csvJSON(csv){

    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(",");

    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split(",");
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result
};

function fetchData(theUrl)
{ 
    var arr = []
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    for (var item in csvJSON(xmlHttp.responseText)){
        arr.push(csvJSON(xmlHttp.responseText)[item]);
    }
    return arr;
}

var confirmedTseries = fetchData(Url_confirmed);
var deathTseries = fetchData(Url_deaths);
var recoveredTseries = fetchData(Url_recovered);

countryGeoJSON = {
	"type" : "FeatureCollection",
	"name" : "JSONFeature",
    "features" : []
}

for (var entry in confirmedTseries){
    // console.log(confirmedTseries[entry]);
    feature = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [parseFloat(confirmedTseries[entry]["Lat"]), parseFloat(confirmedTseries[entry]["Long"])]
        },
        "properties": {
          "country": confirmedTseries[entry]["Country/Region"],
          "province": confirmedTseries[entry]["Province/State"],
          "covidCases": {}
        }
      };
    
    for (var entryItem in confirmedTseries[entry]){
        if ((entryItem !== "Province/State")
        && (entryItem !== "Country/Region")
        && (entryItem !== "Lat")
        && (entryItem !== "Long")) {
            feature["properties"]["covidCases"][entryItem] = [parseFloat(confirmedTseries[entry][entryItem])];
        };
    };
    countryGeoJSON["features"].push(feature);
}

for (var rawEntry in deathTseries){
  
    for (var jsonEntry in countryGeoJSON["features"]){
       
        if ((deathTseries[rawEntry]["Province/State"] === countryGeoJSON["features"][jsonEntry]["properties"]["province"])
        && (deathTseries[rawEntry]["Country/Region"] === countryGeoJSON["features"][jsonEntry]["properties"]["country"])) {
            
            for (var jsonDate in countryGeoJSON["features"][jsonEntry]["properties"]["covidCases"]){
                
                for (var rawDate in deathTseries[rawEntry]){
                    
                    if (jsonDate == rawDate){
                      
                        countryGeoJSON["features"][jsonEntry]["properties"]["covidCases"][jsonDate].push(parseFloat(deathTseries[rawEntry][rawDate]));
                    }
                }
            };
        };
    }
}

for (var rawEntry in recoveredTseries){
  
    for (var jsonEntry in countryGeoJSON["features"]){
       
        if ((recoveredTseries[rawEntry]["Province/State"] === countryGeoJSON["features"][jsonEntry]["properties"]["province"])
        && (recoveredTseries[rawEntry]["Country/Region"] === countryGeoJSON["features"][jsonEntry]["properties"]["country"])) {
            
            for (var jsonDate in countryGeoJSON["features"][jsonEntry]["properties"]["covidCases"]){
                
                for (var rawDate in recoveredTseries[rawEntry]){
                    
                    if (jsonDate == rawDate){
                      
                        countryGeoJSON["features"][jsonEntry]["properties"]["covidCases"][jsonDate].push(parseFloat(recoveredTseries[rawEntry][rawDate]));
                        var confirmed = countryGeoJSON["features"][jsonEntry]["properties"]["covidCases"][jsonDate][0];
                        var deaths = countryGeoJSON["features"][jsonEntry]["properties"]["covidCases"][jsonDate][1];
                        var recovered = countryGeoJSON["features"][jsonEntry]["properties"]["covidCases"][jsonDate][2];
                        
                        var active = confirmed - deaths - recovered;
                        countryGeoJSON["features"][jsonEntry]["properties"]["covidCases"][jsonDate].push(active);
                    }
                }
            };
        };
    }
}

console.log(JSON.stringify(countryGeoJSON));












  