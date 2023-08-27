import { Component, OnInit } from '@angular/core'
import { BaseComponent } from './components/common/base-component'
import { AuthService } from './components/common/services/auth.service'
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
    // Check for valid token and credentials
    this.auth.getToken()
    if (this.user.id) {
      // if token available, perform checkTokenValidity request on userId
      this.core.doCheckTokenValidity(this.user.id!).subscribe({
        error: () => this.core.doDisconnect()
      })
    } else {
      this.core.doDisconnect()
    }

  }
}
