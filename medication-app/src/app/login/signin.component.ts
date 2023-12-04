import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, JWT} from "../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../data-types";
import {jwtDecode} from "jwt-decode";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signin',
  template: `
<section class="vh-100 bg-image">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h3 class="text-uppercase text-center mb-4">Login</h3>

              <form [formGroup]="form" (ngSubmit)="go()">
                <div class="form-outline mb-4">
                  <input placeholder="Email" formControlName="email" type="email" class="form-control form-control-md" />
                  <div *ngIf="email.invalid && (email.dirty || email.touched)" class="text-danger">
                    <small *ngIf="email.errors?.['required']">Email is required</small>
                    <small *ngIf="email.errors?.['email']">Invalid email</small>
                  </div>
                </div>
                <div class="form-outline mb-4">
                  <input placeholder="Password" formControlName="password" type="password" class="form-control form-control-md" />
                  <div *ngIf="pass.invalid && (pass.dirty || pass.touched)" class="text-danger">
                    <small *ngIf="pass.errors?.['required']">Password is required</small>
                    <small *ngIf="pass.errors?.['minlength']">Password length is less than 4</small>
                  </div>
                </div>
                <div class="d-flex justify-content-center">
                  <button type="submit" [disabled]="!form.valid"
                          class="btn btn-primary btn-md">Log In</button>
                </div>
                <p class="text-center text-muted mt-4 mb-0">Don't have an account? <button (click)="toSignUP()"
                                                                                             class="btn btn-info"><u>Register Here</u></button></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  `,
  styles: [`
    .gradient-custom-3 {
      background: #84fab0;
      background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));
      background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))
    }
  `]
})
export class SigninComponent {
  form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(
    private toastService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.form.get('email') as FormControl;
  }

  get pass() {
    return this.form.get('password') as FormControl;
  }

  go() {
       this.authService.signin(this.form.value as User)
         .subscribe(response=> {
           if (response.success) {
             const decoded = jwtDecode(response.data) as JWT ;
             const state = {
               ...decoded, jwt:response.data
             }
             this.authService.userStateSignal.set(state) ;
             localStorage.setItem('STORAGE_JWT', JSON.stringify(state))
             this.toastService.success('Signed in successfully', 'Success!') ;
             this.router.navigate(['']);
           } else {
             this.toastService.error('Signed in failed!', 'Error!') ;
           }
       });
  }

  toSignUP(){
    this.router.navigate(["/signUp"]);
  }
}
