/*
* Initiate the map object with mapbox.gl
*/

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lsbHl1djIiLCJhIjoiY2s1OGIwbjFsMDk1YzNmcG5scnRib2o1MCJ9.gvSDdGfitit_En6w3JN-xw';


let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [105.13734351262877, 33.137451890638886],
    zoom: 4,
    pitch: 0
});

