import { AuthService } from '../components/common/services/auth.service'
import { Injectable } from "@angular/core"
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable, catchError, tap, throwError } from "rxjs"
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'
import { SnackMessageComponent } from './components/snack-message/snack-message.component'
import { CoreService } from '../components/common/services/core.service'

/**
 * Intercepts errors from server response
 * 403: token expired > reroute to /admin (authenticate screen)
 */
@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  constructor(private _router: Router, private _auth: AuthService, private _snackBar: MatSnackBar, private _route: ActivatedRoute, public core: CoreService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse<any> && (res.status >= 200 && res.status <= 299)) {
          switch (res.status) {
            case 200:
              console.log(`200 \n${JSON.stringify(res.body)}`)
              this.displayMsg('Operation successfull - OK')
              break
            case 201:
              console.log(`201 - CREATION OK \n${JSON.stringify(res.body)}`)
              this.displayMsg('Creation successfull - OK')
              break
            default:
              console.log(`${res.status} - ${res.statusText}`)
          }
        }
      }),
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 400:
            console.error(`400 - Error request \n${err.message}`)
            break
          case 401:
          case 403:
            this.displayMsg(err.error.body.message, 'alert')
            break
          case 404:
            console.error(`404 - Not found \n${err.message}`)
            break
          case 500:
            console.error(`500 - Server error \n${err.message}`)
            break
          default:
            console.error(`${err.status} - Error \n${err.message}`)
        }
        return throwError(() => err)
      })
    )
  }

  private displayMsg(message: string, type: string = 'success') {
    this._snackBar.openFromComponent(SnackMessageComponent, {
      duration: 2 * 1000,
      announcementMessage: message,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type
    })
  }
}
