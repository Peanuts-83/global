export interface User {
  id?: number
  username: string
  password?: string
  birthday?: string
  email?: string
  profile: string
  buffer?: BinaryData
  icon?: string
  allUsers?: User[]
  deletedUSer?: User
}
