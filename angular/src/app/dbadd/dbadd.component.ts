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
  add: any;

  constructor(
    private _router: Router,
    private _httpService: HttpService,
    // private loginChecker: HttpService
  ) { }

  ngOnInit() {
    this.sessionData = {};
    this.login();
    this.add = {
      name: "", 
      rdate: "", 
      adate: "",
      brand: "",
      series: "",
      number: "",
      manufacturer: "",
      distributor: "",
      rprice: "",
      currency: "",
      notes: "",
    }   
  }

  login(){ // login checker
    this._httpService.cast.subscribe(data => { 
      if (data){
        if (data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){ //why does this work?
          // console.log("wow", data);
          this.sessionData = data['data'];
          this.sessioncheck= true;
          this._router.navigate(['/databaseadd']);
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
    console.log("haha")
    let sub = this._httpService.addFigure(this.add);
    console.log("la",sub);
      sub.subscribe(data =>{
        if(data['message'] == 'success!'){
          this.error = "Database updated Successfully!"
        }
        else if(data['message'] == 'Error'){
          this.error = "Database update failed!"
        }
        else{
          console.log("unknown error")
          this.error = "Database update failed!"
        }
      })
  }

}
