import { Component } from '@angular/core'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { CoreService } from '../common/services/core.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  // devtool - expand/collapse
  devShow = true
  // devtool values to display
  devWatch = {}

  // small screens - show off nav bar
  isSmall = false

  /**
   * Breakpoints observer
   */
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => {
        return result.matches
      }),
      shareReplay()
    );

    /**
     * Breakpoint value
     * watch for large/medium/small/xsmall sizes
     */
  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      tap(value => {
        if (value.breakpoints[Breakpoints.Small] || value.breakpoints[Breakpoints.XSmall]) {
          this.isSmall = true
        } else {
          this.isSmall = false
        }
        // report screen size to devtool
        this.devWatch = { ...this.devWatch, breakpoints: value }
        this.core.devWatch$.next(this.devWatch)
      }),
      distinctUntilChanged()
    );



  constructor(private breakpointObserver: BreakpointObserver, private core: CoreService) {
    this.breakpoint$.subscribe()
    // report devtool to core service
    this.core.devWatch$.subscribe(result => this.devWatch = result)
  }

}
