import {Component, View, OnInit, AfterViewInit} from 'angular2/core';

import {SkillDirective} from '../directives/skill';

@Component({
  selector: 'home'
})
@View({
  directives: [SkillDirective],
  template: require('../../views/home.html'),
  styles: [require('../../styles/components/home.css')]
})
export class HomeComponent { }
