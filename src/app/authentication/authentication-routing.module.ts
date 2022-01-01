import { ChangePasswordComponent } from './change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth-guard';

export const appRoutes:Routes=[
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'users',component:UsersComponent, canActivate: [AuthGuard],},
  {path:'changepassword',component:ChangePasswordComponent},
]

@NgModule({
  declarations:[SignupComponent,LoginComponent,UsersComponent,ChangePasswordComponent],
  imports:[RouterModule.forChild(appRoutes),ReactiveFormsModule,CommonModule],
  exports:[RouterModule]
})
export class AuthenticationRoutingModule{}
