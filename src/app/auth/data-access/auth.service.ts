import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterRequest } from '~/app/shared/models/auth';
import { environment } from '~/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = new BehaviorSubject<string>('');
  private apiUrl = environment.apiBaseUrl + environment.apiPath;

  constructor(private http: HttpClient) {}
  token$ = this.authToken.asObservable();

  setToken(token: string) {
    document.cookie = token;
  }

  clearToken() {
    document.cookie = '';
  }

  getToken() {
    return document.cookie;
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, request);
  }
}
