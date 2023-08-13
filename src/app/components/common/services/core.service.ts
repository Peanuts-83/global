import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { BehaviorSubject } from 'rxjs'
import { UserService } from './user.service'
import { HttpService } from './http.service'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class CoreService  {
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
  public initForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.setValue(null)
      formGroup.get(key)?.markAsUntouched()
    })
  }
}
