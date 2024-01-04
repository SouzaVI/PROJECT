var map;
var drawnItems;

$(document).ready(function () {
	map = L.map('map').setView([0, 0], 2);

	// Camada de mapa de ruas (street map)
	var streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'OpenStreetMap'
	});

	// Camada de mapa de satélite (Google Satellite)
	var satelliteLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
		attribution: 'Google Satellite'
	});

	drawnItems = new L.FeatureGroup();
	map.addLayer(drawnItems);

	var drawControl = new L.Control.Draw({
		draw: {
			polygon: true,
			polyline: false,
			rectangle: false,
			circle: false,
			marker: false
		},
		edit: {
			featureGroup: drawnItems,
			remove: true
		}
	});

	map.addControl(drawControl);

	// Adicione ambas as camadas ao mapa
	map.addLayer(streetLayer);
	map.addLayer(satelliteLayer);

	// Adicione um controle de camadas para alternar entre as camadas
	var baseLayers = {
		"Street Map": streetLayer,
		"Satellite Map": satelliteLayer
	};

	L.control.layers(baseLayers, { 'Drawn Items': drawnItems }).addTo(map);

	map.on('draw:created', function (e) {
		var layer = e.layer;
		drawnItems.addLayer(layer);
	});
});

function searchLocation() {
	var locationInput = document.getElementById('location-input').value;

	if (locationInput.trim() !== '') {
		$.ajax({
			url: 'https://nominatim.openstreetmap.org/search',
			data: {
				q: locationInput,
				format: 'json',
				limit: 1
			},
			method: 'GET',
			dataType: 'json',
			success: function (result) {
				if (result.length > 0) {
					var coordinates = result[0];
					map.setView([coordinates.lat, coordinates.lon], 10);
				} else {
					alert('Location not found. Please try again.');
				}
			},
			error: function () {
				alert('Error occurred during the location search. Please try again.');
			}
		});
	}
}

function exportToGeoJSON() {
	console.log("Exporting to GeoJSON...");
	var geoJSONContent = drawnItems.toGeoJSON();
	console.log("GeoJSON Content:", geoJSONContent);

	var blob = new Blob([JSON.stringify(geoJSONContent)], { type: 'application/json' });
	var link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = 'drawn_polygons.geojson';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	console.log("Export complete.");
}