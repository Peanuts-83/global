import { Directive } from "@angular/core"
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms"

@Directive({
  selector: '[birthdayValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: BirthdayValidator,
    multi: true
  }]
})
export class BirthdayValidator implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let today = new Date()
    if (new Date(control.value) > today) {
      return { 'invalid_date': true }
    }
    return null
  }
}
