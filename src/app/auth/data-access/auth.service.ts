import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse, loginRequest, RegisterRequest } from '~/app/shared/models/auth';
import { environment } from '~/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = new BehaviorSubject<string>('');
  private apiUrl = environment.apiBaseUrl + environment.apiPath;

  constructor(private http: HttpClient) {}
  token$ = this.authToken.asObservable();

  setToken(token: string) {
    document.cookie = `token=${token}`;
  }

  clearToken() {
    document.cookie = 'token=';
  }

  getToken() {
    return document.cookie;
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signup`, request);
  }

  login(request: loginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, request);
  }
}
