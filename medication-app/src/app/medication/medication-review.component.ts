import { Component, Input, OnInit } from '@angular/core';
import { Medication, Review } from '../data-types';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-medication-review',
  template: `
    <div class="input-group mt-3">
      <h2>Reviews for {{medication.name}}</h2>
      <button
          class="btn"
          (click)="openAddModal()"
        ><i class="fa-solid fa-circle-plus fa-lg"></i>
        </button>
    </div>
    
    <div  *ngFor="let review of reviews">
      <!-- header -->
      <div class="container mt-2 mb-2 border rounded-4" style="background-color: #FFFFF1;">
        <div class="input-group m-2 d-flex justify-content-between">
          <span>Reviewer: {{review.by?.fullname}} - Last Updated: {{review.date | date}}</span>
          <div class="mb-2"> 
            <button 
              *ngIf="authSvc.userStateSignal()._id===review.by?.user_id"
              class="btn"
              (click)="openEditModal(review)"
            ><i class="fa-regular fa-pen-to-square fa-lg"></i>
            </button>
            <button 
              *ngIf="authSvc.userStateSignal()._id===review.by?.user_id"
              class="btn"
              (click)="deleteReview(review)"
            ><i class="fa-solid fa-trash fa-lg"></i>
            </button>
          </div>
        </div>

        <!-- review description -->
        <div class="m-2">
          <p class="">{{review.review}}</p>
        </div>

        <!-- rating -->
        <div class="m-2">
          <span class="">Rating: {{review.rating}}/10</span>
          <div class="progress mt-1 mb-2 col-3">
            <div 
              class="progress-bar bg-secondary" role="progressbar" 
              [ngStyle]="{'width': getRating(review)}">
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Add Modal -->
    <div class="modal" role="dialog" [ngStyle]="{'display': addDisplayStyle}"> 
      <app-medication-review-add-edit *ngIf="addActive"
        [medicationId]="medication._id ?? ''"
        [editMode]="false"
        (close)="onAddModalClose()"
        (save)="onAdd($event)"
      ></app-medication-review-add-edit>
    </div>

    <!-- Edit Modal -->
    <div class="modal" role="dialog" [ngStyle]="{'display': editDisplayStyle}"> 
      <app-medication-review-add-edit *ngIf="editActive"
        [medicationId]="medication._id ?? ''" 
        [editMode]="true"
        [reviewInput]="editReview"
        (close)="onEditModalClose()"
        (save)="onEdit($event)"
      ></app-medication-review-add-edit>
    </div>


  `,
  styles: [``]
})
export class MedicationReviewComponent implements OnInit {
  @Input() medication!: Medication;
  reviews: Review[] = [];
  addDisplayStyle = 'none';
  addActive = false;
  editDisplayStyle = 'none';
  editActive = false;
  editReview: Review = {_id: '', review: '', rating: 1};

  constructor(
    private dataService: DataService,
    private toastService: ToastrService,
    public authSvc: AuthService
  ) {}

  getRating(review: Review) {
    return `${review.rating * 10}%`;
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    const subscr = this.dataService.getReviews(this.medication._id ?? '')
    .subscribe(resp => {
      if (resp.success) {
        this.reviews = resp.data as Review[];       
      } else {
        this.toastService.error('Failed to load reviews!', 'Error!');
      }
    });
  }

  // delete review
  deleteReview(review: Review) {
    const subscr = this.dataService.deleteReviewById(this.medication._id ?? '', review._id)
    .subscribe(resp => {
      if (resp.success) {
        this.toastService.success('Review deleted successfully', 'Success!');
        this.loadReviews();
      } else {
        this.toastService.success('Couldn\'t delete review', 'Error!');
      }
      subscr.unsubscribe();
    });
  }

  // add review
  openAddModal() {
    this.addDisplayStyle = 'block';
    this.addActive = true;
  }

  onAddModalClose() {
    this.addDisplayStyle = 'none';
    this.addActive = false;
  }

  onAdd(review: Review) {
    this.addDisplayStyle = 'none';
    this.addActive = false;

    const subscr = this.dataService.addReview(this.medication._id??'', review)
      .subscribe(resp => {
        if (resp.success) {
          this.toastService.success('Review added successfully!', 'Success!');
          this.loadReviews();
        } else {
          this.toastService.error('Failed to add review!', 'Error!');

        }
        subscr.unsubscribe();
      });
  }

  addReview(medId: string, review: Review) {
    const subsc = this.dataService.addReview(medId, review)
    .subscribe(resp => {
      console.log('Add Review Response: ', resp);
      subsc.unsubscribe();
    });
  }

  // edit review 
  openEditModal(review: Review) {
    this.editReview = review;
    this.editActive = true;
    this.editDisplayStyle = 'block';
  }

  onEditModalClose() {
    this.editActive = false;
    this.editDisplayStyle = 'none';
  }

  onEdit(review: Review) {
    this.editActive = false;
    this.editDisplayStyle = 'none';

    const subscr = this.dataService.updateReview(this.medication._id??'', review._id, review)
      .subscribe(resp => {
        if (resp.success) {
          this.toastService.success('Review updated successfully!', 'Success!');
          this.loadReviews();
        } else {
          this.toastService.error('Failed to update review!', 'Error!');
        }
        subscr.unsubscribe();
      });
  }

}
