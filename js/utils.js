export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

export function createRadiusCircle(center, radiusKm = 30) {
    return L.circle(center, {
        color: 'rgba(255, 5, 0, 0.3)',
        fillColor: 'rgba(255, 5, 0, 0.1)',
        fillOpacity: 0.1,
        weight: 2,
        radius: radiusKm * 1000
    });
}

export function createPopupContent(properties) {
    const bottleIcon = properties.location_type === 'BC Liquor Store' ? '<span style="font-size: 16px; margin-right: 5px;">🍾</span>' : '';
    
    return `
        <div class="popup-content">
            <div class="popup-address">${bottleIcon}${properties.address}</div>
            <div><strong>City:</strong> ${properties.city}</div>
            ${properties.hours_details ? `<div class="popup-notes">${properties.hours_details}</div>` : ''}
        </div>
    `;
}
