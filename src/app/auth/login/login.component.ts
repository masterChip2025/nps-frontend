import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => {
      },
      error: (err) => {
        this.errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
        console.error(err);
      }
    });
  }
}
