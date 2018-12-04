import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dbedit',
  templateUrl: './dbedit.component.html',
  styleUrls: ['./dbedit.component.css']
})
export class DbeditComponent implements OnInit {
  id: any;
  error: any;
  edit: any;
  sessionData: any;
  sessioncheck: any;
  currency: any;
  // objectkeys = Object.keys;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) { 
    this._route.params.subscribe( params => {
      this.id = params;
    });
  }

  ngOnInit() {
    this.sessionData = {};
    this.edit = {
      _id: "",
      name: "", 
      releasedate: "", 
      announcedate: "",
      brand: "",
      series: "",
      number: "",
      manufacturer: "",
      distributor: "",
      releaseprice: "",
      currencytype: "",
      notes: "",
      pictures: [],
    }
    // this.currency = ["USD", "JPY", "EUR", "AUD", "CAD", "GBP", "HKD", "KRW", "SGD", "NTD"]
    this.currency = []
    this.login();
    this.getDetails();
  }

  login(){
    this._httpService.cast.subscribe(data => {
      if(data){
        if(data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){
          this.sessionData = data['data'];
          this.sessioncheck= true;
        }
        else{
          this.sessioncheck= false;
          this._router.navigate(['/']);
        }
      }
      else{
        this.sessioncheck= false;
        this._router.navigate(['/']);
      }
    })
  }

  getDetails(){
    let obs = this._httpService.getFigureProfile(this.id);
    obs.subscribe(data => {
      this.edit = data['data'];
      this.currency.push(data['data']['currencytype'])
      if(this.edit['releasedate'].length > 9 && this.edit['announcedate'].length > 9){
        this.edit['releasedate'] = this.edit['releasedate'].slice(0,10);
        this.edit['announcedate'] = this.edit['announcedate'].slice(0,10);
      }
      console.log(this.edit)
    })
  }

  editFigureData(){
    let editFigure = this._httpService.editFigureData(this.edit);
    // edit.subscribe(data => {
    //   if(data['error']['code'] == 11000){
    //     this.error = data['error']['errmsg']
    //   }
    //   else if (data['message'] == 'Error'){
    //     this.error = data['error']['message']
    //   }
    //   else{
    //     this._router.navigate(['/db_profile/'+this.id])
    //   }
    // })
  }
  
}
