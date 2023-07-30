import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { AdminRoutingModule } from "./admin-routing.module"
import { AdminComponent } from "./admin.component"
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatTabsModule } from '@angular/material/tabs'
import { ReactiveFormsModule } from "@angular/forms"
import { UtilsModule } from "src/app/utils/utils.module"


@NgModule({
  declarations: [
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    ReactiveFormsModule,
    UtilsModule
  ],
  providers: [
  ]
})
export class AdminModule {
  constructor() {
    console.log('AdminModule loaded')
    const importedModuleNames = [
      CommonModule,
      AdminRoutingModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRadioModule,
      ReactiveFormsModule
    ].map((module) => module.name)

    console.log('Imported Modules:', importedModuleNames)
  }
}
