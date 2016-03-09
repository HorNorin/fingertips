import {Config} from './config';
import {Injectable} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {RequestOptionsArgs, URLSearchParams} from 'angular2/http';

@Injectable()
export class TipService {
  constructor(private _http: Http) { }

  get(params: RouteParams): any {
    var url = Config.api.searchUrl;
    var searchParams = new URLSearchParams();

    for (var p in params.params) {
      searchParams.append(p, params.get(p));
    }

    return this._http.get(url, { search: searchParams });
  }

  find(id, success, error): any {
    var headers = new Headers();
    var url = `${Config.api.tipUrl}/${id}.json`;
    var searchParams = new URLSearchParams();

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ` Token token=${Cookie.getCookie('auth-token')}`);

    this._http.get(url, { search: searchParams, headers: headers })
      .subscribe(res => {
        success(res.json());
      }, err => {
        error(err.json());
      });
  }
}
