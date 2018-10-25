import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dbadd',
  templateUrl: './dbadd.component.html',
  styleUrls: ['./dbadd.component.css']
})
export class DbaddComponent implements OnInit {
  error: any;
  sessionData: any;
  sessioncheck: any;
  newdata: any;

  constructor(
    private _router: Router,
    private _httpService: HttpService,
    private loginChecker: HttpService
  ) { }

  ngOnInit() {
    this.sessionData = {};
    this.login();
    this.newdata = {
      name: "", 
      releasedate: "", 
      announcedate: "",
      brand: "",
      series: "",
      number: "",
      manufacturer: "",
      distributor: "",
      releaseprice: ""
    }   
  }

  login(){
    this.loginChecker.cast.subscribe(data => { 
      if (data){
        if (data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){ //why does this work?
          // console.log("wow", data);
          this.sessionData = data['data'];
          this.sessioncheck= true;
          this._router.navigate(['/database']);
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

  addSubmit(){
    console.log("ha")
  }

}
