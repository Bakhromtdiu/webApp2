import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Medication } from '../data-types';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-medication',
  template: `
    <div class="container mt-3">
      <div class="input-group mb-2">
        <h2>{{medName}}</h2> 
        <button 
          *ngIf="authSvc.userStateSignal().email===medication.added_by?.email" 
          class="btn"
          (click)="onEditModalOpen()"
        ><i class="fa-regular fa-pen-to-square fa-lg"></i>
        </button>
        <button 
          *ngIf="authSvc.userStateSignal().email===medication.added_by?.email" 
          class="btn"
          (click)="onDeleteModalOpen()"
        ><i class="fa-solid fa-trash fa-lg"></i>
        </button>
      </div>

      <div class="row">
        <div class="col-2">
          <div class="text-left">
            <img style="width: 160px; height: 150px" class=" rounded float-left" *ngIf="!!medication._id" src="http://localhost:3000/medications/images/{{medication.image?._id}}" alt="image">
          </div>
        </div>

        <div class="col mt-3">
        <!-- <div class="col mt-2 border rounded-4" style="background-color: #f6faf7;"> -->
          <div><b>Generic Name: </b>{{medication.generic_name}}</div>
          <div><b>Medication Class: </b>{{medication.medication_class}}</div>
          <div><b>Availability: </b>{{medication.availability}}</div>
          <div><b>Added By: </b>{{medication.added_by?.fullname}}</div>
          <div><b>Last Modified: </b>{{medication.updatedAt | date}}</div>
        </div>
      </div>

      <app-medication-review *ngIf="!!medication._id" [medication]="medication"></app-medication-review>
    </div>

    <!-- Edit Modal -->
    <div class="modal" role="dialog" [ngStyle]="{'display': editDisplayStyle}"> 
      <app-medication-edit *ngIf="editActive"
        [medication]="medication" 
        (close)="onEditModalClose()"
        (save)="onSave($event)"
      ></app-medication-edit>
    </div>

    <!-- Delete Confirmation Dialog -->
    <div class="modal" role="dialog" [ngStyle]="{'display': deleteDisplayStyle}"> 
      <app-medication-delete
        (delete)="onDeleteConfirm($event)"
      ></app-medication-delete>
    </div>
  `,
  styles: [``]
})
export class MedicationComponent implements OnInit, OnDestroy {
  medId: string = '';
  medName = 'Updating...';
  medication: Medication = { name: '', generic_name: '', medication_class: '', availability: ''};
  subscription = new Subscription();
  editDisplayStyle = "none"; 
  deleteDisplayStyle = "none"; 
  editActive = false;

  constructor(
    private dataService: DataService,
    public authSvc: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(this.activatedRoute.paramMap
      .subscribe(param => {
        this.medId = param.get('medId') as string;
        this.loadMedication();
      }));
  }

  loadMedication() {
    const subscr = this.dataService.getMedicationById(this.medId)
      .subscribe(resp => {
        if (resp.success) {
          this.medication = resp.data as Medication;
          this.medName = this.medication.name;
        } else {
          this.toastService.error(`Couldn\'t load medication for id=${this.medId}`, 'Error!');
        }
        subscr.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEditModalOpen() { 
    this.editActive = true;
    this.editDisplayStyle = "block"; 
  } 

  onEditModalClose() {
    this.editActive = false;
    this.editDisplayStyle = "none";
  }

  onSave(formData: FormData) {
    this.editDisplayStyle = "none";

    const subscr = this.dataService.updateMedication(this.medId, formData)
    .subscribe(resp => {
      if (resp.success) {
        this.toastService.success('Medication updated successfully', 'Success!');
      } else {
        this.toastService.success('Couldn\'t update medication', 'Error!');
      }
      subscr.unsubscribe();
      this.loadMedication();
    });

  }

  onDeleteModalOpen() {
    this.deleteDisplayStyle = "block";
  }

  onDeleteConfirm(flag: boolean) {
    this.deleteDisplayStyle = "none";
    if (!flag) {
      return;
    }
    const subscr = this.dataService.deleteMedicationById(this.medId)
    .subscribe(resp => {
      if (resp.success) {
        this.toastService.success('Medication deleted successfully', 'Success!');
        this.router.navigate(['', 'medications']);
      } else {
        this.toastService.success('Couldn\'t delete medication', 'Error!');
      }
      subscr.unsubscribe();
    });
  }

}
