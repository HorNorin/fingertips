import {Component, View, HostListener} from 'angular2/core';
import {RouteConfig, RouterOutlet, RouterLink, Location} from 'angular2/router';

import {HomeComponent} from './home';

@Component({
  selector: 'fingertips',
})
@View({
  templateUrl: 'public/views/main.html',
  directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent }
])
export class Fingertips {
  activedItem: string;
  dropDownOpenned: boolean;

  constructor(location: Location) {
    this.dropDownOpenned = false;
    this.activedItem = location.path();
  }

  isActivedItem(item: string) {
    return this.activedItem.indexOf(item) > -1;
  }

  setActivedItem(item: string) {
    this.activedItem = item;
  }

  toggleDropDown($event) {
    $event.preventDefault();
    this.dropDownOpenned = !this.dropDownOpenned;
  }

  @HostListener('click', ['$event.target'])
  onClick(element) {
    var bannedClasses = ['dropdown', 'arrow', 'arrow open'];
    if (bannedClasses.indexOf(element.className) <= -1) {
      this.dropDownOpenned = false;
    }
  }
}
