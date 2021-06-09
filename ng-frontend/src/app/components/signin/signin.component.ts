import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginform = {
    username: "",
    password:""
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signin(){
    this.userService.signIn(this.loginform).subscribe((response:any) => {
      console.log(response);
      // Store the token in localstorage from response
      localStorage.setItem('token', response.jwt)
      this.router.navigate(['profile']);
    })
  }

}
