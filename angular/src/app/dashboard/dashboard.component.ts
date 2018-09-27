import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  error: any;
  sessionData: any;
  sessioncheck: any;

  constructor(
    private _router: Router,
    private _httpService: HttpService,
    private loginChecker: HttpService
  ) { }

  ngOnInit() {
    this.sessionData = {};
    // this.sessionCheck();
    this.login();
  }

  login(){
    this.loginChecker.cast.subscribe(data => {
      if (data){
        if (data['data']['mail'] || data['data']['username'] || data['data']['userid']){ //why does this work?
          this.sessionData = data['data'];
          this.sessioncheck= true;
          // console.log("login", this.sessionData['email'])
        }
        else{
          this.sessioncheck= false;
          this._router.navigate(['/']);
        }
      }
      else{
        this.sessioncheck= false;
        this._router.navigate(['/']);
        // console.log("haha")
      }
    })
  }


  // sessionCheck(){
  //   let check = this._httpService.checkSession();
  //   check.subscribe(data =>{
  //     this.sessionData = data['data']
  //     if (this.sessionData['email'] || this.sessionData['userid'] || this.sessionData['username']){
  //       this.sessioncheck = true;
  //     }
  //     else{
  //       this.sessioncheck= false;
  //       this._router.navigate(['/']);
  //     }
  //   })
  // }

}
