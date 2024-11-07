import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from './service/app.service';
import { Router } from '@angular/router';

interface User {
  name: string;
  email?: string;
  phone: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sample-website';
  isAdmin: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.isAdmin = false;
  };

  
  navigateToAdmin(){
    this.isAdmin = true;
  }

}
