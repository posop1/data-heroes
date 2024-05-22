export interface ICharactersResponse {
  info: IInfo
  results: ICharacter[]
}

export interface IInfo {
  count: number
  pages: number
  next: string
  prev: any
}

export interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: IOrigin
  location: ILocation
  image: string
  episode: string[]
  url: string
  created: string
}

export interface IOrigin {
  name: string
  url: string
}

export interface ILocation {
  name: string
  url: string
}

export type CharacterStatusType = 'alive' | 'dead' | 'unknown' | 'No status'
