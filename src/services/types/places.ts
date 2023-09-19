export type Place = {
  _id: string,
  name: string,
  coords: {
    _long: number,
    _lat: number
  }
  images: string[],
  ownerId: string,
  createdAt: { seconds: number, nanoseconds: number },
  updatedAt: { seconds: number, nanoseconds: number },
  message: string,
  comments: [
    {
      commentId: number,
      user: string,
      massage: string,
      createdAt: any
    }
  ]
}

export type Coords = {
  lon: number,
  lat: number
}


export type User = {
  _id: string,
  name: string,
  deviceId: string
}