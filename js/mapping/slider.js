
// Get all the dates
var workingDates = [];


for (var date in confirmedTseries[0]){
    if ((date !== "Province/State")
    && (date!== "Country/Region")
    && (date !== "Lat")
    && (date !== "Long")){
        var month = new Date(date).toLocaleString('default', { month: 'long' });
        var day = new Date(date).getDate()
        var year =  new Date(date).getFullYear();

        workingDates.push( [date, month+ " " + day + ", " +year] );
    }
}
document.getElementById("slider").max = workingDates.length
document.getElementById("latest-update").innerHTML = "Last Updated: " + workingDates[workingDates.length - 1][1]

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
function filterBy(date) {

    var filters = ['==', 'date', workingDates[date][0]];
    map.setFilter('Confirmed', filters);
    map.setFilter('C-Count', filters);
    map.setFilter('Deaths', filters);
    map.setFilter('D-Count', filters);
    map.setFilter('Recovered', filters);
    map.setFilter('R-Count', filters);
    map.setFilter('Active', filters);
    map.setFilter('A-Count', filters);
    // Set the label to the month

    document.getElementById('month').textContent = workingDates[date][1];
}
function loadLayers(){
    map.on('load', function() {
        map.addSource('coronaCases', {
            'type': 'geojson',
            data: countryGeoJSON
        });

        map.addLayer({
            'id': 'Confirmed',
            'type': 'circle',
            'source': 'coronaCases',
            'layout':{
                    'visibility': 'visible'
                },
            'paint': {
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'confirmed'],
                    10,
                    '#eff3ff',
                    100,
                    '#bdd7e7',
                    1000,
                    '#6baed6',
                    10000,
                    '#3182bd',
                    100000,
                    '#08519c'
                ],
                'circle-opacity': 0.75,
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'confirmed'],
                    10,
                    7.5,
                    100,
                    17.5,
                    1000,
                    27.5,
                    10000,
                    37.5,
                    100000,
                    47.5
                ]

            }
        });

        map.addLayer({
            'id': 'C-Count',
            'type': 'symbol',
            'source': 'coronaCases',
            'layout': {
                'visibility': 'visible',
            'text-field': [
            'concat',
            ['to-string', ['get', 'confirmed']]
            ],
            'text-font': [
            'Open Sans Bold',
            'Arial Unicode MS Bold'
            ],
            'text-size': 12
            },
            'paint': {
            'text-color': 'rgba(0,0,0,0.5)'
            }
        });

        map.addLayer({
            'id': 'Recovered',
            'type': 'circle',
            'source': 'coronaCases',
            'layout':{
                    'visibility': 'none'
                },
            'paint': {
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'recovered'],
                    10,
                    '#edf8e9',
                    100,
                    '#bae4b3',
                    1000,
                    '#74c476',
                    10000,
                    '#31a354',
                    100000,
                    '#006d2c'
                ],
                'circle-opacity': 0.75,
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'recovered'],
                    10,
                    7.5,
                    100,
                    17.5,
                    1000,
                    27.5,
                    10000,
                    37.5,
                    100000,
                    47.5
                ]

            }
        });

        map.addLayer({
            'id': 'R-Count',
            'type': 'symbol',
            'source': 'coronaCases',
            'layout': {
                'visibility': 'none',
            'text-field': [
            'concat',
            ['to-string', ['get', 'recovered']]
            ],
            'text-font': [
            'Open Sans Bold',
            'Arial Unicode MS Bold'
            ],
            'text-size': 12
            },
            'paint': {
            'text-color': 'rgba(0,0,0,0.5)'
            }
        });

        map.addLayer({
            'id': 'Deaths',
            'type': 'circle',
            'source': 'coronaCases',
            'layout':{
                    'visibility': 'none'
                },
            'paint': {
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'deaths'],
                    10,
                    '#fee5d9',
                    100,
                    '#fcae91',
                    1000,
                    '#fb6a4a',
                    10000,
                    '#de2d26',
                    100000,
                    '#a50f15'
                ],
                'circle-opacity': 0.75,
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'deaths'],
                    10,
                    7.5,
                    100,
                    17.5,
                    1000,
                    27.5,
                    10000,
                    37.5,
                    100000,
                    47.5
                ]

            }
        });

        map.addLayer({
            'id': 'D-Count',
            'type': 'symbol',
            'source': 'coronaCases',
            'layout': {
            'visibility': 'none',
            'text-field': [
            'concat',
            ['to-string', ['get', 'deaths']]
            ],
            'text-font': [
            'Open Sans Bold',
            'Arial Unicode MS Bold'
            ],
            'text-size': 12
            },
            'paint': {
            'text-color': 'rgba(0,0,0,0.5)'
            }
        });

        map.addLayer({
            'id': 'Active',
            'type': 'circle',
            'source': 'coronaCases',
            'layout':{
                    'visibility': 'none'
                },
            'paint': {
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'active'],
                    10,
                    '#feedde',
                    100,
                    '#fdbe85',
                    1000,
                    '#fd8d3c',
                    10000,
                    '#e6550d',
                    100000,
                    '#a63603'
                ],
                'circle-opacity': 0.75,
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'active'],
                    10,
                    7.5,
                    100,
                    17.5,
                    1000,
                    27.5,
                    10000,
                    37.5,
                    100000,
                    47.5
                ]

            }
        });

        map.addLayer({
            'id': 'A-Count',
            'type': 'symbol',
            'source': 'coronaCases',
            'layout': {
            'visibility': 'none',
            'text-field': [
            'concat',
            ['to-string', ['get', 'active']]
            ],
            'text-font': [
            'Open Sans Bold',
            'Arial Unicode MS Bold'
            ],
            'text-size': 12
            },
            'paint': {
            'text-color': 'rgba(0,0,0,0.5)'
            }
        });

        filterBy(0);
        document
        .getElementById('slider')
        .addEventListener('input', function(e) {
            var sliderDate = parseInt(e.target.value, 10);
            filterBy(sliderDate);
        });

    });

};
loadLayers();
//Order: Confirmed, Recovered, Active, Deaths

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
var toggleableLayerIds = ['Confirmed', 'Recovered', 'Active', 'Deaths'];
var allLayers = ['Confirmed', 'Recovered', 'Deaths', 'Active', "C-Count", "D-Count", "R-Count", "A-Count"];
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;
    if (id === 'Confirmed')
    link.style = 'color: #08519c'
    else if (id === 'Recovered')
    link.style = 'color: #006d2c'
    else if (id === 'Deaths')
    link.style = 'color: #a50f15'
    else if (id === 'Active')
    link.style = 'color: #e6550d'

    link.onclick = function(e) {
      if (this.textContent === 'Confirmed'){
        var clickedLayer1 = 'Confirmed'
        var clickedLayer2 = 'C-Count'
      }
      else if (this.textContent === 'Recovered'){
        var clickedLayer1 = 'Recovered'
        var clickedLayer2 = 'R-Count'
      }
      else if (this.textContent === 'Deaths'){
        var clickedLayer1 = 'Deaths'
        var clickedLayer2 = 'D-Count'
      }
      else if (this.textContent === 'Active'){
        var clickedLayer1 = 'Active'
        var clickedLayer2 = 'A-Count'
      }
        e.preventDefault();
        e.stopPropagation();

        var visibility1 = map.getLayoutProperty(clickedLayer1, 'visibility');

        if (visibility1 === 'visible') {
            map.setLayoutProperty(clickedLayer1, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer1, 'visibility', 'visible');
        }

        var visibility2 = map.getLayoutProperty(clickedLayer2, 'visibility');

        if (visibility2 === 'visible') {
            map.setLayoutProperty(clickedLayer2, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer2, 'visibility', 'visible');
            // When click one layer turn all other layers to invisible

        }

    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

///////////////////////////////////////////////////////////////////////////
// Zoom effect
map.on('click','Confirmed', function(e){
    map.flyTo({ center: e.features[0].geometry.coordinates, zoom:4.5, speed: 0.5});
});

// Zoom effect
map.on('click','Recovered', function(e){
    map.flyTo({ center: e.features[0].geometry.coordinates, zoom:4.5, speed: 0.5});
});

// Zoom effect
map.on('click','Deaths', function(e){
    map.flyTo({ center: e.features[0].geometry.coordinates, zoom:4.5, speed: 0.5});
});

// Zoom effect
map.on('click','Active', function(e){
    map.flyTo({ center: e.features[0].geometry.coordinates, zoom:4.5, speed: 0.5});
});
////////////////////////////////////////////////////////////////////////////

var popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false
});


// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'Confirmed', function() {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Confirmed', function() {
    map.getCanvas().style.cursor = '';
});

// // NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on('click','Confirmed', function(e){
popup.remove(); //If a popup already exists, get rid of it!

//get the rendered features that belong to confired layer
var features = map.queryRenderedFeatures(e.point, {
    "layers": ["Confirmed"]}
);
//if there is a feature there, do the following
if (features.length > 0){
    console.log(features[0]); //print out the first element of the features array that was selected
    var feature = features[0]; //store the first element as 'feature'
    popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
    //add stuff to the pop up:
    var active = feature.properties.confirmed - feature.properties.deaths - feature.properties.recovered;
    if (feature.properties.province ==="") {
        popup.setHTML(
            "<b>Country: </b>" + feature.properties.country + "<hr>" +
            "<b>Confirmed: </b>" + feature.properties.confirmed +"<br>" +
            "<b>Deaths: </b>" + feature.properties.deaths + "<br>" +
            "<b>Recovered: </b>" + feature.properties.recovered + "<br>" +
            "<b>Active: </b>" + active);

    } else {
        popup.setHTML(
            "<b>Country: </b>" + feature.properties.country + "<br>" +
            "<b>Province: </b>" + feature.properties.province + "<hr>" +
            "<b>Confirmed: </b>" + feature.properties.confirmed +"<br>" +
            "<b>Deaths: </b>" + feature.properties.deaths + "<br>" +
            "<b>Recovered: </b>" + feature.properties.recovered + "<br>" +
            "<b>Active: </b>" + active
        );
    }
    popup.addTo(map); //finally add the pop up to the map
}


});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'Deaths', function() {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Deaths', function() {
    map.getCanvas().style.cursor = '';
});

// // NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on('click','Deaths', function(e){
    popup.remove(); //If a popup already exists, get rid of it!

    //get the rendered features that belong to confired layer
    var features = map.queryRenderedFeatures(e.point, {
        "layers": ["Deaths"]}
    );
    //if there is a feature there, do the following
    if (features.length > 0){
        console.log(features[0]); //print out the first element of the features array that was selected
        var feature = features[0]; //store the first element as 'feature'
        popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
        //add stuff to the pop up:
        var active = feature.properties.confirmed - feature.properties.deaths - feature.properties.recovered;
        if (feature.properties.province ==="") {
            popup.setHTML(
                "<b>Country: </b>" + feature.properties.country + "<hr>" +
                "<b>Confirmed: </b>" + feature.properties.confirmed +"<br>" +
                "<b>Deaths: </b>" + feature.properties.deaths + "<br>" +
                "<b>Recovered: </b>" + feature.properties.recovered + "<br>" +
                "<b>Active: </b>" + active);

        } else {
            popup.setHTML(
                "<b>Country: </b>" + feature.properties.country + "<br>" +
                "<b>Province: </b>" + feature.properties.province + "<hr>" +
                "<b>Confirmed: </b>" + feature.properties.confirmed +"<br>" +
                "<b>Deaths: </b>" + feature.properties.deaths + "<br>" +
                "<b>Recovered: </b>" + feature.properties.recovered + "<br>" +
                "<b>Active: </b>" + active
            );
        }
        popup.addTo(map); //finally add the pop up to the map
    }


    });


// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'Recovered', function() {
    map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'Recovered', function() {
    map.getCanvas().style.cursor = '';
});

// // NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on('click','Recovered', function(e){
    popup.remove(); //If a popup already exists, get rid of it!

    //get the rendered features that belong to confired layer
    var features = map.queryRenderedFeatures(e.point, {
        "layers": ["Recovered"]}
    );
    //if there is a feature there, do the following
    if (features.length > 0){
        console.log(features[0]); //print out the first element of the features array that was selected
        var feature = features[0]; //store the first element as 'feature'
        popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
        //add stuff to the pop up:
        var active = feature.properties.confirmed - feature.properties.deaths - feature.properties.recovered;
        if (feature.properties.province ==="") {
            popup.setHTML(
                "<b>Country: </b>" + feature.properties.country + "<hr>" +
                "<b>Confirmed: </b>" + feature.properties.confirmed +"<br>" +
                "<b>Deaths: </b>" + feature.properties.deaths + "<br>" +
                "<b>Recovered: </b>" + feature.properties.recovered + "<br>" +
                "<b>Active: </b>" + active);

        } else {
            popup.setHTML(
                "<b>Country: </b>" + feature.properties.country + "<br>" +
                "<b>Province: </b>" + feature.properties.province + "<hr>" +
                "<b>Confirmed: </b>" + feature.properties.confirmed +"<br>" +
                "<b>Deaths: </b>" + feature.properties.deaths + "<br>" +
                "<b>Recovered: </b>" + feature.properties.recovered + "<br>" +
                "<b>Active: </b>" + active);
        }
        popup.addTo(map); //finally add the pop up to the map
    }


    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'Active', function() {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'Active', function() {
        map.getCanvas().style.cursor = '';
    });

    // // NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
    map.on('click','Active', function(e){
        popup.remove(); //If a popup already exists, get rid of it!

        //get the rendered features that belong to confired layer
        var features = map.queryRenderedFeatures(e.point, {
            "layers": ["Active"]}
        );
        //if there is a feature there, do the following
        if (features.length > 0){
            console.log(features[0]); //print out the first element of the features array that was selected
            var feature = features[0]; //store the first element as 'feature'
            popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
            //add stuff to the pop up:
            var active = feature.properties.confirmed - feature.properties.deaths - feature.properties.recovered;
            if (feature.properties.province ==="") {
                popup.setHTML(
                    "<b>Country: </b>" + feature.properties.country + "<hr>" +
                    "<b>Confirmed: </b>" + feature.properties.confirmed +"<br>" +
                    "<b>Deaths: </b>" + feature.properties.deaths + "<br>" +
                    "<b>Recovered: </b>" + feature.properties.recovered + "<br>" +
                    "<b>Active: </b>" + active);

            } else {
                popup.setHTML(
                    "<b>Country: </b>" + feature.properties.country + "<br>" +
                    "<b>Province: </b>" + feature.properties.province + "<hr>" +
                    "<b>Confirmed: </b>" + feature.properties.confirmed +"<br>" +
                    "<b>Deaths: </b>" + feature.properties.deaths + "<br>" +
                    "<b>Recovered: </b>" + feature.properties.recovered + "<br>" +
                    "<b>Active: </b>" + active);
            }
            popup.addTo(map); //finally add the pop up to the map
        }


        });
