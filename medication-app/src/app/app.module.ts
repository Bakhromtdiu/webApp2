import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from  '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import {ReactiveFormsModule} from "@angular/forms";
import {SigninComponent} from "./login/signin.component";
import {SignupComponent} from "./login/signup.component";
import {addTokenInterceptor} from "./add-token.interceptor";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import {authGuard} from "./auth.guard";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: 'medications', pathMatch: 'full'},
      {path: 'signIn', component: SigninComponent},
      {path: 'signUp', component: SignupComponent},
      {
        path: 'medications',
        canActivate: [authGuard],
        loadChildren: () => import('./medication/medication.module').then(m => m.MedicationModule)
      },
      {path: '**', redirectTo: ''}
    ])
  ],
  providers: [provideHttpClient(withInterceptors([addTokenInterceptor]))],
  exports: [
    SigninComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
