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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { 
    this._route.params.subscribe( params => {
      this.id = params;

    });
    }

  ngOnInit() {
    this.getDetails();
  }

  getDetails(){
    let obs = this._httpService.getFigureDetail(this.id);
    // obs.subscribe(data => {
    //   console.log(data);
    // })
  }

}
