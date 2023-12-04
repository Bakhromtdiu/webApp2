import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent {

  constructor(private toastr: ToastrService) {
    this.configToastService();
  }

  configToastService() {
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
    this.toastr.toastrConfig.extendedTimeOut = 3000;
  }
  
}
