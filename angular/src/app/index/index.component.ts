import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.showFigures();
  }
  
  showFigures(){
    let x = this._httpService.getFigures();
    // x.subscribe(data => {
    //   console.log("all data", data)
    // })
  }

  figureDetails(){

  }

  figureEdit(){

  }
}
