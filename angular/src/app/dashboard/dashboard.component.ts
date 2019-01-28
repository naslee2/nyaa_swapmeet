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
    // private loginChecker: HttpService
  ) { }

  ngOnInit() {
    this.sessionData = {};
    // this.sessionCheck();
    this.login();
  }

  login(){
    this._httpService.cast.subscribe(data => { 
      if (data){
        // console.log(data)
        if (data['data']['email'] && data['data']['username'] && data['data']['userid']){ //why does this work?
          // console.log("wow", data);
          this.sessionData = data['data'];
          this.sessioncheck= true;
          this._router.navigate(['/dashboard']);
        }
        else{
          this.sessioncheck= false;
          // console.log("lol")
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
}
