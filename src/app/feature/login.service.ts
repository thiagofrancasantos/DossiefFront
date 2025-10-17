import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // endpoint relativo via proxy
  
  public apiUrl = environment.apiUrlAD;


  constructor(private http: HttpClient) {}

  login(credentials: any,  keepMeConnected: boolean = false): Observable<boolean> {
    // A API retorna true ou false
    return this.http.post<boolean>(this.apiUrl, credentials);
  }
}
