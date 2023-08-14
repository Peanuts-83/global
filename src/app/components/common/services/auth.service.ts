import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { UserService } from './user.service'
import { User } from '../../admin/models/user.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * User
   * <string> 'guest' | 'admin'
  */
  public get user(): User {
    return this.userService.user
  }
  public set user(value: User) {
    this.userService.user = value
  }

  /**
   * Token Managment
    * Save token to localStorage with timestamp at the end
    * Set user <'guest'|'admin'>
   */
  // public tokenAge: any
  public token$ = new BehaviorSubject<string | null>(null)

  // TODO: token age should be managed at backend side...

  public getToken() {
    const l_token = localStorage.getItem('TRdevToken')
    if (l_token) {
      const l_user = localStorage.getItem('TRdevUser')
      if (l_user) {
        const { id, username, email, profile, birthday } = JSON.parse(l_user)
        this.user = { id, username, email, profile, birthday }
        this.token$.next(l_token)
      }
    } else {
      this.user = { username: '', profile: 'guest' }
      this.token$.next(null)
    }
    return l_token
  }

  public setToken(value: string | null) {
    this.token$.next(value)
    if (!value) {
      localStorage.removeItem('TRdevToken')
      this.user = { username: '', profile: 'guest' }
    } else {
      localStorage.setItem('TRdevToken', value)
    }
  }

  constructor(private userService: UserService) { }

}

export enum Profile {
  GUEST = 'guest',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}
