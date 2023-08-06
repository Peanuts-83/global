import { Directive } from "@angular/core"
import { BaseComponent } from "./base-component"
import { FormGroup, FormBuilder } from "@angular/forms"
import { AuthService } from "./services/auth.service"
import { CoreService } from "./services/core.service"
import { HttpService } from "./services/http.service"
import { UserService } from "./services/user.service"

@Directive()
export abstract class BaseFormComponent extends BaseComponent {
  // public abstract baseForm: FormGroup
  public http!: HttpService
  public userService!: UserService

  constructor(core: CoreService, auth: AuthService, public formBuilder: FormBuilder) {
    super(core, auth)
    this.userService = core.userService
    this.http = core.http
  }
}
