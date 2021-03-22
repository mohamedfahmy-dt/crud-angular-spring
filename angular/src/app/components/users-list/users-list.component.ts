import { UserService } from "src/app/services/user.service";
import { User } from "src/app/model/user.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';



@Component({
  selector: "app-user-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['id', 'name', 'latitude', 'longitude', 'option'];
  dataSource: User[] = [];


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUsers();

  }



  private getUsers() {
    this.userService.getUserList().subscribe(data => {
      this.dataSource = data;
      console.log(data);
    });
  }


  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.getUsers();
        },
        error => console.log(error));
  }

  updateUser(id: number) {
    this.router.navigate(['update', id])
  }
}


