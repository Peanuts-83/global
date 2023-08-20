import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BehaviorSubject, EMPTY, Observable, catchError, map, of, shareReplay, tap, throwError } from 'rxjs'
import { UserService } from './user.service'
import { HttpService } from './http.service'
import { AuthService, Profile } from './auth.service'
import { HttpResponse } from '@angular/common/http'
import { User } from '../../admin/models/user.interface'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  // dev tools for all components access to update any required value
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
