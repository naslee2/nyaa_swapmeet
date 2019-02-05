import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dbprofile',
  templateUrl: './dbprofile.component.html',
  styleUrls: ['./dbprofile.component.css']
})
export class DbprofileComponent implements OnInit {
  id: any;
  figureData: any;
  figureData_img: any;
  sessionData: any;
  sessioncheck: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    ) { 
      this._route.params.subscribe( params => {
          this.id = params;
        // console.log("ddd", this.id)
      });
    }

  ngOnInit() {
    this.sessionData = {};
    this.figureData = [];
    this.figureData_img = [];
    this.sessionChecker();
    this.getDetails();
  }

  getDetails(){
    let obs = this._httpService.getFigureProfile(this.id);
    obs.subscribe(data => {
      this.figureData.push(data['data']);
      this.figureData_img = this.figureData[0]['pictures']
      console.log(this.figureData);
    })
  }

  sessionChecker(){
    var check = this._httpService.checkSession();
    check.subscribe(data =>{
      if (data){
        if (data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){ //why does this work?
          this.sessionData = data['data'];
          this.sessioncheck= true;
        }
        else{
          this.sessioncheck= false;
        }
      }
      else{
        this.sessioncheck= false;
      }
    })
  }
}
