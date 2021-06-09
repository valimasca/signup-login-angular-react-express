import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newUser: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signup() {
    this.userService.signUp(this.newUser).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200){
         window.alert("User Registered Successfully");
        this.router.navigate(['signin']);
      }

    })
  }

}
