import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CREATE_RATING_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class SurveyService
{
  private apiUrl = CREATE_RATING_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  calificar(calificacionValor: number): Observable<any> {
    const url = `${this.apiUrl}/calificar`;
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const body = { calificacionValor };
    return this.http.post(url, body, { headers });
  }

  verificarSiYaRespondio(): Observable<{ yaRespondio: boolean }> {
    return this.http.get<{ yaRespondio: boolean }>(`${this.apiUrl}/yaRespondio`);
  }
}
