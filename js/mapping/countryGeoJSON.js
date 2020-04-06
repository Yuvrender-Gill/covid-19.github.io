// Get the live data from John Hopkins University's Github account on COVID-19 cases

Url_confirmed = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv'
Url_deaths = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv'
Url_recovered = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv'

/* The function converts a given CSV file to json format.
 * @csv : A string in csv format.about-author
 * @result: A json object created from the csv file. 
 */
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

/* Fetches the data from a given url. Converts the fetched csv
 * data to a json object and then pushes each object within the 
 * JSON object to an array and returns the array.
 * 
 * @Url: String url of destination to get data from
 * @arr: Array of objects converted to JSON from CSV
*/
function fetchData(Url)
{ 
    var arr = []
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", Url, false ); // false for synchronous request
    xmlHttp.send( null );
    for (var item in csvJSON(xmlHttp.responseText)){
        arr.push(csvJSON(xmlHttp.responseText)[item]);
    }
    return arr;
}

/* Create three time series arrays for number of confirmed cases,
 * number of deaths and number of recovered cases.
 */
var confirmedTseries = fetchData(Url_confirmed);
var deathTseries = fetchData(Url_deaths);
var recoveredTseries = fetchData(Url_recovered);

// GeoJSON object for representation of all the time series data 
// in geoJSON format.
countryGeoJSON = {
	"type" : "FeatureCollection",
	"name" : "JSONFeature",
    "features" : []
}

// Represents the data in the geoJSON format.
for (var entry in confirmedTseries){
   
    for (var entryItem in confirmedTseries[entry]){
        feature = {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [parseFloat(confirmedTseries[entry]["Long"]), parseFloat(confirmedTseries[entry]["Lat"])]
            },
            "properties": {
              "country": confirmedTseries[entry]["Country/Region"],
              "province": confirmedTseries[entry]["Province/State"]
            }
          };
        if ((entryItem !== "Province/State")
        && (entryItem !== "Country/Region")
        && (entryItem !== "Lat")
        && (entryItem !== "Long")) {
            feature["properties"]["date"] = entryItem;
            feature["properties"]["confirmed"] = parseFloat(confirmedTseries[entry][entryItem]);
            feature["properties"]["deaths"] = parseFloat(deathTseries[entry][entryItem]);
            if (recoveredTseries[entry] === undefined){
                feature["properties"]["recovered"] = 0;
            } else {
                if (feature["properties"]["recovered"] === undefined || (feature["properties"]["recovered"]).isNAN() ){
                    if (feature["properties"]["country"] === recoveredTseries[entry]["Country/Region"] ){
                        feature["properties"]["recovered"] = parseFloat(recoveredTseries[entry][entryItem]);
                    } else {
                        feature["properties"]["recovered"] = 0;
                    }
                    
                }else {
                    feature["properties"]["recovered"] = 0;
                }
            }
            feature["properties"]["active"] = feature["properties"]["confirmed"] - feature["properties"]["deaths"] 
                                                - feature["properties"]["recovered"];
        };
        
        countryGeoJSON["features"].push(feature);
    };
    
};
console.log(countryGeoJSON)
// EOF










  