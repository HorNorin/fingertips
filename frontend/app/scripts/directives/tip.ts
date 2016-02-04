import {Component, Input, AfterContentInit} from 'angular2/core';

@Component({
  selector: 'tip',
  template: `
    <span class="tip-name">{{ title }}</span>
    <span class="tip-duration">{{ duration }}</span>
    <img class="tip-thumbnail" [attr.src]="thumbnail">
    <a href="#" class="tip-play">&#8227;</a>
  `,
  styles: [require('../../styles/directives/tips.css')]
})
export class TipDirective implements AfterContentInit {
  title: string;
  duration: string;
  thumbnail: string;

  @Input() value: any;

  ngAfterContentInit() {
    // Thumbnail string
    this.thumbnail = this.value.thumbnail;

    // Format duration string
    var duration = this.value.duration;
    var hours = Math.floor(duration / 3600);
    var minutes = Math.floor((duration - (hours * 3600)) / 60);
    var seconds = duration - (minutes * 60) - (hours * 3600);

    if (hours > 0) {
      this.duration = `${hours}:${this._format(minutes, 2)}:${this._format(seconds, 2)}`;
    } else if (minutes > 0) {
      this.duration = `${minutes}:${this._format(seconds, 2)}`;
    } else {
      this.duration = `${this._format(minutes, 2)}:${this._format(seconds, 2)}`;
    }

    // Format title string
    this.title = this._shrinkName(this.value.title, 50);
  }

  private _format(num: number, length: number) {
    var tmp: string = num.toString();
    return tmp.length >= length ? num : new Array(length - tmp.length + 1).join('0') + tmp;
  }

  private _shrinkName(name: string, length: number) {
    if (name.length > length) {
      return `${name.substr(0, length - 3)}...`;
    } else {
      return name;
    }
  }
}
