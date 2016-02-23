import {Injectable} from 'angular2/core';
import {Router} from 'angular2/router';

@Injectable()
export class Flash {
  messages: any[];
  current: any;

  constructor(router: Router) {
    this.messages = [];

    router.subscribe(next => {
      this.current = this.messages.shift() || null;
    });
  }

  get() {
    return this.current;
  }

  put(key: string, value: string) {
    this.messages.push({key: key, text: value});
  }
}
