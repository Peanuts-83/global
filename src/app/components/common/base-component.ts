import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { AuthService } from './services/auth.service'
import { User } from '../admin/models/user.interface'
import { CoreService } from './services/core.service'

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  protected user!: User
  protected baseSubscription = new Subscription()

  constructor(public core: CoreService, public auth: AuthService) {}

  ngOnInit(): void {
    this.baseSubscription.add(this.core.userService.user$.subscribe(result => this.user = result))
  }

  ngOnDestroy(): void {
    this.baseSubscription.unsubscribe()
  }
}
