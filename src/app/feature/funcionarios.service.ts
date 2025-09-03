import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IFuncionario } from './models/IFuncionario';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  private apiUrl = 'http://localhost:5261/api/Funcionarios';

  constructor(private http: HttpClient) {}

  getFuncionariosAtivos(): Observable<IFuncionario[]> {
    return this.http.get<IFuncionario[]>(`${this.apiUrl}/ativos`).pipe(
      catchError((error) => {
        console.error('Error fetching active funcionarios:', error);
        return throwError(() => new Error('Failed to fetch active employees'));
      })
    );
  }

  getFuncionariosInativos(): Observable<IFuncionario[]> {
    return this.http.get<IFuncionario[]>(`${this.apiUrl}/inativos`).pipe(
      catchError((error) => {
        console.error('Error fetching inactive funcionarios:', error);
        return throwError(() => new Error('Failed to fetch inactive employees'));
      })
    );
  }

  getFuncionarioById(id: string): Observable<IFuncionario> {
    return this.http.get<IFuncionario>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching funcionario with id ${id}:`, error);
        return throwError(() => new Error(`Failed to fetch employee with id ${id}`));
      })
    );
  }

  updateFuncionario(id: string, formData: FormData): Observable<IFuncionario> {
    return this.http.put<IFuncionario>(`${this.apiUrl}/${id}`, formData).pipe(
      catchError((error) => {
        console.error(`Error updating funcionario with id ${id}:`, error);
        return throwError(() => new Error(`Failed to update employee with id ${id}`));
      })
    );
  }

  deleteFuncionario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting funcionario with id ${id}:`, error);
        return throwError(() => new Error(`Failed to delete employee with id ${id}`));
      })
    );
  }

createFuncionario(formData: FormData): Observable<{ message: string; funcionario: IFuncionario }> {
    return this.http.post<{ message: string; funcionario: IFuncionario }>(this.apiUrl, formData).pipe(
      catchError((error) => {
        console.error('Error creating funcionario:', error);
        return throwError(() => new Error('Failed to create employee'));
      })
    );
  }
}