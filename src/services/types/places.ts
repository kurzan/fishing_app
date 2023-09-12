export type Place = {
  id: number,
  name: string,
  type: string,
  coords: Coords
  thumbnail: any
}

export type Coords = {
  lon: number,
  lat: number
}