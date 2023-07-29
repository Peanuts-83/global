import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CoreService implements OnInit, OnDestroy {

  public subscriptions: Subscription = new Subscription()

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
