import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { AuthService } from './services/auth.service'
import { User } from '../admin/models/user.interface'

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  protected user!: User
  private sub = new Subscription()

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(result => this.user = result)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
