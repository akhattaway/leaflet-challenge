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
centerMarker.bindPopup("Hello from Center of the Earth world!");

// URL for the earthquake data
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// Fetch the earthquake data
fetch(queryUrl).then(function(response) {
    // Parse the response to JSON
    return response.json();
}).then(function(data) {
    // Once we have the data, we can start plotting it on the map
    data.features.forEach(function(earthquake) {
        // Extract the coordinates, magnitude, and depth
        let coordinates = earthquake.geometry.coordinates;
        let magnitude = earthquake.properties.mag;
        let depth = coordinates[2]; // The depth is the 3rd item in the coordinates array
        
        // Create a marker and add it to the map
        // Note: You'll need to modify this to change the marker's size and color
        let marker = L.circleMarker([coordinates[1], coordinates[0]], {
            radius: magnitude * 5, // Example scaling, you'll need to refine this
            fillColor: "purple", // Example color, you'll need a function to change based on depth
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
        }).addTo(myMap);

        // Add a popup to the marker
        marker.bindPopup(`<h3>${earthquake.properties.place}</h3><hr><p>${
            new Date(earthquake.properties.time)}</p><p>Magnitude: ${
                magnitude}</p><p>Depth: ${depth} km</p>`);
    });
    
});

