
export interface TokenResponse {
  status: number
  body: {
    username: string
    message?: string
    error?: string
    token?: string
    email?: string
    profile: string
    birthday?: string
  }
}
