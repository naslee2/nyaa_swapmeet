import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editlisting',
  templateUrl: './editlisting.component.html',
  styleUrls: ['./editlisting.component.css']
})
export class EditlistingComponent implements OnInit {
  id: any;
  error: any;
  edit: any;
  sessionData: any;
  sessioncheck: any;
  currency: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) { 
    // this._route.params.subscribe( params => {
    //   this.id = params;
    // });
  }

  ngOnInit() {
    this.sessionData = {};
  }

  login(){
    this._httpService.cast.subscribe(data => {
      console.log("data",data)
      if(data){
        if(data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){
          this.sessionData = data['data'];
          this.sessioncheck= true;
        }
        else{
          this.sessioncheck= false;
          // this._router.navigate(['/db_profile', this.id.id]);
          this._router.navigate(['/']);
        }
      }
      else{
        console.log("else")
        this.sessioncheck= false;
        this._router.navigate(['/db_profile', this.id.id]);
        // this._router.navigate(['/']);
      }
    })
  }

}
