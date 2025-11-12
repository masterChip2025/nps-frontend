import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { SurveyFormComponent } from '../survey-form/survey-form.component';
import { SurveyService } from '../core/services/survey.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SurveyFormComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userRole: string | null = null;
  hasResponded = false;
  loading = true;
  stats: any = null;
  constructor
  (
    private authService: AuthService,
    private surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();

    if (this.userRole === 'Votante') {
      this.surveyService.verificarSiYaRespondio().subscribe({
        next: (res) => {
          this.hasResponded = res.yaRespondio;

          this.loading = false;
        },
        error: (err) => {
          console.error('Error al verificar respuesta:', err);
          this.loading = false;
        }
      });
    } else if (this.userRole === 'Admin') {
      this.surveyService.obtenerEstadisticas().subscribe({
        next: (res) => {
          console.log('📊 Estadísticas recibidas:', res);
          this.stats = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al obtener estadísticas:', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  handleSurveySubmit(rating: number): void {
    console.log("Calificación recibida en el dashboard:", rating);
    this.hasResponded = true;
    // this.surveyService.saveResponse(rating).subscribe(...);
  }
}
