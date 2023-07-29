import { Component } from '@angular/core'
import { AuthService } from '../common/services/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BaseFormComponent } from '../common/base-form-component'
import { BirthdayValidator } from 'src/app/utils/validators/birthday.validator'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent extends BaseFormComponent {
  public baseForm!: FormGroup
  public avatars = [{url:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser-avatar_6596121&psig=AOvVaw36z07fz-NtImFn3_eYcBVq&ust=1690661325965000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICsxrCasoADFQAAAAAdAAAAABAE', text:'avatar 1'}, {url:'https://static.vecteezy.com/system/resources/previews/014/194/215/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg', text:'avatar 2'}, {url:'https://media.istockphoto.com/id/1331335536/vector/female-avatar-icon.jpg?s=170667a&w=0&k=20&c=-iyD_53ZEeZPc4SmvmGB1FJXZcHy_fvbJBv6O8HblHs=', text: 'avatar 3'} ]

  constructor(auth: AuthService, formBuilder: FormBuilder) {
    super(auth, formBuilder)
  }

  override ngOnInit(): void {
    super.ngOnInit()
    this.baseForm = this.formBuilder.group({
      username: ['', [Validators.required]],
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
      password: ["", [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')]],
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
  }

  public onSubmit() {

  }
}
