import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  figureData: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.figureData = [];
    this.showFigures();
  }
  
  showFigures(){
    let x = this._httpService.getFigures();
    x.subscribe(data => {
      this.figureData = data['data']
      // console.log("all data", this.figureData)
    })
  }

}
