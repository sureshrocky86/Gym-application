import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';

interface User {
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

users: User[] = [];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  

  fetchUsers() {
    this.appService.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

}
