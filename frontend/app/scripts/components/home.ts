import {Component, View, AfterViewInit} from 'angular2/core';

@Component({
  selector: 'home'
})
@View({
  templateUrl: 'public/views/home.html'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    var slider: any = $('.bxslider');
    slider.bxSlider({
      auto: true,
      controls: false,
      randomStart: true,
      easing: 'ease-out'
     });
  }
}
