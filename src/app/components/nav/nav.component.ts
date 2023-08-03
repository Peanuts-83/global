import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { distinctUntilChanged, map, shareReplay, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  // dev tools - expand/collapse
  devShow = true

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => {
        // console.log('isHanset', result.matches)
        return result.matches}),
      shareReplay()
    );

  isSmall = false
    readonly breakpoint$ = this.breakpointObserver
      .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      tap(value => {
        if (value.breakpoints[Breakpoints.Small] || value.breakpoints[Breakpoints.XSmall]) {
          this.isSmall = true
        } else {
          this.isSmall = false
        }
        console.log('breakpoint', value)
      }),
      // distinctUntilChanged()
    );



  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpoint$.subscribe()
  }

}
