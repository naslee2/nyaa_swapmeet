import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dbedit',
  templateUrl: './dbedit.component.html',
  styleUrls: ['./dbedit.component.css']
})
export class DbeditComponent implements OnInit {
  id: any;
  error: any;
  edit: any;
  sessionData: any;
  sessioncheck: any;
  currency: any;
  filesToUpload: Array<File> = []
  addProfilePic: FormData = new FormData;
  // objectkeys = Object.keys;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService,
  ) { 
    this._route.params.subscribe( params => {
      this.id = params;
    });
  }

  ngOnInit() {
    this.sessionData = {};
    this.edit = {
      _id: "",
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
    // this.currency = ["USD", "JPY", "EUR", "AUD", "CAD", "GBP", "HKD", "KRW", "SGD", "NTD"]
    this.currency = []
    this.sessionChecker()
    this.getDetails();
  }

  //when refresh - do session check
  //if logged in, hit login()
  //recall the observable to cast again if no data

  sessionChecker(){
    var check = this._httpService.checkSession();
    check.subscribe(data =>{
      if(data){
        if(data['data']['email'] && data['data']['username'] && data['data']['userid'] && data['data']['usertype'] == 2){
          this.sessionData = data['data'];
          this.sessioncheck= true;
        }
        else{
          this.sessioncheck= false;
          // this._router.navigate(['/db_profile', this.id.id]);
          this._router.navigate(['/']);
        }
      }
      else{
        // console.log("else")
        this.sessioncheck= false;
        this._router.navigate(['/db_profile', this.id.id]);
      }
    })
  }

  getDetails(){
    let obs = this._httpService.getFigureProfile(this.id);
    obs.subscribe(data => {
      if(data){
        this.edit = data['data'];
        this.currency.push(data['data']['currencytype'])
        // console.log(this.currency)
      }
      
      if(this.edit['releasedate'].length > 9 && this.edit['announcedate'].length > 9){
        this.edit['releasedate'] = this.edit['releasedate'].slice(0,10);
        this.edit['announcedate'] = this.edit['announcedate'].slice(0,10);
      }
      // console.log(this.edit)
    })
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length >0){
      console.log(event.target.files)
      this.filesToUpload = <Array<File>>event.target.files
    }
  }

  profilepicEdit(){
    var files: Array<File> = this.filesToUpload;
    console.log(files);
    this.addProfilePic.append("profile", files[0])
    let figurethumbpicEdit = this._httpService.editFigureProfilePic(this.addProfilePic, this.id.id);
    figurethumbpicEdit.subscribe(data =>{
      if(data['message'] == 'success'){
        this._router.navigate(['/db_profile', this.id.id]);
      }
      else if (data['message'] == 'Error'){
        this.error = data['error']['message']
      }
      else if(data['error']['code'] == 11000){
        this.error = data['error']['errmsg']
      }
    })
  }

  editFigureData(){
    let editFigure = this._httpService.editFigureData(this.edit);
    editFigure.subscribe(data => {
      if(data['message'] == 'success'){
        // console.log("id",this.id)
        this._router.navigate(['/db_profile', this.id.id]);
      }
      else if (data['message'] == 'Error'){
        this.error = data['error']['message']
      }
      else if(data['error']['code'] == 11000){
        this.error = data['error']['errmsg']
      }
    })
  }

  deleteFigureData(){
    console.log("test",this.id.id)
    let deleteFigure = this._httpService.deleteFigureData(this.id.id);
    deleteFigure.subscribe(data => {
      if(data['message'] == 'Error'){
        console.log("Error!", data)
        this.error = "Unable to delete - Database error";
      }
      else{
        console.log("Success!")
        this._router.navigate(['/index'])
      }
    })

  }
  
}
