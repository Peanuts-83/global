import { AuthService } from '../components/common/services/auth.service'
import { Injectable } from "@angular/core"
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable, catchError, tap, throwError } from "rxjs"
import { Router } from '@angular/router'

/**
 * Intercepts errors from server response
 * 403: token expired > reroute to /admin (authenticate screen)
 */
@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse<any> && (res.status >= 200 && res.status <= 299)) {
          switch (res.status) {
            case 200:
              console.log(`200 \n${JSON.stringify(res.body)}`)
              break
            case 201:
              console.log(`201 - CREATION OK \n${JSON.stringify(res.body)}`)
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
            alert(`${err.status} - Invalid credentials or token expired \n${err.message}`)
            this.auth.setToken(null)
            this.router.navigate(['/admin'])
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

}
