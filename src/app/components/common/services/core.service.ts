import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BehaviorSubject, EMPTY, Observable, catchError, map, of, shareReplay, tap, throwError } from 'rxjs'
import { UserService } from './user.service'
import { HttpService } from './http.service'
import { AuthService, Profile } from './auth.service'
import { HttpResponse } from '@angular/common/http'
import { User } from '../../admin/models/user.interface'

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

  constructor(public userService: UserService, public http: HttpService, private auth: AuthService) {
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
   * REQUEST data with httpRequest
   * and manage base server response
   * with res/err messages
   * ********************************
   * shareReplay to avoid multiple requests on same route
   */
  // public doREQUEST<T>(verb: HttpVerb, path: string, body: any, id?: number, specPath?: string): Observable<HttpResponse<T>> | null {
  //   switch (verb) {
  //     case HttpVerb.POST:
  //       return this.http.post<HttpResponse<T>>(path, body, specPath ? specPath : '').pipe(
  //         tap({
  //           next: (res: HttpResponse<T>) => {
  //             if (res.status === 200) {
  //               console.log(`SUCCESS - ${res.status} ${JSON.stringify(res.body)}`)
  //             } else if (res.status === 201) {
  //               console.log(`SUCCESS on CREATE - ${res.status} ${JSON.stringify(res.body)}`)
  //             }
  //           }
  //         }
  //         ),
  //         catchError(error => {
  //           console.error(error)
  //           return EMPTY
  //         }),
  //         shareReplay(1),
  //         map(result => result)
  //       )
  //     case HttpVerb.PUT:
  //       return this.http.put<HttpResponse<T>>(path, body, specPath ? specPath : '').pipe(
  //         tap({
  //           next: (res: HttpResponse<T>) => {
  //             if (res.status === 200) {
  //               console.log(`SUCCESS - ${res.status} ${JSON.stringify(res.body)}`)
  //             }
  //           }
  //         }
  //         ),
  //         catchError(error => {
  //           console.error(error)
  //           return EMPTY
  //         }),
  //         shareReplay(1),
  //         map(result => result)
  //       )
  //     case HttpVerb.DELETE:
  //       if (id) {
  //         return this.http.delete<HttpResponse<T>>(path, id, specPath ? specPath : '').pipe(
  //           tap({
  //             next: (res: HttpResponse<T>) => {
  //               if (res.status === 200) {
  //                 console.log(`SUCCESS - ${res.status} ${JSON.stringify(res.body)}`)
  //               }
  //             }
  //           }
  //           ),
  //           catchError(error => {
  //             console.error(error)
  //             return EMPTY
  //           }),
  //           shareReplay(1),
  //           map(result => result)
  //         )
  //       }
  //       return throwError(() => console.error('No id provided'))
  //     default:
  //       this.http.get<HttpResponse<T>>(path, specPath ? specPath : '').pipe(
  //         tap({
  //           next: (res: HttpResponse<T>) => {
  //             if (res.status === 200) {
  //               console.log(`SUCCESS - ${res.status} ${JSON.stringify(res.body)}`)
  //             }
  //           }
  //         }
  //         ),
  //         catchError(error => {
  //           console.error(error)
  //           return EMPTY
  //         }),
  //         shareReplay(1),
  //         map(result => result)
  //       )
  //   }
  //   return null
  // }

}

export enum HttpVerb {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}
