import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dbadd',
  templateUrl: './dbadd.component.html',
  styleUrls: ['./dbadd.component.css']
})
export class DbaddComponent implements OnInit {
  error: any;
  sessionData: any;
  sessioncheck: any;
  add: any;

  constructor(
    private _router: Router,
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this.sessionData = {};
    this.add = {
      name: "", 
      rdate: "", 
      adate: "",
      brand: "",
      series: "",
      number: "",
      manufacturer: "",
      distributor: "",
      rprice: "",
      currency: "",
      notes: "",
      picture: []
    }   
    this.sessionChecker();
  }

  sessionChecker(){
    var check = this._httpService.checkSession();
    check.subscribe(data =>{
      // console.log("sessioncheck",data);
      // this.login();
      if (data){
        if (data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){ //why does this work?
          this.sessionData = data['data'];
          this.sessioncheck= true;
          // this._router.navigate(['/databaseadd']);
        }
        else{
          this.sessioncheck= false;
          this._router.navigate(['/']);
        }
      }
      else{
        this.sessioncheck= false;
        this._router.navigate(['/']);
      }
    })
  }

  onFileChange(event) {
    let files: FileList = event.target.files;
    let file : File = files[0];
    console.log(file)
    this.add['picture'] = file;
  }

  addSubmit(){
    console.log("test2", this.add)
    let sub = this._httpService.addFigure(this.add);
      sub.subscribe(data =>{
        if(data['message'] == 'success!'){
          this._router.navigate(['/index']);
        }
        else if(data['message'] == 'Error'){
          this.error = "Database update failed!"
        }
        else{
          this.error = "Database update failed!"
        }
      })
  }

}
