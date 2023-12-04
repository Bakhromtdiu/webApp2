import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Review } from '../data-types';

@Component({
  selector: 'app-medication-review-add-edit',
  template: `
      <div class="modal-dialog" role="document"> 
        <div class="modal-content"> 
          <div class="modal-header"> 
            <h4 class="modal-title">{{editMode ? "Edit": "Add"}} Review</h4> 
          </div> 
          
          <div class="modal-body">
            <!-- Edit Form -->
            <form [formGroup]="form" (ngSubmit)="saveReview()">
              <div class="form-group align-items-center">
                <!-- review -->
                <label for="reviewInput" class="mb-1">Review</label>
                <textarea formControlName="review" placeholder="Review" class="form-control" rows="6" maxlength="1000"></textarea>
                <div *ngIf="review.invalid && (review.dirty || review.touched)" class="text-danger">
                  <small *ngIf="review.errors?.['required']">Review is required</small>
                  <small *ngIf="review.errors?.['minlength']">Review is less than 5 characters</small>
                </div>

                <label for="rating">Rating</label>
                <select formControlName="rating" id="rating" class="custom-select form-control custom-select-lg mb-2">  
                  <option [value]="num" *ngFor="let num of ratingValues">{{num}}</option>  
                </select>  

              </div>
            </form>
          </div>

          <div class="modal-footer"> 
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button> 
            <button type="submit" [disabled]="!form.valid" class="btn btn-primary" (click)="saveReview()">Save</button> 
          </div> 

        </div> 
      </div> 
  `,
  styles: [
  ]
})
export class MedicationReviewAddComponent implements OnInit {
  @Input() medicationId: string = '';
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter<Review>();
  ratingValues = [1,2,3,4,5,6,7,8,9,10];
  @Input() editMode: boolean = false; 
  @Input() reviewInput!: Review;

  form = this.formBuilder.nonNullable.group({
    review: ['', [Validators.required, Validators.minLength(5)]],
    rating: [1],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (this.editMode && !!this.reviewInput) {
      this.form.patchValue({review: this.reviewInput.review, rating: this.reviewInput.rating})
    }
  }

  get review() {
    return this.form.get('review') as FormControl;
  }

  get rating() {
    return this.form.get('rating') as FormControl;
  }

  saveReview() {
    this.save.emit(<Review>{...this.reviewInput, 
      review: this.review.value,
      rating: this.rating.value
    });
    this.form.reset();
  }

  closeModal() {
    this.close.emit();
    this.form.reset();
  }
}
