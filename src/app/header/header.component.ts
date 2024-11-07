import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 routers = inject(Router)

  constructor(private appcmp: AppComponent) { }

  ngOnInit(): void {
  }

  navigateToAdmin(){
    this.routers.navigate(['admin']);
    //this.appcmp.navigateToAdmin();
  }

}
