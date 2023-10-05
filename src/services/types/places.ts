export type Place = {
  _id: string,
  name: string,
  coords: {
    _long: number,
    _lat: number,
    isVisible: boolean
  },
  isVisible: boolean,
  images: string[],
  ownerId: string,
  createdAt: { seconds: number, nanoseconds: number },
  updatedAt: { seconds: number, nanoseconds: number },
  message: string,
  likes: string[],
  comments: Comment[]
}

export type Comment = {
  commentId: number,
  byUser: string,
  message: string,
  createdAt: any,
}

export type Coords = {
  lon: number,
  lat: number
}


export type User = {
  docId: string,
  _id: string,
  name: string,
  email: string,
  avatarColor: string
}