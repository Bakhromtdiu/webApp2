import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {User} from "../data-types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  template: `
    <section class="vh-100 bg-image">
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px;">
                <div class="card-body p-5">
                  <h3 class="text-uppercase text-center mb-5">Create an account</h3>

                  <form [formGroup]="form" (ngSubmit)="go()">
                    <div class="form-outline mb-4">
                      <input formControlName="fullname" placeholder="Full name" type="text" class="form-control form-control-md" />
                      <div *ngIf="fullname.invalid && (fullname.dirty || fullname.touched)" class="text-danger">
                        <small *ngIf="fullname.errors?.['required']">Fullname is required</small>
                      </div>
                    </div>

                    <div class="form-outline mb-4">
                      <input formControlName="email" placeholder="Email" type="email" class="form-control form-control-md" />
                      <div *ngIf="email.invalid && (email.dirty || email.touched)" class="text-danger">
                        <small *ngIf="email.errors?.['required']">Email is required</small>
                        <small *ngIf="email.errors?.['email']">Invalid email</small>
                      </div>
                    </div>

                    <div class="form-outline mb-4">
                      <input formControlName="password" type="password" placeholder="Password" class="form-control form-control-md" />
                      <div *ngIf="pass.invalid && (pass.dirty || pass.touched)" class="text-danger">
                        <small *ngIf="pass.errors?.['required']">Password is required</small>
                        <small *ngIf="pass.errors?.['minlength']">Password length is less than 4</small>
                      </div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button type="submit" [disabled]="!form.valid"
                              class="btn btn-primary btn-lg">Register</button>
                    </div>

                    <p class="text-center text-muted mt-4 mb-0">Already have an account? <button (click)="go_to_signIn()"
                                                                                                 class="btn btn-info"><u>Login here</u></button></p>

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
export class SignupComponent {
  form = inject(FormBuilder).nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  #auth = inject(AuthService);
  #router = inject(Router);


  get fullname() {
    return this.form.get('fullname') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get pass() {
    return this.form.get('password') as FormControl;
  }

  go() {
    this.#auth.signup(this.form.value as User).subscribe(response => {
      console.log("signed up successfully");
      this.#router.navigate(['/signIn']);
    });
  }

  go_to_signIn(){
    this.#router.navigate(["/signIn"]) ;
  }
}
