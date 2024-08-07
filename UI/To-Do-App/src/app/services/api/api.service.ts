import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  get<T>(url: string,params?:HttpParams): Observable<T> 
  {
    if(params)
      {
        return this.http.get<T>(url,{params:params});
      }
    else
    {
      return this.http.get<T>(url);
    }
  }
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }
  put<T>(url: string, body?: any): Observable<T> {
    return this.http.put<T>(url, body);
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
