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
  sessionData: any;
  sessioncheck: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
    ) { 
      this._route.params.subscribe( params => {
          this.id = params;
        console.log("ddd", this.id)
      });
      
    }

  ngOnInit() {
    this.sessionData = {};
    this.figureData = [];
    this.login();
    this.getDetails();
  }

  getDetails(){
    let obs = this._httpService.getFigureProfile(this.id);
    obs.subscribe(data => {
      this.figureData.push(data['data']);
      console.log(this.figureData);
    })
  }

  login(){ // login checker
    this._httpService.cast.subscribe(data => { 
      if (data){
        if (data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){
          // console.log("wow", data);
          this.sessionData = data['data'];
          this.sessioncheck= true;
        }
        else{
          this.sessioncheck= false;
          // console.log("lol")
        }
      }
      else{
        this.sessioncheck= false;
        // console.log("haha")
      }
    })
  }

}
