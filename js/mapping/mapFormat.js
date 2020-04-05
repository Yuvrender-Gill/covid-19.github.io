// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

var days = [
        'January 22', 'January 23', 'January 24', 'January 25', 'January 26',
        'January 27', 'January 28', 'January 29', 'January 30', 'January 31',
        'February 1', 'February 2', 'February 3', 'February 4', 'February 5',
        'February 6', 'February 7', 'February 8', 'February 9', 'February 10',
        'February 11','February 12','February 13','February 14','February 15',
        'February 16','February 17','February 18','February 19','February 20',
        'February 21','February 22','February 23','February 24','February 25',
        'February 26','February 27','February 28','February 29',
        'March 1', 'March 2', 'March 3', 'March 4', 'March 5', 'March 6',
        'March 7', 'March 8', 'March 9', 'March 10','March 11','March 12',
        'March 13','March 14','March 15','March 16','March 17','March 18',
        'March 19','March 20','March 21','March 22','March 23','March 24',
        'March 25','March 26','March 27','March 28','March 29','March 30',
        'March 31',
        'April 1', 'April 2', 'April 3', 'April 4', 'April 5', 'April 6',
        'April 7', 'April 8', 'April 9', 'April 10','April 11','April 12',
        'April 13','April 14','April 15','April 16','April 17','April 18',
        'April 19','April 20','April 21','April 22','April 23','April 24',
        'April 25','April 26','April 27','April 28','April 29','April 30'
    ];

    function filterBy(day) {
        var filters = ['==', 'day', day];
        map.setFilter('covid-circles', filters);
        map.setFilter('covid-labels', filters);

        // Set the label to the month
        document.getElementById('day').textContent = days[day];
    }

    map.on('load', function() {
        // Data courtesy of http://earthquake.usgs.gov/
        // Query for significant earthquakes in 2015 URL request looked like this:
        // http://earthquake.usgs.gov/fdsnws/event/1/query
        //    ?format=geojson
        //    &starttime=2015-01-01
        //    &endtime=2015-12-31
        //    &minmagnitude=6'
        //
        // Here we're using d3 to help us make the ajax request but you can use
        // Any request method (library or otherwise) you wish.
        d3.json(
            //'country_json',
            //'https://pomber.github.io/covid19/timeseries.json',
            'https://docs.mapbox.com/mapbox-gl-js/assets/significant-earthquakes-2015.geojson',
            function(err, data) {
                if (err) throw err;

                // Create a month property value based on time
                // used to filter against.
                data.features = data.features.map(function(d) {
                    d.properties.day = new Date(d.properties.time).getDay();
                    return d;
                });

                map.addSource('covid', {
                    'type': 'geojson',
                    data: data
                });

                map.addLayer({
                    'id': 'covid-circles',
                    'type': 'circle',
                    'source': 'covid',
                    'paint': {
                        'circle-color': [
                            'interpolate',
                            ['linear'],
                            ['get', 'mag'],
                            6,
                            '#deebf7',
                            8,
                            '#3182bd'
                        ],
                        'circle-opacity': 0.75,
                        'circle-radius': [
                            'interpolate',
                            ['linear'],
                            ['get', 'mag'], //change mag to # of cases category
                            6,
                            20,
                            8,
                            40
                        ]
                    }
                });

                map.addLayer({
                    'id': 'covid-labels',
                    'type': 'symbol',
                    'source': 'covid',
                    'layout': {
                        'text-field': [
                            'concat',
                            ['to-string', ['get', 'mag']], //change mag to # of cases category
                            'm'
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

                // Set filter to first month of the year
                // 0 = January
                filterBy(0);

                document
                    .getElementById('slider')
                    .addEventListener('input', function(e) {
                        var day = parseInt(e.target.value, 10);
                        filterBy(day);
                    });
            }
        );
    });


var geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [-79.385, 43.655]
      },
      'properties': {
        'title': 'Canada',
        'description': [
            {
              "date": "2020-1-22",
              "confirmed": 0,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-1-23",
              "confirmed": 0,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-1-24",
              "confirmed": 0,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-1-25",
              "confirmed": 0,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-1-26",
              "confirmed": 1,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-1-27",
              "confirmed": 1,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-1-28",
              "confirmed": 2,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-1-29",
              "confirmed": 2,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-1-30",
              "confirmed": 2,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-1-31",
              "confirmed": 4,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-1",
              "confirmed": 4,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-2",
              "confirmed": 4,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-3",
              "confirmed": 4,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-4",
              "confirmed": 4,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-5",
              "confirmed": 5,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-6",
              "confirmed": 5,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-7",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-8",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-9",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-10",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-11",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 0
            },
            {
              "date": "2020-2-12",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 1
            },
            {
              "date": "2020-2-13",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 1
            },
            {
              "date": "2020-2-14",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 1
            },
            {
              "date": "2020-2-15",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 1
            },
            {
              "date": "2020-2-16",
              "confirmed": 7,
              "deaths": 0,
              "recovered": 1
            },
            {
              "date": "2020-2-17",
              "confirmed": 8,
              "deaths": 0,
              "recovered": 1
            },
            {
              "date": "2020-2-18",
              "confirmed": 8,
              "deaths": 0,
              "recovered": 1
            },
            {
              "date": "2020-2-19",
              "confirmed": 8,
              "deaths": 0,
              "recovered": 1
            },
            {
              "date": "2020-2-20",
              "confirmed": 8,
              "deaths": 0,
              "recovered": 1
            },
            {
              "date": "2020-2-21",
              "confirmed": 9,
              "deaths": 0,
              "recovered": 3
            },
            {
              "date": "2020-2-22",
              "confirmed": 9,
              "deaths": 0,
              "recovered": 3
            },
            {
              "date": "2020-2-23",
              "confirmed": 9,
              "deaths": 0,
              "recovered": 3
            },
            {
              "date": "2020-2-24",
              "confirmed": 10,
              "deaths": 0,
              "recovered": 3
            },
            {
              "date": "2020-2-25",
              "confirmed": 11,
              "deaths": 0,
              "recovered": 3
            },
            {
              "date": "2020-2-26",
              "confirmed": 11,
              "deaths": 0,
              "recovered": 3
            },
            {
              "date": "2020-2-27",
              "confirmed": 13,
              "deaths": 0,
              "recovered": 6
            },
            {
              "date": "2020-2-28",
              "confirmed": 14,
              "deaths": 0,
              "recovered": 6
            },
            {
              "date": "2020-2-29",
              "confirmed": 20,
              "deaths": 0,
              "recovered": 6
            },
            {
              "date": "2020-3-1",
              "confirmed": 24,
              "deaths": 0,
              "recovered": 6
            },
            {
              "date": "2020-3-2",
              "confirmed": 27,
              "deaths": 0,
              "recovered": 6
            },
            {
              "date": "2020-3-3",
              "confirmed": 30,
              "deaths": 0,
              "recovered": 6
            },
            {
              "date": "2020-3-4",
              "confirmed": 33,
              "deaths": 0,
              "recovered": 6
            },
            {
              "date": "2020-3-5",
              "confirmed": 37,
              "deaths": 0,
              "recovered": 6
            },
            {
              "date": "2020-3-6",
              "confirmed": 49,
              "deaths": 0,
              "recovered": 6
            },
            {
              "date": "2020-3-7",
              "confirmed": 54,
              "deaths": 0,
              "recovered": 8
            },
            {
              "date": "2020-3-8",
              "confirmed": 64,
              "deaths": 0,
              "recovered": 8
            },
            {
              "date": "2020-3-9",
              "confirmed": 77,
              "deaths": 1,
              "recovered": 8
            },
            {
              "date": "2020-3-10",
              "confirmed": 79,
              "deaths": 1,
              "recovered": 8
            },
            {
              "date": "2020-3-11",
              "confirmed": 108,
              "deaths": 1,
              "recovered": 8
            },
            {
              "date": "2020-3-12",
              "confirmed": 117,
              "deaths": 1,
              "recovered": 8
            },
            {
              "date": "2020-3-13",
              "confirmed": 193,
              "deaths": 1,
              "recovered": 8
            },
            {
              "date": "2020-3-14",
              "confirmed": 198,
              "deaths": 1,
              "recovered": 8
            },
            {
              "date": "2020-3-15",
              "confirmed": 252,
              "deaths": 1,
              "recovered": 8
            },
            {
              "date": "2020-3-16",
              "confirmed": 415,
              "deaths": 4,
              "recovered": 9
            },
            {
              "date": "2020-3-17",
              "confirmed": 478,
              "deaths": 5,
              "recovered": 9
            },
            {
              "date": "2020-3-18",
              "confirmed": 657,
              "deaths": 8,
              "recovered": 9
            },
            {
              "date": "2020-3-19",
              "confirmed": 800,
              "deaths": 9,
              "recovered": 9
            },
            {
              "date": "2020-3-20",
              "confirmed": 943,
              "deaths": 12,
              "recovered": 9
            }
          ]
      }
    }
  ]
}

/*Possible multidate formats
{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "id": "Canada1",
    "geometry": {
            "type": "Point", "coordinates": [-116.5765, 53.9333]
        },
    "properties":
    {
      "date": "2020-3-17",
      "confirmed": 478,
      "deaths": 5,
      "recovered": 9
    },
    {
    "type": "Feature",
    "id": "Canada2",
    "geometry": {
            "type": "Point", "coordinates": [-116.5765, 53.9334]
        },
    "properties":
    {
      "date": "2020-3-18",
      "confirmed": 657,
      "deaths": 8,
      "recovered": 9
    },
    {
    "type": "Feature",
    "id": "Canada3",
    "geometry": {
            "type": "Point", "coordinates": [-116.5765, 53.9335]
        },
    "properties":
    {
      "date": "2020-3-19",
      "confirmed": 800,
      "deaths": 9,
      "recovered": 9
    },
    {
    "type": "Feature",
    "id": "Canada4",
    "geometry": {
            "type": "Point", "coordinates": [-116.5765, 53.9336]
        },
    "properties":
    {
      "date": "2020-3-20",
      "confirmed": 943,
      "deaths": 12,
      "recovered": 9
    },
  ]
}*/
