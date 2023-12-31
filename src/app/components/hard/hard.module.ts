import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HardComponent } from './hard.component'
import { UsersComponent } from './users/users.component'
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list'
import { HardRoutingModule } from './hard-routing.module'


@NgModule({
  declarations: [HardComponent, UsersComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    HardRoutingModule
  ],
  // exports: [HardComponent, UsersComponent],
})
export class HardModule { }
