import { NgModule } from "@angular/core"
import { BirthdayValidator } from "./validators/birthday.validator"
import { TableDataSource } from "./classes/tableDataSource"

@NgModule({
  declarations: [
    BirthdayValidator,
  ],
  exports: [
    BirthdayValidator
  ]
})
export class UtilsModule {}
