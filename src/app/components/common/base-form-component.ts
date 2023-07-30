import { Directive } from "@angular/core"
import { BaseComponent } from "./base-component"
import { FormGroup, FormBuilder } from "@angular/forms"
import { AuthService } from "./services/auth.service"

@Directive()
export abstract class BaseFormComponent extends BaseComponent {
  // public abstract baseForm: FormGroup

  constructor(auth: AuthService, public formBuilder: FormBuilder) {
    super(auth)
  }
}
