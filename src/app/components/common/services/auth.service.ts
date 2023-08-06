import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // /**
  //  * User
  //  * <string> 'guest' | 'admin'
  // */
  // private _user = new BehaviorSubject<User>({username: '', profile: 'guest'})
  // public get user$(): Observable<User> {
  //   return this._user.asObservable()
  // }
  // public get user(): User {
  //   return this._user.value
  // }
  // public set user(value: User) {
  //   this._user.next(value)
  // }
  // public get userList(): User[] {
  //   return this.
  // }

  /**
   * Token Managment
    * Save token to localStorage with timestamp at the end
    * Set user <'guest'|'admin'>
   */
  public tokenAge: any
  public token$ = new BehaviorSubject<string|null>(null)

  // TODO: token age should be managed at backend side...

  public getToken(): string | null {
    const datedToken = localStorage.getItem('TRdevToken')
    // this.core.setDevWatch('token', datedToken ? datedToken.slice(0,15)+'...' : null)
    // if timestamp
    if (datedToken?.split(' ')[1]) {
      const savedJSONDate = datedToken.split(' ')
      .filter((_, i) => i !== 0)
      .join(' ')
      const savedDate: Date = new Date(savedJSONDate)
      const now = new Date()
      this.tokenAge = (now.getTime() - savedDate.getTime()) / 1000
      if (this.tokenAge > 3600) {
        this.setToken(null)
        this.tokenAge = null
        this.userService.user = {username: '', profile: 'guest'}
        localStorage.setItem('TRdevUser', JSON.stringify(this.userService.user))
      } else {
        const storage = localStorage.getItem('TRdevUser')
        if (storage) {
          const {username,  email, profile, birthday} = JSON.parse(storage)
          this.userService.user = {username,  email, profile, birthday}
        }
      }
    }
    return datedToken
  }

  public setToken(value: string | null) {
    this.token$.next(value)
    if (!value) {
      localStorage.removeItem('TRdevToken')
      this.userService.user = {username: '', profile: 'guest'}
      } else {
      const datedToken = `${value} ${new Date()}`
      localStorage.setItem('TRdevToken', datedToken)
    }
  }

  constructor(private userService: UserService) {

  }


}

export enum Profile {
  GUEST = 'guest',
  ADMIN = 'admin'
}
