import {Component} from 'angular2/core';
import {AuthService, Config, Flash} from '../services';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Router, OnActivate, ComponentInstruction} from 'angular2/router';

@Component({
  selector: 'logout',
  template: ''
})
export class LogoutComponent implements OnActivate {
  constructor(private _router: Router, private _auth: AuthService, private _flash: Flash) { }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    var redirectUrl = prev ? prev.urlPath : Config.url.home;
    this._auth.logout(data => {
      this._flash.put('success', data.message);
      this._router.navigateByUrl(redirectUrl);
    }, err => {
      this._router.navigateByUrl(redirectUrl);
    });
  }
}
