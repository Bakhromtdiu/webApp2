import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Medication } from '../data-types';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-medication-edit',
  template: `
      <div class="modal-dialog" role="document"> 
        <div class="modal-content"> 
          <div class="modal-header"> 
            <h4 class="modal-title">Edit Medication</h4> 
          </div> 
          
          <div class="modal-body">
            <!-- Edit Form -->
            <form [formGroup]="form" (ngSubmit)="saveMedication()">
              <div class="form-group align-items-center">
                <!-- name -->
                <label for="nameInput" class="mb-1">Name</label>
                <input 
                  type="text" 
                  formControlName="name" 
                  class="form-control mb-2" 
                  id="nameInput"
                  placeholder="Medication name"
                >
                <div *ngIf="name.invalid && (name.dirty || name.touched)" class="text-danger">
                  <small *ngIf="name.errors?.['required']">Name is required</small>
                  <small *ngIf="name.errors?.['minlength']">Name is less than 3 characters</small>
                </div>

                <!-- generic name -->
                <label for="genericNameInput" class="mb-1">Generic Name</label>
                <input 
                  type="text" 
                  formControlName="generic_name" 
                  class="form-control mb-2" 
                  id="genericNameInput"
                  placeholder="Generic name"
                >
                <div *ngIf="genericName.invalid && (genericName.dirty || genericName.touched)" class="text-danger">
                  <small *ngIf="genericName.errors?.['required']">Generic name is required</small>
                  <small *ngIf="genericName.errors?.['minlength']">Generic name is less than 3 characters</small>
                </div>

                <!-- medication class -->
                <label for="medicationClassInput" class="mb-1">Medication Class</label>
                <input 
                  type="text" 
                  formControlName="medication_class" 
                  class="form-control mb-2" 
                  id="medicationClassInput"
                  placeholder="Medication Class"
                >
                <div *ngIf="medicationClass.invalid && (medicationClass.dirty || medicationClass.touched)" class="text-danger">
                  <small *ngIf="medicationClass.errors?.['required']">Medication class is required</small>
                  <small *ngIf="medicationClass.errors?.['minlength']">Medication class is less than 3 characters</small>
                </div>

                <!-- availability -->
                <label for="availability" class="mb-1">Availability</label>
                <div>
                  <select formControlName="availability" class="custom-select form-control custom-select-lg mb-2" id="availability">
                    <option selected value="Prescription">Prescription</option>
                    <option value="OTC">OTC</option>
                    <!-- <option value="2">Three</option> -->
                  </select>
                </div>

                <!-- image -->
                <label class="mb-1">Image</label>
                <div class="custom-file">
                  <input type="file" (change)="onFileSelect($event)" class="custom-file-input form-control mb-2" id="medication_image">
                </div>

              </div>
            </form>
          </div>

          <div class="modal-footer"> 
            <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button> 
            <button type="submit" [disabled]="!form.valid" class="btn btn-primary" (click)="saveMedication()">Save</button> 
          </div> 
        </div> 
      </div> 
  `,
  styles: [
  ]
})
export class MedicationEditComponent implements OnChanges {
  @Input() medication!: Medication;
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter<FormData>();

  file!: File;

  form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    generic_name: ['', [Validators.required, Validators.minLength(3)]],
    medication_class: ['', [Validators.required, Validators.minLength(3)]],
    availability: ['']
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    this.form.patchValue({
      name: this.medication.name,
      generic_name: this.medication.generic_name,
      medication_class: this.medication.medication_class,
      availability: this.medication.availability
    });
  }

  get name() { 
    return this.form.get('name') as FormControl; 
  }

  get genericName() { 
    return this.form.get('generic_name') as FormControl; 
  }

  get medicationClass() {
    return this.form.get('medication_class') as FormControl; 
  }

  get availability() {
    return this.form.get('availability') as FormControl; 
  }
  
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files!.length > 0) {
      this.file = input.files![0];
    }
  }   

  closeModal() {
    this.close.emit();
  }

  saveMedication() {
    const formData = new FormData();
    formData.append('name', this.name.value);
    formData.append('generic_name', this.genericName.value);
    formData.append('medication_class', this.medicationClass.value);
    formData.append('availability',this.availability.value);
    if (!!this.file) {
      formData.append('medication_image', this.file);      
    }
    
    this.save.emit(formData);
    this.form.reset();
  }

}
