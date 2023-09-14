export type Place = {
  id: number,
  name: string,
  type: string,
  coords: Coords
  thumbnail: any,
  user: string,
  createdAt: any,
  comments: [
    {
      commentId: number,
      user: string,
      massage: string,
      createdAt: any
    }
  ],
  likes: [
    { userId: number }
  ]
}

export type Coords = {
  lon: number,
  lat: number
}