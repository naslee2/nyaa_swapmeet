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
    console.log("check",this.id)
  }

}
