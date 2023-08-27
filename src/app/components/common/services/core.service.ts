import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BehaviorSubject, Observable, tap } from 'rxjs'
import { UserService } from './user.service'
import { HttpService } from './http.service'
import { HttpResponse } from '@angular/common/http'
import { User } from '../../admin/models/user.interface'
import { Router } from '@angular/router'
import { TokenResponse } from '../models/token.interface'
import { AuthService } from './auth.service'

/**
 * Core service containing sub-services
 * @exports userService
 * @exports http
 * @exports router
 * @exports auth
 * @param setDevWatch - for dev console on admin profile
 * @param doInitForm - Init any form
 * @param doUpdateUserList
 * @param doConnect
 * @param doDisconnect
 * @param doCheckTokenValidity
 * @param adminTab - wich admin tab is active
 */
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  /**
   * devTool for all components access to update any required value
   */
  devWatch$ = new BehaviorSubject({})
  setDevWatch(key: string, value: any) {
    const val: { [key: string]: any } = this.devWatch$.value
    val[key] = value
    this.devWatch$.next(val)
  }

  constructor(public userService: UserService, public http: HttpService, public router: Router, private auth: AuthService) {
    userService.user$.subscribe(user => {
      this.setDevWatch('User', user ? user : null)
    })
  }

  /**
  * Sets all form fields values to null
  * @param formGroup
  */
  public doInitForm(formGroup: FormGroup) {
    formGroup.reset()
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.setErrors(null)
    })
    formGroup.updateValueAndValidity()
  }

  /**
   * Update userList
   * Must subscribe to be fired
   * @returns Observable<HttpResponse<User[]>>
   */
  public doUpdateUserList(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>('/users').pipe(
      tap(result => {
        if (result && result.body) {
          this.userService.userList$.next(result.body)
        }
      })
    )
  }

  /**
   * Connect with credentials
   */
  public doConnect(a_body: any) {
    return this.http.post<TokenResponse>('/users/auth', a_body).pipe(
      tap(result => {
        if (result.body) {
          this.auth.setToken(result.body.token ? result.body.token : null)
          const { id, username, email, profile, birthday } = result.body
          this.userService.user = { id, username, email, profile, birthday }
          localStorage.setItem('TRdevUser', JSON.stringify(this.userService.user))
        }
      })
    )
  }

  /**
   * Credentials unset/wrong or token validity expired
   */
  public doDisconnect() {
    this.auth.user = { username: '', profile: 'guest' }
    this.auth.token$.next(null)
    localStorage.setItem('TRdevUser', JSON.stringify(this.auth.user))
    localStorage.setItem('TRdevToken', JSON.stringify(this.auth.token$.value))
  }

  /**
   * Check for token validity
   */
  public doCheckTokenValidity(userId: number): Observable<HttpResponse<User>> {
    return this.http.get(`/users/check/${userId}`)
  }

  /**
   * Admin tabs managment
   */
  public adminTab: AdminTab = AdminTab.connect

}

export enum AdminTab {
  'connect',
  'create',
  'list'
}

export enum HttpVerb {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}
