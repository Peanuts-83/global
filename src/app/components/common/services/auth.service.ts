import { User } from './../../admin/models/user.interface'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { UserService } from './user.service'

/**
 * Service dedicated to Authentication
 * @param user
 * @param token
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * User
   * <string> 'guest' | 'admin' | 'super_admin'
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
  public token$ = new BehaviorSubject<string | null>(null)


  public getToken(): string | null {
    const l_token = localStorage.getItem('TRdevToken')
    if (l_token) {
      const l_user = localStorage.getItem('TRdevUser')
      if (l_user) {
        const { id, username, email, profile, birthday, password } = JSON.parse(l_user)
        // Token & user set by localStorage
        this.token$.next(l_token)
        this.user = { id, username, email, profile, birthday, password }
      } else {
        this.token$.next(null)
        this.user = { username: '', profile: 'guest' }
      }
    } else {
      this.token$.next(null)
      this.user = { username: '', profile: 'guest' }
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
