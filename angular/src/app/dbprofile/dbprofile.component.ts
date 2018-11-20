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
    this.figureData = [];
    this.getDetails();
  }

  getDetails(){
    let obs = this._httpService.getFigureProfile(this.id);
    obs.subscribe(data => {
      this.figureData.push(data['data']);
      // console.log(this.figureData);
    })
  }

}
