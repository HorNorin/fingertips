import {Component, View, OnInit, AfterViewInit} from 'angular2/core';

import {SkillDirective} from '../directives/skill';

@Component({
  selector: 'home'
})
@View({
  directives: [SkillDirective],
  templateUrl: 'public/views/home.html'
})
export class HomeComponent { }
