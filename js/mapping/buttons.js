

/*
    var filterGroup = document.getElementById('filter-group');

//replace places variable with countryGeoJSON

        countryGeoJSON.features.forEach(function(feature) {
            if
            var symbol = feature.properties['icon'];
            var layerID = 'poi-' + symbol;

            // Add a layer for this symbol type if it hasn't been added already.
            if (!map.getLayer(layerID)) {
                map.addLayer({
                    'id': layerID,
                    'type': 'symbol',
                    'source': 'places',
                    'layout': {
                        'icon-image': symbol + '-15',
                        'icon-allow-overlap': true
                    },
                    'filter': ['==', 'icon', symbol]
                });

                // Add checkbox and label elements for the layer.
                var input = document.createElement('input');
                input.type = 'checkbox';
                input.id = layerID;
                input.checked = true;
                filterGroup.appendChild(input);

                var label = document.createElement('label');
                label.setAttribute('for', layerID);
                label.textContent = symbol;
                filterGroup.appendChild(label);

                // When the checkbox changes, update the visibility of the layer.
                input.addEventListener('change', function(e) {
                    map.setLayoutProperty(
                        layerID,
                        'visibility',
                        e.target.checked ? 'visible' : 'none'
                    );
                });
            }
        });
    });
*/
