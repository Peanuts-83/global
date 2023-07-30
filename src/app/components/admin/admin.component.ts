import { Component } from '@angular/core'
import { AuthService, Profile } from '../common/services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BaseFormComponent } from '../common/base-form-component'
import { HttpService } from '../common/services/http.service'
import { Avatar } from './models/avatar.interface'
import { TokenResponse } from '../common/models/token.interface'
import { CoreService } from '../common/services/core.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent extends BaseFormComponent {
  public loginForm!: FormGroup
  public createForm!: FormGroup
  public avatars: Avatar[] = []

  constructor(auth: AuthService, formBuilder: FormBuilder, public http: HttpService, private core: CoreService) {
    super(auth, formBuilder)
  }

  override ngOnInit(): void {
    super.ngOnInit()
    // Form init
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
    this.createForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      /**
       * password regexp
       * at least 8 characters
       * must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
       * Can contain special characters
       * ************************
       * double back slash escape required on \\d
       * -----------------------
       * What's happening is that you've got two layers of escaping, one in Javascript strings,
       * and another in regular expressions. The problem is with the Javascript escaping where \
       * precedes a special character in a string: you avoid this by telling the JS string you
       * actually want a backslash character by using \\. This then gets passed down to
       * the regular expression properly.
       */
      password: [null, [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
      /**
       * date regexp
       * Datum validator for datum with format dd.mm.yyyy
       * included leap year dates are valid from ~ 1901-2099
       * (dates 29.02.1900 and 29.02.2100 are not valid)
       */
      birthday: [null],
      email: [null, [Validators.required, Validators.email]],
      profile: ['guest'],
      buffer: [null]
    })
    // Avatars init
    for (let i = 1; i <= 12; i++) {
      this.avatars.push({ url: `assets/avatar/user${i}.png`, text: `avatar ${i}` })
    }
    // Get icons
    // this.http.get<Avatar[]>('/avatars').subscribe((result: Avatar[]) => {
    //   this.avatars = result
    // })
  }

  public onLoggin() {
    const body = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value
    }
    this.http.post<TokenResponse>('/users/auth', body).subscribe({
      next: (result: TokenResponse) => {
        if (result.status === 200) {
          console.log(`SUCCESS - ${result.body?.message}`)
          this.core.initForm(this.loginForm)
        }
        this.auth.setToken(result.body?.token ? result.body.token : null)
        const { username, email, profile, birthday } = result.body
        this.auth.user = { username, email, profile, birthday }
        localStorage.setItem('TRdevUser', JSON.stringify(this.auth.user))
      },
      error: err => {
        console.error(`ERROR : ${err.error.body.error}`)
        if (err.status === 401) {
          this.auth.setToken(null)
        }
      }
    })
  }

  public onLoggout() {
    this.auth.setToken(null)
    this.auth.user = { username: '', profile: Profile.GUEST }
    localStorage.setItem('TRdevUser', JSON.stringify(this.auth.user))
  }

  public onCreateUser() {

  }


}
