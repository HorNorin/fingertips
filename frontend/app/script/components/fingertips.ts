import {Component, View} from 'angular2/core';
import {RouteConfig, RouterOutlet, RouterLink, PlatformLocation} from 'angular2/router';

import {HomeComponent} from './home.component';

@Component({
  selector: 'fingertips',
})
@View({
  templateUrl: 'public/view/main.html',
  directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
  { path: '/browse', name: 'Home', component: HomeComponent }
])
export class Fingertips {
  dropDownOpenned: boolean;
  activedItem: string;

  constructor(location: PlatformLocation) {
    this.dropDownOpenned = false;
    this.activedItem = location.pathname;
  }

  actived(item: string) {
    return this.activedItem === item && !this.dropDownOpenned;
  }

  activating(item: string) {
    this.activedItem = item;
  }

  toggleDropDown($event) {
    $event.preventDefault();
    this.dropDownOpenned = !this.dropDownOpenned;
  }
}
