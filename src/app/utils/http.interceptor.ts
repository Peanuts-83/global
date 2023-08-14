import { AuthService } from './../components/common/services/auth.service'
import { Injectable } from "@angular/core"
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, catchError, throwError } from "rxjs"
import { Router } from '@angular/router'

/**
 * Intercepts errors from server response
 * 403: token expired > reroute to /admin (authenticate screen)
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        switch (err.status) {
          case 403:
            alert(`Token expired - ${err.message}`)
            this.auth.setToken(null)
            this.router.navigate(['/admin'])
            break
          case 500:
            alert(`Server error - ${err.message}`)
            break
          default:
            alert(`Error in response - ${err.message}`)
        }
        return throwError(() => err)
      })
    )
  }

}
