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
  ) { }

  ngOnInit() {
    this.sessionData = {};
    this.sessionCheck();
  }

  sessionCheck(){
    let check = this._httpService.checkSession();
    check.subscribe(data =>{
      this.sessionData = data['data']
      if (this.sessionData['email'] || this.sessionData['userid'] || this.sessionData['username']){
        this.sessioncheck = true;
      }
      else{
        this.sessioncheck= false;
        this._router.navigate(['/']);
      }
    })
  }

}
