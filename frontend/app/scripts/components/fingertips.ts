import {Component, View, HostListener, ViewEncapsulation} from 'angular2/core';
import {RouteConfig, RouterOutlet, RouterLink, Location, Router} from 'angular2/router';

import {HomeComponent} from './home';
import {SearchComponent} from './search';
import {TipComponent} from './tip';
import {LoginComponent} from './login';
import {LogoutComponent} from './logout';
import {AuthService, Config, Flash} from '../services';

@Component({
  selector: 'fingertips',
  providers: [AuthService]
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
  { path: Config.url.tip, name: 'Tip', component: TipComponent },
  { path: Config.url.login, name: 'Login', component: LoginComponent },
  { path: Config.url.logout, name: 'Logout', component: LogoutComponent }
])
export class Fingertips {
  activedItem: string;
  isLoggedIn: boolean;
  dropDownOpenned: boolean;
  flashMessage: any;

  constructor(router: Router, location: Location, auth: AuthService, flash: Flash) {
    this.dropDownOpenned = false;
    this.activedItem = location.path();
    router.subscribe((next) => {
      this.activedItem = next;
      this.flashMessage = flash.get();
      this.isLoggedIn = auth.authenticate() ? true : false;
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
