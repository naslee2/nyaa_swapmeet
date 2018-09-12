import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }
  error: any;
  register: any;

  ngOnInit() {
    this.register = {email: "", username: "", reg_password: "", check_password: ""};
  }

  registerSubmit(){
    console.log("component work");
    let reg = this._httpService.registerUser(this.register);
    reg.subscribe(data =>{
      console.log("cats", data);
    })
    // console.log('email', this.register['email']);
    // console.log('username', this.register['username']);
    // console.log('reg password',this.register['reg_password']);
    // console.log('check password',this.register['check_password']);
  }

}
