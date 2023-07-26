import { ObjectifsComponent } from './components/objectifs/objectifs.component'
import { BioComponent } from './components/bio/bio.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SoftComponent } from './components/soft/soft.component'
import { ContactComponent } from './components/contact/contact.component'

const routes: Routes = [
  { path: 'bio', component: BioComponent },
  { path: 'soft', component: SoftComponent },
  { path: 'hard', loadChildren: () => import('./components/hard/hard-routing.module').then(m => m.HardRoutingModule) },
  { path: 'objectifs', component: ObjectifsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: 'bio' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
