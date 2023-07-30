import { Injectable, OnDestroy, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CoreService implements OnInit, OnDestroy {

  public subscriptions: Subscription = new Subscription()

  constructor() { }

  ngOnInit(): void {
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
