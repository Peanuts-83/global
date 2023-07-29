import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userProfile = new BehaviorSubject(Profile.GUEST)
  public get userProfile$(): Observable<Profile> {
    return this._userProfile.asObservable()
  }
  public set userProfile(value: Profile) {
    this._userProfile.next(value)
  }

  constructor() { }

}

export enum Profile {
  GUEST = 'guest',
  ADMIN = 'admin'
}
