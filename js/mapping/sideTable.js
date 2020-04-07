
/*
 * Get today's date and modify the format to dd/mm/yyyy.
*/
function dateToday(){
    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1); //January is 0!
    var yyyy = today.getFullYear();
    today =  (mm + '/' + dd + '/' + yyyy);
    today = today.substring(0, today.length - 2);
    return today
}

/*
 * Get today's date and modify the format to dd/mm/yyyy.
*/
function dateYesterday(){
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var dd = String(yesterday.getDate());
    var mm = String(yesterday.getMonth() + 1); //January is 0!
    var yyyy = yesterday.getFullYear();
    yesterday =  (mm + '/' + dd + '/' + yyyy);
    yesterday = yesterday.substring(0, yesterday.length - 2);
    return yesterday
}

function populateTable(jsonObject, tbody){
    if (jsonObject['country'] !== undefined) {
        
        var trow = document.createElement('tr'); // Row 
        // Row elements
        var country = document.createElement('td');
        country.scope = "row";
        country.align="left";
        country.innerHTML = "<span id='table-entry-" + jsonObject['country'] +
                             "' style='color: black;cursor:pointer;' onclick=flyFunction(this.id)> <b>"+ jsonObject['country'].replace(/"/i, '') + "<b> </span>";
        var confirmedTd = document.createElement('td');
        confirmedTd.innerHTML =  jsonObject['confirmed'];
        var deathsTd = document.createElement('td')
        deathsTd.innerHTML =  jsonObject['deaths'] ;
        var recoveredTd = document.createElement('td')
        recoveredTd.innerHTML =  jsonObject['recovered'] ;
        // Append each row element to row
        trow.appendChild(country);
        trow.appendChild(confirmedTd);
        trow.appendChild(deathsTd);
        trow.appendChild(recoveredTd);

        tbody.appendChild(trow); // Append each row to the table
        
    }
}


/**
 * Reads the GeoJSON file provided and creates a table to show the confirmed
 * recovered and deaths by COVID-19.
 * @param {GeoJSON File} geoJSONFile : GeoJSON file of all the country data.
 */
function makeTable(geoJSONFile){
    var today = dateToday(); // Get today's date
    var yesterday = dateYesterday(); // Get today's date
  
    var table = document.getElementsByClassName("country-list")[0];
    var tbody = document.createElement('tbody'); // Body element
    var byCountry = {}
    var today_flag = 0
    for (var entry in geoJSONFile['features']){
        if (geoJSONFile['features'][entry]['properties']['date'] === today){
            today_flag = 1;
            break;
        }
    }
    for (var entry in geoJSONFile['features']){
        var object = geoJSONFile['features'][entry]['properties']['country'];
        
        if (geoJSONFile['features'][entry]['properties']['date'] === today){
            if (object in byCountry){
                byCountry[object]['confirmed'] = byCountry[object]['confirmed'] 
                                                + geoJSONFile['features'][entry]['properties']['confirmed'];
                byCountry[object]['deaths'] = byCountry[object]['deaths'] 
                                                + geoJSONFile['features'][entry]['properties']['deaths'];
                byCountry[object]['recovered'] = byCountry[object]['recovered'] 
                                                + geoJSONFile['features'][entry]['properties']['recovered'];
            } else {
                byCountry[object] = {
                    "country": geoJSONFile['features'][entry]['properties']['country'],
                    "confirmed": geoJSONFile['features'][entry]['properties']['confirmed'],
                    "deaths": geoJSONFile['features'][entry]['properties']['deaths'] ,
                    "recovered":geoJSONFile['features'][entry]['properties']['recovered'],
                }
            }
        } else if (geoJSONFile['features'][entry]['properties']['date'] === yesterday && today_flag === 0) {
            if (object in byCountry){
                byCountry[object]['confirmed'] = byCountry[object]['confirmed'] 
                                                + geoJSONFile['features'][entry]['properties']['confirmed'];
                byCountry[object]['deaths'] = byCountry[object]['deaths'] 
                                                + geoJSONFile['features'][entry]['properties']['deaths'];
                byCountry[object]['recovered'] = byCountry[object]['recovered'] 
                                                + geoJSONFile['features'][entry]['properties']['recovered'];
            } else {
                byCountry[object] = {
                    "country": geoJSONFile['features'][entry]['properties']['country'],
                    "confirmed": geoJSONFile['features'][entry]['properties']['confirmed'],
                    "deaths": geoJSONFile['features'][entry]['properties']['deaths'] ,
                    "recovered":geoJSONFile['features'][entry]['properties']['recovered'],
                }
            }
            
        }
    }
    
    for (var entry in byCountry){
        populateTable(byCountry[entry], tbody)

    }
    table.appendChild(tbody); // Append table body to the html table element
}



// Call the make table function
makeTable(countryGeoJSON);

