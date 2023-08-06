import { Injectable, OnDestroy, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BehaviorSubject, Subscription } from 'rxjs'
import { UserService } from './user.service'
import { HttpService } from './http.service'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class CoreService implements OnInit, OnDestroy {
  // dev tools for all components access to update any required value
  devWatch$ = new BehaviorSubject({})
  setDevWatch(key: string, value: any) {
    const val: { [key: string]: any } = this.devWatch$.value
    val[key] = value
    this.devWatch$.next(val)
  }

  public subscriptions: Subscription = new Subscription()

  constructor(public userService: UserService, public http: HttpService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.token$.subscribe(token => {
      this.setDevWatch('token', token ? token.slice(0,15)+'...' : null)
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  /**
  * Sets all form fields values to null
  * @param formGroup
  */
  public initForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.setValue(null)
      formGroup.get(key)?.markAsUntouched()
    })
  }
}
