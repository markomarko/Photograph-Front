import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/dataServices';
import { User } from '../model/user';

@Component({
  selector: 'app-customer-component',
  templateUrl: 'customer.component.html',
  styles: []
})
export class CustomerComponent implements OnInit {
  public users: User[] = [];
  public isAdmin = false;

  constructor(private route: Router, private data: DataService) {}

  ngOnInit(): void {
    const token = this.data.getDecodedToken(localStorage.access_token);
    if (token) {
      this.isAdmin = token.role === 'Admin';
    } else {
      this.isAdmin = false;
    }
    this.getUsers();
  }

  getUsers() {
    this.data.getUsers().subscribe((apiUsers: User[]) => {
      this.users = apiUsers;
    });
  }

  banSubscriber(user: User) {
    this.data.deleteUser(user.id).subscribe(() => {
      this.getUsers();
    });
  }
}
