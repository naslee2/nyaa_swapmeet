import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  error: any;
  login: any;

  ngOnInit() {
    this.login = {username: "", password: ""};
  }

  loginSubmit(){
    let login = this._httpService.loginUser(this.login);
    login.subscribe(data =>{
      if(data['message'] == 'Error'){
        this.error = data['error']
      }
      else{
        this._httpService.loginSet();
        this._router.navigate(['/dashboard']);
      }
    })
  }

}
