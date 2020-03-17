// Author: Yuvrender Gill

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsbHl1djIiLCJhIjoiY2s1OGIwbjFsMDk1YzNmcG5scnRib2o1MCJ9.gvSDdGfitit_En6w3JN-xw';

/*
* Initiate the map object with mapbox.gl
*/
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-79.3, 43.7],
    zoom: 10,
    pitch: 40
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

function rotateCamera(timestamp) {
  // clamp the rotation between 0 -360 degrees
  // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
  map.rotateTo((timestamp / 100) % 360, { duration: 0 });
  // Request the next frame of the animation.
  requestAnimationFrame(rotateCamera);
}

var hoveredStateId = null;

 
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

    // 3D 

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
        }
    }

    //

    map.addSource('toronto_fin', {
        'type': 'vector',
        'url': 'mapbox://gillyuv2.ck7lbwsgf04d72rmp9rag965g-3tzpe'
    });

    map.addLayer({
        'id': 'toronto_fin',
        'type': 'circle',
        'source': 'toronto_fin',
        'layout': {},
        'paint': {
            'circle-color': "#272272",
                'circle-radius': 6,
          
        }, 
        'layout': {
            'visibility': 'none',
          },
        'source-layer': 'Red_Light_Cameras_Data'
    });
    

    map.addSource('toronto_census', {
        'type': 'vector',
        'url': 'mapbox://gillyuv2.45iy6k1x'
    });

    map.addLayer({
        'id': 'da-borders',
        'type': 'fill',
        'source': 'toronto_census',
        'layout': {
            'visibility': 'none',
          },
        'paint': {
            'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'V0z0wK7A_1'],
            0,
            '#fff5eb',
            1000,
            '#fee6ce',
            5000,
            '#fdd0a2',
            10000,
            '#fdae6b',
            25000,
            '#fd8d3c',
            50000,
            '#f16913',
            100000,
            '#d94801',
            250000,
            '#8c2d04',
            ],
            
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                0.7,
                1
                ]
        },
         'source-layer': 'da-joined-1-7ch0n4', 
    });
   
    // Add layers and sources
    map.addSource('toronto_peds', {
        'type': 'vector',
        'url': 'mapbox://gillyuv2.7tx0fhgx'
    });

    map.addLayer({
        'id': 'toronto_peds',
        'type': 'line',
        'source': 'toronto_peds',
        'layout': {
            'visibility': 'none',
          },
        'paint': {
            'line-color': "#FFB6C1",
            'line-width': 1
        } ,
         'source-layer': 'pedestrian-network-2019-wgs84-3kftag', 
    });

    // Add layers and sources
    map.addSource('road_top', {
        'type': 'vector',
        'url': 'mapbox://gillyuv2.1ggtgs2x'
    });

    map.addLayer({
        'id': 'road_top',
        'type': 'line',
        'source': 'road_top',
        'layout': {
            'visibility': 'visible',
          },
         'source-layer': 'topo_edge_of_road_wgs84-0lxd4a', 
    });
    

     // Add layers and sources
     map.addSource('toronto_furniture', {
        'type': 'vector',
        'url': 'mapbox://gillyuv2.ck7l2860j0a3q2srpu9cmlk3y-9j7sl'
    });

    map.addLayer({
        'id': 'furniture_layer',
        'type': 'circle',
        'source': 'toronto_furniture',
        'layout': {},
        'paint': {
            'circle-color': [
                'match',
                ['get', 'STATUS'],
                'Existing',
                '#41ae76',
                'Temporarily Removed',
                '#8B0000',
                /* other */ '#ccc'
                ],
                'circle-radius': 6,
          
        }, 
        'layout': {
            'visibility': 'none',
          },
        'source-layer': 'Street_furniture-Bench_data'
    });

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
});

map.on('mousemove', 'da-borders', function(e) {
    if (e.features.length > 0) {
    if (hoveredStateId) {
    map.setFeatureState(
    { source: 'toronto_census', id: hoveredStateId },
    { hover: false }
    );
    }
    hoveredStateId = e.features[0].id;
    map.setFeatureState(
    { source: 'toronto_census', id: hoveredStateId },
    { hover: true }
    );
    }
});

map.on('mouseleave', 'da-borders', function() {
    if (hoveredStateId) {
        map.setFeatureState(
        { source: 'toronto_census', id: hoveredStateId },
        { hover: false }
        );
    }
    hoveredStateId = null;
});

// Zoom effect 
map.on('click','furniture_layer', function(e){
    map.flyTo({ center: e.features[0].geometry.coordinates, zoom:17});
});

// FIRST ADD A POPUP OBJECT
var popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false
});


// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'furniture_layer', function() {
    map.getCanvas().style.cursor = 'pointer';
});
     
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'furniture_layer', function() {
    map.getCanvas().style.cursor = '';
});

// // NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on('click','furniture_layer', function(e){
popup.remove(); //If a popup already exists, get rid of it!

//get the rendered features that belong to the provinces-fill layer
var features = map.queryRenderedFeatures(e.point, {
    "layers": ["furniture_layer", "da-borders"]}
);
//if there is a feature there, do the following
if (features.length > 0){
    console.log(features[0]); //print out the first element of the features array that was selected
    var feature = features[0]; //store the first element as 'feature'
    popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
    //add stuff to the pop up:
    if (feature.properties.STATUS ==="Temporarily Removed")
        popup.setHTML("<b>Bench ID: </b>" + feature.properties.ID + "<br>" + 
            "<b>Address: </b>" + feature.properties.ADDRESSNUMBERTEXT + " " + feature.properties.ADDRESSSTREET + "<br>" + 
            "<b>Ward #: </b>" + feature.properties.WARD + "<br>" + "<hr>" +
            "<font color='red'>NOT AVAILABLE!</font>" 
        );
    else {
        popup.setHTML("<b>Bench ID: </b>" + feature.properties.ID + "<br>" + 
            "<b>Address: </b>" + feature.properties.ADDRESSNUMBERTEXT + " " + feature.properties.ADDRESSSTREET + "<br>" + 
            "<b>Ward #: </b>" + feature.properties.WARD 
        );
    }
    popup.addTo(map); //finally add the pop up to the map
}


});





// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'da-borders', function() {
    map.getCanvas().style.cursor = 'pointer';
});
     
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'da-borders', function() {
    map.getCanvas().style.cursor = '';
});

// // NEXT DEFINE WHEN YOU WANT THE POPUP TO HAPPEN
map.on('click','da-borders', function(e){
    popup.remove(); //If a popup already exists, get rid of it!
    
    //get the rendered features that belong to the provinces-fill layer
    var features = map.queryRenderedFeatures(e.point, {
        "layers": ["da-borders"]}
    );
    //if there is a feature there, do the following
    if (features.length > 0){
        console.log(features[0]); //print out the first element of the features array that was selected
        var feature = features[0]; //store the first element as 'feature'
        popup.setLngLat(e.lngLat); //place the popup window at the lng and lat where your click event happened
        //add stuff to the pop up:
        popup.setHTML("<b>Population: </b>" + feature.properties.V0z0wK7A_1 + "<br>" 
            );
        popup.addTo(map); //finally add the pop up to the map
    }
});


// Name of the layers formed so far. 
var toggleLayerIds = ['furniture_layer', 'da-borders', "toronto_fin", "toronto_peds"];

function showLayers(layer_ids) {

  for (var i = 0; i < layer_ids.length; i++) {

    var id = layer_ids[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = '';

    if (id === 'furniture_layer'){
      link.textContent = "Toronto Benches";
    } else if (id === 'da-borders'){
      link.textContent = "Toronto Census";
    } 
    else if (id === 'toronto_fin'){
        link.textContent = "Red Light Cameras";
      } 
    else if (id === 'toronto_peds'){
        link.textContent = "Pedestrian Network";
    } 


    link.onclick = function(e) {

      // Retrieve the clicked layer
      var clickedLayer = null;
      if (this.textContent === 'Toronto Benches'){
        clickedLayer = "furniture_layer";
      } else if (this.textContent === 'Toronto Census'){
        clickedLayer = "da-borders";
      } else if (this.textContent === 'Red Light Cameras'){
        clickedLayer = "toronto_fin";
      } else if (this.textContent === 'Pedestrian Network'){
        clickedLayer = "toronto_peds";
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




  
