import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { TweetsRoutingModule } from "./tweets-routing-module";


@NgModule({
    imports: [
        TweetsRoutingModule,
    ],
    exports:[
        TweetsRoutingModule,
    ],
  })
  export class TweetsModule { }
