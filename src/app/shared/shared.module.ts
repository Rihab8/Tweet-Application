import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ModalPopupComponent } from "./modal-popup/modal-popup.component";
import { ToastComponent } from "./toast/toast.component";


@NgModule({
    declarations: [
      FooterComponent,
      HeaderComponent,
      ToastComponent,
      ModalPopupComponent
   ],
    imports: [
      CommonModule,
      RouterModule,
    ],
    exports:[
        FooterComponent,
        HeaderComponent,
        ToastComponent,
        ModalPopupComponent
    ]
  })

  export class SharedModule { }
