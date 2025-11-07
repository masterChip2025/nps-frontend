import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { SurveyFormComponent } from '../survey-form/survey-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SurveyFormComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  hasResponded = false;
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }

  handleSurveySubmit(rating: number): void {
    console.log("Calificación recibida en el dashboard:", rating);
    this.hasResponded = true;
    // Aquí es donde llamarías a tu AuthService o a otro servicio para enviar el dato al backend.
    // ej: this.surveyService.saveResponse(rating).subscribe(...);
  }
}
