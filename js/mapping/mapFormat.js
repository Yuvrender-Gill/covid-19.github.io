// Author: Yuvrender Gill

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsbHl1djIiLCJhIjoiY2s1OGIwbjFsMDk1YzNmcG5scnRib2o1MCJ9.gvSDdGfitit_En6w3JN-xw';

/*
* Initiate the map object with mapbox.gl
*/
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-90.13734351262877, 40.137451890638886],
    zoom: 3,
    pitch: 0
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
var zoomThreshold = 5;
var labelLayerId;

function rotateCamera(timestamp) {
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 100) % 360, { duration: 0 });
  // Request the next frame of the animation.
  requestAnimationFrame(rotateCamera);
}
 
map.on('load', function() {

    // Start the animation.
    
    var layers = map.getStyle().layers;

    // Find the index of the first symbol layer in the map style
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol') {
        firstSymbolId = layers[i].id;
        break;
      }
    }

    // Variable colours with zoom levels
    map.setPaintProperty('building', 'fill-color', [
          'interpolate',
          ['exponential', 0.5],
          ['zoom'],
          15,
          '#e2714b',
          22,
          '#eee695'
      ]);
       
      map.setPaintProperty('building', 'fill-opacity', [
          'interpolate',
          ['exponential', 0.5],
          ['zoom'],
          15,
          0,
          22,
          1
      ]);

      map.addLayer(
        {
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
              'fill-extrusion-color': '#aaa',
              
              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
              ],
              'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
  // Add layers and sources
  map.addSource('counties', {
      'type': 'vector',
      'url': 'mapbox://gillyuv2.ck6enxrwn0gkx2np87egt1223-8qmoe'
  });

  // Add layer to show US counties
 
  // County Borders
  map.addLayer({
    'id': 'county-borders',
    'type': 'line',
    'source': 'counties',
    'layout': {
      'visibility': 'none',
    },
    'paint': {
        'line-color': '#f01',
        'line-width': 2
    }, 'source-layer': 'geojson-counties-fips', 
  });

  // Add layer to show US states
  // State Fill
  map.addSource('states', {
    'type': 'geojson',
    'data':
    'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
    });

    map.addSource('population', {
      'type': 'vector',
      'url': 'mapbox://mapbox.660ui7x6'
    });

    // State Layers
    map.addLayer({
      'id': 'state-borders',
      'type': 'line',
      'source': 'states',
      'layout': {
        'visibility': 'none',
      },
      'paint': {
          'line-color': '#5B2C6F',
          'line-width': 2
      }
    }, 'waterway-label');

    

    // Population LAyers
    map.addLayer(
      {
        'id': 'state-population',
        'source': 'population',
        'layout': {
          'visibility': 'none',
        },
        'source-layer': 'state_county_population_2014_cen',
        'maxzoom': zoomThreshold,
        'type': 'fill',
        'filter': ['==', 'isState', true],
        'paint': {
                  'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'population'],
                  0,
                  'rgb(168, 14, 79)',
                  500000,
                  'rgb(108, 46, 110)',
                  750000,
                  'rgb(107, 50, 121)',
                  1000000,
                  'rgb(139, 70, 170)',
                  2500000,
                  'rgb(135, 35, 202)',
                  5000000,
                  'rgb(125, 37, 184)',
                  7500000,
                  'rgb(102, 38, 162)',
                  10000000,
                  'rgb(59, 37, 139)',
                  25000000,
                  '#272272'
                  ],
                  'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0.5
                    ]
                }
      },'waterway-label');
       
      map.addLayer(
      {
        'id': 'county-population',
        'source': 'population',
        'layout': {
          'visibility': 'none',
        },
        'source-layer': 'state_county_population_2014_cen',
        'minzoom': zoomThreshold,
        'type': 'fill',
        'filter': ['==', 'isCounty', true],
        'paint': {
                  'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'population'],
                  0,
                  'rgb(168, 14, 79)',
                  100,
                  'rgb(108, 46, 110)',
                  1000,
                  'rgb(107, 50, 121)',
                  5000,
                  'rgb(139, 70, 170)',
                  10000,
                  'rgb(135, 35, 202)',
                  50000,
                  'rgb(125, 37, 184)',
                  100000,
                  'rgb(102, 38, 162)',
                  500000,
                  'rgb(59, 37, 139)',
                  1000000,
                  '#272272'
                  ],
                  'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0.5
                    ]
                }
                  
      },'waterway-label');

  // Hover Effect on the state layers
  var hoveredStateId = null;
  // When the user moves their mouse over the state-fill layer, we'll update the
  // feature state for the feature under the mouse.
  map.on('mousemove', 'state-population', function(e) {
      if (e.features.length > 0) {
        if (hoveredStateId) {
            map.setFeatureState(
              { source: 'population', 'source-layer': 'state_county_population_2014_cen', id: hoveredStateId },
              { hover: false }
            );
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
          { source: 'population', 'source-layer': 'state_county_population_2014_cen',id: hoveredStateId },
          { hover: true }
        );
      }
  });
   
  // When the mouse leaves the state-fill layer, update the feature state of the
  // previously hovered feature.
  map.on('mouseleave', 'state-population', function() {
      if (hoveredStateId) {
          map.setFeatureState(
              { source: 'population','source-layer': 'state_county_population_2014_cen', id: hoveredStateId },
              { hover: false }
          );
      }
      hoveredStateId = null;
  });

  // Color changing with zoom levels 
  document.getElementById('zoom').addEventListener('click', function() {
    map.zoomTo(19, { duration: 9000 });
  });

});

var stateLegendEl = document.getElementById('state-legend');
var countyLegendEl = document.getElementById('county-legend');
map.on('zoom', function() {
    if (map.getZoom() > zoomThreshold) {
        stateLegendEl.style.display = 'none';
        countyLegendEl.style.display = 'block';
    } else {
        stateLegendEl.style.display = 'block';
        countyLegendEl.style.display = 'none';
    }
});

// Name of the layers formed so far. 
var toggleLayerIds = ['county-population', 'county-borders', 'state-population', 'state-borders'];

function showLayers(layer_ids) {

  for (var i = 0; i < layer_ids.length; i++) {

    var id = layer_ids[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = '';

    if (id === 'county-population'){
      link.textContent = "County Population";
    } else if (id === 'state-population'){
      link.textContent = "State Population";
    } else if (id === 'county-borders'){
      link.textContent = "County Border";
    } else if (id === 'state-borders'){
      link.textContent = "State Border";
    } 
    

    link.onclick = function(e) {

      // Retrieve the clicked layer
      var clickedLayer = null;
      if (this.textContent === 'County Population'){
        clickedLayer = "county-population";
      } else if (this.textContent === 'State Population'){
        clickedLayer = "state-population";
      } else if (this.textContent === 'County Border'){
        clickedLayer = "county-borders";
      } else if (this.textContent === 'State Border'){
        clickedLayer = "state-borders";
      } 

      e.preventDefault();
      e.stopPropagation();
      var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

      if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
      } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);

  }
}

showLayers(toggleLayerIds); 
  
