import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user = new User();
  // submitted = false;
  userForm: FormGroup;


  eventFromMap = new Subject<{ lat: number, lng: number }>()

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }



  ngOnInit() {
    this.createForm();
    this.eventFromMap.subscribe(r => {
      (this.userForm as any).get('latitude').setValue(r.lat);
      (this.userForm as any).get('longitude').setValue(r.lng);
      console.log(r);
    })

  }

  createForm() {
    this.userForm = this.fb.group({
      id: this.user.id,
      name: [this.user.name, [Validators.required]],
      latitude: this.user.latitude,
      longitude: this.user.longitude

    })
  }




  // save() {
  //   this.userService
  //     .createUser(this.user).subscribe(data => {
  //       console.log(data)
  //       this.user = new User();
  //       this.gotoList();
  //     },
  //       error => console.log(error));
  // }

  submit(user: User) {
    // this.submitted = true;
    // this.save();

    console.log(user);
    this.userService
      .createUser(user).subscribe(data => {
        console.log(data)
        // this.user = new User();
        this.gotoList();
      },
        error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['/users']);
  }


}
