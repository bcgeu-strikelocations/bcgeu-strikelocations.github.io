import {readFile, writeFile} from "fs/promises"
import {Buffer} from "buffer"
import {buffer} from "@turf/buffer";
import {dissolve} from "@turf/dissolve";

export default async function generateBuffer() {
  const data = JSON.parse(await readFile("../layers/strike_locations_generated.geojson"))

  const picketedLocations = {
    ...data,
    features: data.features.filter(f => f.properties.is_picket_line)
  }
  const bufferedLocations = buffer(picketedLocations, 30, {units: "kilometres"})
  const dissolvedBuffers = dissolve(bufferedLocations)

  const fileContent = new Uint8Array(Buffer.from(JSON.stringify(dissolvedBuffers, null, 2)))
  await writeFile("../layers/strike_locations_30k_generated.geojson", fileContent)
}
