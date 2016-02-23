import {Config} from './config';
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';

@Injectable()
export class SearchSuggestion {
  constructor(private _http: Http) { }

  get(term) {
    var url = Config.api.searchSuggestion;
    var searchParams = new URLSearchParams();

    searchParams.append('term', term);
    return this._http.request(url, { search: searchParams });
  }
}
