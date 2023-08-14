import { Injectable } from "@angular/core"
import { HttpService } from "./http.service"
import { BehaviorSubject, Observable } from "rxjs"
import { User } from "../../admin/models/user.interface"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private guestUser = {username: '', profile: 'guest'}
  /**
   * User
   * <string> 'guest' | 'admin'
  */
  private _user$ = new BehaviorSubject<User>(this.guestUser)
  public get user$(): Observable<User> {
    return this._user$.asObservable()
  }
  public get user(): User {
    return this._user$.value
  }
  public set user(value: User) {
    localStorage.setItem('TRdevUser', JSON.stringify(value))
    this._user$.next(value)
  }

  public userList$: BehaviorSubject<User[]> = new BehaviorSubject([this.guestUser])

  constructor() {}

}
