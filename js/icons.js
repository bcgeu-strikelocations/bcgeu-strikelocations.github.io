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
    html: '<div style="background-color: #0065A4; width: 20px; height: 20px; border-radius: 50%; border: 3px solid #0065A4; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 12px; line-height: 1; padding-left: 1px;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.5582 3.87329C14.9831 4.44323 16.5513 4.54967 18.0401 4.17746C18.6711 4.01972 19.1778 4.7036 18.8432 5.26132L17.5647 7.39221C17.2232 7.96137 17.0524 8.24595 17.0119 8.55549C16.9951 8.68461 16.9951 8.81539 17.0119 8.94451C17.0524 9.25405 17.2232 9.53863 17.5647 10.1078L19.1253 12.7089C19.4361 13.2269 19.1582 13.898 18.5721 14.0445L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z" fill="#FFD700"></path></svg></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});
