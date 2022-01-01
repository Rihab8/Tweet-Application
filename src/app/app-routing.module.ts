import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";



export const appRoutes:Routes=[
    {path:'',
    loadChildren:()=>import('./tweets/tweets.module').then(m=>m.TweetsModule)},
    {path:'Auth',
    loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)}

]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes,{relativeLinkResolution:'legacy'}),FormsModule,ReactiveFormsModule],
    exports:[RouterModule]
})
export class AppRoutingModule{}
