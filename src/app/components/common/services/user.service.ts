import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from "rxjs"
import { User } from "../../admin/models/user.interface"

/**
 * Service dedicated to Users
 * @param user
 * @param userList
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private guestUser = { username: '', profile: 'guest' }

  /**
   * user
   * @param username<string>
   * @param profile<'guest' | 'admin' | 'super_admin'>
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

  /**
   * userList
   */
  public userList$: BehaviorSubject<User[]> = new BehaviorSubject([this.guestUser])


  constructor() { }

}
