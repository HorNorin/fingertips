import {Config} from './config';

import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Injectable()
export class CommentService {
  constructor(private _http: Http) { }

  get(tipId: number, success, error) {
    var headers = new Headers();
    var url = `${Config.api.tipUrl}/${tipId}/comments.json`;

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ` Token token=${Cookie.getCookie('auth-token')}`);

    this._http.get(url, { headers: headers }).subscribe(res => {
      success(res.json());
    }, err => {
      error(err.json());
    });
  }

  post(params: any, success, error) {
    var url = `${Config.api.tipUrl}/${params.tipId}/comments.json`;
    var headers = new Headers();
    var body = JSON.stringify(params);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', ` Token token=${Cookie.getCookie('auth-token')}`);

    this._http.post(url, body, { headers: headers })
      .subscribe(res => {
        success(res.json());
      }, err => {
        error(err.json());
      });
  }
}
