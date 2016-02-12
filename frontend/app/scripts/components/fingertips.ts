import {Component, View, HostListener, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, RouterOutlet, RouterLink, Location, Router} from 'angular2/router';

import {HomeComponent} from './home';
import {SearchComponent} from './search';
import {TipComponent} from './tip';
import {Config} from '../services/config';

@Component({
  selector: 'fingertips',
})
@View({
  template: require('../../views/main.html'),
  styles: [
    require('../../styles/main.css'),
    require('../../styles/footer.css'),
    require('../../styles/header.css')
  ],
  directives: [RouterOutlet, RouterLink],
  encapsulation: ViewEncapsulation.None
})
@RouteConfig([
  { path: Config.url.home, name: 'Home', component: HomeComponent },
  { path: Config.url.search, name: 'Browse', component: SearchComponent },
  { path: Config.url.tip, name: 'Tip', component: TipComponent }
])
export class Fingertips {
  activedItem: string;
  dropDownOpenned: boolean;

  constructor(router: Router, location: Location) {
    this.dropDownOpenned = false;
    this.activedItem = location.path();
    router.subscribe((next) => {
      this.activedItem = next;
    });
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
