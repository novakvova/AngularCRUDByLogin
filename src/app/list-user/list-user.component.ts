import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})

export class ListUserComponent implements OnInit {

  users: User[];
  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    // this.users = [
    //   new User(12, 'Петро')
    // ];
    this.apiService.getUsers()
                      .subscribe(responce => {
                          this.users = responce;
                      });
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }

}
