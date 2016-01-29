import {Component, View, OnInit, AfterViewInit} from 'angular2/core';
import {TipsDirective} from '../directives/tips';

@Component({
  selector: 'home'
})
@View({
  directives: [TipsDirective],
  templateUrl: 'public/views/home.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
  tips: any[];

  ngOnInit() {
    this.tips = [
      {name: 'Authentication with devise', duration: 120, thumbnail: 'public/images/pic1.jpg'},
      {name: 'Authentication with devise', duration: 600, thumbnail: 'public/images/pic1.jpg'},
      {name: 'Authentication with devise', duration: 3728, thumbnail: 'public/images/pic1.jpg'},
      {name: 'Authentication with devise', duration: 48, thumbnail: 'public/images/pic1.jpg'},
      {name: 'Authentication with devise', duration: 48, thumbnail: 'public/images/pic1.jpg'},
      {name: 'Authentication with devise', duration: 48, thumbnail: 'public/images/pic1.jpg'}
    ];
  }

  ngAfterViewInit() {
    var slider: any = $('.bxslider');
    slider.bxSlider({
      auto: true,
      controls: false,
      slideWidth: 700,
      randomStart: true,
      easing: 'ease-out'
     });
  }
}
