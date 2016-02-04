import {Component, Input} from 'angular2/core';
import {TipDirective} from './tip';

@Component({
  selector: 'tips',
  template: `
    <div class="tip" *ngFor="#tip of value">
      <a href="#"><tip [value]="tip"></tip></a>
    </div>
  `,
  directives: [TipDirective]
  // styles: [require('../../styles/directives/tips.css')]
})
export class TipsDirective {
  @Input() value: any[];
}
