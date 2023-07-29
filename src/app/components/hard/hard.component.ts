import { Skill } from 'src/app/models/skill.interface'
import { HttpService } from '../common/services/http.service'
import { Component } from '@angular/core';

@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrls: ['./hard.component.less']
})
export class HardComponent {
  skills: Skill[] = []

  constructor(private httpService: HttpService) {
    httpService.get<Skill[]>('/skills', '/hard').subscribe((result: Skill[]) => {
      this.skills = result
    })
  }

}
