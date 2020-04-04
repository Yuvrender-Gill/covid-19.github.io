
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

var months = [
        'January',
        'February',
        'March',
        'April'
    ];

    function filterBy(month) {
        var filters = ['==', 'month', month];
        map.setFilter('covid-circles', filters);
        map.setFilter('covid-labels', filters);

        // Set the label to the month
        document.getElementById('month').textContent = months[month];
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
            'country_json'
            //'https://pomber.github.io/covid19/timeseries.json',
            //'https://docs.mapbox.com/mapbox-gl-js/assets/significant-earthquakes-2015.geojson',
            function(err, data) {
                if (err) throw err;

                // Create a month property value based on time
                // used to filter against.
                data.features = data.features.map(function(d) {
                    d.properties.month = new Date(d.properties.time).getMonth();
                    return d;
                });

                map.addSource('covid', {
                    'type': 'json',
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
                            ['get', 'mag'],
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
                            ['to-string', ['get', 'mag']],
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
                        var month = parseInt(e.target.value, 10);
                        filterBy(month);
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
