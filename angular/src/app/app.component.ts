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
    this.login();
  }

  login(){
    this.loginChecker.cast.subscribe(data => {
      if (data){
        if (data['data']['mail'] || data['data']['username'] || data['data']['userid']){ //why does this work?
          this.sessionData = data['data'];
          this.sessioncheck= true;
          // console.log("login", this.sessionData)
        }
      }
      else{
        this.sessioncheck= false;
        // console.log("haha")
      }

      //does not work
      // console.log("???", data)
      // this.sessionData = data;
      // if(this.sessionData['data']['email']){
      //   this.sessioncheck= true;
      //   console.log("login", this.sessionData['data']['email'])
      // }
      // else{
      //   this.sessioncheck= false;
      //   console.log("haha")
      // }

    })
  }

  logout(){
    this.sessioncheck= false;
    let setLogout = this._httpService.logoutUser();
    setLogout.subscribe(data => {
      // console.log("logout", data)
      this._router.navigate(['/']);
    })
  }
  
}
