import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiURL = 'http://localhost:3001/api'

  constructor(private http: HttpClient) { }

  // CRUD Operators //

  /**
   * CREATE
   * @param path
   * @param body
   * @param specPath <optionnal> (eg. skills: <"hard" | "soft">)
   * @returns Observable
   */
  public post<T>(path: string, body: any, specPath?: string): Observable<T> {
    return this.http.post<T>(`${this.apiURL}${path}${specPath}`, body)
  }

  /**
   * READ
   * @param path
   * @param specPath <optionnal> (eg. skills: <"hard" | "soft">)
   * @returns Observable
   */
  public get<T>(path: string, specPath?: string): Observable<T> {
    return this.http.get<T>(`${this.apiURL}${path}${specPath}`)
  }

  /**
   * UPDATE
   * @param path
   * @param id
   * @param body
   * @param specPath <optionnal> (eg. skills: <"hard" | "soft">)
   * @returns Observable
   */
  public put<T>(path: string, id: number, body: any, specPath?: string): Observable<T> {
    return this.http.put<T>(`${this.apiURL}${path}${specPath}/${id}`, body)
  }

  /**
   * DELETE
   * @param path
   * @param id
   * @param specPath <optionnal> (eg. skills: <"hard" | "soft">)
   * @returns Observable
   */
  public delete<T>(path: string, id: number, specPath?: string): Observable<T> {
    return this.http.delete<T>(`${this.apiURL}${path}${specPath}/${id}`)
  }
}
