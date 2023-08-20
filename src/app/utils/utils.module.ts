import { NgModule } from "@angular/core"
import { BirthdayValidator } from "./validators/birthday.validator"
import { TableDataSource } from "./classes/tableDataSource"

import { MatSnackBarModule } from '@angular/material/snack-bar'
import { GlobalHttpInterceptor } from "./global-http.interceptor";
import { SnackMessageComponent } from './components/snack-message/snack-message.component'
import { CommonModule } from "@angular/common"


@NgModule({
  declarations: [
    BirthdayValidator,
    SnackMessageComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    // GlobalHttpInterceptor,
  ],
  exports: [
    BirthdayValidator
  ]
})
export class UtilsModule {}
