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
    console.log("component work",this.register);
    let reg = this._httpService.registerUser(this.register);
      reg.subscribe(data =>{
        if(data['error']['code'] == 11000){
          this.error = data['error']['errmsg']
        }
        else if(data['message'] == 'Error'){
          this.error = data['error']['message']
        }
        else{
          console.log("catsddsd", data);
        }
      });
  }
}