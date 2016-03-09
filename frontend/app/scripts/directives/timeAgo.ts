import {Directive, Input, OnInit, OnDestroy, ElementRef} from 'angular2/core';

@Directive({
  selector: '[time-ago]',
})
export class TimeAgoDirective implements OnInit, OnDestroy {
  @Input('time-ago') value: string;

  private _timeago: any;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.el.nativeElement.innerHTML = this._calculate();

    this._timeago = setInterval(() => {
      this.el.nativeElement.innerHTML = this._calculate();
    }, 60000);
  }

  ngOnDestroy() {
    if (this._timeago) {
      clearInterval(this._timeago);
    }
  }

  private _calculate() {
    var strings = {
      prefixAgo: '',
      prefixFromNow: '',
      suffixAgo: "ago",
      suffixFromNow: "from now",
      seconds: "less than a minute",
      minute: "about a minute",
      minutes: "%d minutes",
      hour: "about an hour",
      hours: "about %d hours",
      day: "a day",
      days: "%d days",
      month: "about a month",
      months: "%d months",
      year: "about a year",
      years: "%d years"
    };

    var now = new Date();
    var past = new Date(this.value);
    var elapse = now.getTime() - past.getTime();
    var seconds = elapse / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = hours / 24;
    var years = days / 365;

    var words =
      seconds < 45 && this._substitute(strings.seconds, Math.round(seconds)) ||
      seconds < 90 && this._substitute(strings.minute, 1) ||
      minutes < 45 && this._substitute(strings.minutes, Math.round(minutes)) ||
      minutes < 90 && this._substitute(strings.hour, 1) ||
      hours < 24 && this._substitute(strings.hours, Math.round(hours)) ||
      hours < 42 && this._substitute(strings.day, 1) ||
      days < 30 && this._substitute(strings.days, Math.round(days)) ||
      days < 45 && this._substitute(strings.month, 1) ||
      days < 365 && this._substitute(strings.months, Math.round(days / 30)) ||
      years < 1.5 && this._substitute(strings.year, 1) ||
      this._substitute(strings.years, Math.round(years));

    return `${words} ${strings.suffixAgo}`;
  }

  private _substitute(format, value) {
    return format.replace(/%d/i, value);
  }
}
