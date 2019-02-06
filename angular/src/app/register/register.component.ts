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
    let reg = this._httpService.registerUser(this.register);
      reg.subscribe(data =>{
        if(data['message'] == 'success!'){
          this.error = "Successfully registered! Redirecting to Login in 10 seconds."
          setTimeout(() =>{
            this._router.navigate(['/login']);
          }, 10000)
        }
        else if(data['message'] == 'Error'){
          if (data['error']['code']){
            this.error = data['error']['errmsg']
          }
          else{
            this.error = data['error']['message']
          }
        }
        else{
          this.error = "Unknown Error!"
        }
      });
  }
}