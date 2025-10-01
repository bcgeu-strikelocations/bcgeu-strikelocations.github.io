import { map } from './map-config.js';
import { strikeIcon, userLocationIcon } from './icons.js';
import { calculateDistance } from './utils.js';

let userLocationMarker = null;
let userLocationCircle = null;

export function getUserLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
    }

    const button = document.getElementById('get-location-btn');
    button.disabled = true;
    button.textContent = '📍 Getting Location...';

    // Keep the existing location count and add loading indicator
    const currentText = document.getElementById('location-count').textContent;
    document.getElementById('location-count').textContent = currentText + ' • Getting your location...';

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            if (userLocationMarker) {
                map.removeLayer(userLocationMarker);
            }
            if (userLocationCircle) {
                map.removeLayer(userLocationCircle);
            }

            userLocationMarker = L.marker([lat, lng], { icon: userLocationIcon })
                .addTo(map)
                .bindPopup('<div class="popup-content"><div class="popup-address">Your Location</div><div>Accuracy: ±' + Math.round(accuracy) + ' meters</div></div>');

            userLocationCircle = L.circle([lat, lng], {
                color: '#0065a4',
                fillColor: '#0065a4',
                fillOpacity: 0.1,
                weight: 2,
                radius: accuracy
            }).addTo(map);

            map.setView([lat, lng], 13);

            let nearestDistance = Infinity;
            let nearestLocation = null;
            
            map.eachLayer(function(layer) {
                if (layer instanceof L.Marker && layer.options.icon === strikeIcon) {
                    const strikeLat = layer.getLatLng().lat;
                    const strikeLng = layer.getLatLng().lng;
                    const distance = calculateDistance(lat, lng, strikeLat, strikeLng);
                    
                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearestLocation = layer;
                    }
                }
            });

            // Get the base location count (remove any previous user location info)
            const baseText = document.getElementById('location-count').textContent.split(' • ')[0];
            let locationText = baseText + ' • Your location found';
            
            if (nearestLocation && nearestDistance < 100) {
                locationText += ` • Nearest strike: ${Math.round(nearestDistance)}km away`;
            }
            
            document.getElementById('location-count').textContent = locationText;

            button.disabled = false;
            button.textContent = '📍 Find My Location';
        },
        function(error) {
            console.error('Error getting location:', error);
            // Get the base location count and show error
            const baseText = document.getElementById('location-count').textContent.split(' • ')[0];
            document.getElementById('location-count').textContent = baseText + ' • Error getting your location';
            
            button.disabled = false;
            button.textContent = '📍 Find My Location';
            
            let errorMessage = 'Unable to get your location';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location access denied. Please allow location access to see your position on the map.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out.';
                    break;
            }
            
            setTimeout(() => {
                alert(errorMessage);
            }, 100);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}
