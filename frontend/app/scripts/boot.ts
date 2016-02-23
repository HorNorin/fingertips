import {bootstrap} from 'angular2/platform/browser';
import {Fingertips} from './components/fingertips';
import {Flash} from './services';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

document.addEventListener('DOMContentLoaded', function() {
  bootstrap(Fingertips, [
    Flash,
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS
  ]);
});
