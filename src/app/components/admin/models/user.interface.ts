export interface User {
  id?: number
  username: string
  profile: string
  password?: string
  birthday?: string
  email?: string
  buffer?: BinaryData
  icon?: string
}
