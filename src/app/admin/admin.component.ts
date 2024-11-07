import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnabledBlockingInitialNavigationFeature, Router } from '@angular/router';
import { AppService } from '../service/app.service';
import { animate } from '@angular/animations';

export interface Admin {
  loginID?: string;
  password?: string
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isLoggedAsAdmin: boolean = false;
  showSuccessOrErrorModal: boolean = false;
  successOrFailureMessage: string = '';
  router = inject(Router)
  appService = inject(AppService);

  admin: any[] = [];
  adminDetails: Admin = {
    loginID: '',
    password: ''
  }
  respType: any = '';

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('adminToken', 'disable');
  }

  navigateToRegister() {
    this.router.navigate(['/home']);
  }

  onSubmit(adminForm: NgForm) {
    this.fetchAdmin();
    adminForm.resetForm();
  }

  closeModal() {
    this.showSuccessOrErrorModal = false; // Hide the modal
    this.successOrFailureMessage = ''
  };

  fetchAdmin() {
    this.appService.getAdminDetails(this.adminDetails).subscribe(resp => {
      console.log(resp);
      this.isLoggedAsAdmin = resp.isLoggedAsAdmin;
      if (resp.isLoggedAsAdmin) {
        this.router.navigate(['/registerDetails']);
        localStorage.setItem('adminToken', 'active'); // Store token or flag
      } else {
        this.showSuccessOrErrorModal = true;
        this.successOrFailureMessage = resp.message +', please try again!';
        this.respType = "failure";
      }
    })
  };
}