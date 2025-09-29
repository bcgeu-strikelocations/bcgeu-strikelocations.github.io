import { map } from './map-config.js';
import { postalCodeIcon } from './icons.js';

// Geocoder.ca API configuration
const GEOCODER_CONFIG = {
    authCode: "538232358933974496202x214750721",
    baseUrl: 'https://geocoder.ca/'
};


/**
 * Geocodes a Canadian postal code using Geocoder.ca API
 * @param {string} postalCode - The postal code to geocode
 * @returns {Promise<Object>} - Object containing lat, lng, and display name
 */
async function geocodePostalCode(postalCode) {
    try {
        // Clean and format the postal code
        const cleanPostalCode = postalCode.replace(/\s+/g, '').toUpperCase();
        
        // Validate Canadian postal code format
        const postalCodeRegex = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
        if (!postalCodeRegex.test(cleanPostalCode)) {
            throw new Error('Invalid Canadian postal code format. Please use format like V6B 1A1');
        }

        // Add space for proper formatting in search
        const formattedPostalCode = cleanPostalCode.replace(/([A-Z]\d[A-Z])(\d[A-Z]\d)/, '$1 $2');
        
        try {
            const apiUrl = `${GEOCODER_CONFIG.baseUrl}?locate=${encodeURIComponent(formattedPostalCode)}&json=1&auth=${encodeURIComponent(GEOCODER_CONFIG.authCode)}`;
            
            const response = await fetch(apiUrl);
            
            if (response.ok) {
                const data = await response.json();
                
                if (data.error) {
                    throw new Error(data.error.message || 'API error occurred');
                }
                
                if (data.latt && data.longt) {
                    const city = data.standard?.city || data.city || '';
                    const prov = data.standard?.prov || data.prov || '';
                    const locationParts = [formattedPostalCode];
                    if (city) locationParts.push(city);
                    if (prov) locationParts.push(prov);
                    
                    return {
                        lat: parseFloat(data.latt),
                        lng: parseFloat(data.longt),
                        displayName: locationParts.join(', '),
                        postalCode: formattedPostalCode,
                        geocoder_data: data
                    };
                }
            }
        } catch (error) {
            console.log('Geocoder.ca API failed:', error);
            if (error.message && error.message.includes('Request Throttled')) {
                console.warn('Geocoder.ca API is throttled. Consider adding an authentication code.');
            }
        }
        
        throw new Error('Postal code not found. Please check the postal code and try again.');
    } catch (error) {
        throw error;
    }
}

/**
 * Adds a postal code marker to the map
 * @param {Object} location - Object containing lat, lng, displayName, and postalCode
 */
function addPostalCodeMarker(location) {
    const marker = L.marker([location.lat, location.lng], { icon: postalCodeIcon })
        .addTo(map)
        .bindPopup(createPostalCodePopup(location));
    
    return marker;
}

/**
 * Creates a rich popup for postal code markers using Geocoder.ca data
 * @param {Object} location - Location object with geocoder data
 * @returns {string} - HTML popup content
 */
function createPostalCodePopup(location) {
    const data = location.geocoder_data;
    
    if (data) {
        return `
            <div class="popup-content postal-popup">
                <div class="popup-address">📍 ${location.postalCode}</div>
                <div class="popup-location">
                    <div><strong>City:</strong> ${data.standard?.city || data.city || 'N/A'}</div>
                    <div><strong>Province:</strong> ${data.standard?.prov || data.prov || 'N/A'}</div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="popup-content">
                <div class="popup-address">📍 ${location.postalCode}</div>
                <div><strong>Location:</strong> ${location.displayName}</div>
            </div>
        `;
    }
}

/**
 * Clears all postal code markers from the map
 */
export function clearPostalCodeMarkers() {
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker && layer.options.icon === postalCodeIcon) {
            map.removeLayer(layer);
        }
    });
}

/**
 * Searches for a postal code and adds it to the map
 * @param {string} postalCode - The postal code to search for
 * @returns {Promise<Object>} - The search result
 */
export async function searchPostalCode(postalCode) {
    try {
        const location = await geocodePostalCode(postalCode);
        const marker = addPostalCodeMarker(location);
        
        map.setView([location.lat, location.lng], 13);
        marker.openPopup();
        
        return {
            success: true,
            location: location,
            marker: marker
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

