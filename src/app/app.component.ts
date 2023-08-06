import { Component, OnInit } from '@angular/core'
import { BaseComponent } from './components/common/base-component'
import { Base } from './components/common/models/base.interface'
import { AuthService } from './components/common/services/auth.service'
import { HttpService } from './components/common/services/http.service'
import { CoreService } from './components/common/services/core.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {

  constructor(core: CoreService, auth: AuthService) {
    super(core, auth)
  }

  override ngOnInit(): void {
    super.ngOnInit()
    // Check for valid token in localStorage
    this.auth.getToken()

  }
}
