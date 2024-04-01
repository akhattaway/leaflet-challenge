// define a color function outside the data processing loop
function getColor(magnitude) {
    return magnitude > 6.5 ? '#d73027' :
           magnitude > 5.5 ? '#fc8d59' :
           magnitude > 4.5 ? '#fee08b' :
                             '#ffffbf'; // Default color for magnitudes less than or equal to 4.5
}

// Initialize the map on the "map" div reference in the html file with a given center and zoom
let myMap = L.map('map', {
    center: [0, 0], //center of earth 
    zoom: 2
});

// Add a tile layer to the map, natural first step after initialize your map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let centerMarker = L.marker([0,0]).addTo(myMap);
// Add a marker to the center
centerMarker.bindPopup("myMap Center [0,0]");

// URL for the earthquake data
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Fetch the earthquake data
fetch(queryUrl).then(function(response) {
    return response.json();
}).then(function(data) {
    // Earthquake data plotting...
    data.features.forEach(function(earthquake) {
        let coordinates = earthquake.geometry.coordinates;
        let magnitude = earthquake.properties.mag;
        let depth = coordinates[2]; // The depth is the 3rd item in the coordinates array
        
        // Create a marker and add it to the map
        let marker = L.circleMarker([coordinates[1], coordinates[0]], {
            radius: magnitude * 5, // Example scaling, you might adjust this
            fillColor: getColor(magnitude), // You can also dynamically change this based on conditions
            color: "white",
            weight: 1,
            opacity: 1,
            fillOpacity: 1 // Set fillOpacity based on magnitude
        }).addTo(myMap);
    
        // Add a popup to the marker
        marker.bindPopup(`<h3>${earthquake.properties.place}</h3><hr><p>${new Date(earthquake.properties.time)}</p><p>Magnitude: ${magnitude}</p><p>Depth: ${depth} km</p>`);
    });    
});

 var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {
  //  var div = L.DomUtil.create('div', 'info legend'),
   //     grades = [0, 4.5, 5.5, 6.5, 7.5], // These are the breaks in your scale
   //     labels = [];

    // Add min & max
   // div.innerHTML = '<div><b>Magnitude</b></div>';
    // loop through our intervals and generate a label with a colored square for each interval
   // for (var i = 0; i < grades.length; i++) {
      //  div.innerHTML +=
        //    '<div style="background:' + getColor(grades[i]) + '; height:20px; margin: 2px 0;">&nbsp;</div>' +
          //  '<div style="text-align: center">' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] : '+') + '</div>';
   // }
   // return div;
//};

legend.addTo(myMap);