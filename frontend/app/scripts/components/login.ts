import {Component, View} from 'angular2/core';
import {Router, ComponentInstruction} from 'angular2/router';
import {OnActivate, CanActivate} from 'angular2/router';
import {AuthService, Config, Flash} from '../services';

@Component({
  selector: 'login'
})
@View({
  styles: [require('../../styles/login.css')],
  template: require('../../views/login.html')
})
export class LoginComponent implements OnActivate {
  email: string;
  password: string;
  error: any;

  private _referred: string;

  constructor(private _auth: AuthService, private _router: Router, private _flash: Flash) { }

  login() {
    this._auth.login(this.email, this.password, data => {
      var redirectUrl = this._referred;

      this._flash.put('success', data.message);
      this._router.navigateByUrl(redirectUrl);
    }, err => {
      this.error = err;
      this.password = '';
    });
  }

  routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
    this._referred = prev ? prev.urlPath : Config.url.home;
    if (this._auth.authenticate()) {
      this._router.navigateByUrl(this._referred);
    }
  }
}
