import {bootstrap} from 'angular2/platform/browser';
import {Fingertips} from './components/fingertips';
import {Flash} from './services/flash';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {JSONP_PROVIDERS, HTTP_PROVIDERS} from 'angular2/http';

document.addEventListener('DOMContentLoaded', function() {
  bootstrap(Fingertips, [
    Flash,
    ROUTER_PROVIDERS,
    JSONP_PROVIDERS,
    HTTP_PROVIDERS
  ]);
});
