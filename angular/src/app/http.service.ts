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
    console.log("haha", add)
    return this._http.post('/add', add);
  }

  getFigures(){
    return this._http.get('/getFigures');
  }

  getFigureProfile(id){
    return this._http.get('/getFigureProfile/'+id.id);
  }

  editFigureProfilePic(image, id){
    console.log("image", image, id)
    return this._http.put('/editFigureProfilePic/'+id, image);
  }

  editFigureData(data){
    // console.log("service",data)
    return this._http.put('/edit/'+data._id, data);
  }

  deleteFigureData(id){
    // console.log("id",id);
    return this._http.delete('/delete/'+id);
  }

  getListings(){

  }

  getListingProfile(){
    
  }

  addListing(){

  }

  editListing(){

  }

  deleteListing(){

  }
}
