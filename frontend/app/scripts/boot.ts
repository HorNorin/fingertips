import {bootstrap} from 'angular2/platform/browser';
import {Fingertips} from './components/fingertips';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {JSONP_PROVIDERS} from 'angular2/http';

document.addEventListener('DOMContentLoaded', function() {
  bootstrap(Fingertips, [ROUTER_PROVIDERS, JSONP_PROVIDERS]);
});
