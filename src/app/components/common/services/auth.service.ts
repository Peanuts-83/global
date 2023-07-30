import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * User profile
   * <string> 'guest' | 'admin'
   */
  private _userProfile = new BehaviorSubject(Profile.GUEST)
  public get userProfile$(): Observable<Profile> {
    return this._userProfile.asObservable()
  }
  public set userProfile(value: Profile) {
    this._userProfile.next(value)
  }

  /**
   * Id token for admin user
   * ADMIN profile if token exists, else GUEST profile
   */
  private _token = new BehaviorSubject<string | null>(null)
  public get token(): string | null {
    return this._token.value
  }
  public set token(value: string | null) {
    console.log('TOKEN -', value)
    this._token.next(value)
    if (!value) {
      this.userProfile = Profile.GUEST
    }
    this.userProfile = Profile.ADMIN
  }

  constructor() {
  }

}

export enum Profile {
  GUEST = 'guest',
  ADMIN = 'admin'
}
