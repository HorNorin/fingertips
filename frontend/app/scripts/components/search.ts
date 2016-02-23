import {Config, SearchSuggestion, TipService} from '../services';
import {TipsDirective} from '../directives/tips';
import {Component, View, OnInit} from 'angular2/core';
import {RouteParams, Router, RouterLink} from 'angular2/router';

enum SortType {
  Title,
  Date,
  Duration
}

@Component({
  selector: 'search',
  providers: [TipService, SearchSuggestion]
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
  public totalCount: number;
  public currentPage: number;
  public paginate: any[];
  public breadcrumbs: any[];
  public q: string;
  public sortType: SortType;
  public SortType: any;
  public suggestions: any[];
  public selectedSuggestionIndex: number;

  constructor(private _tipService: TipService,
              private _suggestionService: SearchSuggestion,
              private _params: RouteParams,
              private _router: Router) { }

  ngOnInit() {
    this.SortType = SortType;
    this.sortType = SortType.Title;
    this._loadData();
    this._updateBreadcrumbs();
  }

  doSearch(event, keyword) {
    event.preventDefault();

    if (keyword) {
      this._router.navigate(['Browse', {q: keyword}]);
      return;
    }

    if (this.q) {
      this._router.navigate(['Browse', {q: this.q}]);
    }
  }

  doSearchSuggestion(keyword) {
    this._suggestionService.get(keyword).subscribe(res => {
      var data = res.json();
      this.suggestions = [];
      for (var i = 0; i < data.length; i++) {
        this.suggestions.push({active: false, text: data[i]});
      }
    }, res => { });

    this.selectedSuggestionIndex = -1;
    this._setKeyword(keyword);
  }

  doSort(sortType) {
    this.sortType = sortType;
    this._sortTips(sortType);
  }

  setSelectedSuggestion(event) {
    if (!this.suggestions) return;

    var count = this.suggestions.length;
    var isKeyUp = event.keyCode == 38;
    var isKeyDown = event.keyCode == 40;
    var toIndex = isKeyDown ? 1 : -1;
    var firstOrLastIndex = isKeyDown ? 0 : count - 1;

    if (isKeyUp || isKeyDown) {
      if (this.selectedSuggestionIndex != -1) {
        var i = this.selectedSuggestionIndex;
        this.suggestions[i].active = false;
        if (this.suggestions[i+toIndex]) {
          this.suggestions[i+toIndex].active = true;
          this.selectedSuggestionIndex = i + toIndex;
          this._setKeyword(this.suggestions[i+toIndex].text);
        } else {
          this.suggestions[firstOrLastIndex].active = true;
          this.selectedSuggestionIndex = firstOrLastIndex;
          this._setKeyword(this.suggestions[firstOrLastIndex].text);
        }
      } else {
        this.suggestions[firstOrLastIndex].active = true;
        this.selectedSuggestionIndex = firstOrLastIndex;
        this._setKeyword(this.suggestions[firstOrLastIndex].text);
      }
    }
  }

  isCurrentPage(index): boolean {
    return index === this.currentPage;
  }

  goto(page) {
    var params: any = this._getParamsAsObject();

    if (page.index == 1) {
      delete params.page;
    } else {
      params.page = page.index;
    }

    this._router.navigate(['Browse', params]);
  }

  private _setKeyword(keyword) {
    this.q = keyword;
  }

  private _getParamsAsObject() {
    var params = {};
    for (var p in this._params.params) {
      params[p] = this._params.get(p);
    }

    return params;
  }

  private _loadData() {
    this._tipService.get(this._params).subscribe(res => {
      var data = res.json();

      this.tips = data.tips;
      this.perPage = data.per_page;
      this.totalPages = data.total_pages;
      this.totalCount = data.total_count;
      this.currentPage = data.current_page;
      this.paginate = [];

      for (var i = 1; i <= this.totalPages; i++) {
        this.paginate.push({index: i, text: i.toString()})
      }

      this._sortTips(this.sortType);
    }, res => { });
  }

  private _updateBreadcrumbs() {
    var params = this._getParamsAsObject();

    this.breadcrumbs = [];
    this.breadcrumbs.push({url: Config.url.home, label: 'Fingertips'});
    this.breadcrumbs.push({url: Config.url.search, label: 'Browse'});

    for (var p in params) {
      if (p == 'page') continue;
      this.breadcrumbs.push({url: '#', label: params[p].replace(/%20/g, ' ')});
    }

    this.breadcrumbs[this.breadcrumbs.length-1].active = true;
  }

  private _sortTips(sortType: SortType) {
    if (sortType == SortType.Title) {
      this.tips.sort((a, b): number => {
        if (a.title == b.title) return 0;
        return a.title > b.title ? 1 : -1;
      });
    } else if (sortType == SortType.Date) {
      this.tips.sort((a, b): number => {
        var aDate = new Date(a.created_at);
        var bDate = new Date(b.created_at);
        if (aDate.getTime() == bDate.getTime()) return 0;
        return aDate.getTime() > bDate.getTime() ? 1 : -1;
      });
    } else {
      this.tips.sort((a, b): number => {
        if (a.duration == b.duration) return 0;
        return a.duration > b.duration ? 1 : -1;
      });
    }
  }
}
