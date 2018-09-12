import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }

  registerUser(data){
    console.log("service!", data)
    return this._http.post('/register', {username: data.username, email: data.email, password: data.reg_password});
  }

}
