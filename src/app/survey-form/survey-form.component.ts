import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyService } from '../core/services/survey.service'

@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent {
  @Output() surveySubmitted = new EventEmitter<number>();

  ratings = Array.from({ length: 11 }, (_, i) => i);
  selectedRating: number | null = null;
  hoverRating: number | null = null;
  submitted = false;

  constructor(private surveyService: SurveyService) {}

  selectRating(rating: number): void {
    this.selectedRating = rating;
  }

  onMouseEnter(rating: number): void {
    this.hoverRating = rating;
  }

  onMouseLeave(): void {
    this.hoverRating = null;
  }

  isHighlighted(rating: number): boolean {
    if (this.hoverRating !== null) {
      return rating <= this.hoverRating;
    }

    if (this.selectedRating !== null) {
      return rating <= this.selectedRating;
    }
    return false;
  }

  submitSurvey(): void {
    if (this.selectedRating === null) {
      alert('Por favor, selecciona una calificación antes de enviar.');
      return;
    }

    this.surveyService.calificar(this.selectedRating).subscribe({
      next: (response) => {
        console.log('✅ Calificación enviada correctamente:', response);

        this.surveySubmitted.emit(this.selectedRating!);

        this.submitted = true;
      },
      error: (error) => {
        console.error('❌ Error al enviar la calificación:', error);
        alert('Hubo un error al enviar la calificación. Intenta nuevamente.');
      },
    });
  }
}
