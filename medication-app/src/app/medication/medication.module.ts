import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MedicationSearchComponent } from './medication-search.component';
import { MedicationComponent } from './medication.component';
import { MedicationAddComponent } from './medication-add.component';
import { MedicationReviewComponent } from './medication-review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicationEditComponent } from './medication-edit.component';
import { MedicationDeleteComponent } from './medication-delete.component';
import { MedicationReviewAddComponent } from './medication-review-add-edit.component';

@NgModule({
  declarations: [
    MedicationSearchComponent,
    MedicationComponent,
    MedicationAddComponent,
    MedicationReviewComponent,
    MedicationEditComponent,
    MedicationDeleteComponent,
    MedicationReviewAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: MedicationSearchComponent},
      {path: 'add', component: MedicationAddComponent},
      {path: ':medId', component: MedicationComponent},
      {path: ':medId/:reviewId', component: MedicationReviewComponent},
    ])
  ]
})
export class MedicationModule { }
