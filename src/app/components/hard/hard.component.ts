import { Component } from '@angular/core';
import { Skill } from 'src/app/models/hard/skill'

@Component({
  selector: 'app-hard',
  templateUrl: './hard.component.html',
  styleUrls: ['./hard.component.less']
})
export class HardComponent {
  skills: Skill[] = [
    {title: "Users", path: "users", comment: "Une API nodeJS/Express couplée à une base Mongo hébergée par Atlas cloud, le tout présenté par une UI angular 16.", imgUrl: "assets/hard/cardImg.jpg" },
    {title: "Users", path: "users", comment: "Une API nodeJS/Express couplée à une base Mongo hébergée par Atlas cloud, le tout présenté par une UI angular 16.", imgUrl: "assets/hard/cardImg.jpg" },
    {title: "Users", path: "users", comment: "Une API nodeJS/Express couplée à une base Mongo hébergée par Atlas cloud, le tout présenté par une UI angular 16.", imgUrl: "assets/hard/cardImg.jpg" },
  ]

}
