import {Config} from './config';
import {Injectable} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {Jsonp, Headers} from 'angular2/http';
import {RequestOptionsArgs, URLSearchParams} from 'angular2/http';

@Injectable()
export class TipService {
  constructor(private _http: Jsonp) { }

  get(params: RouteParams): any {
    var url = Config.api.searchUrl;
    var searchParams = new URLSearchParams();

    for (var p in params.params) {
      searchParams.append(p, params.get(p));
    }

    searchParams.append('callback', 'JSONP_CALLBACK');
    return this._http.request(url, { search: searchParams });
  }
}
