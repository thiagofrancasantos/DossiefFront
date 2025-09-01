import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IFuncionario } from './models/IFuncionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  constructor(private http: HttpClient) { }

  getFuncionariosAtivos(): Observable<IFuncionario[]>{
    return this.http.get<IFuncionario[]>('http://localhost:5261/api/Funcionarios/ativos');
  }

  getFuncionariosInativos(): Observable<IFuncionario[]>{
    return this.http.get<IFuncionario[]>('http://localhost:5261/api/Funcionarios/inativos')
  }

}
