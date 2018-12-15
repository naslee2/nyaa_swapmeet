import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListingsComponent } from './listings/listings.component';
import { DbaddComponent } from './dbadd/dbadd.component';
import { DbeditComponent } from './dbedit/dbedit.component';
import { DbprofileComponent } from './dbprofile/dbprofile.component';

const routes: Routes = [
  {path: '',component: HomeComponent },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'index', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'listings', component: ListingsComponent},
  {path: 'databaseadd', component: DbaddComponent},
  {path: 'db_edit/:id', component: DbeditComponent},
  {path: 'db_profile/:id', component: DbprofileComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
