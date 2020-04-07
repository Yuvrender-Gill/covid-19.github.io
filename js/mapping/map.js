/*
* Initiate the map object with mapbox.gl
*/

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsbHl1djIiLCJhIjoiY2s1OGIwbjFsMDk1YzNmcG5scnRib2o1MCJ9.gvSDdGfitit_En6w3JN-xw';


let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [11.680,43.676],
    zoom: 1.25,
    pitch: 0
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());





