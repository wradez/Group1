window.onload = function() {
    L.mapquest.key = 'GpGGgAtZYCG6MhBA4phSQYMBsMuic1dw';

    // Geocode three locations, then call the createMap callback
    L.mapquest.geocoding().geocode(['39.718643, -104.957439', '39.724977, -104.973395','39.731231, -104.973464','39.740455, -104.944799', '39.739381,-104.979067'], createMap);

    function createMap(error, response) {
    // Initialize the Map
    var map = L.mapquest.map('map', {
        layers: L.mapquest.tileLayer('map'),
        center: [0, 0],
        zoom: 12
    });

    // Generate the feature group containing markers from the geocoded locations
    var featureGroup = generateMarkersFeatureGroup(response);

    // Add markers to the map and zoom to the features
    featureGroup.addTo(map);
    map.fitBounds(featureGroup.getBounds());
    }

    function generateMarkersFeatureGroup(response) {
    var group = [];
    for (var i = 0; i < response.results.length; i++) {
        var location = response.results[i].locations[0];
        var locationLatLng = location.latLng;

        // Create a marker for each location
        var marker = L.marker(locationLatLng, {icon: L.mapquest.icons.marker()})
        .bindPopup(location.adminArea5 + ', ' + location.adminArea3);

        group.push(marker);
    }
    return L.featureGroup(group);
    }
}

$(".dropdown-trigger").dropdown();
$('.carousel.carousel-slider').carousel();
$('.collapsible').collapsible(); 
var instance = M.Collapsible.getInstance(elem);
instance.open(3);
instance.close(3);
instance.destroy();