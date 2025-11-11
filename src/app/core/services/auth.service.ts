import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { LOGIN_URL, REGISTER_URL } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = LOGIN_URL;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${REGISTER_URL}`, userData)
    .pipe(catchError(this.handleError));
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(token);

      const expirationDate: number = decodedToken.exp;

      const currentTime = new Date().getTime() / 1000;

      return expirationDate < currentTime;

    } catch (Error) {
      return true;
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido del servidor.';
    const backendErrorText = error.error;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // console.error(`Backend returned code ${error.status}, body was: `, backendErrorText.errors);
      if(backendErrorText.errors.Name)
      {
        console.error(`Backend returned code ${error.status}, body was: `, backendErrorText.errors.Name[0]);
        errorMessage = backendErrorText.errors.Name[0];
      }
      if(backendErrorText.errors.Password)
      {
        console.error(`Backend returned code ${error.status}, body was: `, backendErrorText.errors.Password[0]);
        errorMessage = backendErrorText.errors.Password[0];
      }
      // Error JSON
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      } else if (typeof error.error === 'string') {
        errorMessage = backendErrorText;
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

}
