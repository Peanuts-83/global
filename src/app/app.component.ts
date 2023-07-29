import { Component } from '@angular/core';
import { BaseComponent } from './components/common/base-component'
import { Base } from './components/common/models/base.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent extends BaseComponent {

}
