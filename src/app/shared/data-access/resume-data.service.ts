import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '~/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResumeDataService {
  // private authToken = new BehaviorSubject<string>('');
  private baseUrl = '/resume-data';
  private apiUrl = environment.apiBaseUrl + environment.apiPath + this.baseUrl;

  constructor(private http: HttpClient) {}

  getResumeDataByUserId(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
