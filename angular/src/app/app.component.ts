import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  error: any;

  ngOnInit() {
    // this._router.navigate(['']);
    this.sessionCheck();
  }

  sessionCheck(){
    let check = this._httpService.checkSession();
    check.subscribe(data =>{
      console.log("session check", data);
    })
  }
  
}
