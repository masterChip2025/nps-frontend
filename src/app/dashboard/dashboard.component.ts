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
    // this.surveyService.saveResponse(rating).subscribe(...);
  }
}
