import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { UserTweetsComponent } from './user-tweets/user-tweets.component';
import { AuthGuard } from '../authentication/auth-guard';


export const appRoutes:Routes=[
    {path:'', component:HomePageComponent,},
    {path:'userTweets', component:UserTweetsComponent, canActivate: [AuthGuard],}
]

@NgModule({
    declarations:[HomePageComponent,UserTweetsComponent],
    imports:[
      RouterModule.forChild(appRoutes),
      CommonModule,ReactiveFormsModule, SharedModule],

    exports:[RouterModule]
})
export class TweetsRoutingModule{}
