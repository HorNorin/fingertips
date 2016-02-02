import {Component, View, OnInit, AfterViewInit} from 'angular2/core';

import {SkillDirective} from '../directives/skill';

@Component({
  selector: 'home',
  directives: [SkillDirective],
  styles: [require('../../styles/home.css')],
  // styleUrls: ['styles/home.css'],
  // templateUrl: 'views/home.html'
  template: require('../../views/home.html')
})
// @View({
//   directives: [SkillDirective],
//   styleUrls: ['styles/home.css'],
//   templateUrl: 'views/home.html'
// })
export class HomeComponent { }
