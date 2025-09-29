import { map } from './map-config.js';
import { strikeIcon, noPicketIcon } from './icons.js';
import { createPopupContent } from './utils.js';

const style_30k = {
    stroke: false,
    fill: true,
    fillColor: "#db1e2a",
    fillOpacity: 0.2
}

export async function loadGeoJsonLayers() {
    // Fetch points layer
    const points_response = await fetch("layers/strike_locations_generated.geojson")
    const points_data = await points_response.json()

    const strikeLayer = L.geoJSON(points_data.features, {
        pointToLayer: (feature, latlng) => {
            return L.marker(latlng, { icon: feature.properties.is_picket_line ? strikeIcon : noPicketIcon })
                    .bindPopup(createPopupContent(feature.properties));
        }
    }).addTo(map)

    // Update location count immediately after loading
    const strikeCount = points_data.features.length;
    document.getElementById('location-count').textContent = `${strikeCount} strike locations displayed`;

    // Fetch 30km radius layer
    const radius_response = await fetch("layers/strike_locations_30k_generated.geojson")
    const radius_data = await radius_response.json()

    L.geoJSON(radius_data.features, {style: style_30k}).addTo(map)
}