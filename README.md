# BCGEU Strike Locations

**Website is published automatically at [https://bcgeu-strikelocations.github.io/](https://bcgeu-strikelocations.github.io/)**

This repo aims at displaying a map of most up-to-date BCGEU strike locations and a 30km radius around them.
The goal is to facilitate finding the closest picket line for a remote member.

## 🗺️ Features

- **Interactive Map**: Built with Leaflet
- **30km Radius Circles**: Visual representation of strike coverage areas
- **User Location**: Find your current location and see distance to nearest strike

## 🚀 Quick Start

1. Open `index.html` in your browser or visit the GitHub Pages URL
2. The map will automatically load all strike locations
3. Click on markers to see address details
4. Click "📍 Find My Location" to see your current position
5. Use the legend to understand the map symbols

## 🔄 Updating Locations

### Automated Workflow

The repository is set up with GitHub Actions to automatically update generated files when `locations.json` changes:

1. **Create a Pull Request** with updated `locations.json` containing new strike locations
2. **Merge the PR** to the main branch
3. **GitHub Actions automatically**:
   - Runs the transform script
   - Updates the generated GeoJSON files
   - Deploys the updated site to GitHub Pages

### Manual Update (Local Development)

If you need to update files locally:

```bash
cd transform
npm install
npm run transform
git add layers/strike_locations_generated.geojson layers/strike_locations_30k_generated.geojson
git commit -m "chore: update generated location files"
git push
```

### Local Development Server

If you have Python 3 installed, you can use its built-in server:

```bash
# Python 3
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## 🗂️ Location Data Format

Each location in `locations.json` has the following structure:

```json
{
  "locations": [
    {
      "city": "City name (string)",
      "address": "Street address (string)",
      "coordinates": [longitude, latitude],
      "hours_details": "Operating hours or additional details (string)",
      "is_picket_line": true/false,
      "location_type": "Office"
    }
  ]
}
```

### Field Descriptions

- `city`: City name (string)
- `address`: Street address (string)
- `coordinates`: [longitude, latitude] array (numbers)
- `hours_details`: Operating hours or additional information (string)
- `is_picket_line`: Boolean indicating if this is an active picket line (boolean)
- `location_type`: Type of location (string)
