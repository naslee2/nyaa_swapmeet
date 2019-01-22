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
  // figureData_img: any;
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
    // this.figureData_img = [];
    this.sessionChecker();
    this.getDetails();
  }

  getDetails(){
    let obs = this._httpService.getFigureProfile(this.id);
    obs.subscribe(data => {
      this.figureData.push(data['data']);
      // console.log(this.figureData);
    })
  }

  sessionChecker(){
    var check = this._httpService.checkSession();
    check.subscribe(data =>{
      // console.log("sessioncheck",data);
      // this.login();
      if (data){
        if (data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){ //why does this work?
          this.sessionData = data['data'];
          this.sessioncheck= true;
          // this._router.navigate(['/databaseadd']);
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

  // login(){ // login checker
  //   this._httpService.cast.subscribe(data => { 
  //     console.log("dsd", data)
  //     if (data){
  //       if (data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){
  //         // console.log("wow", data);
  //         this.sessionData = data['data'];
  //         this.sessioncheck= true;
  //       }
  //       else{
  //         this.sessioncheck= false;
  //         // console.log("lol")
  //       }
  //     }
  //     else{
  //       this.sessioncheck= false;
  //       // console.log("haha")
  //     }
  //   })
  // }

}
