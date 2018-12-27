import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewlisting',
  templateUrl: './viewlisting.component.html',
  styleUrls: ['./viewlisting.component.css']
})
export class ViewlistingComponent implements OnInit {
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
  ) { }

  ngOnInit() {
    this.sessionData = {};
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
          this._router.navigate(['/']);
        }
      }
      else{
        this.sessioncheck= false;
        this._router.navigate(['/']);
      }
    })
  }

}
