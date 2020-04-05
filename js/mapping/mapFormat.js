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

/*First failed geojson Attempt
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
}*/

//READ BELOW
//Possible multidate formats - all fully functional geojsons

//#1: multiple points 10 meters apart per co-ordinate, each point is one day
//Problem: all days appear at the same time in the layer
//Problem: need to manually change thousands of coordinates and ids
//Problem: Would not work in real-time

var geojson1 = {
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
    }
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
    }
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
    }
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
    }
    }
  ]
}

//#2 1 geojson for each day, all countries in each geojson
//Problem: We would need to make 100 layers
//Problem: Slider code would need elif statements and possibly loops to operate
//Problem: Would not work in real-time


var geojson317 = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "id": "Afghanistan",
    "geometry": {
            "type": "Point", "coordinates": [-65.0, 33.0]
        },
    "properties":
    {
      "date": "2020-3-17",
      "confirmed": 22,
      "deaths": 0,
      "recovered": 1
    }
    },

    {
      "type": "Feature",
      "id": "Albania",
      "geometry": {
              "type": "Point", "coordinates": [-20.1683, 41.1533]
          },
      "properties":
      {
        "date": "2020-3-17",
        "confirmed": 55,
        "deaths": 1,
        "recovered": 0
      }
    }
  ]
}

var geojson318 = {
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "id": "Afghanistan",
    "geometry": {
            "type": "Point", "coordinates": [-65.0, 33.0]
        },
    "properties":
    {
      "date": "2020-3-18",
      "confirmed": 22,
      "deaths": 0,
      "recovered": 1
    }
    },

    {
      "type": "Feature",
      "id": "Albania",
      "geometry": {
              "type": "Point", "coordinates": [-20.1683, 41.1533]
          },
      "properties":
      {
        "date": "2020-3-18",
        "confirmed": 59,
        "deaths": 2,
        "recovered": 0
      }
    }
  ]
}

/*Unminified country_json.js

    "Afghanistan": {
        "lat": 33.0, "long": 65.0
    }
    ,
    "Albania": {
        "lat": 41.1533, "long": 20.1683
    }
    ,
    "Algeria": {
        "lat": 28.0339, "long": 1.6596
    }
    ,
    "Andorra": {
        "lat": 42.5063, "long": 1.5218
    }
    ,
    "Angola": {
        "lat": -11.2027, "long": 17.8739
    }
    ,
    "Antigua and Barbuda": {
        "lat": 17.0608, "long": -61.7964
    }
    ,
    "Argentina": {
        "lat": -38.4161, "long": -63.6167
    }
    ,
    "Armenia": {
        "lat": 40.0691, "long": 45.0382
    }
    ,
    "Australia": {
        "lat": -35.4735, "long": 149.0124
    }
    ,
    "Austria": {
        "lat": 47.5162, "long": 14.5501
    }
    ,
    "Azerbaijan": {
        "lat": 40.1431, "long": 47.5769
    }
    ,
    "Bahamas": {
        "lat": 25.0343, "long": -77.3963
    }
    ,
    "Bahrain": {
        "lat": 26.0275, "long": 50.55
    }
    ,
    "Bangladesh": {
        "lat": 23.685, "long": 90.3563
    }
    ,
    "Barbados": {
        "lat": 13.1939, "long": -59.5432
    }
    ,
    "Belarus": {
        "lat": 53.7098, "long": 27.9534
    }
    ,
    "Belgium": {
        "lat": 50.8333, "long": 4.0
    }
    ,
    "Benin": {
        "lat": 9.3077, "long": 2.3158
    }
    ,
    "Bhutan": {
        "lat": 27.5142, "long": 90.4336
    }
    ,
    "Bolivia": {
        "lat": -16.2902, "long": -63.5887
    }
    ,
    "Bosnia and Herzegovina": {
        "lat": 43.9159, "long": 17.6791
    }
    ,
    "Brazil": {
        "lat": -14.235, "long": -51.9253
    }
    ,
    "Brunei": {
        "lat": 4.5353, "long": 114.7277
    }
    ,
    "Bulgaria": {
        "lat": 42.7339, "long": 25.4858
    }
    ,
    "Burkina Faso": {
        "lat": 12.2383, "long": -1.5616
    }
    ,
    "Cabo Verde": {
        "lat": 16.5388, "long": -23.0418
    }
    ,
    "Cambodia": {
        "lat": 11.55, "long": 104.9167
    }
    ,
    "Cameroon": {
        "lat": 3.848, "long": 11.5021
    }
    ,
    "Canada": {
        "lat": 53.9333, "long": -116.5765
    }
    ,
    "Central African Republic": {
        "lat": 6.6111, "long": 20.9394
    }
    ,
    "Chad": {
        "lat": 15.4542, "long": 18.7322
    }
    ,
    "Chile": {
        "lat": -35.6751, "long": -71.543
    }
    ,
    "China": {
        "lat": 31.8257, "long": 117.2264
    }
    ,
    "Colombia": {
        "lat": 4.5709, "long": -74.2973
    }
    ,
    "Congo (Brazzaville)": {
        "lat": -4.0383, "long": 21.7587
    }
    ,
    "Congo (Kinshasa)": {
        "lat": -4.0383, "long": 21.7587
    }
    ,
    "Costa Rica": {
        "lat": 9.7489, "long": -83.7534
    }
    ,
    "Cote d'Ivoire": {
        "lat": 7.54, "long": -5.5471
    }
    ,
    "Croatia": {
        "lat": 45.1, "long": 15.2
    }
    ,
    "Diamond Princess": {
        "lat": 0.0, "long": 0.0
    }
    ,
    "Cuba": {
        "lat": 22.0, "long": -80.0
    }
    ,
    "Cyprus": {
        "lat": 35.1264, "long": 33.4299
    }
    ,
    "Czechia": {
        "lat": 49.8175, "long": 15.473
    }
    ,
    "Denmark": {
        "lat": 61.8926, "long": -6.9118
    }
    ,
    "Djibouti": {
        "lat": 11.8251, "long": 42.5903
    }
    ,
    "Dominican Republic": {
        "lat": 18.7357, "long": -70.1627
    }
    ,
    "Ecuador": {
        "lat": -1.8312, "long": -78.1834
    }
    ,
    "Egypt": {
        "lat": 26.0, "long": 30.0
    }
    ,
    "El Salvador": {
        "lat": 13.7942, "long": -88.8965
    }
    ,
    "Equatorial Guinea": {
        "lat": 1.5, "long": 10.0
    }
    ,
    "Eritrea": {
        "lat": 15.1794, "long": 39.7823
    }
    ,
    "Estonia": {
        "lat": 58.5953, "long": 25.0136
    }
    ,
    "Eswatini": {
        "lat": -26.5225, "long": 31.4659
    }
    ,
    "Ethiopia": {
        "lat": 9.145, "long": 40.4897
    }
    ,
    "Fiji": {
        "lat": -17.7134, "long": 178.065
    }
    ,
    "Finland": {
        "lat": 64.0, "long": 26.0
    }
    ,
    "France": {
        "lat": 3.9339, "long": -53.1258
    }
    ,
    "Gabon": {
        "lat": -0.8037, "long": 11.6094
    }
    ,
    "Gambia": {
        "lat": 13.4432, "long": -15.3101
    }
    ,
    "Georgia": {
        "lat": 42.3154, "long": 43.3569
    }
    ,
    "Germany": {
        "lat": 51.0, "long": 9.0
    }
    ,
    "Ghana": {
        "lat": 7.9465, "long": -1.0232
    }
    ,
    "Greece": {
        "lat": 39.0742, "long": 21.8243
    }
    ,
    "Guatemala": {
        "lat": 15.7835, "long": -90.2308
    }
    ,
    "Guinea": {
        "lat": 9.9456, "long": -9.6966
    }
    ,
    "Guyana": {
        "lat": 5.0, "long": -58.75
    }
    ,
    "Haiti": {
        "lat": 18.9712, "long": -72.2852
    }
    ,
    "Holy See": {
        "lat": 41.9029, "long": 12.4534
    }
    ,
    "Honduras": {
        "lat": 15.2, "long": -86.2419
    }
    ,
    "Hungary": {
        "lat": 47.1625, "long": 19.5033
    }
    ,
    "Iceland": {
        "lat": 64.9631, "long": -19.0208
    }
    ,
    "India": {
        "lat": 21.0, "long": 78.0
    }
    ,
    "Indonesia": {
        "lat": -0.7893, "long": 113.9213
    }
    ,
    "Iran": {
        "lat": 32.0, "long": 53.0
    }
    ,
    "Iraq": {
        "lat": 33.0, "long": 44.0
    }
    ,
    "Ireland": {
        "lat": 53.1424, "long": -7.6921
    }
    ,
    "Israel": {
        "lat": 31.0, "long": 35.0
    }
    ,
    "Italy": {
        "lat": 43.0, "long": 12.0
    }
    ,
    "Jamaica": {
        "lat": 18.1096, "long": -77.2975
    }
    ,
    "Japan": {
        "lat": 36.0, "long": 138.0
    }
    ,
    "Jordan": {
        "lat": 31.24, "long": 36.51
    }
    ,
    "Kazakhstan": {
        "lat": 48.0196, "long": 66.9237
    }
    ,
    "Kenya": {
        "lat": -0.0236, "long": 37.9062
    }
    ,
    "Korea, South": {
        "lat": 36.0, "long": 128.0
    }
    ,
    "Kuwait": {
        "lat": 29.5, "long": 47.75
    }
    ,
    "Kyrgyzstan": {
        "lat": 41.2044, "long": 74.7661
    }
    ,
    "Latvia": {
        "lat": 56.8796, "long": 24.6032
    }
    ,
    "Lebanon": {
        "lat": 33.8547, "long": 35.8623
    }
    ,
    "Liberia": {
        "lat": 6.4281, "long": -9.4295
    }
    ,
    "Liechtenstein": {
        "lat": 47.14, "long": 9.55
    }
    ,
    "Lithuania": {
        "lat": 55.1694, "long": 23.8813
    }
    ,
    "Luxembourg": {
        "lat": 49.8153, "long": 6.1296
    }
    ,
    "Madagascar": {
        "lat": -18.7669, "long": 46.8691
    }
    ,
    "Malaysia": {
        "lat": 2.5, "long": 112.5
    }
    ,
    "Maldives": {
        "lat": 3.2028, "long": 73.2207
    }
    ,
    "Malta": {
        "lat": 35.9375, "long": 14.3754
    }
    ,
    "Mauritania": {
        "lat": 21.0079, "long": 10.9408
    }
    ,
    "Mauritius": {
        "lat": -20.2, "long": 57.5
    }
    ,
    "Mexico": {
        "lat": 23.6345, "long": -102.5528
    }
    ,
    "Moldova": {
        "lat": 47.4116, "long": 28.3699
    }
    ,
    "Monaco": {
        "lat": 43.7333, "long": 7.4167
    }
    ,
    "Mongolia": {
        "lat": 46.8625, "long": 103.8467
    }
    ,
    "Montenegro": {
        "lat": 42.5, "long": 19.3
    }
    ,
    "Morocco": {
        "lat": 31.7917, "long": -7.0926
    }
    ,
    "Namibia": {
        "lat": -22.9576, "long": 18.4904
    }
    ,
    "Nepal": {
        "lat": 28.1667, "long": 84.25
    }
    ,
    "Netherlands": {
        "lat": 12.5186, "long": -70.0358
    }
    ,
    "New Zealand": {
        "lat": -40.9006, "long": 174.886
    }
    ,
    "Nicaragua": {
        "lat": 12.8654, "long": -85.2072
    }
    ,
    "Niger": {
        "lat": 17.6078, "long": 8.0817
    }
    ,
    "Nigeria": {
        "lat": 9.082, "long": 8.6753
    }
    ,
    "North Macedonia": {
        "lat": 41.6086, "long": 21.7453
    }
    ,
    "Norway": {
        "lat": 60.472, "long": 8.4689
    }
    ,
    "Oman": {
        "lat": 21.0, "long": 57.0
    }
    ,
    "Pakistan": {
        "lat": 30.3753, "long": 69.3451
    }
    ,
    "Panama": {
        "lat": 8.538, "long": -80.7821
    }
    ,
    "Papua New Guinea": {
        "lat": -6.315, "long": 143.9555
    }
    ,
    "Paraguay": {
        "lat": -23.4425, "long": -58.4438
    }
    ,
    "Peru": {
        "lat": -9.19, "long": -75.0152
    }
    ,
    "Philippines": {
        "lat": 13.0, "long": 122.0
    }
    ,
    "Poland": {
        "lat": 51.9194, "long": 19.1451
    }
    ,
    "Portugal": {
        "lat": 39.3999, "long": -8.2245
    }
    ,
    "Qatar": {
        "lat": 25.3548, "long": 51.1839
    }
    ,
    "Romania": {
        "lat": 45.9432, "long": 24.9668
    }
    ,
    "Russia": {
        "lat": 60.0, "long": 90.0
    }
    ,
    "Rwanda": {
        "lat": -1.9403, "long": 29.8739
    }
    ,
    "Saint Lucia": {
        "lat": 13.9094, "long": -60.9789
    }
    ,
    "Saint Vincent and the Grenadines": {
        "lat": 12.9843, "long": -61.2872
    }
    ,
    "San Marino": {
        "lat": 43.9424, "long": 12.4578
    }
    ,
    "Saudi Arabia": {
        "lat": 24.0, "long": 45.0
    }
    ,
    "Senegal": {
        "lat": 14.4974, "long": -14.4524
    }
    ,
    "Serbia": {
        "lat": 44.0165, "long": 21.0059
    }
    ,
    "Seychelles": {
        "lat": -4.6796, "long": 55.492
    }
    ,
    "Singapore": {
        "lat": 1.2833, "long": 103.8333
    }
    ,
    "Slovakia": {
        "lat": 48.669, "long": 19.699
    }
    ,
    "Slovenia": {
        "lat": 46.1512, "long": 14.9955
    }
    ,
    "Somalia": {
        "lat": 5.1521, "long": 46.1996
    }
    ,
    "South Africa": {
        "lat": -30.5595, "long": 22.9375
    }
    ,
    "Spain": {
        "lat": 40.0, "long": -4.0
    }
    ,
    "Sri Lanka": {
        "lat": 7.0, "long": 81.0
    }
    ,
    "Sudan": {
        "lat": 12.8628, "long": 30.2176
    }
    ,
    "Suriname": {
        "lat": 3.9193, "long": -56.0278
    }
    ,
    "Sweden": {
        "lat": 63.0, "long": 16.0
    }
    ,
    "Switzerland": {
        "lat": 46.8182, "long": 8.2275
    }
    ,
    "Taiwan*": {
        "lat": 23.7, "long": 121.0
    }
    ,
    "Tanzania": {
        "lat": -6.369, "long": 34.8888
    }
    ,
    "Thailand": {
        "lat": 15.0, "long": 101.0
    }
    ,
    "Togo": {
        "lat": 8.6195, "long": 0.8248
    }
    ,
    "Trinidad and Tobago": {
        "lat": 10.6918, "long": -61.2225
    }
    ,
    "Tunisia": {
        "lat": 34.0, "long": 9.0
    }
    ,
    "Turkey": {
        "lat": 38.9637, "long": 35.2433
    }
    ,
    "Uganda": {
        "lat": 1.0, "long": 32.0
    }
    ,
    "Ukraine": {
        "lat": 48.3794, "long": 31.1656
    }
    ,
    "United Arab Emirates": {
        "lat": 24.0, "long": 54.0
    }
    ,
    "United Kingdom": {
        "lat": 32.3078, "long": -64.7505
    }
    ,
    "Uruguay": {
        "lat": -32.5228, "long": -55.7658
    }
    ,
    "US": {
        "lat": 37.0902, "long": -95.7129
    }
    ,
    "Uzbekistan": {
        "lat": 41.3775, "long": 64.5853
    }
    ,
    "Venezuela": {
        "lat": 6.4238, "long": -66.5897
    }
    ,
    "Vietnam": {
        "lat": 16.0, "long": 108.0
    }
    ,
    "Zambia": {
        "lat": -15.4167, "long": 28.2833
    }
    ,
    "Zimbabwe": {
        "lat": -20.0, "long": 30.0
    }
    ,
    "Dominica": {
        "lat": 15.415, "long": -61.371
    }
    ,
    "Grenada": {
        "lat": 12.1165, "long": -61.679
    }
    ,
    "Mozambique": {
        "lat": -18.665695, "long": 35.529562
    }
    ,
    "Syria": {
        "lat": 34.802075, "long": 38.99681500000001
    }
    ,
    "Timor-Leste": {
        "lat": -8.874217, "long": 125.727539
    }
    ,
    "Belize": {
        "lat": 13.1939, "long": -59.5432
    }
    ,
    "Laos": {
        "lat": 19.85627, "long": 102.495496
    }
    ,
    "Libya": {
        "lat": 26.3351, "long": 17.228331
    }
    ,
    "West Bank and Gaza": {
        "lat": 31.9522, "long": 35.2332
    }
    ,
    "Guinea-Bissau": {
        "lat": 11.8037, "long": -15.1804
    }
    ,
    "Mali": {
        "lat": 17.570692, "long": -3.996166000000001
    }
    ,
    "Saint Kitts and Nevis": {
        "lat": 17.357822, "long": -62.782998
    }
    ,
    "Kosovo": {
        "lat": 42.602636, "long": 20.902977
    }
    ,
    "Burma": {
        "lat": 21.9162, "long": 95.956
    }
    ,
    "MS Zaandam": {
        "lat": 0.0, "long": 0.0
    }
    ,
    "Botswana": {
        "lat": -22.3285, "long": 24.6849
    }
    ,
    "Burundi": {
        "lat": -3.3731, "long": 29.9189
    }
    ,
    "Sierra Leone": {
        "lat": 8.460555000000001, "long": -11.779889
    }
    ,
    "Malawi": {
        "lat": -13.254307999999998, "long": 34.301525
    }
}
*/
