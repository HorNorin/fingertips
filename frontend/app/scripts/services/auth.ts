import {Injectable} from 'angular2/core';
import {Http, Jsonp, Headers} from 'angular2/http';
import {Config} from './config';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AuthService {
  constructor(private _http: Http, private _jsonp: Jsonp) { }

  authenticate() {
    return Cookie.getCookie('auth-token');
  }

  login(email, password, success, error) {
    var headers = new Headers();
    var body = JSON.stringify({email: email, password: password});
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ` Token token=${Cookie.getCookie('auth-token')}`);

    this._http.post(Config.api.login, body, {headers: headers})
      .subscribe(res => {
        var data = res.json();
        Cookie.setCookie('auth-token', data.data.access_token);
        success(data);
      }, err => {
        error(err.json());
      });
  }

  logout(success, error) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ` Token token=${Cookie.getCookie('auth-token')}`);
    this._http.get(Config.api.logout, {headers: headers}).subscribe(res => {
      Cookie.deleteCookie('auth-token');
      success(res.json());
    }, err => {
      error(err.json());
    });
  }
}
