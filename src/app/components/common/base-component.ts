import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { AuthService } from './services/auth.service'

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  protected userProfile!: string
  private sub = new Subscription()

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.sub.add(this.auth.userProfile$.subscribe(result => this.userProfile = result))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
