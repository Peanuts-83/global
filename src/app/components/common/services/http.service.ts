import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService, Profile } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  /**
   * apiURL choice
   * backend side must be set for <HTTP | HTTPS> protocol in index.js
   * HTTP : 3001 (3000)
   * HTTPS : 4443 (443)
   */
  private apiURL = 'http://localhost:3001/api'

  constructor(private http: HttpClient, private auth: AuthService) { }

  get headers(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    // headers.set('Content-Type', 'application/json')
    // headers.set('Access-Control-Allow-Origin', '*')
    // headers.set('Content-Type', '')
    if (this.auth.token$.value) {
      headers = headers.set('Authorization', `Bearer ${this.auth.token$.value}`)
    }
    return headers
  }


  // CRUD Operators //

  /**
   * CREATE
   * @param path
   * @param body
   * @param specPath <optionnal> (eg. skills: <"/hard" | "/soft">)
   * @returns Observable
   */
  public post<T>(path: string, body: any, specPath?: string): Observable<T> {
    return this.http.post<T>(`${this.apiURL}${path}${specPath ? specPath : ''}`, body, { headers: this.headers })
  }

  /**
   * READ
   * @param path - '/path' after root path 'http://<domain>/api'
   * @param specPath <optionnal> (eg. skills: <"/hard" | "/soft">)
   * @returns Observable
   */
  public get<T>(path: string, specPath?: string): Observable<T> {
    return this.http.get<T>(`${this.apiURL}${path}${specPath ? specPath : ''}`, { headers: this.headers })
  }

  /**
   * UPDATE
   * @param path
   * @param id
   * @param body
   * @param specPath <optionnal> (eg. skills: <"/hard" | "/soft">)
   * @returns Observable
   */
  public put<T>(path: string, id: number, body: any, specPath?: string): Observable<T> {
    return this.http.put<T>(`${this.apiURL}${path}${specPath}/${id}`, body, { headers: this.headers })
  }

  /**
   * DELETE
   * @param path
   * @param id
   * @param specPath <optionnal> (eg. skills: <"/hard" | "/soft">)
   * @returns Observable
   */
  public delete<T>(path: string, id: number, specPath?: string): Observable<T> {
    return this.http.delete<T>(`${this.apiURL}${path}${specPath}/${id}`, { headers: this.headers })
  }
}
