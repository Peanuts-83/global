import { Injectable } from "@angular/core"
import { HttpService } from "./http.service"
import { BehaviorSubject, Observable } from "rxjs"
import { User } from "../../admin/models/user.interface"

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * User
   * <string> 'guest' | 'admin'
  */
  private _user$ = new BehaviorSubject<User>({username: '', profile: 'guest'})
  public get user$(): Observable<User> {
    return this._user$.asObservable()
  }
  public get user(): User {
    return this._user$.value
  }
  public set user(value: User) {
    this._user$.next(value)
  }
  public userList$!: Observable<User[]>


  constructor() {}
}
