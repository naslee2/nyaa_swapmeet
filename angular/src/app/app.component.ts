import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  error: any;
  sessionData: any;
  sessioncheck: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    private loginChecker: HttpService
  ) {}
  
  ngOnInit() {
    // this._router.navigate(['']);
    // this.sessionCheck();
    this.login();

  }

  login(){
    this.loginChecker.cast.subscribe(data => {
      this.sessionCheck();
    })
  }

  logout(){
    this.sessioncheck= false;
    let setLogout = this._httpService.logoutUser();
    setLogout.subscribe(data => {
      this._router.navigate(['/']);
    })
  }
  
  sessionCheck(){
    let check = this._httpService.checkSession();
    check.subscribe(data =>{
      if (data['data']['email']){
        this.sessionData = data['data'];
        this.sessioncheck = true;
      }
      else{
        this.sessioncheck= false;
      }
    })
  }
  
}
