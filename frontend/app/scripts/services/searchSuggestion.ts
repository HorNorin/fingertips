import {Config} from './config';
import {Injectable} from 'angular2/core';
import {Jsonp, URLSearchParams} from 'angular2/http';

@Injectable()
export class SearchSuggestion {
  constructor(private _http: Jsonp) { }

  get(term) {
    var url = Config.api.searchSuggestion;
    var searchParams = new URLSearchParams();

    searchParams.append('term', term);
    searchParams.append('callback', 'JSONP_CALLBACK');
    return this._http.request(url, { search: searchParams });
  }
}
