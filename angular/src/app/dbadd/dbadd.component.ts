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
  addForm: FormData = new FormData;
  filesToUpload: Array<File> = []
  filesToUpload2: any;

  constructor(
    private _router: Router,
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
    this.sessionData = {};
    this.add = {
      name: "", 
      releasedate: "", 
      announcedate: "",
      brand: "",
      series: "",
      number: "",
      manufacturer: "",
      distributor: "",
      releaseprice: "",
      currencytype: "",
      notes: "",
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
    if(event.target.files && event.target.files.length >0){
      console.log(event.target.files)
      this.filesToUpload = <Array<File>>event.target.files
    }
  }

  addSubmit(){
    const files: Array<File> = this.filesToUpload;
    // const thumb:Array<File> = this.filesToUpload2;
    console.log(files);
    // console.log(thumb);
    if(files.length > 0){
      for(let i =0; i < files.length; i++){
        this.addForm.append( "upload", files[i], files[i]['name']);
      }
    }
    // if(thumb.length > 0){
    //   this.addForm.append("upload2", thumb[0], thumb[0]['name'])
    // }
    for(let key in this.add){
      const value = this.add[key]
      this.addForm.append(key, value);
    }
    console.log(this.addForm)

    let sub = this._httpService.addFigure(this.addForm);
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
