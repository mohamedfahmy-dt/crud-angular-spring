import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/model/user";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";



@Component({
  selector: "app-user-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"]
})
export class UsersListComponent implements OnInit {
  users: Observable<User[]>;
  // ELEMENT_DATA: User[];
  // displayedColumns: string[] = ['id', 'name'];
  // dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    // this.AllUsers();
    this.reloadData();
  }

  // AllUsers() {
  //   let response = this.service.getAllUsers();
  //   response.subscribe(report => this.dataSource.data = report as User[]);
  // }

  reloadData() {
    this.users = this.userService.getUsersList();
  }


  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  updateUser(id: number) {
    this.router.navigate(['update', id])
  }




}