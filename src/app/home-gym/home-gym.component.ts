import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { NgForm } from '@angular/forms';

interface User {
  name: string;
  email?: string;
  phone: string;
}

@Component({
  selector: 'app-home-gym',
  templateUrl: './home-gym.component.html',
  styleUrls: ['./home-gym.component.css']
})
export class HomeGymComponent implements OnInit {
  users: any[] = [];
  newUser: User = {
    name: '',
    email: '',
    phone: ''
  };
  isNumberExists: boolean = false;

  successOrFailureMessage: string = '';
  showSuccessOrErrorModal: boolean = false;
  respType: any;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    localStorage.setItem('adminToken', 'disable');
  }


  onSubmit(registrationForm: NgForm) {
    console.log(registrationForm);
    if (this.newUser.name && this.isValidEmail(this.newUser.email) && this.isValidMobile(this.newUser.phone)) {
      this.addUser();
      if (!this.isNumberExists) {
        console.log('User registered:', this.newUser);

      };
      // Reset the form after submission
      registrationForm.resetForm(); // Reset the form state
      this.newUser = { name: '', email: '', phone: '' }; // Reset user object
    } else {
      this.respType = "failure";
      this.showSuccessOrErrorModal = true; // Show the modal
      this.successOrFailureMessage = `Registered failed, Please try again.`;

      // Reset the form after submission
      //registrationForm.resetForm(); // Reset the form state
      //alert('Please enter valid details.');
    }
  }

  isValidEmail(email: any): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email === '') {
      return true;
    }
    return emailPattern.test(email);
  };

  isValidMobile(phone: string): boolean {
    const phonePattern = /^[0-9]+$/;
    if (phone?.startsWith('+91')) {
      return phone?.length === 14 || phone?.length === 13
    } else if (phone?.length != 0) {
      return phonePattern.test(phone) && phone?.length === 10;
    } else {
      return phone?.length <= 10;
    }
  };

  closeModal() {
    this.showSuccessOrErrorModal = false; // Hide the modal
    this.successOrFailureMessage = ''
  };

  getUserDetails(): any {
    if (!this.newUser.email) {
      const userDetails = {
        name: this.newUser.name,
        phone: this.newUser.phone,
        email: ''
      }
      return userDetails
    } else {
      const userDetailsWithEmail: User = {
        name: this.newUser.name,
        phone: this.newUser.phone,
        email: this.newUser.email
      }
      return userDetailsWithEmail
    }
  }

  addUser() {
    this.appService.createUser(this.getUserDetails()).subscribe((resp: any) => {
      console.log(resp);
      if (resp.error) {
        this.respType = "failure";
        this.showSuccessOrErrorModal = true; // Show the modal
        this.successOrFailureMessage = resp.message;
      } else {
        this.users.push(resp);
        this.respType = "success";
        this.successOrFailureMessage = `Registration successful, our team will \nreach out you shortly to Mobile: ${resp?.phone}.`;
        this.showSuccessOrErrorModal = true; // Show the modal
      }
    });
  }

  isEnteredName(): boolean {
    return this.newUser.name != '' || this.newUser.name != null || this.newUser.name != undefined
  }

}
