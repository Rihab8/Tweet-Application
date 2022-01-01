import { NgModule } from "@angular/core";
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({

    imports: [AuthenticationRoutingModule],
    exports:[
      AuthenticationRoutingModule
    ],
  })
  export class AuthenticationModule { }
