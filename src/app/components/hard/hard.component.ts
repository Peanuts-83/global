import { Skill } from 'src/app/models/skill'
import { HttpService } from './../../services/http.service'
import { Component } from '@angular/core';

@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrls: ['./hard.component.less']
})
export class HardComponent {
  skills: Skill[] = []

  constructor(private httpService: HttpService) {
    httpService.get<Skill[]>('/skills').subscribe((result: Skill[]) => {
      this.skills = result
    })
  }

}
