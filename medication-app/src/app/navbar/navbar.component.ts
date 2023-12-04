import {Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-dark bg-dark justify-content-between">
      <a class="navbar-brand m-2 text-warning">
        <i class="fa-solid fa-capsules fa-rotate-270" style="color: #edbd0c;"></i>
        <b> MEDICATION</b>
      </a>

      <div>
        <button *ngIf="authService.userStateSignal().jwt" [routerLink]="['', 'medications']" class="btn btn-sm btn-outline-secondary rounded-pill m-1"><i class="fa-solid fa-tablets fa-lg"></i> Medications</button>
        <button *ngIf="authService.userStateSignal().jwt" [routerLink]="['', 'medications', 'add']" class="btn btn-sm btn-outline-secondary rounded-pill m-1"><i class="fa-solid fa-circle-plus fa-lg"></i> Add Medication</button>
        <button *ngIf="authService.userStateSignal().jwt" (click)="signout()" class="btn btn-sm btn-outline-secondary rounded-pill m-1"><i class="fa-solid fa-arrow-right-from-bracket fa-lg"></i> SignOut</button>
<!--        <button *ngIf="!authService.userStateSignal().jwt" (click)="signin()" class="btn btn-sm btn-outline-secondary rounded-pill m-1"><i class="fa-solid fa-user fa-lg"></i> SignIn</button>-->
<!--        <button *ngIf="!authService.userStateSignal().jwt" (click)="signup()" class="btn btn-sm btn-outline-secondary rounded-pill m-1"><i class="fa-solid fa-user-plus fa-lg"></i> SignUp</button>-->

      </div>
      <ng-template #welcome>
        <p>Welcome {{authService.userStateSignal().email}}</p>
        <button (click)="signout()">Sign Out</button>
      </ng-template>
    </nav>
  `,
  styles: [``]
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signout() {
    this.authService.signout();
    this.toastr.success('Singed out successfully!', 'Success!');
    this.router.navigate(['/signIn'])
  }

  signin() {
    this.router.navigate(['/signIn']);
  }

  signup() {
    this.router.navigate(['/signOut']);
  }
}
