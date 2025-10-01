import {readFile, writeFile} from "fs/promises"
import {Buffer} from "buffer"


export default async function generateLocations() {
  const data = JSON.parse(await readFile("../locations.json"))

  const geoJson = {
    "type": "FeatureCollection",
    "name": "Strike Locations",
    "features":
      data.locations.map((struckSite) => ({
        "type": "Feature",
        "properties": {
          ...struckSite
        },
        "geometry": {
          "type": "Point",
          "coordinates": struckSite.coordinates
        }
      }))

  }

  const fileContent = new Uint8Array(Buffer.from(JSON.stringify(geoJson, null, 2)))
  await writeFile("../layers/strike_locations_generated.geojson", fileContent)
}
