import { Component, ViewChild } from '@angular/core'
import { AuthService, Profile } from '../common/services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BaseFormComponent } from '../common/base-form-component'
import { Avatar } from './models/avatar.interface'
import { TokenResponse } from '../common/models/token.interface'
import { CoreService, HttpVerb } from '../common/services/core.service'
import { User } from './models/user.interface'
import { HttpResponse } from '@angular/common/http'
import { tap } from 'rxjs'
import { TableDataSource } from '../../utils/classes/tableDataSource'
import { MatIcon } from '@angular/material/icon'
import { MatTable } from '@angular/material/table'
import { HttpService } from '../common/services/http.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseFormComponent {
  public loginForm!: FormGroup
  public createForm!: FormGroup
  public avatars: Avatar[] = []
  public userList!: User[]

  // public dataSource!: TableDataSource<User>
  public displayedColumns = ['username', 'email', 'profile', '#']

  @ViewChild(MatTable)
  public userListTable!: MatTable<User[]>

  constructor(core: CoreService, auth: AuthService, formBuilder: FormBuilder) {
    super(core, auth, formBuilder)
  }

  override ngOnInit(): void {
    super.ngOnInit()
    // Get userList
    this.core.doUpdateUserList().subscribe(() => {
      this.baseSubscription.add(this.userService.userList$.subscribe(result => {
        this.userList = result
      }))
    })
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
      profile: ['guest', {nonNullable: true}],
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

  public onLoggin(a_event: Event) {
    a_event.stopPropagation()
    const body = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value
    }
    this.http.post<TokenResponse>('/users/auth', body).subscribe({
      next: result => {
        if (result.status === 200) {
                this.core.doInitForm(this.loginForm)
              }
              if (result.body) {
                this.auth.setToken(result.body.token ? result.body.token : null)
                const { id, username, email, profile, birthday } = result.body
                this.userService.user = { id, username, email, profile, birthday }
                localStorage.setItem('TRdevUser', JSON.stringify(this.userService.user))
                this.core.setDevWatch('User', this.user)
              } else {
                this.auth.setToken(null)
              }
      },
        error: err => {
          if (err.status === 401) {
            this.auth.setToken(null)
          }
        }
    })
  }

  public onLoggout(a_event: Event) {
    a_event.stopPropagation()
    this.auth.setToken(null)
    this.userService.user = { username: '', profile: Profile.GUEST }
    localStorage.setItem('TRdevUser', JSON.stringify(this.userService.user))
    this.core.setDevWatch('User', this.user)
  }

  public onCreateUser(a_event: Event) {
    a_event.stopPropagation()
    // Get values from the form to create the user
    const { profile, username, password, buffer, email, birthday, icon } = this.createForm.value
    const l_newUser = { profile, username, password, buffer, email, birthday, icon }
    this.http.post<User>('/users', l_newUser).subscribe({
      next: result => {
        if (result.status === 201) {
          this.core.doInitForm(this.createForm)
          alert(`User profile '${l_newUser.username}' created successfully`)
        } else {
          console.error(`Something went wrong! Status code: ${result.status}`)
        }
        this.core.doUpdateUserList().subscribe()
      },
      error: err => {
        console.error(`Error : ${JSON.stringify(err.message)}`)
      }
    })
  }

  public deleteUser(a_event: MouseEvent, id: number) {
    console.log(a_event)
    a_event.stopPropagation()
    this.http.delete<User>('/users', id).subscribe({
      next: result => {
        console.log(result)
        this.core.doUpdateUserList().subscribe()
      },
      error: (console.error)
    })
  }


}
