import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken = new BehaviorSubject<string>('');

  constructor() {}
  token$ = this.authToken.asObservable();

  setToken(token: string) {
    this.authToken.next(token);
  }
}
