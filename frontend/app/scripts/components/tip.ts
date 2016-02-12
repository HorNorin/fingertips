import {TipService} from '../services/tip';
import {RouteParams} from 'angular2/router';
import {Component, View, OnInit, OnDestroy} from 'angular2/core';

declare var videojs;
declare var $;

@Component({
  selector: 'tip-component',
  providers: [TipService]
})
@View({
  template: require('../../views/tip.html'),
  styles: [require('../../styles/components/tip.css')]
})
export class TipComponent implements OnInit, OnDestroy {
  public tip: any;
  public types: string[];

  private _player: any;

  constructor(private _tipService: TipService,
              private _params: RouteParams) { }

  ngOnInit() {
    this._tipService.find(this._params.get('id')).subscribe(res => {
      this.tip = res.json();
      this.tip.created_at = new Date(this.tip.created_at);

      // TODO: Remove this dummy data when API is ready
      // this.tip.video_source = 'youtube';
      // this.tip.video_url = 'https://www.youtube.com/embed/gDUp5YfXCSE?list=PLyLyqT77DD8DWwnfN3zbwPObxEx0H1Hsk';

      this.tip.video_source = 'as3';
      this.tip.video_url = 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4';
      this.tip.video_poster = 'http://taagme.com/wp-content/uploads/2015/06/video-poster.jpg';

      if (this.tip.video_source == 'youtube') {
        this._setupVideoPlayer({
          techOrder: ['youtube'],
          sources: [{
            type: 'video/youtube',
            src: this.tip.video_url
          }]
        });
      } else {
        this._setupVideoPlayer({poster: this.tip.video_poster});
        this.types = [
          'video/mp4',
          'video/webm',
          'video/ogg',
        ];
      }

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
    }, res => { });
  }

  ngOnDestroy() {
    this._player.dispose();
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
