import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-medication-delete',
  template: `
      <div class="modal-dialog" role="document"> 
        <div class="modal-content"> 
          <div class="modal-header"> 
            <h4 class="modal-title">Delete Medication</h4> 
          </div> 
          
          <div class="modal-body">
            Are you sure to delete?
          </div> 

          <div class="modal-footer"> 
            <button type="button" class="btn btn-secondary" (click)="onDelete(false)">NO</button> 
            <button type="button" class="btn btn-primary" (click)="onDelete(true)">YES</button> 
          </div> 
        </div> 
      </div> 
  `,
  styles: [``]
})
export class MedicationDeleteComponent {
  @Output() delete = new EventEmitter<boolean>();

  onDelete(flag: boolean) {
    this.delete.emit(flag);
  }
}
