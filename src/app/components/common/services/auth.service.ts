import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { User } from '../../admin/models/user.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
 * user values
 */
  public user!: User

  /**
   * User profile
   * <string> 'guest' | 'admin'
  */
  private _userProfile = new BehaviorSubject('guest')
  public get userProfile$(): Observable<string> {
    return this._userProfile.asObservable()
  }
  public set userProfile(value: string) {
    this._userProfile.next(value)
  }

  /**
   * Token Managment
    * Save token to localStorage with timestamp at the end
    * Set userProfile <'guest'|'admin'>
   */
  public tokenAge: any
  public getToken(): string | null {
    const datedToken = localStorage.getItem('TRdev_Token')
    // if timestamp
    if (datedToken?.split(' ')[1]) {
      const savedToken = datedToken?.split(' ')[0]
      const savedJSONDate = datedToken.split(' ')
        .filter((_, i) => i !== 0)
        .join(' ')
      const savedDate: Date = new Date(savedJSONDate)
      const now = new Date()
      this.tokenAge = (now.getTime() - savedDate.getTime()) / 1000
      if (this.tokenAge > 3600) {
        this.setToken(null)
        this.tokenAge = null
      }
    }
    return datedToken
  }

  public setToken(value: string | null) {
    if (!value) {
      localStorage.removeItem('TRdev_Token')
      this.userProfile = Profile.GUEST
    } else {
      const datedToken = `${value} ${new Date()}`
      localStorage.setItem('TRdev_Token', datedToken)
      this.userProfile = Profile.ADMIN
    }
  }

  constructor() { }


}

export enum Profile {
  GUEST = 'guest',
  ADMIN = 'admin'
}
