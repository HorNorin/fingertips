import {Config} from '../services';

import {RouteParams, RouterLink} from 'angular2/router';
import {Component, View, OnInit, OnDestroy} from 'angular2/core';
import {TipService, CommentService, AuthService} from '../services';

declare var videojs;
declare var $;

@Component({
  selector: 'tip-component',
  providers: [TipService, CommentService, AuthService]
})
@View({
  directives: [RouterLink],
  template: require('../../views/tip.html'),
  styles: [require('../../styles/components/tip.css')]
})
export class TipComponent implements OnInit, OnDestroy {
  public tip: any;
  public comments: any[];
  public types: string[];

  private _player: any;
  private _referred: string;

  constructor(private _tipService: TipService,
              private _auth: AuthService,
              private _commentService: CommentService,
              private _params: RouteParams) { }

  ngOnInit() {
    this._tipService.find(this._params.get('id'), tip => {
      this.tip = tip;
      this.tip.created_at = new Date(this.tip.created_at);

      this._commentService.get(this.tip.id, data => {
        this.comments = data;
      }, error => {
        this.comments = [];
      });

      this._setupVideoPlayer({
        poster: this.tip.poster_url,
        sources:[{
          type: 'video/mp4',
          src: this.tip.video_url
        }]
      });

      $(window).resize(() => {
        var height;
        var width = $(window).width();

        width = width > 960 ? 960 : width - 5;
        height = width * (9/16);

        $(`#${this.tip.slug}`).css({
          width: `${width}px`,
          height: `${height}px`
        });
      });
    }, error => {
      this.tip = null;
    });
  }

  ngOnDestroy() {
    if (this._player) {
      this._player.dispose();
    }
  }

  private _setupVideoPlayer(options = null) {
    var defaultOptions = {
      width: 960,
      height: 540,
      controls: true,
      autoplay: false,
      preload: 'auto'
    };

    if (options) {
      $.extend(defaultOptions, options);
    }

    setTimeout(() => {
      this._player = videojs(`${this.tip.slug}`, defaultOptions);
    }, 0);
  }
}
