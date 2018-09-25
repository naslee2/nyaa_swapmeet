import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { 

  }

  public isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
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
    this.isLogin.next(true);
  }

  logoutUser(){
    return this._http.get('/logout');
  }

}
