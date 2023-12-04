import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Medication } from '../data-types';

@Component({
  selector: 'app-medication-search',
  template: `
    <div class="container mt-3">
      <h2>Medications A to Z</h2>
      <div>
        <ul>
          <li *ngFor="let f of alphabets; let i = index" class="form-group">
            <a 
              type="button" 
              class="btn" [id]="f" [name]="f" 
              (click)="onAlphabetClick($event)">
              {{f}}
            </a>
          </li>
        </ul>
      </div>

      <h2>Medication Search Result</h2>
      <div>
        <div *ngIf="!medications.length">No data found!</div>
        <button 
          *ngFor="let m of medications" 
          [routerLink]="['', 'medications', m._id]" 
          class="btn btn-sm btn-outline-secondary rounded-pill m-1">
          {{m.name}}
        </button>
      </div>

    </div>
  `,
  styles: [`
    ul {
      display: grid;
      margin-left: 0;
      margin-right: 0;
      grid-gap: 4px;
      grid-template-columns: repeat(auto-fill,minmax(40px,1fr));
      padding: 0;
      list-style: none;
    }

    ul li a {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: inherit;
      background-color: #f1f2f4;
      color: #202227;
      font-weight: 600;
    }

    ul li a:hover {
      background: #1c1c1c;
      color: green; 
    }
  `]
})
export class MedicationSearchComponent {
  alphabets = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  medications: Medication[] = [];

  constructor(
    private dataService: DataService,
    private toastService: ToastrService 
  ) {}

  onAlphabetClick(event: any) {
    const subscription = this.dataService.getMedicationsByLetter(event.target.name)
      .subscribe(resp => {
        if (resp.success) {
          this.medications = resp.data as Medication[];
          subscription.unsubscribe();
        } else {
          this.toastService.error('Failed to read medications!', 'Error!');
        }
      });
  }

}
