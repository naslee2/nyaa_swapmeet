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


  registerUser(user){ //registers user
    return this._http.post('/register', {username: user.username, email: user.email, password: user.reg_password, check_password: user.check_password});
  }

  loginUser(user2){ //login user
    return this._http.post('/login', {username: user2.username, password: user2.password})
  }

  checkSession(){ //checks user session
    // return this._http.get('/checkSession');
    return this._http.get('/session');
  }

  loginSet(){ //send user request.session data to listeners
    var tester = this._http.get('/session');
    tester.subscribe(data =>{
      this.sessiondata = data;
      this.isLogin.next(this.sessiondata);
    })
  }

  logoutUser(){ //logs user out
    return this._http.get('/logout');
  }

  addFigure(add){
    // console.log("haha")
    return this._http.post('/add', {
      name: add.name, 
      releasedate: add.rdate, 
      announcedate: add.adate, 
      brand: add.brand, 
      series: add.series, 
      number: add.number, 
      manufacturer: add.manufacturer, 
      distributor: add.distributor, 
      releaseprice: add.rprice, 
      currencytype: add.currency, 
      notes: add.notes
    });
  }

  getFigures(){
    return this._http.get('/getFigures');
  }

  getFigureProfile(id){
    return this._http.get('/getFigureProfile/'+id.id);
  }

  editFigureData(data){
    // console.log("service",data)
    return this._http.put('/edit/'+data._id, data);
  }

  deleteFigureData(id){
    console.log("id",id);
    return this._http.delete('/delete/'+id);
  }

}
