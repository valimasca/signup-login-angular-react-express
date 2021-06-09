import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string = "http://localhost:3000/users"

  constructor(private http: HttpClient) { }

  // Signin Function
  // Component needs to pass username and password as an object
  // On success, the component will get back a token that needs to get stored
  signIn(signInfo: any){
    return this.http.post(`${this.userURL}/signin`, signInfo);
  }

  signUp(newUser: User){
    return this.http.post(`${this.userURL}/signup`, newUser);
  }

  getProfile(){
    // set header 'Authorization' with the token
    let BSTHeaders = {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
    // get request witht the headers
    return this.http.get(`${this.userURL}/profile`, {headers: BSTHeaders});
  }
}
