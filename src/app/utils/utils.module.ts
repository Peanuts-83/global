import { NgModule } from "@angular/core"
import { BirthdayValidator } from "./validators/birthday.validator"

@NgModule({
  declarations: [
    BirthdayValidator
  ],
  exports: [
    BirthdayValidator
  ]
})
export class UtilsModule {}
