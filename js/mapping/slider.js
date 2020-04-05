
// Get all the dates

var workingDates = [];

for (var entry in confirmedTseries){
    for (var date in confirmedTseries[entry]){
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
}



function filterBy(date) {
    
    var filters = ['==', 'date', workingDates[date][0]];
    map.setFilter('coronaCases-circles', filters);
    map.setFilter('coronaCases-labels', filters);
    
    // Set the label to the month

    document.getElementById('month').textContent = workingDates[date][1];
}

map.on('load', function() {
    map.addSource('coronaCases', {
        'type': 'geojson',
        data: countryGeoJSON
    });
         
    map.addLayer({
        'id': 'coronaCases-circles',
        'type': 'circle',
        'source': 'coronaCases',
        'paint': {
            'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'confirmed'],
                6,
                '#FCA107',
                8,
                '#7F3121'
            ],
            'circle-opacity': 0.75,
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'confirmed'],
                6,
                20,
                8,
                40
            ]

        }
    });

    map.addLayer({
        'id': 'coronaCases-labels',
        'type': 'symbol',
        'source': 'coronaCases',
        'layout': {
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

    // filterBy(0);
 
    document
    .getElementById('slider')
    .addEventListener('input', function(e) {
        var sliderDate = parseInt(e.target.value, 10);
        filterBy(sliderDate);
    });
   
});