export const strikeIcon = L.divIcon({
    className: 'strike-marker',
    html: '<div style="background-color: #db1e2a; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

export const noPicketIcon = L.divIcon({
    className: 'no-picket-marker',
    html: '<div style="background-color: #ff7800; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
});

export const userLocationIcon = L.divIcon({
    className: 'user-location-marker',
    html: '<div style="background-color: #0065a4; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

export const postalCodeIcon = L.divIcon({
    className: 'postal-code-marker',
    html: '<div style="background-color: #b8a967; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; color: white;">📍</div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9]
});

export const rallyIcon = L.divIcon({
    className: 'rally-marker',
    html: '<div style="background-color: white; width: 22px; height: 22px; border-radius: 50%; border: 3px solid #8B0000; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 14px;">🚩</div>',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
});
