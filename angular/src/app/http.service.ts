import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class HttpService {
  sessiondata: any;
  constructor(
    private _http: HttpClient
  ) { 
    this.loginSet();
  }

  // public isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLogin: BehaviorSubject<any> = new BehaviorSubject<any>(this.sessiondata);
  cast = this.isLogin.asObservable();


  registerUser(user){
    return this._http.post('/register', {username: user.username, email: user.email, password: user.reg_password, check_password: user.check_password});
  }

  loginUser(user2){
    return this._http.post('/login', {username: user2.username, password: user2.password})
  }

  checkSession(){
    return this._http.get('/checkSession');
  }

  loginSet(){
    var tester = this._http.get('/session');
    tester.subscribe(data =>{
      this.sessiondata = data;
      this.isLogin.next(this.sessiondata);
    })
  }

  logoutUser(){
    return this._http.get('/logout');
  }

}
