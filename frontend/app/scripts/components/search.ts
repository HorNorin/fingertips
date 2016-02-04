import {TipService} from '../services/tip';
import {TipsDirective} from '../directives/tips';
import {RouteParams, Router, RouterLink} from 'angular2/router';
import {Component, View, OnInit} from 'angular2/core';

@Component({
  selector: 'search',
  providers: [TipService]
})
@View({
  directives: [TipsDirective, RouterLink],
  template: require('../../views/search.html'),
  styles: [require('../../styles/components/search.css')]
})
export class SearchComponent implements OnInit {
  public tips: any[];
  public perPage: number;
  public totalPages: number;
  public currentPage: number;
  public paginate: any[];
  public params: any;

  constructor(private _tipService: TipService,
              private _params: RouteParams,
              private _router: Router) {}

  ngOnInit() {
    this._tipService.get(this._params).subscribe(res => {
      var data = res.json();

      this.tips = data.tips;
      this.perPage = data.per_page;
      this.totalPages = data.total_pages;
      this.currentPage = data.current_page;
      this.paginate = [];

      for (var i = 1; i <= this.totalPages; i++) {
        this.paginate.push({index: i, text: i.toString()})
      }
    });
  }

  isCurrentPage(index): boolean {
    return index === this.currentPage;
  }

  getLink(page): any {
    var params = {};
    for (var p in this._params.params) {
      params[p] = this._params.get(p);
    }
    return ['Browse', params];
  }
}
