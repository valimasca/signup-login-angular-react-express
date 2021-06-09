import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((response:any)=>{
      console.log(response);
      this.currentUser = response.user;
    })
  }

}
