import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';

import { FormStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListingsComponent } from './listings/listings.component';
import { AddlistingComponent } from './addlisting/addlisting.component';
import { AddcollectionComponent } from './addcollection/addcollection.component';
import { EditlistingComponent } from './editlisting/editlisting.component';
import { EditcollectionComponent } from './editcollection/editcollection.component';
import { DbaddComponent } from './dbadd/dbadd.component';
import { DbeditComponent } from './dbedit/dbedit.component';
import { DbprofileComponent } from './dbprofile/dbprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ListingsComponent,
    AddlistingComponent,
    AddcollectionComponent,
    EditlistingComponent,
    EditcollectionComponent,
    DbaddComponent,
    DbeditComponent,
    DbprofileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
