import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { DataService } from '../shared/dataServices';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User = new User();

  constructor(private data: DataService, private route: ActivatedRoute) {
    const id = this.route.snapshot.params.id;
    this.getUser(id);
  }

  ngOnInit() {}

  getUser(id: string): void {
    this.data.getUser(id).subscribe((user: User) => {
      this.user = user;
    });
  }
}
