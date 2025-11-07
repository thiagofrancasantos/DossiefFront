import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  public apiUrl = environment.apiUrlAD;


  constructor(private http: HttpClient) {}

  login(credentials: any,  keepMeConnected: boolean = false): Observable<boolean> {
    // A API retorna true ou false daí valida ou n
    return this.http.post<boolean>(this.apiUrl, credentials);
  }
}
