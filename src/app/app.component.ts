import { Component, OnInit } from '@angular/core'
import { BaseComponent } from './components/common/base-component'
import { Base } from './components/common/models/base.interface'
import { AuthService } from './components/common/services/auth.service'
import { HttpService } from './components/common/services/http.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends BaseComponent implements OnInit {

  constructor(auth: AuthService, public http: HttpService) {
    super(auth)
  }

  override ngOnInit(): void {
    super.ngOnInit()
    // Check for valid token in localStorage
    this.auth.getToken()
    if (localStorage.getItem('TRdevUser')) {
      const jsonValue = localStorage.getItem('TRdevUser')
      if (jsonValue) {
        this.auth.user = JSON.parse(jsonValue)
        this.auth.userProfile = this.auth.user.profile
      }
    }
  }
}
