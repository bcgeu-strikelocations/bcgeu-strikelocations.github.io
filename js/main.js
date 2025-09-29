import { loadGeoJsonLayers } from './loadGeoJsonLayers.js';
import { getUserLocation } from './user-location.js';
import { setupPostalCodeSearch } from './postal-search-ui.js';

// Make functions available globally for the button onclick events
window.getUserLocation = getUserLocation;

// Load locations when the page is ready
document.addEventListener('DOMContentLoaded', () => {
    loadGeoJsonLayers();
    setupPostalCodeSearch();
});

