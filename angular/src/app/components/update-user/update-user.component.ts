import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user = new User();
  userForm: FormGroup;
  eventFromMap = new Subject<{ lat: number, lng: number }>()
  // submitted = false;

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();

    this.id = this.route.snapshot.params['id'];

    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.user = data;
        this.createForm();
      }, error => console.log(error));


    this.eventFromMap.subscribe(r => {
      (this.userForm as any).get('latitude').setValue(r.lat);
      (this.userForm as any).get('longitude').setValue(r.lng);
      console.log(r);
    })

  }

  update(user: User) {
    this.userService
      .updateUser(this.id, user).subscribe(data => {
        console.log(data);
        this.user = new User();
        this.gotoList();
      },
        error => console.log(error));
  }

  createForm() {
    this.userForm = this.fb.group({
      id: this.user.id,
      name: [this.user.name, [Validators.required]],
      latitude: this.user.latitude,
      longitude: this.user.longitude

    })
  }

  // onSubmit() {
  //   this.updateUser();
  //   this.submitted = true;
  // }

  gotoList() {
    this.router.navigate(['/users']);
  }
}
