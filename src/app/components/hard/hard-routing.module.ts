import { HardModule } from './hard.module'
import { RouterModule, Routes } from "@angular/router"
import { UsersComponent } from "./users/users.component"
import { HardComponent } from "./hard.component"
import { NgModule } from "@angular/core"

const routes: Routes = [
  { path: '', component: HardComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forChild(routes), HardModule],
  exports: [RouterModule]
})
export class HardRoutingModule {}
